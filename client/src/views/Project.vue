<template>
  <div class="ml-4">
    <div v-if="isLoading">
      <div class="d-flex justify-content-center mb-3">
        <b-spinner style="width: 3rem; height: 3rem;" variant="primary" label="Spinning"></b-spinner>
      </div>
    </div>
    <div v-if="!isLoading">
      <div class="d-flex justify-content-between">
        <div>
          <h3>All Projects</h3>
          <p>You have {{projects.length}} projects in total</p>
        </div>
        <div>
          <b-button variant="outline-success" size="sm" v-b-modal.modal-create-project>
            <i class="fa fa-plus-circle"></i> Add Project
          </b-button>
        </div>
      </div>
      <div v-if="!projects.length">
        <div class="container">
          <div class="row">
            <div class="col-12 com-md-12 col-sm-12">
              <img class="w-100" src="@/assets/emptyProject.svg" />
              <p class="text-center" style="font-family: 'Abril Fatface', cursive;">
                “Yesterday is gone. Tomorrow has not yet come. We have only today. Let us begin.”
                ― Mother Theresa
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row border-bottom pt-2" v-for="project in projects" :key="project._id">
        <div class="d-flex justify-content-between w-100">
          <div class="d-flex flex-column">
            <div class="d-flex">
              <i class="fa fa-dot-circle-o mr-1 mt-1"></i>
              <h3 class="projectlist" v-b-toggle="project._id">{{project.title}}</h3>
            </div>
            <p
              class="ml-4"
              style="font-size:0.7rem"
            >{{moment(project.dueDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
          </div>
          <div class="d-flex justify-content-between">
            <div class="btn text-secondary" v-b-toggle="'member'+project._id">
              <p style="font-size:0.8rem">
                <i class="fa fa-users"></i>
                {{project.members.length}} members
              </p>
            </div>
            <div class="dropleft">
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
                  v-b-modal.modal-add-todo-to-project
                  @click.prevent="showAddTodoToProject(project)"
                >
                  <i class="fa fa-plus-square"></i> Add Task
                </button>
                <button
                  class="dropdown-item"
                  v-b-modal.modal-update-project
                  @click.prevent="showAddTodoToProject(project)"
                >
                  <i class="fa fa-pencil"></i> Edit project
                </button>
                <button class="dropdown-item" v-b-toggle="'addMember'+project._id">
                  <i class="fa fa-user"></i> Add Member
                </button>
                <button
                  v-if="!(project.user._id == loggedUser._id)"
                  class="dropdown-item"
                  @click.prevent="quitProject(project)"
                >
                  <i class="fa fa-share-square-o"></i> Quit Project
                </button>
                <button class="dropdown-item" @click.prevent="deleteProject(project)">
                  <i class="fa fa-trash"></i> Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- project member container -->
        <b-collapse :visible="true" :id="project._id" class="container-fluid">
          <!-- search member -->
          <b-collapse :id="'addMember'+project._id">
            <h6 style="cursor:pointer" v-b-toggle="'addMember'+project._id">AddMembers</h6>
            <b-form @submit.prevent="findMember" class="mb-2 w-50">
              <b-input
                v-model="newMember"
                type="text"
                aria-describedby="password-help-block"
                placeholder="Search email or username ..."
              ></b-input>
            </b-form>
            <!-- new member card -->
            <div v-if="isSearchingMember">
              <p v-if="!newMembers.length">No member found ....</p>
              <div class="row mb-3">
                <b-collapse
                  :visible="true"
                  :id="'member'+project._id"
                  class="col-md-4 col-sm-12 col-12"
                  v-for="member in newMembers"
                  :key="member._id"
                >
                  <div class="container-fluid border rounded p-2 mb-1">
                    <div class="row d-flex justify-content-between">
                      <div class="col-md-3 col-2 col-sm-2 pl-3 pr-0 d-flex" style="height:3rem">
                        <b-img :src="member.photo" class="w-100 rounded" alt rounded="circle"></b-img>
                      </div>
                      <div
                        class="col-md-7 col-8 col-sm-8 hideOverflow d-flex flex-column justify-content-between"
                        style="font-size:0.9rem"
                      >
                        <div style="font-weight: bold">{{member.username}}</div>
                        <div>{{member.email}}</div>
                      </div>
                      <div
                        class="col-md-2 col-2 col-sm-2 d-flex flex-column justify-content-center btn"
                        v-b-popover.hover.top="'add member to project'"
                        @click.prevent="addMember(member._id, project._id)"
                      >
                        <i class="fa fa-plus-circle"></i>
                      </div>
                    </div>
                  </div>
                </b-collapse>
              </div>
            </div>
            <!-- new member end -->
          </b-collapse>
          <!-- search member end -->

          <h6 style="cursor:pointer" v-b-toggle="'member'+project._id">Members</h6>
          <!-- member card start -->
          <div class="row mb-3">
            <b-collapse
              :visible="true"
              :id="'member'+project._id"
              class="col-md-4 col-sm-12 col-12"
              v-for="member in project.members"
              :key="member._id"
            >
              <div class="container-fluid border rounded p-2 mb-1">
                <div class="row d-flex justify-content-between">
                  <div class="col-md-3 col-2 col-sm-2 pl-3 pr-0 d-flex" style="height:3rem">
                    <b-img :src="member.photo" class="w-100 rounded" alt rounded="circle"></b-img>
                  </div>
                  <div
                    class="col-md-7 col-8 col-sm-8 hideOverflow d-flex flex-column justify-content-between"
                    style="font-size:0.9rem"
                  >
                    <div style="font-weight: bold">{{member.username}}</div>
                    <div>{{member.email}}</div>
                  </div>
                  <div
                    class="col-md-2 col-2 col-sm-2 d-flex flex-column justify-content-center btn"
                    v-b-popover.hover.top="'remove member'"
                    id="deleteMember"
                    @click.prevent="removeMember(member._id, project._id)"
                  >
                    <i class="fa fa-trash-o"></i>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
          <!-- member card end -->
          <h6 style="cursor:pointer" v-b-toggle="'task'+project._id" class="mb-1">Tasks</h6>

          <div class="row mb-3 ml-1 mt-2">
            <div v-if="!project.todos.length">
              <p class="ml-3">You have no task in this project ...</p>
            </div>
            <!-- todos card start -->
            <b-collapse
              :visible="true"
              :id="'task'+project._id"
              class="text-center text-dark col-md-3 offset-md-0 col-sm-10 offset-sm-1 col-xs-10 offset-xs-1 p-0 mb-2"
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
                <div
                  class="d-flex justify-content-between mb-3 pt-3 border-top"
                  style="font-size:0.9rem"
                >
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
                  style="min-height:150px; text-align:justify !important"
                  class="card-text border-top border-bottom py-2 text-white"
                >{{todo.description}}</p>
                <div class="d-flex justify-content-between">
                  <a
                    v-b-popover.hover.top="'complete/uncomplete task'"
                    class="text-white"
                    @click.prevent="completeTodoProject(todo)"
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
                    @click.prevent="deleteTodoProject(todo)"
                  >
                    <i class="fa fa-trash-o"></i>
                  </a>
                </div>
              </div>
            </b-collapse>
            <!-- end card -->
          </div>
          <div class="d-flex justify-content-center">
            <p style="font-family: 'Abril Fatface', cursive;">" {{project.description}} "</p>
          </div>
        </b-collapse>
      </div>
    </div>
    <UpdateTodoModal></UpdateTodoModal>
    <AddTodoToProject></AddTodoToProject>
    <CreateProjectModal></CreateProjectModal>
    <UpdataProjectModal></UpdataProjectModal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UpdateTodoModal from '@/components/UpdateTodoModal.vue'
import CreateProjectModal from '@/components/CreateProjectModal.vue'
import AddTodoToProject from '@/components/AddTodoToProject.vue'
import UpdataProjectModal from '@/components/UpdataProjectModal.vue'

export default {
  components: {
    UpdateTodoModal,
    AddTodoToProject,
    CreateProjectModal,
    UpdataProjectModal
  },
  name: 'Todo',
  computed: {
    ...mapState([
      'projects',
      'isLoading',
      'newMembers',
      'isSearchingMember',
      'loggedUser'
    ])
  },
  data () {
    return {
      newMember: ''
    }
  },
  methods: {
    async quitProject (project) {
      await this.$store.dispatch('quitProject', project)
    },
    async removeMember (memberId, projectId) {
      await this.$store.dispatch('removeMemberFromProject', {
        memberId,
        projectId
      })
    },
    async addMember (memberId, projectId) {
      this.newMember = ''
      await this.$store.dispatch('addMemberToProject', { memberId, projectId })
    },
    async findMember () {
      await this.$store.dispatch('findMember', this.newMember)
    },
    async deleteProject (project) {
      await this.$store.dispatch('deleteProject', project)
    },
    showAddTodoToProject (project) {
      this.$store.commit('SET_ADD_TODO_TO_PROJECT', project)
    },
    showEditModal (todo) {
      this.$store.commit('SET_EDIT_TODO', todo)
    },
    getTodoToday () {
      this.$store.dispatch('getTodayList')
    },
    async completeTodoProject (todo) {
      await this.$store.dispatch('updateTodoStatus', todo)
    },
    async deleteTodoProject (todo) {
      await this.$store.dispatch('deleteTodoProject', todo)
    },
    async updateTodo (todo) {
      await this.$store.dispatch('updateTodo', todo)
    }
  },
  created () {}
}
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
  background-color: #3ddc97 !important;
}

#todoCard i:hover {
  color: rgb(27, 87, 199) !important;
}
</style>
