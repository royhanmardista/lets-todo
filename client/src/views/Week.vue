<template>
  <div class="ml-4">
    <div class="d-flex justify-content-between">
      <div d-flex>
        <div>
          <h3>Next 7 Days</h3>
        </div>
        <div>
          <p style="font-size:0.8rem">Here are all your task this week</p>
        </div>
      </div>
      <div>
        <b-button variant="outline-primary" size="sm" @click="$bvModal.show('modal-add-todo')">
          <i class="fa fa-plus-circle"></i> Add Task
        </b-button>
        <AddTodoModal></AddTodoModal>
      </div>
    </div>
    <WeeklyTodo></WeeklyTodo>
  </div>
</template>

<script>
import AddTodoModal from '@/components/AddTodoModal.vue'
import WeeklyTodo from '@/components/WeeklyTodo.vue'

export default {
  components: {
    AddTodoModal,
    WeeklyTodo
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
