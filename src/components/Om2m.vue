<template>
<div class="om2m">
    {{msg}}
</div>
</template>
<script>
import { apiDataList } from '@/api/index.js';
export default {
    name:'Om2m',
    props:{
        msg: String
    },
    data(){

    },
    mounted(){
        this.getDataList();
    },
    methods:{
        getDataList(){
            const config = {
                headers:{
                    "Accept": "application/json",
                    "X-M2M-Origin": "admin:admin",
                }
            };
            apiDataList(
            {
                rcn:4
            },
                config
            )
            .then(
                res => {
                    console.log(res);
                    alert("done");
                }
            )
        }
    }
}
</script>
<style lang="scss" scoped>

</style>