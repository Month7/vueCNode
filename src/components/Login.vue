<template>
    <div class="login">
        <input type="text" placeholder="Access Token" class="token" v-model="accessToken">
        <div>
            <button class="btn btn-success button" type="button" @click="login">登录</button>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from './Footer'
import axios from 'axios'
export default {
    name:'Login',
    data(){
        return {
            accessToken: null,         // accessToken
            isLogin: null
        }
    },
    components:{
        Footer
    },
    mounted(){
       this.getIsLogin();
    },
    methods:{
        getIsLogin(){
            if(sessionStorage){
                this.isLogin = sessionStorage.getItem("isLogin") || false
            }
				},
				goPreviousUrl(path,params){
					var params = this.$route.params;
          switch(params.from){      // 判断是从哪个页面跳转进的登录页面
            case 'create':
							this.$store.dispatch('setCreateArticleData',{
								title: params.title,
								type: params.type,
								content: params.content,
							})
						  this.$router.push({
								name: 'create'
							})
						break;
						case 'self':           // 个人中心
							this.$router.push({
								name: 'self'
							})
						break;
						case 'message':
							this.$router.push({
								path: '/message',
								name: 'message'
							})
						break;
					}
				},
        getData(loginname){
            axios({
                url:`https://cnodejs.org/api/v1/user/${loginname}`,
                method:'get',
            }).then((response)=>{
                if(response.data.success === true){
                    var data = JSON.stringify(response.data.data);
                    sessionStorage.setItem('data',data);
										sessionStorage.setItem('loginname',response.data.data.loginname)  // 登录的用户名
										this.goPreviousUrl();
                }
            }).catch((e)=>{
							console.log(e);
            })
        },
        login(token){
            axios({
                url:'https://cnodejs.org/api/v1/accesstoken',
                method:'post',
                data:{
                    accesstoken: this.accessToken
                }
            }).then((response)=>{
                if(response.data.success == true){
                    sessionStorage.setItem('isLogin',true);
                    sessionStorage.setItem('accesstoken',this.accessToken);
                    sessionStorage.setItem('userId',response.data.id);
                    var loginname = response.data.loginname;
                    this.getData(loginname);
                }
            })
        }
    },
}
</script>
<style>
    .login{
        height: 300px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        text-align: center;
    }
    .login >div{
        margin-top:20px;
    }
    .button{
        width: 8rem;
        height: 3.5rem;
    }
    .token{
        width: 80%;
        height: 4rem;
        font-size: 1.8rem;
        outline: none;
        border: none;
        border-bottom: 1px solid gray;
    }
</style>
