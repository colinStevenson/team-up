<template>
  <section class="card" :class="isLoading ? 'loading' : ''">
    <div class="card-header">
      <h3 class="card-title">Members</h3>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="member in teamMembers" class="list-group-item">
        {{member.firstName}} {{member.lastName}}
      </li>
      <template v-if="isAdmin">
        <li v-for="invitation in unacceptedInvitations" class="list-group-item d-flex justify-content-between">
          <span class="text-muted">{{invitation.email}}</span> 
          <em>Invitation pending</em>
        </li>
      </template>
    </ul>
    <div class="card-body" v-if="isAdmin">
      <div class="form" v-if="isInviting">
        <div class="form-group">
          <label for="invite-email-input">Invite new member</label>
          <input type="text" class="form-control" :class="isValidEmail ? '' : 'is-invalid'" placeholder="Email address" id="invite-email-input" v-model="email">
          <small v-if="!isValidEmail" class="invalid-feedback">Invitation is pending or the email is not valid.</small>
        </div>
        <div class="form-group">
          <button class="btn btn-primary mr-sm-1" type="button" @click="sendInvitation">Send</button>
          <button class="btn btn-danger" type="button" @click="toggleInviting">Cancel</button>
        </div>
      </div>
      <div v-else>
        <button class="btn btn-outline-primary card-link" @click="toggleInviting">Invite people</button>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Members',
  computed: {
    ...mapGetters([
      'teamMembers',
      'teamMembersLoading',
      'isAdmin',
      'roleLoading',
      'unacceptedInvitations',
      'user'
    ]),
    isLoading () {
      return this.roleLoading || this.teamMembersLoading
    }
  },
  data () {
    return {
      isInviting: false,
      email: '',
      isValidEmail: true
    }
  },
  methods: {
    ...mapActions([
      'sendInvitation',
      'getUnacceptedInvitations',
      'getTeamMembers'
    ]),
    toggleInviting () {
      this.isInviting = !this.isInviting
      this.isValidEmail = true
    },
    sendInvitation () {
      if (this.validateInvitation()) {
        this.sendInvitation({
          email: this.email,
          teamId: this.teamId,
          userId: this.user.id
        })
        this.email = ''
      } else {
        // handle error
        console.error('invitation already exists')
      }
    },
    requestUnacceptedInvitations () {
      this.getUnacceptedInvitations({
        teamId: this.teamId
      })
    },
    validateInvitation () {
      let isValid = !(/^\s*$/.test(this.email))
      if (isValid) {
        isValid = !this.unacceptedInvitations.find(invite => {
          return invite.email.toLowerCase() === this.email.toLowerCase()
        })
      }
      this.isValidEmail = isValid
      return isValid
    }
  },
  mounted () {
    this.getTeamMembers(this.teamId)
    if (this.isAdmin) {
      this.requestUnacceptedInvitations()
    }
  },
  props: ['teamId'],
  watch: {
    isAdmin () {
      if (this.isAdmin) {
        this.requestUnacceptedInvitations()
      }
    },
    email () {
      this.isValidEmail = true
    }
  }
}
</script>
