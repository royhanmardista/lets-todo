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
    editTodo: {}
  },
  mutations: {
    SET_EDIT_TODO (state, payload) {
      state.editTodo = payload
      state.editTodo.date = moment(payload.dueDate).format('YYYY-M-D')
      state.editTodo.time = moment(payload.dueDate).format('hh:mm')
      console.log(state.editTodo.date, state.editTodo.time, payload.dueDate.slice(0, 'yyyy-mm-dd'.length))
    },
    SET_TODAY_LIST (state, payload) {
      console.log(state.isLoading, 'ini laman isLoading')
      state.todayList = payload
      state.isLoading = false
    },
    SET_ISLOADING (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    editTodo ({
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
                type: 'error',
                text: err.response.data.message
              })
            })
            .finally(() => {
              dispatch('getTodayList')
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
        })
    },
    updateTodoStatus ({
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
      server.patch(`/todo/${payload._id}/status`, {
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
            type: 'error',
            text: err.response.data.message
          })
        })
        .finally(() => {
          dispatch('getTodayList')
        })
    },
    getTodayList ({
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
