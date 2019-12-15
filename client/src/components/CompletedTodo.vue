<template>
  <div>
    <div v-if="isLoading">
      <div class="d-flex justify-content-center mb-3">
        <b-spinner style="width: 3rem; height: 3rem;" variant="primary" label="Spinning"></b-spinner>
      </div>
    </div>
    <div v-if="!isLoading" class="container-fluid">
      <div class="row mt-3 ml-3">
        <div v-if="!completedTodos.length" class="ml-1">
          <div class="container-fluid">
            <div class="row">
              <p
                class="ml-4"
                style="font-family: 'Arapey', serif;"
              >You haven't completed any tasks</p>
              <div class="col-12 com-md-12 col-sm-12">
                <img class="w-100" src="@/assets/emptycompleted.svg" />
                <p
                  class="text-center"
                  style="font-family: 'Abril Fatface', cursive;"
                >“Until we can manage time, we can manage nothing else.” – Peter Drucker.</p>
              </div>
            </div>
          </div>
        </div>
        <div
          :visible="true"
          class="text-center text-dark col-md-3 offset-md-0 col-sm-10 offset-sm-1 col-xs-10 offset-xs-1 p-0 mb-3"
          v-for="todo in completedTodos"
          :key="todo._id"
        >
          <div
            id="todoCard"
            class="card-body border mt-1 mx-1 rounded p-2 shadow"
            :class="{'uncomplete' : !todo.status, 'complete' : todo.status}"
          >
            <div
              class="card-text mx-1 p-2 mb-1"
              :class="{'text-white ' : !todo.status, 'text-white' : todo.status}"
            >
              <div
                style="font-family: 'Bree Serif', serif; font-size:0.9rem"
              >{{todo.title.toUpperCase()}}</div>
            </div>
            <div
              class="d-flex justify-content-between mb-3 pt-3 border-top"
              style="font-size:0.9rem"
            >
              <div :class="{'text-dark' : todo.status, 'text-warning' : !todo.status}">
                <i
                  :class="{'fa fa-calendar-times-o' : !todo.status, 'fa fa-calendar-check-o' : todo.status}"
                ></i>
                {{new Date(todo.doneDate || todo.dueDate).toLocaleDateString('en-US')}}
              </div>
              <div :class="{'text-dark' : todo.status, 'text-warning' : !todo.status}">
                <i class="fa fa-clock-o"></i>
                {{new Date(todo.doneDate || todo.dueDate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}}
              </div>
            </div>
            <p
              style="min-height:150px; text-align:justify !important"
              class="card-text border-top border-bottom py-2 text-white"
            >{{todo.description}}</p>
            <div class="d-flex justify-content-between">
              <a
                v-b-popover.hover.top="'complete/uncomplete task'"
                class="text-white"
                @click.prevent="completeTodo(todo)"
              >
                <i
                  :class="{'fa fa-check-circle todoUnclompleted' : !todo.status, 'fa fa-times-circle text-danger' : todo.status}"
                ></i>
              </a>
              <a
                v-b-modal.modal-update-todo
                v-b-popover.hover.top="'edit task'"
                @click.prevent="showEditModal(todo)"
              >
                <i class="fa fa-pencil-square-o text-dark"></i>
              </a>

              <a
                v-b-popover.hover.top="'delete task'"
                class="mr-1"
                @click.prevent="deleteTodo(todo)"
              >
                <i class="fa fa-trash-o"></i>
              </a>
            </div>
          </div>
        </div>
        <!-- end card -->
      </div>
    </div>
    <UpdateTodoModal></UpdateTodoModal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UpdateTodoModal from '@/components/UpdateTodoModal.vue'

export default {
  components: {
    UpdateTodoModal
  },
  name: 'completed',
  computed: {
    ...mapState(['completedTodos', 'isLoading'])
  },
  data () {
    return {}
  },
  methods: {
    showEditModal (todo) {
      this.$store.commit('SET_EDIT_TODO', todo)
    },
    getCompletedTodo () {
      this.$store.dispatch('getCompletedTodo')
    },
    async completeTodo (todo) {
      await this.$store.dispatch('updateTodoStatus', todo)
    },
    async deleteTodo (todo) {
      await this.$store.dispatch('deleteTodo', todo)
    },
    async updateTodo (todo) {
      await this.$store.dispatch('updateTodo', todo)
    }
  },
  created () {
    this.getCompletedTodo()
  }
}
</script>

<style>
.uncomplete {
  background-color: #fe5f55;
}

.complete {
  background-color: #3ddc97 !important;
}

#todoCard i:hover {
  color: rgb(27, 87, 199) !important;
}

.todoUnclompleted {
  color: #3ddc97 !important;
}
</style>
