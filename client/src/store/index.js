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
    project: {},
    newMembers: [],
    isSearchingMember: false,
    loggedUser: {},
    weeklyTodos: []
  },
  mutations: {
    // mutations for project
    SET_WEEK_LIST (state, payload) {
      state.weeklyTodos = payload
      state.isLoading = false
    },
    SET_LOGGED_USER (state, user) {
      state.loggedUser = user
      state.isLoading = false
    },
    SET_NEW_MEMBERS (state, payload) {
      state.newMembers = payload
      state.isSearchingMember = true
    },
    SET_ADD_TODO_TO_PROJECT (state, payload) {
      state.project = payload
      state.project.date = moment(payload.dueDate).format('YYYY-M-D')
      state.project.time = moment(payload.dueDate).format('HH:mm')
    },
    SET_PROJECTS (state, payload) {
      state.projects = payload
    },
    // mutations for task
    SET_EDIT_TODO (state, payload) {
      state.editTodo = payload
      state.editTodo.date = moment(payload.dueDate).format('YYYY-M-D')
      state.editTodo.time = moment(payload.dueDate).format('HH:mm')
    },
    SET_TODAY_LIST (state, payload) {
      state.todayList = payload
      state.isLoading = false
    },
    SET_ISLOADING (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    // action for project
    async findUser ({
      commit,
      dispatch
    }) {
      commit('SET_ISLOADING', true)
      const {
        data
      } = await
      server.get('user', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      commit('SET_LOGGED_USER', data.user)
      commit('SET_ISLOADING', false)
    },
    async updateProject ({
      commit,
      dispatch,
      state
    }) {
      try {
        commit('SET_ISLOADING', true)
        const {
          data
        } = await server.put(`/project/${state.project._id}`, {
          title: state.project.title,
          dueDate: new Date(`${state.project.date} ${state.project.time}`),
          description: state.project.description
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        Swal.fire(
          'Updated!',
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
    async removeMemberFromProject ({
      commit,
      dispatch
    }, {
      memberId,
      projectId
    }) {
      commit('SET_ISLOADING', true)
      try {
        const {
          data
        } = await server.delete(`/project/${projectId}/remove/member/${memberId}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        Swal.fire(
          'Success!',
          `${data.message}`,
          'success'
        )
        dispatch('getAllProject')
      } catch (err) {
        Swal.fire({
          title: 'Ops...',
          icon: 'error',
          text: err.response.data.message
        })
        commit('SET_ISLOADING', false)
      }
    },
    async addMemberToProject ({
      commit,
      dispatch,
      state
    }, payload) {
      let {
        memberId,
        projectId
      } = payload
      commit('SET_ISLOADING', true)
      try {
        const {
          data
        } = await server.put(`/project/${projectId}/member`, {
          newMember: memberId
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
        commit('SET_NEW_MEMBERS', [])
        state.isSearchingMember = false
      }
    },

    async findMember ({
      commit
    }, newMember) {
      try {
        let {
          data
        } = await server.get(`/search/${newMember}`)
        commit('SET_NEW_MEMBERS', data)
      } catch (err) {
        Swal.fire({
          title: 'Ops...',
          icon: 'error',
          text: err.response.data.message
        })
      }
    },
    async deleteProject ({
      commit,
      dispatch
    }, project) {
      const confirm = await Swal.fire({
        title: 'Are you sure you want to delete this poject?',
        text: 'Deleting this project mean deleting all the tasks in this project, and you cant revert it!',
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
        } catch (err) {
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
    async createProject ({
      commit,
      dispatch
    }, project) {
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
    deleteTodoProject ({
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
    addTodoToProject ({
      commit,
      dispatch
    }, payload) {
      commit('SET_ISLOADING', true)
      server.put(`/project/${payload.projectId}/todo`, {
        title: payload.title,
        dueDate: payload.dueDate,
        description: payload.description
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
    getAllProject ({
      commit
    }) {
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

    // actions for todo
    getWeeklyTodo ({
      commit
    }) {
      commit('SET_ISLOADING', true)
      return server.get('/todo/week', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({
          data
        }) => {
          commit('SET_WEEK_LIST', data)
        })
        .catch(err => {
          Swal.fire({
            title: 'Ops...',
            icon: 'error',
            text: err.response.data.message
          })
        })
    },
    updateTodo ({
      commit,
      state,
      dispatch
    }) {
      commit('SET_ISLOADING', true)
      let url = `/todo/${state.editTodo._id}`
      if (state.editTodo.projectId) {
        url = `/project/${state.editTodo.projectId}/todo/${state.editTodo._id}`
      }
      server.put(url, {
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
          dispatch('getWeeklyTodo')
        })
    },
    deleteTodo ({
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
              dispatch('getWeeklyTodo')
            })
        }
      })
    },
    addTodo ({
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
          dispatch('getWeeklyTodo')
        })
    },
    updateTodoStatus ({
      commit,
      dispatch
    }, payload) {
      commit('SET_ISLOADING', true)
      let {
        status
      } = payload
      let update
      if (status === true) {
        update = false
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
          if (data.todo.status === false) {
            Swal.fire({
              title: 'Unchecked',
              icon: 'success',
              text: 'Unchecked task success'

            })
          } else {
            Swal.fire({
              title: 'Checked',
              icon: 'success',
              text: 'Task completed'

            })
          }
        })
        .catch(err => {
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
            dispatch('getWeeklyTodo')
          }
        })
    },
    getTodayList ({
      commit
    }) {
      commit('SET_ISLOADING', true)
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
          Swal.fire({
            title: 'Ops...',
            icon: 'error',
            text: err.response.data.message
          })
        })
    }
  },
  modules: {}
})
