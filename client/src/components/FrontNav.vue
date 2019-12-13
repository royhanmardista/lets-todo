<template>
  <div class="frontpage">
    <div class="sticky-top">
      <nav
        class="navbarcolor navbar navbar-expand-md d-flex justify-content-between pt-1"
        style="font-family: 'Fredoka One', cursive;"
      >
        <div class="nav navbar d-flex justify-content-start ml-1">
          <router-link to="/" class="wordpress h2">
            <a class="navbar-brand nav-bar-title" >
              <img src="../assets/logo.gif" class="ml-md-4 mr-2 img-thumbnail" width="35" />Let's Todo
            </a>
          </router-link>
        </div>
        <b-navbar-toggle class target="nav-collapse">
          <i class="fa fa-align-justify"></i>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item class="nav-item ml-1" >
              <router-link class="btn btn-outline-light" to="/login" >
                <i class="fa fa-sign-in"></i> Login
              </router-link>
            </b-nav-item>
            <b-nav-item class="nav-item ml-1">
              <router-link to="/register" class="btn btn-outline-light">
                <i class="fa fa-user-plus"></i> Register
              </router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style>
.navbarcolor {
  background: rgb(58, 98, 180);
  background: linear-gradient(
    90deg,
    rgba(58, 98, 180, 1) 0%,
    rgba(148, 43, 15, 1) 0%,
    rgba(11, 42, 97, 1) 0%,
    rgba(211, 201, 194, 1) 0%,
    rgba(215, 215, 215, 1) 0%,
    rgba(202, 125, 79, 1) 0%,
    rgba(200, 141, 49, 1) 40%,
    rgba(192, 92, 39, 1) 74%,
    rgba(220, 35, 9, 1) 96%
  );
}

.navbar {
  padding: 0px;
}

a {
  cursor: pointer;
}
</style>
