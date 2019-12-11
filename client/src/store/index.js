import Vue from 'vue'
import Vuex from 'vuex'
import server from '@/api/server'
import Swal from 'sweetalert2'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todayList: [],
    isLoading: true,
    editTodo: {},
    projects: [],
    project: {}
  },
  mutations: {
    // mutations for project
    // SET_TODO_TO_PROJECT(state, palyload) {
    //   state.project.todos.push(payload)
    // },
    SET_ADD_TODO_TO_PROJECT(state, payload) {
      console.log('masuk SET_ADD_TODO_TO_PROJECT')
      state.project = payload
    },
    SET_PROJECTS(state, payload) {
      state.projects = payload
    },
    // mutations for task
    SET_EDIT_TODO(state, payload) {
      state.editTodo = payload
      state.editTodo.date = moment(payload.dueDate).format('YYYY-M-D')
      state.editTodo.time = moment(payload.dueDate).format('hh:mm')
      console.log(state.editTodo.date, state.editTodo.time, payload.dueDate.slice(0, 'yyyy-mm-dd'.length))
    },
    SET_TODAY_LIST(state, payload) {
      console.log(state.isLoading, 'ini laman isLoading')
      state.todayList = payload
      state.isLoading = false
    },
    SET_ISLOADING(state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    //action for project

    async deleteProject({
      commit,
      dispatch
    }, project) {
      console.log('masuk delete project')
      const confirm = await Swal.fire({
        title: 'Are you sure you want to delete this poject?',
        text: "Deleting this project mean deleting all the tasks in this project, and you cant revert it!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      if (confirm.value) {
        commit('SET_ISLOGIN', true)
        try {
          const {
            data
          } = await server.delete(`/project/${project._id}`, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          Swal.fire(
            'Success!',
            `${data.message}`,
            'success'
          )
        } catch(err) {
          Swal.fire({
            title: 'Ops...',
            icon: 'error',
            text: err.response.data.message
          })
        } finally {
          dispatch('getAllProject')
        }
      }
    },
    async createProject({
      commit,
      dispatch
    }, project) {
      console.log('masuk create project')
      let {
        title,
        dueDate,
        description
      } = project
      commit('SET_ISLOADING', true)
      try {
        const {
          data
        } = await server.post('/project', {
          title,
          dueDate,
          description
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        Swal.fire(
          'Success!',
          `${data.message}`,
          'success'
        )
      } catch (err) {
        Swal.fire({
          title: 'Ops...',
          icon: 'error',
          text: err.response.data.message
        })
      } finally {
        dispatch('getAllProject')
      }
    },
    deleteTodoProject({
      commit,
      dispatch
    }, todo) {
      Swal.fire({
        title: 'Are you sure you want to delete this task?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.value) {
          commit('SET_ISLOADING', true)
          server.put(`/project/${todo.projectId}/delete/todo/${todo._id}`, {}, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(({
              data
            }) => {
              Swal.fire(
                'Deleted!',
                `${data.message}`,
                'success'
              )
            })
            .catch(err => {
              Swal.fire({
                title: 'Ops...',
                icon: 'error',
                text: err.response.data.message
              })
            })
            .finally(() => {
              dispatch('getAllProject')
            })
        }
      })
    },
    addTodoToProject({
      commit,
      dispatch
    }, payload) {
      console.log('masuk addTodoToProject', payload)
      commit('SET_ISLOADING', true)
      server.put(`/project/${payload.projectId}/todo`, {
          title: payload.title,
          dueDate: payload.dueDate,
          description: payload.description,
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          Swal.fire(
            'Success!',
            `${data.message}`,
            'success'
          )
        })
        .catch(err => {
          if (Array.isArray(err.response.data.message)) {
            Swal.fire({
              title: 'Ops...',
              icon: 'error',
              text: err.err.response.data.message.join(', ')
            })
          } else {
            Swal.fire({
              title: 'Ops...',
              icon: 'error',
              text: err.response.data.message
            })
          }
        })
        .finally(() => {
          dispatch('getAllProject')
        })
    },
    getAllProject({
      commit,
    }) {
      console.log('masuk get all projects')
      commit('SET_ISLOADING', true)
      server.get(`/project`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          commit('SET_PROJECTS', data)
          commit('SET_ISLOADING', false)
        })
        .catch(err => {
          Swal.fire({
            title: 'Ops...',
            icon: 'error',
            text: err.response.data.message
          })
        })
    },

    //actions for todo

    editTodo({
      commit,
      state,
      dispatch
    }) {
      commit('SET_ISLOADING', true)
      server.put(`/todo/${state.editTodo._id}`, {
          title: state.editTodo.title,
          dueDate: new Date(`${state.editTodo.date} ${state.editTodo.time}`),
          description: state.editTodo.description
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          Swal.fire(
            'Updated!',
            `${data.message}`,
            'success'
          )
        })
        .catch(err => {
          Swal.fire({
            title: 'Ops...',
            icon: 'error',
            text: err.response.data.message
          })
        })
        .finally(() => {
          dispatch('getTodayList')
        })
    },
    deleteTodo({
      commit,
      dispatch
    }, todo) {
      Swal.fire({
        title: 'Are you sure you want to delete it?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.value) {
          commit('SET_ISLOADING', true)
          server.delete(`/todo/${todo._id}`, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(({
              data
            }) => {
              Swal.fire(
                'Deleted!',
                `${data.message}`,
                'success'
              )
            })
            .catch(err => {
              Swal.fire({
                title: 'Ops...',
                icon: 'error',
                text: err.response.data.message
              })
            })
            .finally(() => {
              dispatch('getTodayList')
            })
        }
      })
    },
    addTodo({
      commit,
      dispatch
    }, payload) {
      commit('SET_ISLOADING', true)
      server
        .post(
          '/todo', {
            title: payload.title,
            dueDate: payload.dueDate,
            description: payload.description
          }, {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(({
          data
        }) => {
          Swal.fire('Add Todo Success!', `${data.message}`, 'success')
        })
        .catch(err => {
          Swal.fire(
            'Opps ....!',
            `${err.response.data.message.join(', ')}`,
            'error'
          )
        })
        .finally(() => {
          dispatch('getTodayList')
        })
    },
    updateTodoStatus({
      commit,
      dispatch
    }, payload) {
      commit('SET_ISLOADING', true)
      console.log('masuk update status', payload)
      let {
        status
      } = payload
      console.log(status)
      let update
      if (status == true) {
        update = 'false'
      } else {
        update = true
      }
      let url = `/todo/${payload._id}/status`
      if (payload.projectId) {
        url = `/project/${payload.projectId}/status/${payload._id}`
      }
      server.patch(url, {
          status: update
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          if (data.todo.status == false) {
            Swal.fire({
              title: 'Unchecked',
              icon: 'error',
              text: 'Unchecked todo success'

            })
          } else {
            Swal.fire({
              title: 'Checked',
              icon: 'success',
              text: 'Todo completed success'

            })
          }
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            title: 'Ops...',
            icon: 'error',
            text: err.response.data.message
          })
        })
        .finally(() => {
          if (payload.projectId) {
            dispatch('getAllProject')
          } else {
            dispatch('getTodayList')
          }
        })
    },
    getTodayList({
      commit
    }) {
      commit('SET_ISLOADING', true)
      console.log('masuk get today list')
      return server.get('/todo', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          commit('SET_TODAY_LIST', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {}
})
