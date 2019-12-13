<template>
  <div>
    <div class="d-flex justify-content-between ml-4">
        <div class="d-flex flex-column">
          <span class="h3 pr-1" style="font-family: 'Abril Fatface', cursive;">Today</span>
          <span class="text-seconday" style="font-size:0.7rem">{{moment().format("dddd, MMMM Do YYYY")}}</span>
        </div>
      <div>
        <b-button variant="outline-primary" size="sm" @click="$bvModal.show('modal-add-todo')">
          <i class="fa fa-plus-circle"></i> Add Task
        </b-button>
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
