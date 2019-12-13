<template>
  <div class="frontpage">
    <div class="sticky-top">
      <nav
        class="navbarcolor navbar navbar-expand-md d-flex justify-content-between pt-1"
        style="font-family: 'Fredoka One', cursive;"
      >
        <div class="nav navbar d-flex justify-content-start">
          <router-link to="/home" class="h2">
            <a class="navbar-brand nav-bar-title">
              <img src="../assets/logo.gif" class="ml-md-4 mr-2 img-thumbnail" width="35" />Let's Todo
            </a>
          </router-link>
        </div>
        <ul class="nav justify-content-end navbar-nav">
          <li class="nav-item pr-3" id="logoutbutton">
            <a @click.prevent="logout">
              <i class="fa fa-sign-out"></i> Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="container-fluid">
      <div class="row mr-4">
        <div class="col-md-2 navbar-expand-md pt-4">
          <b-navbar-toggle class target="side-collapse">
            <i class="fa fa-align-justify"></i>
          </b-navbar-toggle>
          <b-collapse id="side-collapse" is-nav>
            <ul class="">
              <li class="mb-2">
                <router-link to="/home/today" >
                  <i class="fa fa-calendar-o"></i> Today
                </router-link>
              </li>
              <li class="mb-2">
                <router-link to="/home/week">
                  <i class="fa fa-calendar text-success"></i> Next 7 days
                </router-link>
              </li>
              <li class="mb-2">
                <div class="d-flex justify-content-between">
                  <router-link to="/home/project">
                    <i class="fa fa-list-ul text-warning"></i> Projects
                  </router-link>
                </div>
                <!-- Elements to collapse -->
              </li>
            </ul>
          </b-collapse>
        </div>
        <div class="col-md-10 pt-4 border-left" id="display">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isLoading', 'projects'])
  },
  data () {
    return {
      home: true
    }
  },
  methods: {
    async getAllProject () {
      await this.$store.dispatch('getAllProject')
    },
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/')
    },
    checkLoginStatus () {
      if (!localStorage.getItem('token')) {
        this.$router.push('/')
      }
    }
  },
  created () {
    this.checkLoginStatus()
    this.getAllProject()
    this.$store.dispatch('findUser')
  }
}
</script>

<style>
.addproject {
  color: cadetblue;
  cursor: pointer;
}

.addproject:hover {
  color: gold
}

#logoutbutton:hover {
  color: whitesmoke;
}

#logoutbutton {
  color: chartreuse;
}

a.router-link-exact-active {
  font-weight: bolder;
}

.navbar {
  padding: 0px;
}

#display {
  min-height: 600px;
}
</style>
