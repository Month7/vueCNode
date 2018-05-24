<template>
    
</template>


<style scoped>

</style>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
    methods:{
        ...mapActions([
            'changeFooter'
        ])
    },
    mounted(){
        this.changeFooter('message')
    }
}
</script>
