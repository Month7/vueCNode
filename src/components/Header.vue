<template>
  <div class="header">
      <router-link :to="{name:'all',params:{tab:'all'}}" @click.native="change('all')" :class="{active:clicked == 'all'}">全部</router-link>
      <router-link :to="{name:'good',params:{tab:'good'}}" @click.native="change('good')" :class="{active:clicked == 'good'}">精华</router-link>
      <router-link :to="{name:'share',params:{tab:'share'}}" @click.native="change('share')" :class="{active:clicked == 'share'}">分享</router-link>
      <router-link :to="{name:'ask',params:{tab:'ask'}}" @click.native="change('ask')" :class="{active:clicked == 'ask'}">问答</router-link>
      <router-link :to="{name:'test',params:{tab:'dev'}}" @click.native="change('test')" :class="{active:clicked == 'test'}">测试</router-link>
      <router-link :to="{name:'job',params:{tab:'job'}}" @click.native="change('job')" :class="{active:clicked == 'job'}">招聘</router-link>
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
    /* background: rgb(4,170,224); */
    height: 5rem;
    width: 100%;
    display: flex;
    padding: 0;
    z-index: 99;
    background: #fff;
    border-bottom: 1px solid gray;
  } 
  a{
    text-decoration: none;
    color: black;
    padding: 1rem;
    line-height: 3rem;
    margin: 0;
    width: 16%;
  }
  .active{
    /* background: rgb(4,195,224); */
    border-bottom: solid 0.3rem rgb(4,195,224);
  }
</style>
