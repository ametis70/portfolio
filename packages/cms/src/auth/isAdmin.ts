import { AccessArgs } from 'payload'

const isAdmin = ({ req: { user } }: AccessArgs) => {
  return (user && user.role === 'admin') ?? false
}

export default isAdmin
