<template>
  <div id="app">
    <router-view name="nav" class="nav"></router-view>
    <router-view name="lists" class="lists"></router-view>
    <cFooter></cFooter>
  </div>
</template>

<script>
  import cHeader from './components/Header.vue';
  import cFooter from './components/Footer.vue';
  export default {
    name: 'App',
    components:{
      cFooter
    }
  }
</script>

<style>
	html {
    background-color: #DDDDDD;
  }
  html,body,#app {
    height: 100%;
  }
  .nav{
    height: 40px;
    position: fixed;
    top:0;
    width: 100%;
  }
  .lists{
    overflow-x:auto;  
    overflow-y:scroll;  
    padding-top:5rem;
    background: #fff;
    padding-bottom: 4rem;
    height: 100%;
  }
  body,div,span,a,p,ul,li {
    margin: 0;
    /* padding: 0; */
  }
</style>