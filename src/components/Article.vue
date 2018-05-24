<template>
    <div class="article">
        <div class="loading" v-if="loading">
            <img src="../../static/loading.gif"/>
        </div>
        <div v-else>
            <div class="article-header">
                <span class="back clearfix" @click="goBack"><i class="glyphicon glyphicon-chevron-left"></i></span>
                <h4>主题</h4>
            </div>
            <div class="article-username">
                <router-link :to="{name:'userinfo',params:{loginname:reply.author.loginname}}">
                    <img :src="reply.author.avatar_url"/>
                    {{reply.author.loginname}}
                </router-link>
            </div>
            <div class="article-title">
                <div class="tit">
                    {{reply.title}}
                </div>
            </div>
            <div class="article-content">
                <p v-html=reply.content></p>
            </div>
            <div class="article-count">
                共(<span style="color:#80bd01">{{reply.reply_count}}</span>)条回复
            </div>
            <div class="myReply">
                <input type="text" v-model="myReplyText" placeholder="写下你的评论..."/>
                <span class="glyphicon glyphicon-send send-icon" @click="sendMyTxt(reply.id)"></span>
            </div>
            <ul class="replies"> 
                <li v-for="(post,index) in reply.replies" :key="index">
                    <div class="reply">
                        <div class="replies-side">
                            <router-link :to="{name:'userinfo',params:{loginname:post.author.loginname}}">
                                <img :src="post.author.avatar_url"/>
                            </router-link>
                        </div>
                        <div class="replies-content">
                            <div>
                                <router-link :to="{name:'userinfo',params:{loginname:post.author.loginname}}">
                                    {{post.author.loginname}}
                                </router-link>

                                <span class="floor">
                                    #{{index + 1}}
                                </span>
                            </div>
                            <div class="replies-txt"><p v-html=post.content></p></div>
                
                        </div>
                        <div class="replies-bottom">
                            <span class="glyphicon glyphicon-share-alt" @click="toggtlRelpyText(index,post.author.loginname)">回复</span>
                            <i class="glyphicon glyphicon-thumbs-up" @click="up(post.id)" :class="{'up':isUps(post.ups)}"></i>{{post.ups.length}}
                        </div>
                    </div>
                    <div class="relpy-text clearfix" v-if="relpyNum===index">
                        <textarea v-model="sendText"></textarea>
                        <button type="button" class="btn btn-success" style="float:right" @click="sendTxt(reply.id,post.id)">回复</button>
                    </div>
                </li> 
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'Article',
    data(){
        return {
            loading: true,
            reply:{
                author:{
                    loginname:''
                }
            },
            isUp:'down',
            sendText:'',
            relpyNum:'',
            myReplyText:''
        }
    },
    methods:{
        toggtlRelpyText(index,loginname){
            if(this.relpyNum == index){
                this.relpyNum = '';
                this.sendText = '';
            }
            else{
                this.relpyNum = index;
                this.sendText = `@${loginname}`
            }
        },
        sendMyTxt(id){
            this.$http({
                url:`https://cnodejs.org/api/v1//topic/${id}/replies`,
                method:'post',
                data:{
                    content:this.myReplyText,
                    accesstoken:sessionStorage.getItem('accesstoken'),
                }
                }).then((response)=>{
                    if(response.data.success == true){
                        this.myReplyText = '';
                        this.getData();
                    }
                })
        },
        sendTxt(id,reply_id){
            this.$http({
                url:`https://cnodejs.org/api/v1//topic/${id}/replies`,
                method:'post',
                data:{
                    content:this.sendText,
                    accesstoken:sessionStorage.getItem('accesstoken'),
                    reply_id:reply_id
                }
            }).then((response)=>{
                if(response.data.success == true){
                    this.relpyNum = '';
                    this.sendText = '';
                    this.getData();
                }
            })
        },
        isUps(array){
            var accesstoken = sessionStorage.getItem('accesstoken');
            if(accesstoken){
                var id = sessionStorage.getItem('userId')
                return array.indexOf(id) >= 0;
            }
            else{
                return false;
            }
        },
        goBack(){
            this.$router.back(-1);
        },
        getData(){
            this.$http({
                url:`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`,
                method:'get'
            }).then((response)=>{
                if(response.data.success == true){
                    this.reply = response.data.data;
                    this.loading = false;
                }
            })
        },
        up(id){
            var accesstoken = sessionStorage.getItem('accesstoken');
            if(accesstoken){
                this.$http({
                url:`https://cnodejs.org/api/v1/reply/${id}/ups`,
                method:'post',
                data:{
                    accesstoken:accesstoken
                }
                }).then((response)=>{
                    if(response.data.success === true){
                        this.isUp = response.data.action;
                        this.getData();
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            }
            else{
                
            }
        }
    },
    mounted(){
        this.getData();
    },
    computed:{
        upsCount(){ 
        }
    }
}
</script>
<style>
    .myReply{
        position: fixed;
        bottom: 0;
        background: #fff;
        z-index: 99;
        width: 100%;
        height: 4rem;
        margin: 0;
        padding: 0;
        left: 0;
        display: flex;
        border-top:1px solid #80bd01;
    }
    .myReply input{
        outline: none;
        width: 90%;
        border: none;
    }
    .myReply span{
        color: #80bd01;
        
        display: block;
        height: 100%;
        line-height: 4rem;
        font-size: 2.5rem;
    }
    .up{
        color: #80bd01;
    }
    *{
        padding: 0;
        margin: 0;
    }
    html,body,#app {
        height: 100%;
        width: 100%;
    }
    .replies li{
        list-style-type: none;
        border-bottom: 1px solid #eee;
        height: auto;
        min-height: 14rem;
        padding: 2rem 1rem;
        display: inline-block;
        width: 100%;
        padding-bottom: 0.5rem;
    }
    .article{
        margin: 0 !important;
        padding: 0!important;
        height: 100%;
    }
    .article-header{
        position: fixed;
        top:0;
        background: #fff;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #eee;
        z-index: 99;
    }
    .article-header h4{
        font-weight: bold;
    }
    .article-username{
        margin-top:4rem;
        display: flex;
        padding: 1rem;
        border-bottom: 1px solid #eee;
    }
    .article-username img{
        border-radius: 50%;
        height: 3rem;
        width: 3rem;
    }
    .article-title{
        border-bottom: 1px solid #eee;
        font-size: 2rem;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
    }
    .tit{
        text-align: center;
    }
    .article-content{
        border-bottom: 1px solid #eee;
        padding: 0 0.6rem;
        padding-bottom: 4rem;
    }
    .article-content img{
        width: 100%;
    }
    .article-count{
        border-left: 0.5rem solid #80bd01;
        border-bottom: 1px solid #eee;
        padding: 0.5rem;
    }
    .floor{
        float: right;
    }
    .floor:after{
        zoom: 1;
        content: '';
        clear: both;
        display: block;
        height: 0;
        width: 0;
    }
    .reply{
        float: left;
        width: 100%;
    }
    .clearfix:after{
        zoom: 1;
        content: '';
        clear: both;
        display: block;
        height: 0;
        width: 0;
    }
    .reply:after{
        zoom: 1;
        content: '';
        clear: both;
        display: block;
        height: 0;
        width: 0;
    }
    .replies-side img{
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
    }
    .replies-side{
        float: left;
        height: 100%;
    }
    .replies-content{
       
        padding-left: 3.5rem;
        width: 100%;
    }
    .replies-content a{
        color: #80bd01;
    }
    .replies-content img{
        width: 100%;
    }
    .back{
        float: left;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        left: 1rem;
    }
    .replies-bottom{
        padding-left: 21rem;
    }
    .replies-bottom i{
        margin-left: 1rem;
    }
    .replies-txt{
        min-height: 6rem;
    }
    .relpy-text textarea{
        width: 100%;
        border-radius: 3%;
        outline: none;
        border: 1px solid #eee;
    }
</style>
