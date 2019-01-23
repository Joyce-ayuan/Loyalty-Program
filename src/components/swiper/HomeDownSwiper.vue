<template>
    <div class="downSwiper">
        <template>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in swiperUrl" :key="item.id">
                        <img :src="item.imgUrl" alt="">
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
        url: 'http://localhost/amy/productSwiper/index.php'
      }).then(res => {
        res.data.forEach((ele, index) => {
          this.swiperUrl.push(ele)
        })
      })
    }
  },
  created() {
    this.getMainSwiper()
  },
  mounted() {
    /* eslint-disable */
    var mySwiper = new Swiper('.swiper-container', {
      // initialSlide: 0,
      slidesPerView: 2,
      observer: true,
      observeParents: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev'
    })
    setTimeout(() => {
      mySwiper.slideTo(0, 50, false)
      document.getElementsByClassName('swiper-wrapper')[0].style.transform =
        'translate3d(0px, 0px, 0px)'
    }, 50)
  }
}
</script>

<style lang="less" scoped>
@mainColor: #98843a;
.downSwiper {
  width: 100%;
  padding-bottom: 150px;
  background: #000;
  .swiper-container {
    width: 100%;
    height: 100%;
    .swiper-wrapper {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      .swiper-slide {
        img {
          width: 830px;
          height: 520px;
          background-color: #f98;
          margin: 0 auto;
        }
      }
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
