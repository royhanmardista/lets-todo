<template>
  <div>
    <div class="d-flex justify-content-between ml-4">
        <div class="d-flex flex-column">
          <span class="h3 pr-1" style="font-family: 'Abril Fatface', cursive;">Completed Tasks</span>
          <span class="text-seconday" style="font-size:0.7rem">{{moment().format("dddd, MMMM Do YYYY")}}</span>
        </div>
      <div>
      </div>
    </div>
    <CompletedTodo></CompletedTodo>
  </div>
</template>

<script>
import CompletedTodo from '@/components/CompletedTodo.vue'

export default {
  components: {
    CompletedTodo
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
