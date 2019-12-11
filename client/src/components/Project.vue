<template>
  <div>
    <div v-if="isLoading">
      <div class="d-flex justify-content-center mb-3">
        <b-spinner style="width: 3rem; height: 3rem;" variant="primary" label="Spinning"></b-spinner>
      </div>
    </div>
    <div v-if="!isLoading" class="container-fluid">
      <h3>All Projects</h3>
      <p>You have {{projects.length}} projects in total</p>
      <div class="row border-bottom pt-2" v-for="project in projects" :key="project._id">
        <div class="d-flex justify-content-between w-100">
          <h5 class="btn projectlist" v-b-toggle="project._id">
            <i class="fa fa-dot-circle-o"></i>
            {{project.title}}
          </h5>
          <div class="d-flex justify-content-between">
            <div class="btn text-secondary" v-b-toggle="'member'+project._id">
              <p style="font-size:0.8rem">
                <i class="fa fa-users"></i>
                {{project.members.length}} members
              </p>
            </div>
            <div class="dropdown">
              <button
                class="btn"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fa fa-ellipsis-v"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button
                  class="dropdown-item"
                  href
                  v-b-modal.modal-add-todo-to-project
                  @click.prevent="showAddTodoToProject(project)"
                >
                  <i class="fa fa-plus-square"></i> Add Task
                </button>
                <a class="dropdown-item" href="#">
                  <i class="fa fa-pencil"></i> Edit project
                </a>
                <a class="dropdown-item" href="#">
                  <i class="fa fa-user"></i> Add Member
                </a>

                <a class="dropdown-item" href="#">
                  <i class="fa fa-trash"></i> Delete Project
                </a>
              </div>
            </div>
          </div>
        </div>

        <b-collapse :visible="true" :id="project._id" class="container-fluid">
          <!-- member card start -->
          <h6>Members</h6>
          <div class="row mb-3">
            <b-collapse
              :visible="true"
              :id="'member'+project._id"
              class="col-md-4 col-sm-12 col-12"
              v-for="member in project.members"
              :key="member._id"
            >
              <div class="container-fluid border rounded p-2 mb-1">
                <div class="row">
                  <div class="col-md-3 col-3 d-flex flex-col pr-0">
                    <b-img :src="member.photo" class="w-100 rounded" alt rounded="circle"></b-img>
                  </div>
                  <div class="col-md-7 col-7 col-sm-7 hideOverflow" style="font-size:0.9rem">
                    <div style="font-weight: bold">{{member.username}}</div>
                    <div>{{member.email}}</div>
                  </div>
                  <div
                    class="col-md-1 col-1 col-sm-1 btn d-flex"
                    v-b-popover.hover.top="'remove member'"
                    id="deleteMember"
                  >
                    <i class="fa fa-trash-o"></i>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
          <h6 class="mb-1">Tasks</h6>
          <!-- member card end -->
          <div class="row mb-3">
            <div v-if="!project.todos.length">
              <p class="ml-3">You have no task in this project ...</p>
            </div>
            <!-- todos card start -->
            <div
              class="text-center text-dark col-md-3 col-sm-6 col-6 p-0 mb-2"
              id="todoContainer"
              v-for="todo in project.todos"
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
                <div class="d-flex justify-content-between mb-3 pt-3 border-top">
                  <div class :class="{'text-dark' : todo.status, 'text-warning' : !todo.status}">
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
                  style="min-height:100px; text-align:justify !important"
                  class="card-text border-top border-bottom py-2 text-white"
                >{{todo.description}}</p>
                <div class="d-flex justify-content-between">
                  <button
                    v-b-popover.hover.top="'complete/uncomplete task'"
                    :class="{'btn btn-success mr-1' : !todo.status, 'btn btn-danger mr-1' : todo.status}"
                    @click.prevent="completeTodoProject(todo)"
                  >
                    <i :class="{'fa fa-check' : !todo.status, 'fa fa-times' : todo.status}"></i>
                  </button>
                  <button
                    v-b-modal.modal-update-todo
                    v-b-popover.hover.top="'edit task'"
                    class="btn btn-info mr-1"
                    @click.prevent="showEditModal(todo)"
                  >
                    <i class="fa fa-pencil"></i>
                  </button>

                  <button
                    v-b-popover.hover.top="'delete task'"
                    class="btn btn-danger mr-1"
                    @click.prevent="deleteTodoProject(todo)"
                  >
                    <i class="fa fa-trash-o"></i>
                  </button>
                </div>
              </div>
            </div>
            <!-- end card -->
          </div>
        </b-collapse>
      </div>
    </div>
    <UpdateTodoModal></UpdateTodoModal>
    <AddTodoToProject></AddTodoToProject>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UpdateTodoModal from "@/components/UpdateTodoModal.vue";
// modal-add-todo-to-project
import AddTodoToProject from "@/components/AddTodoToProject.vue";

export default {
  components: {
    UpdateTodoModal,
    AddTodoToProject
  },
  name: "Todo",
  computed: {
    ...mapState(["projects", "isLoading"])
  },
  data() {
    return {};
  },
  methods: {
    showAddTodoToProject(project) {
      this.$store.commit("SET_ADD_TODO_TO_PROJECT", project);
    },
    showEditModal(todo) {
      this.$store.commit("SET_EDIT_TODO", todo);
    },
    getTodoToday() {
      this.$store.dispatch("getTodayList");
    },
    async completeTodoProject(todo) {
      await this.$store.dispatch("updateTodoStatus", todo);
    },
    async deleteTodoProject(todo) {
      await this.$store.dispatch("deleteTodoProject", todo);
    },
    async updateTodo(todo) {
      await this.$store.dispatch("updateTodo", todo);
    }
  },
  created() {
    this.getTodoToday();
  }
};
</script>

<style scoped>
.dropdown-item {
  color: rgb(6, 7, 1);
}
.projectlist {
  color: rgb(87, 74, 79);
  font-family: "Lilita One", cursive;
  font-size: 1.2rem;
}

.userphoto {
  border-radius: 50%;
}

.hideOverflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
  word-wrap: break-word;
}
#deleteMember:hover {
  color: red;
}

h6 {
  font-family: "Alatsi", sans-serif;
}

.uncomplete {
  background-color: #fe5f55;
}

.complete {
  background-color: #3DDC97 !important
}


</style>
