<template>
    <div class="downSwiper">
        <template>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in swiperUrl" :key="item.id">
                        <img :src="item" alt="">
                    </div>
                </div>
                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev">
                    <i class="fa fa-arrow-circle-o-left"></i>
                </div>
                <div class="swiper-button-next">
                    <i class="fa fa-arrow-circle-o-right"></i>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  data() {
    return {
      swiperUrl: []
    }
  },
  methods: {
    getMainSwiper() {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/productSwiper'
      }).then(res => {
        res.data.forEach((ele, index) => {
          this.swiperUrl.push(ele.imgUrl)
        })
      })
    }
  },
  created() {
    this.getMainSwiper()
  },
  mounted() {
    /* eslint-disable */
    let mySwiper = new Swiper('.swiper-container', {
      // =====================================================BUG
      loop: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    })
  }
}
</script>

<style lang="less" scoped>
.downSwiper {
  width: 100%;
  height: 687px;
  background: #000;
  .swiper-container {
    width: 100%;
    height: 687px;
    .swiper-wrapper {
      width: 100%;
      height: 687px;
      margin: 0 auto;
    }
    .swiper-slide {
      background: yellow;
      border: 1px solid #000;
    }
    .swiper-button-prev {
      width: 70px;
      height: 70px;
      margin-left: 25px;
      background-image: none;
      margin-top: -130px;
      i {
        font-size: 100px;
        color: #6b5d29;
      }
    }
    .swiper-button-next {
      width: 79px;
      height: 70px;
      margin-right: 25px;
      background-image: none;
      margin-top: -130px;
      i {
        font-size: 100px;
        color: #6b5d29;
      }
    }
  }
}
</style>
