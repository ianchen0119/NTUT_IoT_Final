<template>
  <div class="container">
    <div class="currentCountry">
      {{currentCountry}}
    </div>
    <br>
    <div class="weather">
      <div class="weather-left">
        <svg width='500' height='500' style=''>
        <g class="counties"></g>
        <path class="county-borders"></path>
        </svg>
      </div>
      <div class="weather-right">
			<div v-bind:key="item" v-for="(item,index) in weather" v-show="item.locationName==currentCountry">
			<div v-show="weatherType(index)==1">
				<img src="../assets/w1.png">
			</div>
			<div v-show="weatherType(index)==2||weatherType(index)==3">
				<img src="../assets/w2.png">
			</div>
			<div v-show="weatherType(index)==4||weatherType(index)==5||weatherType(index)==6||weatherType(index)==7">
				<img src="../assets/w4.png">
			</div>
			<div v-show="weatherType(index)==8||weatherType(index)==9||weatherType(index)==10||weatherType(index)==11||weatherType(index)==12||weatherType(index)==13||weatherType(index)==14||weatherType(index)==19||weatherType(index)==20||weatherType(index)==29||weatherType(index)==30||weatherType(index)==31||weatherType(index)==32||weatherType(index)==38||weatherType(index)==39">
				<img src="../assets/w5.png">
			</div>
			<div v-show="weatherType(index)==15||weatherType(index)==16||weatherType(index)==17||weatherType(index)==18||weatherType(index)==21||weatherType(index)==22||weatherType(index)==33||weatherType(index)==34||weatherType(index)==35||weatherType(index)==36||weatherType(index)==41">
				<img src="../assets/w6.png">
			</div>
			<div v-show="weatherType(index)==24">
				<img src="../assets/w7.png">
			</div>
			<div v-show="weatherType(index)==25||weatherType(index)==26||weatherType(index)==27||weatherType(index)==28">
				<img src="../assets/w8.png">
			</div>
			<div v-show="weatherType(index)==23||weatherType(index)==37||weatherType(index)==42">
				<img src="../assets/w9.png">
			</div>
			<div>{{ item.weatherElement[0].time[0].parameter.parameterName }}</div>
			<div><small>最高溫度:{{item.weatherElement[4].time[1].parameter.parameterName}}℃</small></div>
			<div><small>最低溫度:{{item.weatherElement[2].time[1].parameter.parameterName}}℃</small></div>
			<div>{{item.weatherElement[3].time[1].parameter.parameterName}}</div>
			</div>
		</div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson';
export default {
  name: 'Weather',
  props: {
    msg: String
  },
  data(){
    return{
      currentCountry: '臺北市',
      taiwanCountry: [],
      weather: null,
      weathert: null
			//weathert僅供weatherType()使用
    }
  },
  mounted(){
    fetch('./taiwanMap.json')
    .then(res=>res.json())
    .then(result=>{
      this.taiwanCountry = result;
      this.draw(this.taiwanCountry);
      let el = document.querySelectorAll('path');
      console.log(el)
      el.forEach(node=>{
        node.addEventListener('click',(el)=>{
        this.currentCountry = el.srcElement.id;
      })
      })
    })
    .catch(
      err=>console.log(err)
    )
    this.getdata();
  },
  methods: {
    search(local){
      alert(local);
    },
    draw(mapData) {
      d3.select('svg')
        let projection = d3.geoMercator()
        .center([123, 24])
        .scale(5500);
        let path = d3.geoPath(projection);
        d3.select('g.counties')
        .selectAll("path")
        .data(topojson.feature(mapData, mapData.objects["COUNTY_MOI_1090820"]).features)
        .enter().append("path")
        .attr("id", function(d) { return d.properties.COUNTYNAME })
        .attr("d", path);
        
        d3.select('path.county-borders')
        .attr("d", path(topojson.mesh(mapData, mapData.objects["COUNTY_MOI_1090820"], function (a, b) { return a !== b; })));
        },
      weatherType(z) {
				// console.log(z);
				return (this.weathert.location[z].weatherElement[0].time[0].parameter.parameterValue);
			},
			getdata() {
        this.axios
        .get("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-AE810ED8-8CB2-497E-8864-50A44A4F0082")
        .then(response => {
          // console.log(response);
          this.weather = response.data.records.location;
          this.weathert = response.data.records;
          })
          .catch(error => {
            console.log(error);
            })
            .finally(() => {this.loading = false;});
            }
		},
  }
</script>
<style lang="scss" scoped>
.currentCountry{
  font-size: 2rem;
}
.weather{
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 70%;
  align-items: center;
}
.weather-left,
.weather-right{
  width: 100%;
}
.weather-right{
  img{
    width: 35%;
  }
  font-size: 1.5rem;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
svg{
  border: 0;
}
.counties {
        fill:#33474e;
    }
    .counties :hover {
        fill: #7f9ca7;
        transition: 0.5s;
    }
    .county-borders {
        fill: none;
        stroke: #fff;
        stroke-width: 0.5px;
    }
</style>
