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
  useColorMode,
} from '@chakra-ui/react'
import autosize from 'autosize'
import { forwardRef, useEffect, useRef } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'

type ContactFormData = {
  name: string
  subject: string
  message: string
  email: string
}

const Container: React.FC = ({ children }) => {
  const { handleSubmit } = useFormContext()

  const onSubmit = async (data: ContactFormData) => {
    await fetch(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8888/.netlify/functions/send-contact-mail'
        : '/.netlify/functions/send-contact-mail',
      {
        body: JSON.stringify(data),
        method: 'POST',
      },
    )
  }

  return (
    <Grid
      as="form"
      templateColumns="repeat(2, 1fr)"
      rowGap={6}
      columnGap={4}
      layerStyle="container"
      my={8}
      onSubmit={handleSubmit(onSubmit)}
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
  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useFormContext()

  return (
    <GridItem colSpan={colSpan}>
      <FormControl id={id} variant="contact" isInvalid={errors[id]}>
        <FormLabel>{t(`form.${id}`, { ns: 'contact' })}</FormLabel>
        <Component
          disabled={isSubmitting || isSubmitSuccessful}
          {...register(id, {
            required: true,
            pattern:
              id === 'email'
                ? /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                : undefined,
          })}
        />
        <FormErrorMessage>
          {errors[id] ? t(`validation.${errors[id].type}`, { ns: 'contact' }) : null}
        </FormErrorMessage>
      </FormControl>
    </GridItem>
  )
}

const Textarea = forwardRef((props, ref) => {
  const internalRef = useRef(null)
  const refs = useMergeRefs(internalRef, ref)

  useEffect(() => {
    const _internalRef = internalRef.current
    if (internalRef.current) {
      autosize(internalRef.current)
    }
    return () => {
      if (_internalRef) {
        autosize.destroy(_internalRef)
      }
    }
  }, [internalRef])

  return <ChakraTextarea minrows={3} transition="height none" ref={refs} {...props} />
})

const Submit: React.FC = ({ children, ...props }) => {
  const { colorMode } = useColorMode()
  const {
    formState: { isSubmitting, isSubmitSuccessful },
  } = useFormContext()

  return (
    <Button
      type="submit"
      disabled={isSubmitting || isSubmitSuccessful}
      variant="cta"
      mx="0"
      sx={{
        '&:hover[disabled]': {
          bg: colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
        },
      }}
      {...props}
    >
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
