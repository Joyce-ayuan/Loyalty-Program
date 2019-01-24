<template>
    <div class="downSwiper">
        <template>
            <div class="swiper-container swiper1" ref="swiperContainer1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in swiperUrl" :key="item.id" @click="getDetails(item.id)">
                        <img :src="item.imgUrl" alt="">
                    </div>
                </div>
                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev" @click="getPrev">
                    <i class="fa fa-arrow-circle-o-left"></i>
                </div>
                <div class="swiper-button-next" @click="getNext">
                    <i class="fa fa-arrow-circle-o-right"></i>
                </div>
            </div>
            <div class="swiper-container swiper2" ref="swiperContainer2">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in swiperUrl" :key="item.id" @click="getDetails(index)" ref="slide">
                        <img :src="item.imgUrl" alt="">
                    </div>
                </div>
                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev" @click="getPrev">
                    <i class="fa fa-arrow-circle-o-left"></i>
                </div>
                <div class="swiper-button-next" @click="getNext">
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
      swiperUrl: [],
      slidesPerViews: 2,
      swiperId: '',
      currentPage1: 0,
      currentPage2: ''
    }
  },
  methods: {
    getMainSwiper() {
      this.axios({
        method: 'get',
        url: 'productSwiper/index.php'
      }).then(res => {
        res.data.forEach((ele, index) => {
          this.swiperUrl.push(ele)
        })
      })
    },
    getDetails(index) {
      this.$refs.swiperContainer2.style.display = 'block'
      this.$refs.swiperContainer1.style.display = 'none'
      this.swiperId = index - 1
      this.mySwiper2.slideTo(parseInt(this.swiperId), 50, false)
    },
    getPrev() {
      this.currentPage1 = parseInt(this.swiperUrl.length / 2) - 1
      if (this.currentPage1 <= 0) {
        this.currentPage1 = 0
      } else {
        this.currentPage1--
      }
      this.mySwiper1.slideTo(this.currentPage1, 50, false)

      if (this.currentPage2 <= 0) {
        this.currentPage2 = 0
      } else {
        this.currentPage2--
      }
      this.mySwiper2.slideTo(this.currentPage2, 50, false)
    },
    getNext() {
      if (this.currentPage1 >= parseInt(this.swiperUrl.length / 2) - 1) {
        this.currentPage1 = parseInt(this.swiperUrl.length / 2) - 1
      } else {
        this.currentPage1++
      }
      this.mySwiper1.slideTo(this.currentPage1, 50, false)

      if (this.currentPage2 >= parseInt(this.swiperUrl.length) - 1) {
        this.currentPage2 = parseInt(this.swiperUrl.length) - 1
      } else {
        this.currentPage2++
      }
      this.mySwiper2.slideTo(this.currentPage2, 50, false)
    }
  },
  created() {
    this.getMainSwiper()
  },
  mounted() {
    let that = this
    /* eslint-disable */
    let mySwiper1 = (that.mySwiper1 = new Swiper('.swiper1', {
      slidesPerView: this.slidesPerViews,
      observer: true,
      observeParents: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev'
    }))
    /* eslint-disable */
    let mySwiper2 = (that.mySwiper2 = new Swiper('.swiper2', {
      slidesPerView: this.slidesPerViews,
      observer: true,
      observeParents: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      effect: 'coverflow',
      slidesPerView: 3,
      centeredSlides: true,
      initialSlide: 1,
      coverflowEffect: {
        rotate: 20,
        stretch: 10,
        depth: 80,
        modifier: 2,
        slideShadows: true
      }
    }))
    setTimeout(() => {
      mySwiper1.slideTo(0, 50, false)
      document.getElementsByClassName('swiper-wrapper')[0].style.transform =
        'translate3d(0px, 0px, 0px)'
    }, 500)

    this.$refs.swiperContainer2.style.display = 'none'
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
  .swiper2 {
    .swiper-wrapper {
      margin-left: -210px;
    }
  }
}

.swiper-button-disabled {
  display: none;
}
</style>
