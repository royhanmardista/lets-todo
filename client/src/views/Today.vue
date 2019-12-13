<template>
  <div>
    <div class="d-flex justify-content-between">
      <div d-flex >
        <div>
          <span class="h3 pr-2" style="font-family: 'Abril Fatface', cursive;">Today</span>
          <span class="text-seconday" style="font-size:0.7rem">{{moment().format("dddd, MMMM Do YYYY")}}</span>
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
