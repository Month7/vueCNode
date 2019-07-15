<template>
    <div class="all">

      <div class="list" v-for="(list,index) in lists" :key="index">
          <div class="author">
              <div class="author-image">
                  <router-link :to="{name:'userinfo',params:{loginname:list.author.loginname}}"><img :src="list.author.avatar_url"/></router-link>
              </div>
              <div>
                  <div>
                      <router-link :to="{name:'userinfo',params:{loginname:list.author.loginname}}">{{list.author.loginname}}</router-link>
                  </div>
              </div>
          </div>
          <div class="title">
              <router-link :to="{name:'article',params:{id:list.id}}">{{list.title}}</router-link>
          </div>
          <hr>
          <div class="count" @click="gotoDetail('article',{id:list.id})">
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
			<Footer status='index'></Footer>
  </div>
</template>
<script>
	import axios from 'axios';
	import Footer from './Footer'
  export default {
    name: 'PostList',
    mounted(){
     
		},
		components: {
			Footer
		},
    methods: {
      gotoDetail(name,params){
        this.$route.push({name: name,params: params})
      }
    },
    async asyncData({store, route}){
      let tab = route.query.tab || 'all'
      await axios({
        url: `https://cnodejs.org/api/v1/topics?tab=${tab}`,
        method: 'get',
      }).then((res)=>{
        return store.dispatch('setData',res.data.data)
      })
      return {store,route};
    },
    data () {
      return {
	      mode: process.env.VUE_ENV,
        count: 2,
        loading: true
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
      this.$store.dispatch('setFooterStatus','index')
    },
  }
</script>
<style scoped>
@import url('../assets/postlist.css');
.title{
  text-align: left;
}
</style>