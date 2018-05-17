<template>
  <div class="footer">
      <router-link :to="{name:'index'}" @click.native="change('index')" :class="{active:clicked == 'index'}"><i class="glyphicon glyphicon-home"></i>首页</router-link>
      <router-link :to="{name:'publish'}" @click.native="change('publish')" :class="{active:clicked == 'publish'}"><i class="glyphicon glyphicon-pencil"></i>发布</router-link>
      <router-link :to="{name:'message'}" @click.native="change('message')" :class="{active:clicked == 'message'}"><i class="glyphicon glyphicon-envelope"></i>消息</router-link>
      <router-link :to="{name:'mine'}"  @click.native="change('mine')" :class="{active:clicked == 'mine'}"><i class="glyphicon glyphicon-user"></i>我的</router-link>
  </div>
</template>
<script>
export default {
  name:'Footer',
  data(){
      return {
          clicked:'index'
      }
  },
  methods:{
      change(data){
          this.clicked = data;
          console.log(this.clicked);
      }
  },
}
</script>
<style scoped>
    .active{
        color: red;
    }
    .footer{
        position: fixed;
        bottom: 0;
        text-align: center;
        background: #fff;
        height: 4rem;
        border-top:1px solid gray;
        width: 100%;
        
        display: flex;
    }
    i{
        display: block;
        margin: 0.2rem;
        padding: 0; 
    }
    a{
        padding-top:0.2rem;
        padding-bottom: 0.2rem;
        text-decoration: none;
        width: 25%;
        font-size: 1.4rem;
        padding: 0;
        color: black;
    }
</style>
