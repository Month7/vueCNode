<template>
  <div class="footer" v-if="clicked != 'hidden'">
    <router-link :to="{name:'index',params:{tab:'all'}}"  :class="{active:clicked == 'index'}"><i class="glyphicon glyphicon-home"></i>首页</router-link>
    <router-link :to="{name:'create'}" :class="{active:clicked == 'create'}"><i class="glyphicon glyphicon-pencil"></i>发布</router-link>
    <router-link :to="{name:'message'}" :class="{active:clicked == 'message'}"><i class="glyphicon glyphicon-envelope"></i>消息</router-link>
    <router-link  :to="{name:'self'}" :class="{active:clicked == 'self'}"><i class="glyphicon glyphicon-user"></i>我的</router-link>
  </div>
</template>
<script>
export default {
	name:'Footer',
	data(){
		return {
			activeStatus: 'index',
		}
	},
	props: {
		status: {
			default: 'index',
		}
	},
  computed:{
    clicked(){
    	return this.status
    }
  },
  methods: {
    gotoPage(path){
    //   if(!sessionStorage || sessionStorage.getItem('isLogin') != true){
    //     this.$router.push({
    //       name: 'login',
    //       params: {
    //         from: path
    //       }
    //     })
    //   } else {
    //     this.$router.push({
    //       name: path
    //     })
    //   }
    // }
    }
  }
}
</script>
<style scoped>
    .active{
        color: rgb(4,195,224);
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
