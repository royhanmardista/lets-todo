<template>
  <div>
    <b-modal
      id="modal-add-member"
      ref="modal"
      title="Add New Member To Your Project"
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
        <b-form-group label="Email" label-for="email-input" invalid-feedback="title is required" aria-placeholder="input email or username">
          <b-form-input id="email-input" v-model="title" type="text" required></b-form-input>
        </b-form-group>
        <!-- title end  -->
        <!-- date -->
        <b-form-group label="Time" label-for="date-input" invalid-feedback="date is required">
          <div class="d-flex justify-content-between">
            <b-form-input id="date-input" v-model="date" class="ml-1" type="date" required></b-form-input>
            <b-form-input id="time-input" v-model="time" class="ml-1" type="time" required></b-form-input>
          </div>
        </b-form-group>
        <!-- date end -->
        <!-- description start -->
        <b-form-group
          label="Description"
          label-for="description-input"
          invalid-feedback="description is required"
        >
          <b-form-textarea id="description-input" v-model="description" type="area" required></b-form-textarea>
        </b-form-group>
        <!-- description end -->
      </form>
    </b-modal>
  </div>
</template>

<script>

export default {
  components: {},
  created () {},
  data () {
    return {
      title: '',
      date: '',
      description: '',
      time: ''
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid ? 'valid' : 'invalid'
      return valid
    },
    resetModal () {
      this.title = ''
      this.date = ''
      this.description = ''
      this.time = ''
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      if (!this.checkFormValidity()) {
        return
      }
      let data = {
        title: this.title,
        dueDate: new Date(`${this.date} ${this.time}`),
        description: this.description
      }
      this.$store.dispatch('addTodo', data)
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  }
}
</script>

<style scoped>

</style>
