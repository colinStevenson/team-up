import Queries from '../../queries'
import apolloClient from '../../apollo'

const state = {
  teams: null,
  team: null,
  teamMembers: null
}

const getters = {
  teams: state => state.teams,
  team: state => state.team,
  teamMembers: state => state.teamMembers
}

const actions = {
  getTeams (context, userId) {
    apolloClient.query({
      query: Queries.ALL_TEAMS_QUERY,
      variables: {
        userId
      }
    }).then((result) => {
      context.commit('SET_TEAMS', result.data.allTeams)
    })
  },
  getTeam (context, teamId) {
    apolloClient.query({
      query: Queries.TEAM_BY_ID,
      variables: {
        teamId
      }
    }).then((result) => {
      context.commit('SET_TEAM', result.data.Team)
    })
  },
  getTeamMembers (context, teamId) {
    apolloClient.query({
      query: Queries.TEAM_MEMBERS_BY_ID,
      variables: {
        teamId
      }
    }).then((result) => {
      context.commit('SET_TEAM_MEMBERS', result.data.allUsers)
    })
  }
}

const mutations = {
  SET_TEAMS (state, teams) {
    state.teams = teams
  },
  SET_TEAM (state, team) {
    state.team = team
  },
  SET_TEAM_MEMBERS (state, teamMembers) {
    state.teamMembers = teamMembers
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
