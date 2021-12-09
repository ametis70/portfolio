import { Text, GridItem, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

import Form from './Form'

const ContactForm: React.FC<TFunctionProps> = ({ t }) => {
  const {
    formState: { isSubmitted, isSubmitting, isSubmitSuccessful },
  } = useFormContext()

  const submitTranslationKey = isSubmitting
    ? 'form.sending'
    : isSubmitSuccessful
    ? 'form.sent'
    : 'form.send'

  return (
    <Form.Container>
      <Form.Control t={t} id="name" Component={Input} colSpan={1} />
      <Form.Control t={t} id="email" Component={Input} colSpan={1} />
      <Form.Control t={t} id="subject" Component={Input} />
      <Form.Control t={t} id="message" Component={Form.Textarea} />
      <GridItem display="flex" justifyContent="flex-end" colSpan={2}>
        <Form.Submit>{t(submitTranslationKey, { ns: 'contact' })}</Form.Submit>
      </GridItem>
      {isSubmitted && !isSubmitting && !isSubmitSuccessful ? (
        <GridItem colSpan={2}>
          <Text variant="error"> {t('form.submit_error', { ns: 'contact' })} </Text>
        </GridItem>
      ) : null}
    </Form.Container>
  )
}

export default ContactForm
