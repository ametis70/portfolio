import { GridItem, Input } from '@chakra-ui/react'

import Form from './Form'

const ContactForm: React.FC<TFunctionProps> = ({ t }) => {
  return (
    <Form.Container>
      <Form.Control t={t} id="name" Component={Input} colSpan={1} />
      <Form.Control t={t} id="email" Component={Input} colSpan={1} />
      <Form.Control t={t} id="subject" Component={Input} />
      <Form.Control t={t} id="message" Component={Form.Textarea} />
      <GridItem display="flex" justifyContent="end" colSpan={2}>
        <Form.Submit>{t('form.send', { ns: 'contact' })}</Form.Submit>
      </GridItem>
    </Form.Container>
  )
}

export default ContactForm
