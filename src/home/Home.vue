<template>
    <div class="home">
        <commonHeader></commonHeader>
        <!-- 主轮播图 -->
        <div class="mainSwiper">
          <mt-swipe :auto="4000" :show-indicators="true">
            <mt-swipe-item v-for="item in swiperImg" :key="item.id">
              <img :src="item">
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <!-- 底部轮播图 -->
        <underSwiper></underSwiper>
        <commonFooter></commonFooter>
    </div>
</template>

<script>
import commonHeader from '../components/common/Header.vue'
import commonFooter from '../components/common/Footer.vue'
import underSwiper from '../components/swiper/HomeDownSwiper.vue'
export default {
  data() {
    return {
      swiperImg: [],
      view: 'v-a'
    }
  },
  components: {
    commonHeader,
    commonFooter,
    underSwiper
  },
  methods: {
    getMainSwiper() {
      this.axios({
        method: 'get',
        url: 'http://localhost/amy/mainSwiper/index.php'
      }).then(res => {
        res.data.forEach((ele, index) => {
          this.swiperImg.push(ele.imgUrl)
        })
      })
    }
  },
  created() {
    this.getMainSwiper()
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .mainSwiper {
    margin-top: 276px;
    width: 100%;
    height: 1206px;
    background-color: #000;
  }
}
</style>
