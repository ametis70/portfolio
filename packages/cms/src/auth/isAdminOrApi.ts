import { AccessArgs } from 'payload'

const isAdminOrApi = ({ req: { user } }: AccessArgs) => {
  return (user && ['admin', 'api'].some((role) => role === user.role)) ?? false
}

export default isAdminOrApi
