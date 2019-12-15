<template>
  <div>
    <div class="container-fluid bodycolor">
      <div class="row mt-4">
        <div class="col-md-6 col-sm-12 mt-4">
          <img class="w-100" src="@/assets/frontpage.svg" alt />
        </div>
        <div class="col-md-6 col-sm-12 text-dark p-4 text-center">
          <div class="d-flex flex-column">
            <div
              class="h2"
              style="font-family: 'Francois One', sans-serif;"
            >Let's Todo lets you work more collaboratively and get more done..</div>
            <div
              class="h6"
              style="font-family: 'News Cycle', sans-serif;"
            >Let's Todo's projects, lists, and cards enable you to organize and prioritize your todo in a fun, flexible, and rewarding way.</div>
          </div>
          <button @click="toRegisterPage" class="btn btn-sm btn-outline-warning mt-3">Get Started</button>
        </div>
      </div>
    </div>
    <FooterItem style="margin-top: calc(100vh - 600px) !important"></FooterItem>
  </div>
</template>

<script>
import FooterItem from '@/components/Footer.vue'

export default {
  components: {
    FooterItem
  },
  data () {
    return {}
  },
  methods: {
    toRegisterPage () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>

</style>
