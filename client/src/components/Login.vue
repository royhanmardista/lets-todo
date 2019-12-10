<template>
  <div class="container-fluid bodycolor pt-3">
    <div class="row">
      <div class="col-md-4 offset-md-4 col-sm-12" style="font-family: 'Alatsi', sans-serif;">
        <div class="d-flex justify-content-center">
          <img src="../assets/logo.gif" class="img-thumbnail" width="45" />
        </div>
        <h3 class="text-center text-dark">Login to your account</h3>
        <!-- form login -->
        <div class="col-sm-12 mt-3">
          <form
            id="login"
            class="border rounded p-3 shadow border mt-4"
            style="font-family: 'Solway', serif; font-size:0.8rem"
          >
            <h6 class="text-dark mb-4" style="font-family: 'Alatsi', sans-serif;">Sign up in seconds</h6>

            <div class="form-group">
              <label for="email_login">Email address</label>
              <input
                id="email_login"
                v-model="email_login"
                type="email"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                id="password_login"
                v-model="password_login"
                type="password"
                class="form-control"
                required
              />
            </div>
            <div class="form-inline" style="margin: 5px auto;">
              <button
                type="submit"
                class="btn btn-warning btn-sm btn-block mt-1"
                @click.prevent="login"
              >Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import server from '@/api/server.js'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      email_login: '',
      password_login: ''
    }
  },
  methods: {
    login () {
      server
        .post('/login', {
          email: this.email_login,
          password: this.password_login
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          Swal.fire(
            'Loggin Success!',
            `${data.message}`,
            'success'
          )
          this.$router.push('/home')
        })
        .catch(err => {
          Swal.fire(
            'Opps ....!',
            `${err.response.data.message}`,
            'error'
          )
        })
    },
    clearForm () {
      this.email_login = ''
      this.password_login = ''
    }
  }
}
</script>

<style>
</style>
