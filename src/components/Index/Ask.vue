<template>
  <div class="all">
      <div class="loading" v-if="loading">
          <img src="../../../static/loading.gif"/>
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
  @import url(../../assets/list.css);
</style>
<script>
export default {
  name: 'askList',
  data(){
      return {
          lists : {},
          loading: true,
      }
  },
  
  methods:{
      getData(){
          this.$http({
              url:' https://cnodejs.org/api/v1/topics/?tab=ask',
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
}
</script>
