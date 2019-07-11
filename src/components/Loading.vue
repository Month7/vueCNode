<template>
  <div class="loading">
    <img src="../../static/loading.gif" alt="loading动画" />
  </div>
</template>
<script>
export default {
  name: 'Loading'
}
</script>
<style>
.loading{
  width: 100%;
  height: 100%;
  background: #fff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 5rem;
}
</style>
