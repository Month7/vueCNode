<template>
  <div class="all" ref="container">
     
			<div :style="{
					paddingTop: paddingTop + 'px',
					paddingBottom: paddingBottom + 'px'
				}">
				<div class="loading" v-if="loading">
          <img src="../../static/loading.gif"/>
      	</div>
				<div class="list" v-else v-for="(list,index) in lists" :key="index" ref="item">
						<div class="author">
								<div class="author-image">
										<router-link :to="{name:'userinfo',params:{loginname:list.author.loginname}}"><img :src="list.author.avatar_url"/></router-link>
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
										<i class="glyphicon glyphicon-eye-open"></i>{{list.visit_count}}
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
    <cFooter></cFooter>
  </div>

</template>


<style scoped>
@import url('../assets/postlist.css');
</style>

<script>
import cFooter from './Footer.vue';
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
  name: 'contentList',
  data(){
    return {
      lists : [],
			loading: true,
			lastScrollTop: null,
			renderList: [],
			height: 0,
			paddingTop: 0,
			paddingBottom: 0,
			page: 2,
    }
  },
  components:{
    cFooter
  },
  methods:{
    ...mapActions([
      'changeFooter'
		]),
		scrollHanlder(){
			// console.log('滚动事件触发!');
			var container = this.$refs.container;        // 滚动条位置
			var clientHeight = container.clientHeight;  // 页面可视高度
			if(this.lastScrollTop == null || Math.abs(this.lastScrollTop - container.scrollTop) > clientHeight) {
				this.lastScrollTop = container.scrollTop;
				this.resetList(container.scrollTop);
			}
			
			const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight;
			if(isBottom){
				console.log('到底了');
				this.loadMore(container.scrollTop);
			}
		},
		loadMore(scrollTop){
			console.log('loadMore');
			this.$http({
          url:`https://cnodejs.org/api/v1/topics/?tab=${this.$route.params.tab}`,
          method:'get',
      }).then((response)=>{
					if(response.data.success === true){
						// this.lists = response.data.data;
						this.renderList.push(...response.data.data);
						this.resetList(scrollTop);
					}
        })
			

		},
		resetList(scrollTop){
			// console.log(scrollTop);
			var itemHeight = 0;
			var item = this.$refs.item[0];
			itemHeight = item.clientHeight;
			var start = Math.ceil(scrollTop / itemHeight) - 6 ;
			if(start<0) start = 0;
			var clientHeight = this.$refs.container.clientHeight;
			var to = start + Math.ceil(clientHeight / itemHeight) + 6;
			if(to>this.renderList.length) to = this.renderList.length;
			this.lists = [];
			// console.log(start);
			for(var i=start;i<to;i++){
				this.lists.push(this.renderList[i]);
			}
			this.paddingTop = itemHeight * (1 + start);
			this.paddingBottom = (this.renderList.length - to + 1) * itemHeight;
		},
    getData(){
      this.loading = true;
      this.$http({
          url:`https://cnodejs.org/api/v1/topics/?tab=${this.$route.params.tab}`,
          method:'get',
      }).then((response)=>{
					if(response.data.success == true){
						this.lists = response.data.data;
						this.loading = false;
						this.renderList = Array.from(this.lists);
					}
        })
      },
  },
  mounted(){
    this.getData();
		this.changeFooter('index');
		const body = document.body || document.documentElement;
		const all = this.$refs.container
		all.addEventListener('scroll',this.scrollHanlder);
		this.height = all.scrollHeight;
		
  },
  //组件复用
  watch:{
		$route(){
			this.getData();
		}
	}
}
</script>

