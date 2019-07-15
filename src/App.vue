<template>
  <div id="app">    
      <router-view name="nav" class="nav"></router-view>
      <router-view name="lists" class="lists"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
