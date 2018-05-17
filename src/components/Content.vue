<template>
  <div class="all">
      <div class="loading" v-if="loading">
          <img src="../../static/loading.gif"/>
      </div>
      <div class="list" v-else v-for="(list,index) in lists" :key="index">
          <div class="author">
              <div class="author-image">
                <img :src="list.author.avatar_url"/>
              </div>
              <div>
                  <div>
                      <router-link :to="{}">{{list.author.loginname}}</router-link>
                  </div>
              </div>
          </div>
          <div class="title">
              <router-link :to="{}">{{list.title}}</router-link>
          </div>
          <hr>
          <div class="count">
              <div>
                  <i class="glyphicon glyphicon-list-alt"></i>{{list.visit_count}}
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
<style scoped>
.all{
    height: 100%;
}
hr{
    margin: 1rem;
}
.count{
    display: flex;
    justify-content: space-around;
}
.loading{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.list{
    border: 1px solid black;
    padding: 1rem;
}
.list .author{
    font-size: 12px;
    display: flex;
    height: 4rem;
}
.list .author a{
    color: black;
    text-decoration: none;
}
.list .author .author-image img{
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
}
.title a{
    color: black;
    text-decoration: none;
}
</style>

<script>
export default {
  name: 'contentList',
  data(){
      return {
          lists : {},
          loading: true,
      }
  },
  
  methods:{
      getData(){
        this.loading = true;
        this.$http({
            url:`https://cnodejs.org/api/v1/topics/?tab=${this.$route.params.tab}`,
            method:'get',
        }).then((response)=>{
            if(response.data.success == true){
                this.lists = response.data.data;
                this.loading = false;
            }
        })
      },
  },
  mounted(){
      this.getData();
  },
  //组件复用
  watch:{
			$route(){
				this.getData();
			}
	}
}
</script>

