<template>
  <div>
    <div class="d-flex justify-content-between">
      <div d-flex >
        <div>
          <h3>Today</h3>
        </div>
        <div>
          <p style="font-size:0.8rem">{{moment().format("dddd, MMMM Do YYYY")}}</p>
        </div>
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
