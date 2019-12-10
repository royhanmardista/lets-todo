<template>
  <div>
    <div class="d-flex justify-content-between">
      <div>
        <h3>Today</h3>
        <p>{{moment().format("dddd, MMMM Do YYYY")}}</p>
      </div>
      <div>
        <button class="btn btn-outline-danger" @click="$bvModal.show('modal-add-todo')">
          <i class="fa fa-plus-circle"></i> Add Task
        </button>
        <AddTodoModal></AddTodoModal>
      </div>
    </div>
    <Todo></Todo>
  </div>
</template>

<script>
import AddTodoModal from '@/components/AddTodoModal.vue'
import Todo from '@/components/Todo.vue'

export default {
  components: {
    AddTodoModal,
    Todo
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
