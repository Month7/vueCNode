<template>
    <div class="create">
        <cFooter></cFooter>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
import cFooter from './Footer.vue'
export default {
    name:'Create',
    methods:{
        ...mapActions([
            'changeFooter'
        ])
    },
    mounted(){
        this.changeFooter('create')
    },
    components:{
        cFooter
    },
}
</script>
<style>

</style>
