import Teams from './teams'
import Events from './events'
import User from './user'
import Invitations from './invitations'
import Attendances from './attendances'

export default {
  ...Events,
  ...Teams,
  ...User,
  ...Invitations,
  ...Attendances
}
