<template>
  <div id="nav">
    <a href="#">IoT_Final</a>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
*,
*::before,
*::after{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #f8f8ff;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
  padding: 0vh 5vw;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
