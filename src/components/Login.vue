<template>
    <div class="login">
        <input type="text" placeholder="Access Token" class="token" v-model="accessToken">
        <div>
            <button class="btn btn-success button" type="button" @click="login">登录</button>
        </div>
        
    </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
    name:'Login',
    data(){
        return {
            accessToken:'',
            isLogin:sessionStorage.getItem("isLogin") || false,
        }
    },
    mounted(){
       this.changeFooter('login');
    },
    methods:{
        ...mapActions([
            'changeFooter'
        ]),
        getData(loginname){
            this.$http({
                url:`https://cnodejs.org/api/v1/user/${loginname}`,
                method:'get',
            }).then((response)=>{
                if(response.data.success === true){
                    var data = JSON.stringify(response.data.data);
                    sessionStorage.setItem('data',data);
                    sessionStorage.setItem('loginname',response.data.data.loginname)
                }
            }).then(()=>{
                this.$router.push({
                    path: '/userinfo',
                    name: 'userinfo',
                    params:{
                        loginname:loginname
                    }
                })
            })
        },
        login(token){
            this.$http({
                url:'https://cnodejs.org/api/v1/accesstoken',
                method:'post',
                data:{
                    accesstoken:this.accessToken
                }
            }).then((response)=>{
                if(response.data.success == true){
                    sessionStorage.setItem('isLogin',true);
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
