<template>
  <div class="container-fluid bodycolor pt-3">
    <div class="row">
      <div class="col-md-4 offset-md-4 col-sm-12" style="font-family: 'Alatsi', sans-serif;">
        <div class="d-flex justify-content-center">
          <img src="../assets/logo.gif" class="img-thumbnail" width="45" />
        </div>
        <h3 class="text-center text-dark">Let's get started</h3>
        <div class="col-sm-12">
          <h5 class="text-center text-dark">First, create your account.</h5>
          <form
            id="register"
            @submit.prevent="register"
            class="border rounded p-3 shadow"
            style="font-family: 'Solway', serif; font-size:0.8rem"
          >
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input v-model="email_register" id="email" type="email" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                v-model="username_register"
                id="username"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="password_register">Password</label>
              <input
                v-model="password_register"
                id="password"
                type="password"
                class="form-control"
                required
              />
            </div>
            <div class="form-inline" style="margin: 5px auto;">
              <button type="submit" class="btn btn-warning btn-sm btn-block mt-2">Register</button>
            </div>
          </form>
          <p class="text-center text-white mt-2">or you can login using:</p>
          <!-- google button -->
          <!-- <div class="row mt-2">
            <template>
              <g-signin-button
                class="btn btn-block btn-outline-dark mx-3"
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError"
              >
                <i class="fa fa-google pr-2"></i>
                Sign in with Google
              </g-signin-button>
            </template>
          </div>-->
          <!-- google button end -->
          <p class="text-justify mt-2 text-dark" style="font-size:0.7rem">
            If you continue with Google and don't already have a Let's Todo account, you are creating an account and you agree to our
            <span
              class="text-danger"
            >Terms of Service</span>.
          </p>
        </div>
        <!-- end form register -->
      </div>
    </div>
  </div>
</template>

<script>
// import GSignInButton from 'vue-google-signin-button'
import server from '@/api/server.js'
import Swal from 'sweetalert2'

export default {
  components: {
    // GSignInButton
  },
  data () {
    return {
      googleSignInParams: {
        client_id:
          '921701842707-6i2o3c2bq7ogu6j6m4ovkh26ekuecgvv.apps.googleusercontent.com'
      },
      email_register: '',
      password_register: '',
      username_register: ''
    }
  },
  methods: {
    // onSignInSuccess (googleUser) {
    //   console.log('masuk login google')
    //   server
    //     .post('/login-google', {
    //       google_token: id_token
    //     })
    //     .then(({ data }) => {
    //       console.log(data, 'dapat data')
    //       localStorage.setItem('token', data.token)
    //       this.toHome(data)
    //     })
    //     .catch(err => {
    //       Swal.fire(
    //         'Opps ....!',
    //         `${err.response.data.message}`,
    //         'error'
    //       )
    //     })
    // },
    // onSignInError (error) {
    //   console.log('OH NOES', error)
    // },
    register () {
      server
        .post('/register', {
          username: this.username_register,
          email: this.email_register,
          password: this.password_register
        })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'New User Created!',
            text: `${data.message}`
          })
          this.$router.push('/login')
        })
        .catch(err => {
          Swal.fire(
            'Opps ....!',
            `${err.response.data.message.join(', ')}`,
            'error'
          )
        })
    },
    clearForm () {
      this.email_register = ''
      this.username_register = ''
      this.password_register = ''
    }
  }
}
</script>

<style>
</style>
