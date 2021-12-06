import {
  Grid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea as ChakraTextarea,
  Button,
  GridItem,
  useMergeRefs,
  InputProps,
} from '@chakra-ui/react'
import autosize from 'autosize'
import { forwardRef, useEffect, useRef } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'

const Container: React.FC = ({ children }) => {
  const { handleSubmit } = useFormContext()

  const onSubmit = (data, e) => console.log(data, e)
  const onError = (errors, e) => console.log(errors, e)

  return (
    <Grid
      as="form"
      templateColumns="repeat(2, 1fr)"
      rowGap={6}
      columnGap={4}
      layerStyle="container"
      my={8}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {children}
    </Grid>
  )
}

type ControlProps = TFunctionProps & {
  id: string
  Component: React.FC<InputProps & RegisterOptions>
  colSpan?: number
}

const Control: React.FC<ControlProps> = ({ id, t, Component, colSpan = 2 }) => {
  const { register, formState } = useFormContext()

  return (
    <GridItem colSpan={colSpan}>
      <FormControl id={id} variant="contact" isInvalid={formState.errors[id]}>
        <FormLabel>{t(`form.${id}`, { ns: 'contact' })}</FormLabel>
        <Component
          {...register(id, {
            required: true,
            pattern:
              id === 'email'
                ? /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                : undefined,
          })}
        />
        <FormErrorMessage>
          {formState.errors[id]
            ? t(`validation.${formState.errors[id].type}`, { ns: 'contact' })
            : null}
        </FormErrorMessage>
      </FormControl>
    </GridItem>
  )
}

const Textarea = forwardRef((props, ref) => {
  const internalRef = useRef(null)
  const refs = useMergeRefs(internalRef, ref)

  useEffect(() => {
    if (internalRef.current) {
      autosize(internalRef.current)
    }
    return () => {
      if (internalRef.current) {
        autosize.destroy(internalRef.current)
      }
    }
  }, [internalRef.current])

  return <ChakraTextarea minrows={3} transition="height none" ref={refs} {...props} />
})

const Submit: React.FC = ({ children, ...props }) => {
  return (
    <Button type="submit" variant="cta" mx="0" {...props}>
      {children}
    </Button>
  )
}

const Form = {
  Container,
  Textarea,
  Control,
  Submit,
}

export default Form
