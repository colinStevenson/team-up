<template>
  <section class="card">
    <div class="card-body">
      <h3 class="card-title h4">Members</h3>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="member in teamMembers" class="list-group-item">
        {{member.firstName}} {{member.lastName}} {{member.id}}
      </li>
    </ul>
    <div class="card-body">
      <div class="form-inline" v-if="isInviting">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Email address" v-model="email">
        </div>
        <button class="btn btn-primary mx-sm-3" type="button" @click="sendInvitation">Send</button>
        <button class="btn btn-danger" type="button" @click="toggleInviting">Cancel</button>
      </div>
      <div v-else>
        <button class="btn btn-info card-link" @click="toggleInviting">Invite people</button>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Members',
  computed: {
    ...mapGetters({
      teamMembers: 'teamMembers'
    })
  },
  data () {
    return {
      isInviting: false,
      email: ''
    }
  },
  methods: {
    toggleInviting () {
      this.isInviting = !this.isInviting
    },
    sendInvitation () {
      this.$store.dispatch('sendInvitation', {
        email: this.email,
        teamId: this.teamId,
        userId: 'cjbs2ctasnn7b01702y18svyo'
      })
      this.email = ''
    }
  },
  mounted () {
    this.$store.dispatch('getTeamMembers', this.teamId)
  },
  props: ['teamId']
}
</script>
