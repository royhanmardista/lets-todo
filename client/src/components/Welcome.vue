<template>
  <div>
    <h3 v-if="!isLoading" class="ml-4">Hey, {{loggedUser.username}}</h3>
    <div class="container mt-4">
      <div class="row ml-1">
        <div class="container">
          <h5 style="font-family: 'Fredoka One', cursive;">Welcome to Let's Todo</h5>
          <div class="row">
            <div
              class="card col-md-5 col-12 m-2 pt-5 btn btn-outline-primary"
              @click.prevent="toToday"
            >
              <img class="w-100" src="@/assets/createTask.svg" alt srcset />
              create task
            </div>
            <div
              class="card col-md-5 col-12 m-2 p-1 btn btn-outline-primary"
              @click.prevent="toProject"
            >
              <img class="w-100" src="@/assets/createProject.svg" alt srcset />
              create project
            </div>
          </div>
          <div class="d-flex justify-content-center">
              <p
                class="text-center"
                style="font-family: 'Abril Fatface', cursive;"
              >"Time is the most valuable thing a man can spend". – Theophrastus</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['loggedUser', 'isLoading'])
  },
  methods: {
    toToday () {
      this.$router.push('/home/today')
    },
    toProject () {
      this.$router.push('/home/project')
    }
  },
  creted () {
    this.$store.dispatch('findUser')
  }
}
</script>

<style>
</style>
