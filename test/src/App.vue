<template>
  <div id="app">
    <input>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{text}}
    <input>
    <input>
    <input>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      text: ""
    };
  },
  mounted() {
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body{
  /* overflow: hidden; */
}
</style>
