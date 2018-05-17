<template>
  <div class="header">
      <router-link :to="{name:'all'}" @click.native="change('all')" :class="{active:clicked == 'all'}">全部</router-link>
      <router-link :to="{name:'good'}" @click.native="change('good')" :class="{active:clicked == 'good'}">精华</router-link>
      <router-link :to="{name:'share'}" @click.native="change('share')" :class="{active:clicked == 'share'}">分享</router-link>
      <router-link :to="{name:'ask'}" @click.native="change('ask')" :class="{active:clicked == 'ask'}">问答</router-link>
      <router-link :to="{name:'test'}" @click.native="change('test')" :class="{active:clicked == 'test'}">测试</router-link>
      <router-link :to="{name:'job'}" @click.native="change('job')" :class="{active:clicked == 'job'}">招聘</router-link>
  </div>
</template>
<script>
export default {
  name:'Header',
  data(){
    return {
      clicked:'all'
    }
  },
  methods:{
    change(type){
      this.clicked = type;
    }
  },
}
</script>
<style scoped>
  .header{
    background: rgb(68,68,68);
    height: 5rem;
    width: 100%;
    display: flex;
    padding: 0;
  } 
  a{
    text-decoration: none;
    color: #fff;
    padding: 1rem;
    line-height: 3rem;
    margin: 0;
    width: 16%;
  }
  .active{
    background: gray;
  }
</style>
