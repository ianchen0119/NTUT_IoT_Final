<template>
  <div class="weather">
    <div class="currentCountry">
      {{currentCountry}}
    </div>
    <svg width='500' height='500' style=''>
    <g class="counties"></g>
    <path class="county-borders"></path>
  </svg>
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
      currentCountry: null,
      taiwanCountry: []
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
        }
  },
}
</script>
<style lang="scss" scoped>
.currentCountry{
  font-size: 2rem;
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
