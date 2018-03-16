<template>
  <section class="card" :class="isLoading ? 'is-loading' : ''">
    <div class="card-header">
      <h3 class="card-title">Members</h3>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="member in teamMembers" class="list-group-item">
        {{member.firstName}} {{member.lastName}}
      </li>
      <template v-if="isAdmin">
        <li v-for="invitation in unacceptedInvitations" class="list-group-item">
          <div class="text-muted">{{invitation.email}}</div> 
          <small>
            <em>Invitation pending</em>
          </small>
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
          <button class="btn btn-primary mr-sm-1" type="button" @click="handleInvitationSend">Send</button>
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
      'isAdmin',
      'roleLoading',
      'unacceptedInvitations',
      'user'
    ]),
    isLoading () {
      return this.roleLoading || this.isLoadingMembers || this.isLoadingInvitations
    }
  },
  data () {
    return {
      isInviting: false,
      email: '',
      isValidEmail: true,
      isLoadingInvitations: false,
      isLoadingMembers: false
    }
  },
  methods: {
    ...mapActions([
      'sendInvitation',
      'getUnacceptedInvitations'
    ]),
    toggleInviting () {
      this.isInviting = !this.isInviting
      this.isValidEmail = true
    },
    handleInvitationSend () {
      if (this.validateInvitation()) {
        this.sendInvitation({
          email: this.email,
          teamId: this.teamId,
          userId: this.user.id
        }).then(() => {
          this.requestUnacceptedInvitations(true)
        })
        this.email = ''
      } else {
        // handle error
        console.error('invitation already exists')
      }
    },
    requestMembers () {
      this.isLoadingMembers = true
      this.getTeamMembers(this.teamId).then(() => {
        this.isLoadingMembers = false
      })
    },
    requestUnacceptedInvitations (forceNetwork) {
      this.isLoadingInvitations = true
      this.getUnacceptedInvitations({
        teamId: this.teamId,
        forceNetwork
      }).then(() => {
        this.isLoadingInvitations = false
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
  created () {
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
