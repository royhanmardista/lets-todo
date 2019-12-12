<template>
  <div>
    <b-modal
      id="modal-update-project"
      ref="modal"
      title="Update Your Project "
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form
        ref="form"
        @submit.stop.prevent="handleSubmit"
        style="font-family: 'Baloo Bhai', cursive;"
        class
      >
        <!-- title -->
        <b-form-group label="Title" label-for="title-input" invalid-feedback="title is required">
          <b-form-input id="title-input" v-model="project.title" type="text" required></b-form-input>
        </b-form-group>
        <!-- title end  -->
        <!-- date -->
        <b-form-group label="Time" label-for="date-input" invalid-feedback="date is required">
          <div class="d-flex justify-content-between">
            <b-form-input id="date-input" v-model="project.date" class="ml-1" type="date" required></b-form-input>
            <b-form-input id="time-input" v-model="project.time" class="ml-1" type="time" required></b-form-input>
          </div>
        </b-form-group>
        <!-- date end -->
        <!-- description start -->
        <b-form-group
          label="Description"
          label-for="description-input"
          invalid-feedback="description is required"
        >
          <b-form-textarea id="description-input" v-model="project.description" type="area" required></b-form-textarea>
        </b-form-group>
        <!-- description end -->
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['project'])
  },
  components: {},
  created () {
  },
  data () {
    return {

    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid ? 'valid' : 'invalid'
      return valid
    },
    resetModal () {
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      if (!this.checkFormValidity()) {
        return
      }
      this.$store.dispatch('updateProject')
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  }
}
</script>

<style scoped>

</style>
