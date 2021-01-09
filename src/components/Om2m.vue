<template>
<div class="om2m">
    <!-- <h1>{{msg}}</h1> -->
    <br>
    <div class="dataList" v-if="done">
        <!-- <div v-for="data in arrForChart" v-bind:key = "data.id">
            {{data["time"]}}
        </div> -->
        <div class="chart__container">
            <div>
                <h2>Humidity</h2>
                <div id="Humidity"></div>
            </div>
            <div>
                <h2>Temperature</h2>
                <div id="Temperature"></div>
            </div>
            <div>
                <h2>PM2.5</h2>
                <div id="PM"></div>
            </div>
        </div>
    </div>
    <div v-else>
        Loading...
    </div>
</div>
</template>
<script>
import * as d3 from 'd3';
import { parseString } from 'xml2js';
import { apiDataList } from '@/api/index.js';
export default {
    name:'Om2m',
    props:{
        msg: String
    },
    data(){
        return{
            done: false,
            count: 0,
            arrForChart: []
        }
    },
    mounted(){
        this.getDataList();
    },
    created(){  
    },
    methods:{
        xml2Js(value, time){
                let result = null;
                parseString(value, function (err, res) {
                    result = res.obj.str;
                });
                this.count+=1;
                this.arrForChart[this.count-1] = {
                    "PM":result[0]["$"].val,
                    "Temperature":result[1]["$"].val, 
                    "Humidity":result[2]["$"].val,
                    "id": this.count,
                    "time": time
                };
                return this.arrForChart[this.count-1];
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
                    this.list = res.data["m2m:cnt"]["m2m:cin"].map(
                        data=>{
                            this.xml2Js(data.con, data["ct"]);
                        }
                    )
                    
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )
            .finally(
                ()=>{
                    this.drawChart("Temperature");
                    this.drawChart("Humidity");
                    this.drawChart("PM");
                    this.done = true;
                }
            )
        },
        drawChart(temp){
            let dataset = this.arrForChart;
            let Xdata = dataset.map(function (d) {
                return d.id;
            })
            let Xscale = d3
            .scaleLinear()
            .domain([0, d3.max(Xdata)])              // 座標 X 軸的長度將會依據 0 至 Xdata 資料的最大值
            .range([0, 350]); 
            let Xaxis = d3.axisBottom(Xscale); 
            let gXaxis = d3
            .select(`#${temp}`)
            .append("svg")
            .attr("width", 450)
            .attr("height", 250)
            .style("border", "1px solid #00000060")
            .append("g")
            .attr("transform", "translate(30,220)");
            Xaxis(gXaxis);
            let Ydata = dataset.map(function(d) {
            return d[`${temp}`];
            });
            let Yscale = d3
            .scaleLinear()
            .domain([0, d3.max(Ydata)])
            .range([200, 0]);
            let Yaxis = d3.axisLeft(Yscale);
            let gYaxis = d3
            .select(`#${temp}`)
            .select("svg")
            .append("g")
            .attr("transform", "translate(30,20)");

            Yaxis(gYaxis);

            let line = d3.line() // 定義線段
            .x(function (d) {
                return Xscale(d.id);
            })
            .y(function (d) {
                return Yscale(d[`${temp}`]);
            })
            d3.select(`#${temp}`)
            .select('svg').append('path')
            .attr('d', line(dataset))               // 使用定義線段
            .attr("transform", "translate(30,20)")
            .attr('stroke', 'black')
            .attr('stroke-width',2)
            .attr('fill', 'none');
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
    .chart__container{
        margin: 0 auto;
        display: flex;
        width: 70vw;
        flex-wrap: wrap;
    }
</style>