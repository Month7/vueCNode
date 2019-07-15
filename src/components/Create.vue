<template>
    <div class="create">
        <div>
            <div class="create-header">
                发布
                <span class="send" @click="newArticle"><i class="glyphicon glyphicon-send"></i></span>
            </div>
            <div class="create-title">
                <input type="text" v-model="title" placeholder="标题..."/>
            </div>
            <div class="create-type">
               <select v-model="type">
                    <option value="dev">请选择</option>
                    <option value="share">分享</option>
                    <option value="ask">问答</option>
                    <option value="job">招聘</option>
                    <option value="dev">测试</option>
                </select>
            </div>
            <div class="create-text">
                <textarea placeholder="内容..." v-model="content"></textarea>
            </div>
        </div>
        <cFooter status='create'></cFooter>
    </div>
</template>
<script>
import cFooter from './Footer.vue'
import axios from 'axios'
export default {
    name:'Create',
    data(){
        return {
						title: this.$store.state.createArticleData.title,
						content: this.$store.state.createArticleData.content,
            type:this.$store.state.createArticleData.type,
            accesstoken: null,
        }
		},
		computed: {

		},
    methods:{
        newArticle(){
            if(!this.accesstoken){ // 未登录
							var params = {
								url: 'create',
								title: this.title,
								type: this.type,
								content: this.content,
								from: 'create'
							}
							this.$router.push({
								path: '/login',
								name: 'login',
								params: params,
							})
							return;
            }
            this.type = 'dev';
            axios({
                url:'https://cnodejs.org/api/v1/topics',
                method:'post',
                data:{
                    accesstoken: sessionStorage.getItem('accesstoken'),
                    title:this.title,
                    tab:this.type,
                    content:this.content
                }
            }).then((response)=>{
                if(response.data.success === true){
                    this.$router.push({
                        path: '/article/:id',
                        name: 'article',
                        params:{
                            id:response.data.topic_id
                        }
                    })
                }
            })
        },

    },
    mounted(){

    },
    components:{
        cFooter
    },
}
</script>
<style scoped>
.create-header{
    height: 5rem;
    position: fixed;
    top:0;
    width: 100%;
    text-align: center;
    line-height: 5rem;
    border-bottom: 1px solid #eee;
    background: #fff;
    z-index: 999;
}
.create-title input{
    width: 100%;
    outline: none;
    border: none;
    height: 3rem;
    border-bottom: 1px solid #eee;
    line-height: 3rem;
    padding: 1rem;
    height: 100%;
}
.create-type{
    width: 100%;
    height: 4rem;
    border-bottom: 1px solid #eee;
    padding-left: 1rem;
}
.create-type select{
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
}
.create-text{
    width: 100%;
    height: 30rem;
}
.create-text textarea{
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    padding: 1rem;
}
.send{
    position: absolute;
    right: 1rem;
}
</style>

