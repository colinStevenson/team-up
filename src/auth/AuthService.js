import auth0 from 'auth0-js'
import EventEmitter from 'EventEmitter'
import router from './../router'
import jwtDecode from 'jwt-decode'

class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.isRegistered = null
    window.auth = this
  }

  auth0 = new auth0.WebAuth({
    domain: 'team-up.auth0.com',
    clientID: process.env.AUTH_0_CLEINT_ID,
    redirectUri: process.env.AUTH_0_REDIRECT_URL,
    // audience: 'https://team-up.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid email'
  })

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('teams')
      } else if (err) {
        router.replace('home')
      }
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  getProfile () {
    return jwtDecode(this.getIdToken())
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace({name: 'Home'})
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getIdToken () {
    return localStorage.getItem('id_token')
  }
}

export default new AuthService()
