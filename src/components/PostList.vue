<template>
  <div class="PostList">
    <div class="loading" v-if="loading">
        正在加载中...
    </div>
    <div class="posts" v-else>
        <ul>
            <li v-for="post in posts" :key="post">
                <router-link :to="{name:'user_info',params:{name:post.author.loginname}}">
                    <img :src="post.author.avatar_url" :title="post.author.loginname"/>
                </router-link>
                <span>
                    {{post.reply_count}}/{{post.visit_count}}
                </span>
                <router-link :to="{name:'post_content',params:{id:post.id,name:post.author.loginname}}" :title="post.title">
                    {{post.title}}
                </router-link>
                <span class="last_reply">
                    {{post.last_reply_at | formatDate}}
                </span>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  name:'PostList',
  data(){
      return {
          posts:{},
          loading:false
      }
  },
  methods:{
      getData(){
          var self = this;
          this.$http({
               url: 'https://cnodejs.org/api/v1/topics',
               method:'get',
               params:{
                   page:1,
                   limit:20,
               }
          }).then(function(response){
              if(response.data.success == true){
                  self.posts = response.data.data;
                  self.loading = false;
              }
          })
      }
  },
  beforeMount(){
      this.loading = true;
      this.getData();
  }
}
</script>

<style scoped>
	.PostList .posts {
		background-color: white;
		padding: 0.5rem;
		margin: 0.5rem 3rem;
	}
	.PostList .posts li {
		list-style: none;
		margin-bottom: 14px;
		border-bottom: 1px solid #E7E7E7;
		line-height: 30px;
	}
	.PostList .posts ul li img {
		width: 1.5rem;
		height: 1.5rem;
	}
	.PostList .posts li span {
		display: inline-block;
		text-align: center;
		/* width: 70px; */
		font-size: 12px;
		margin: 0 10px;
	}
	.PostList .posts a {
		text-decoration: none;
		color: inherit;
	    -o-text-overflow: ellipsis;
	    white-space: nowrap;
	    display: inline-block;
	    vertical-align: middle;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    max-width: 70%;
	}
	.PostList .posts a:visited {
		color:#858585;
	}	
	.PostList .posts .last_reply {
		float: right;
   		font-size: 0.7rem;
   	    margin-top: 0.3rem;
	}
</style>