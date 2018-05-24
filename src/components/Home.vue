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
                       <router-link :to="{name:'userinfo',params:{loginname:list.author.loginname}}">{{list.author.loginname}}</router-link>
                  </div>
              </div>
          </div>
          <div class="title">
              <router-link :to="{name:'article',params:{id:list.id}}">{{list.title}}</router-link>
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
      <cFooter></cFooter>
  </div>
</template>
<style scoped>
@import url('../assets/postlist.css');
</style>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import cFooter from './Footer.vue'
export default {
  name: 'contentList',
  data(){
      return {
          lists : {},
          loading: true,
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
        this.loading = true;
        this.$http({
            url:`https://cnodejs.org/api/v1/topics/`,
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
      this.changeFooter('index');
  },
  //组件复用
  watch:{
		$route(){
			this.getData();
		}
	}
}
</script>

