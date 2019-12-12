<template>
  <div>
    <div v-if="isLoading">
      <div class="d-flex justify-content-center mb-3">
        <b-spinner style="width: 3rem; height: 3rem;" variant="primary" label="Spinning"></b-spinner>
      </div>
    </div>
    <div v-if="!isLoading" class="container-fluid">
      <div class="row">
        <div v-if="!todayList.length">
          <p>You have no task today ...</p>
        </div>
        <div
          class="text-center text-dark col-md-3 col-sm-6 col-6 p-0 mb-2"
          id="todoContainer"
          :class="{'border-danger' : !todo.status, 'border-success' : todo.status}"
          v-for="todo in todayList"
          :key="todo._id"
        >
          <div
            class="card-header text-white mx-1 rounded mt-2"
            :class="{'bg-danger' : !todo.status, 'bg-success' : todo.status}"
          >
            <div
              style="font-family: 'Bree Serif', serif; font-size:0.9rem"
            >{{todo.title.toUpperCase()}}</div>
          </div>
          <div
            class="card-body border mt-1 mx-1 rounded p-2"
            :class="{'border-danger' : !todo.status, 'border-success' : todo.status}"
          >
            <div class="d-flex justify-content-between mb-2">
              <div class :class="{'text-success' : todo.status, 'text-danger' : !todo.status}">
                <i
                  :class="{'fa fa-calendar-times-o' : !todo.status, 'fa fa-calendar-check-o' : todo.status}"
                ></i>
                {{new Date(todo.doneDate || todo.dueDate).toLocaleDateString('en-US')}}
              </div>
              <div :class="{'text-success' : todo.status, 'text-danger' : !todo.status}">
                <i class="fa fa-clock-o"></i>
                {{new Date(todo.doneDate || todo.dueDate).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}}
              </div>
            </div>
            <p
              style="min-height:100px; text-align:justify !important"
              class="card-text border-top border-bottom py-2"
            >{{todo.description}}</p>
            <div class="d-flex justify-content-between">
              <button
                v-b-popover.hover.top="'complete/uncomplete task'"
                :class="{'btn btn-outline-success mr-1' : !todo.status, 'btn btn-outline-danger mr-1' : todo.status}"
                @click.prevent="completeTodo(todo)"
              >
                <i :class="{'fa fa-check' : !todo.status, 'fa fa-times' : todo.status}"></i>
              </button>
              <button
                v-b-modal.modal-update-todo
                v-b-popover.hover.top="'edit task'"
                class="btn btn-outline-info mr-1"
                @click.prevent="showEditModal(todo)"
              >
                <i class="fa fa-pencil"></i>
              </button>

              <button
                v-b-popover.hover.top="'delete task'"
                class="btn btn-outline-danger mr-1"
                @click.prevent="deleteTodo(todo)"
              >
                <i class="fa fa-trash-o"></i>
              </button>
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
import { mapState } from "vuex";
import UpdateTodoModal from "@/components/UpdateTodoModal.vue";

export default {
  components: {
    UpdateTodoModal
  },
  name: "Todo",
  computed: {
    ...mapState(["todayList", "isLoading"])
  },
  data() {
    return {};
  },
  methods: {
    showEditModal(todo) {
      this.$store.commit("SET_EDIT_TODO", todo);
    },
    getTodoToday() {
      this.$store.dispatch("getTodayList");
    },
    async completeTodo(todo) {
      await this.$store.dispatch("updateTodoStatus", todo);
    },
    async deleteTodo(todo) {
      await this.$store.dispatch("deleteTodo", todo);
    },
    async updateTodo(todo) {
      await this.$store.dispatch("updateTodo", todo);
    }
  },
  created() {
    this.getTodoToday();
  },
  beforeRouteEnter(to, from, next) {
    this.getTodoToday();
    next();
  }
};
</script>

<style>
</style>
