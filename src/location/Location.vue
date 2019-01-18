<template>
    <div class="location">
        <commonHeader></commonHeader>
        <div class="content">
            <div class="title">
                <p>LOCATION</p>
            </div>
            <div class="info">
                <ul class="clearfix">
                    <li v-for="item in locations" :key="item.id" :calss="item.name" @click="details(item.name)">
                        <img :src="item.imgUrl" alt="">
                        <a href="#">
                            <p>{{item.name}}</p>
                            <p>{{item.area}}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <commonFooter></commonFooter>
    </div>
</template>

<script>
import commonHeader from '../components/common/Header.vue'
import commonFooter from '../components/common/Footer.vue'
export default {
  data() {
    return {
      locations: []
    }
  },
  components: { commonHeader, commonFooter },
  methods: {
    details(url) {
      let path = url
        .split(' ')
        .pop()
        .toLowerCase()
      console.log(path)
      this.$router.push(`${path}`)
    }
  },
  created() {
    this.axios({
      methods: 'get',
      url: 'http://localhost/amy/location/index.php'
    }).then(res => {
      res.data.forEach((ele, index) => {
        this.locations.push(ele)
      })
    })
  }
}
</script>

<style lang="less" scoped>
@mainColor: #98843a;
.location {
  width: 100%;
  height: 100vh;
  .content {
    padding-top: 285px;
    width: 100%;
    height: 100%;
    background-color: #000;
    .title {
      width: 100%;
      height: 100px;
      border: 2px solid @mainColor;
      text-align: center;
      position: fixed;
      top: 285px;
      left: 0;
      p {
        color: @mainColor;
        font-size: 50px;
        letter-spacing: 5px;
        line-height: 100px;
      }
    }
    .info {
      ul {
        li {
          width: 100%;
          height: 500px;
          position: relative;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
          }
          a {
            display: block;
            margin-top: 300px;
            position: absolute;
            margin-left: 50%;
            transform: translateX(-50%);
            p {
              text-align: center;
              line-height: 70px;
              &:nth-child(1) {
                color: @mainColor;
                font-size: 50px;
                font-weight: 700;
                letter-spacing: 5px;
              }
              &:nth-child(2) {
                color: #fff;
                font-size: 40px;
                letter-spacing: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
