<template>
    <div class="message">
        <div class="loading" v-if="loading">
            <img src="../../static/loading.gif"/>
        </div>
        <div class="m" v-else>
            <div class="m-header">
                消息中心
            </div>
            <div class="m-content">
                <div>
                    <span @click="show = 'has_not_read'" :class="{'active':show == 'has_not_read'}">未读消息</span>
                    <span @click="show = 'has_read'" :class="{'active':show == 'has_read'}">历史消息</span>
                </div>
                <!-- <transition-group name="msg"> -->
                    <!--已读消息-->
                    <ul v-if="show == 'has_read'">
                        <li v-if="!messages.has_read_messages.length" style="text-align:center">
                            没有消息
                        </li>
                        <li v-else v-for="(message,index) in messages.has_read_messages" :key="index" class="m-li">
                            <div class="m-avator">
                                <router-link :to="{name:'userinfo',params:{loginname:message.author.loginname}}">
                                    <img :src="message.author.avatar_url" :title="message.author.loginname"/>
                                </router-link>
                            </div>
                            <div class="msg-m-content">
                                <router-link :to="{name:'userinfo',params:{loginname:message.author.loginname}}" class="msg-username">
                                    {{message.author.loginname}}
                                </router-link>
                                <div v-if="message.type === 'reply'">
                                    回复了你的话题
                                    <router-link :to="{name:'article',params:{id:message.topic.id}}">
                                        {{message.topic.title}}
                                    </router-link>
                                </div>
                                <div v-if="message.type === 'at'">
                                    在话题 
                                    <router-link :to="{name:'article',params:{id:message.topic.id}}">
                                        {{message.topic.title}}
                                    </router-link>中@了你
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!--未读消息-->
                    <ul v-if="show == 'has_not_read'">
                        <li v-if="!messages.hasnot_read_messages.length" style="text-align:center">
                            没有消息
                        </li>
                        <li v-else v-for="(message,index) in messages.hasnot_read_messages" :key="index" class="m-li">
                            <div class="m-avator">
                                <router-link :to="{name:'userinfo',params:{loginname:message.author.loginname}}">
                                    <img :src="message.author.avatar_url" :title="message.author.loginname"/>
                                </router-link>
                            </div>
                            <div class="msg-m-content">
                                <router-link :to="{name:'userinfo',params:{loginname:message.author.loginname}}" class="msg-username">
                                    {{message.author.loginname}}
                                </router-link>
                                <div v-if="message.type === 'reply'">
                                    回复了你的话题
                                    <router-link :to="{name:'article',params:{id:message.topic.id}}">
                                        {{message.topic.title}}
                                    </router-link>
                                </div>
                                <div v-if="message.type === 'at'">
                                    在话题 
                                    <router-link :to="{name:'article',params:{id:message.topic.id}}">
                                        {{message.topic.title}}
                                    </router-link>中@了你
                                </div>
                            </div>
                        </li>
                    </ul>
                <!-- </transition-group> -->
            </div>
            <cFooter></cFooter>
        </div>
    </div>
</template>
<style scoped>
*{
    padding: 0;
    margin: 0;
}
.m-header{
    position: fixed;
    top:0;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    z-index: 99;
    border-bottom: 1px solid #eee;
}
.m-content{
    padding-top:4rem;   
}
.msg-m-content{
    padding-left: 4rem;
}

.msg-m-content a{
    display: block;
    color: #80bd01;
}
.msg-username{
    color: black!important;
    font-weight: bold;
}
.m-li{
    display: inline-block;
    min-height: 10rem;
    border-bottom: 1px solid #eee;
    width: 100%;
    padding: 0.5rem;
}
ul li{
    list-style-type: none;
}
.m-avator{
    float: left;
    width: 3rem;
    height: 100%;
}
.m-avator img{
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
}
.m-content span{
    width: 50%;
    display: block;
    text-align: center;
    border-bottom: 1px solid #eee;
    height: 3rem;
    line-height: 3rem;
}
.m-content div:first-child{
    display: flex;
}
.active{
    border-bottom: 2px solid #80bd01!important;
}
/**动画*/
.msg-enter-active{
    transition: all 1s;
}
.msg-leave-active{
    transition: all 1s;
}
.msg-enter{
    transform: translateX(0);
}
.msg-leave{
    transform: translateX(-100%);
}
/**动画*/
</style>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import cFooter from './Footer.vue'
export default {
    data(){
        return {
            loading:true,
            messages:'',
            show:'has_not_read'
        }
    },
    components:{
        cFooter
    },
    methods:{
        ...mapActions([
            'changeFooter'
        ]),
        getData(){
            this.$http({
                url:`https://cnodejs.org/api/v1/messages?&accesstoken=${sessionStorage.getItem('accesstoken')}`,
                method:'get'
            }).then((response)=>{
                if(response.data.success === true){
                    this.loading = false;
                    this.messages = response.data.data;
                }
            })
        }
    },
    mounted(){
        this.changeFooter('message');
        this.getData();
    }
}
</script>
