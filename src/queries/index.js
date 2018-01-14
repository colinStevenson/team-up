import Teams from './teams'
import Events from './events'
import User from './user'
import Invitations from './invitations'

export default {
  ...Events,
  ...Teams,
  ...User,
  ...Invitations
}
