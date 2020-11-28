<template>
  <div class="home">
    <p>
      IoTFuck 是由憤怒鳥老師強迫學生製作的期末專案，該專案使用了沒有什麼人在用的 OM2M 作為物聯網設備平台並使用 Vue.js 開發前端應用，是一個純粹的垃圾。
    </p>
    <Weather class="weather" msg=""/>
  </div>
</template>

<script>
// @ is an alias to /src
import Weather from '@/components/Weather.vue'

export default {
  name: 'Home',
  components: {
    Weather
  }
}
</script>

<style lang="scss" scoped>
.home{
  display: flex;
  flex-direction: column;
  p{
    font-size: 1.5rem;
    padding: 1rem 2vw;
    text-align: left;
  }
}
.weather{

}
</style>
