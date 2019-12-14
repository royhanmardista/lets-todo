<template>
  <div>
    <div class="d-flex justify-content-between ml-4">
        <div class="d-flex flex-column">
          <span class="h3 pr-1" style="font-family: 'Abril Fatface', cursive;">Overdue Task</span>
          <span class="text-seconday" style="font-size:0.7rem">{{moment().format("dddd, MMMM Do YYYY")}}</span>
        </div>
      <div>        
      </div>
    </div>
    <OverdueTodo></OverdueTodo>
  </div>
</template>

<script>
import OverdueTodo from '@/components/OverdueTodo.vue'

export default {
  components: {
    OverdueTodo
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
