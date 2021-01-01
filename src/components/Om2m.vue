<template>
<div class="om2m">
    <h1>{{msg}}</h1>
    <br>
    <div class="dataList" v-if="list">
        <div v-for="data in list" v-bind:key="data.rn">
            {{data["rn"]}}: 
            {{xml2Js(data.con)}}
        </div>
    </div>
    <div v-else>
        Loading...
    </div>
</div>
</template>
<script>
import { parseString } from 'xml2js';
import { apiDataList } from '@/api/index.js';
export default {
    name:'Om2m',
    props:{
        msg: String
    },
    data(){
        return{
            list: false
        }
    },
    mounted(){
        this.getDataList();
    },
    methods:{
        xml2Js(value){
            let result = null;
            parseString(value, function (err, res) {
                result = res.obj.str;
            });
            return {
                "Temperature":result[0]["$"].val,
                "Humidity":result[1]["$"].val,
                "PM2.5":result[2]["$"].val
            };
        },
        getDataList(){
            apiDataList(
            { params:
                {
                    rcn:4
                }
            }
            )
            .then(
                res => {
                    this.list = res.data["m2m:cnt"]["m2m:cin"];
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
        }
    }
}
</script>
<style lang="scss" scoped>
    .om2m{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }
    .dataList{
        // text-align: left;
    }
</style>