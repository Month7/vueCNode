<template>
  <div class="loading">
    <img src="../../static/loading.gif" alt="加载中" />
  </div>
</template>
<script>
export default {
  name: 'Loading'
}
</script>
<style>
.loading{
  padding-top: 5rem;
  padding-bottom: 4rem;
  width: 100%;
  height: 100%;
  background: #fff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
