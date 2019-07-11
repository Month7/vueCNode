<template>
  <div class="all">
    <!-- <div class="loading" v-if="loading">
        <img src="../../static/loading.gif"/>
    </div> -->
    <div class="list" v-for="(list,index) in lists" :key="index">
      <div class="author">
        <div class="author-image">
          <router-link :to="{name:'userinfo',params:{loginname:list.author.loginname}}"><img :src="list.author.avatar_url"/></router-link>
        </div>
      </div>
			<div>
				<router-link :to="{name:'userinfo',params:{loginname:list.author.loginname}}">{{list.author.loginname}}</router-link>
			</div> 
      <div class="title">
        <router-link :to="{name:'article',params:{id:list.id}}">{{list.title}}</router-link>
      </div>
      <hr>
      <div class="count">
        <div>
          <i class="glyphicon glyphicon-eye-open"></i>{{list.visit_count}}
        </div>
      <div>
      	<i class="glyphicon glyphicon-comment"></i>{{list.reply_count}}
      </div>
      <div>
        <i class="glyphicon glyphicon-time"></i>{{list.create_at | filterTime}}
      </div>
      </div>
      </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    created(){
      this.dataPromise && this.dataPromise.then((data)=>{
        console.log('dataPromise调用');
      })
    },
    asyncData({store, router}){
      axios({
        url: `https://cnodejs.org/api/v1/topics`,
        method: 'get'
      }).then((res)=>{
        return store.dispatch('setData',res.data.data)
      })
    },
    data () {
      return {
	      mode: process.env.VUE_ENV,
        count: 2
      }
    },
    computed:{
      num(){
        return this.$store.state.num;
      },
      lists(){
        return this.$store.state.data;
      }
    },
    mounted(){
      localStorage.setItem('test','success');
    }
  }
</script>
<style scoped>
@import url('../assets/postlist.css');
</style>