import Teams from './teams'
import Events from './events'
import User from './user'
import Invitations from './invitations'
import Roles from './roles'

export default {
  ...Events,
  ...Roles,
  ...Teams,
  ...User,
  ...Invitations
}
