<template>
    <div class="userInfo">
        <div class="loading" v-if="loading">
            <img src="../../static/loading.gif"/>
        </div>
        <div v-else>
            <div class="user-header">
                <span>个人资料</span>
                <span class="back clearfix" @click="goBack"><i class="glyphicon glyphicon-chevron-left"></i></span>
            </div>
            <div class="user-content">
                <div class="user-image">
                    <img src="../assets/me.jpg">
                </div>
                <div class="user-portrait">
                    <img :src="data.avatar_url"/>
                </div>
                <div class="name"></div>
                <div class="user-name">
                    {{data.loginname}}
                </div>
                <div class="user-score">
                    <div>积分:{{data.score}}</div>
                    <div>创建时间:{{data.create_at | filterTime}}</div>
                </div>
                <div class="user-buttons">
                    <a class="reply-buttons" @click="changeTopics('reply')">回复</a>
                    <a class="reply-buttons" @click="changeTopics('recent')">主题</a>
                </div>
                <ul class="recent" :class="{'show':topics == 'recent'}">
                    <div v-if="hasRecentTopics">
                        没有记录
                    </div>
                    <li v-for="(item,index) in data.recent_topics" :key="index">
                        <div class="topics-img">
                            <img :src="data.avatar_url"/>
                            {{data.loginname}}
                        </div>
                        <div class="topics-title"><router-link :to="{name:'article',params:{id:item.id}}">{{item.title}}</router-link></div>
                    </li> 
                </ul>
                <ul class="recent" :class="{'show':topics == 'reply'}">
                    <div v-if="hasReplyTopics">
                        没有记录
                    </div>
                    <li v-for="(item,index) in data.recent_replies" :key="index">
                        <div class="topics-img">
                            <img :src="data.avatar_url"/>
                            {{data.loginname}}
                        </div>
                        <div class="topics-title"><router-link :to="{name:'article',params:{id:item.id}}">{{item.title}}</router-link></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
        
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import cFooter from './Footer.vue'
export default {
    name:'UserInfo',
    data(){
        return {
            data:{},
            topics:'reply',
            loginname:'',
            loading: true,
            reload: true
        }
    },
    components:{
        cFooter
    },
    computed:{
        hasRecentTopics(){
            return this.data.recent_topics.length == 0;
        },
        hasReplyTopics(){
            return this.data.recent_replies.length == 0;
        }
    },
    filters:{
        filterTime(str){
            if (!str) return ''
                var date = new Date(str)
                var time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
                if (time < 0) {
                    return ''
                } else if ((time / 1000 < 30)) {
                    return '刚刚'
                } else if (time / 1000 < 60) {
                    return parseInt((time / 1000)) + '秒前'
                } else if ((time / 60000) < 60) {
                    return parseInt((time / 60000)) + '分钟前'
                } else if ((time / 3600000) < 24) {
                    return parseInt(time / 3600000) + '小时前'
                } else if ((time / 86400000) < 31) {
                    return parseInt(time / 86400000) + '天前'
                } else if ((time / 2592000000) < 12) {
                    return parseInt(time / 2592000000) + '月前'
                } else {
                    return parseInt(time / 31536000000) + '年前'
                }
        }
    },
    methods:{
        goBack(){
            this.$router.back(-1);
        },
        getData(loginname){
            this.$http({
                url:`https://cnodejs.org/api/v1/user/${loginname}`,
                method:'get',
            }).then((response)=>{
                if(response.data.success === true){
                    this.data = response.data.data;
                    this.loading = false;
                   
                }
            })
        },
        changeTopics(topic){
            this.topics = topic;
        },
        ...mapActions([
            'changeFooter'
        ]),
        exit(){
            sessionStorage.clear();
        },
 
    },
    mounted(){
        // sessionStorage.setItem('reload',true)
        // if(sessionStorage.getItem){
        //     this.getData(this.$route.params.loginname);
        //     location.reload();
        this.getData(this.$route.params.loginname);
        //     this.reload = false;
        // }
    }
}
</script>
<style scoped>
    .back{
        float: left;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        left: 1rem;
    }
    .topics-title{
        padding-left: 4rem;
    }
    .userInfo{
        position: relative;
    }
    .topics-img{
        display: flex;
        padding: 1rem;
        align-items: center;
    }
    .topics-img img{
        border-radius: 50%;
        height: 3rem;
        width: 3rem;
    }
    ul{
        padding: 0;
    }
    ul li{
        padding: 0;
    }
    ul li{
        list-style-type: none;
    }
    .recent{
        display: none;
    }
    .show{
        display: block;
    }
    a{
        color: black;
    }
    .user-buttons{
        width: 100%;
        display: flex;
    }
    .reply-buttons{
        width: 50%;
        height: 3rem;
        padding: 0;
        display: block;
        border: 1px solid #eee;
        text-align: center;
        line-height: 3rem;
    }
    .user-score{
        margin-top:7rem;
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
        margin-bottom: 1rem;
    }
    .user-image img{
        height: 15rem;
        width:100%;
    }
    .user-portrait{
        position: absolute;
        top:15rem;
        height: 8rem;
        width: 8rem;
        left: 0;
        right: 0;
        margin: auto;
    }
    .user-portrait img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .name{
        border: 1px solid black;
    }
    .user-name{
        position: absolute;
        top:23.5rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 2rem;
        font-weight: bold;
    }
    .user-header{
        height: 5rem;
        text-align: center;
        line-height: 5rem;
        background: rgb(68,68,68);
        color: #fff;
        position: fixed;
        top:0;
        width: 100%;
        z-index: 99;
    }
    .user-header::after{
        content: '';
        clear: both;
    }
    .exitDiv{
        float: right;
        display: flex;
        align-items: center;
        height: 100%;
        margin-right: 1rem;
    }
    .exit{

        border-radius: 0.6rem;
        outline: none;
        border: 0.1rem solid #fff;
        height: 2.5rem;
        width: 5rem;
        font-size: 1.5rem;
        line-height: 2.5rem;
        background: rgb(68,68,68);
    }
</style>