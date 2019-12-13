<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {

  },
  created () {
  }
}
</script>
<style>
.btn {
  font-family: 'Merriweather Sans', sans-serif;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: darkslategray;
}

#nav a.router-link-exact-active {
  color: #e7661b;
}

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
  color : rgb(233, 245, 244);
  text-decoration: none !important;
}

a:hover {
  color :deepskyblue
}

h3, h4 {
  font-family: 'Abril Fatface', cursive;
}

ul {
  list-style-type: none;
}


</style>
