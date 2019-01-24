<template>
    <div class="menu">
        <div class="header">
            <div class="top">
              <i class="fa fa-close" @click="getBack"></i>
            </div>
        </div>
        <div class="content">
          <ul>
            <li @click="toAbout">ABOUT PONG GROUP</li>
            <li @click="toRewards">REWARDS RATE</li>
            <li @click="toTc">TERMS & CONDITIONS</li>
            <li @click="toPrivary">PRIVACY POLICY</li>
          </ul>
        </div>
        <commonFooter></commonFooter>
    </div>
</template>

<script>
import commonFooter from '../components/common/Footer.vue'
export default {
  data() {
    return {
      menus: []
    }
  },
  components: { commonFooter },
  methods: {
    getMenus() {
      this.axios({
        methods: 'get',
        url: 'http://localhost/amy/menu/index.php'
      }).then(res => {
        this.menus = res.data
      })
    },
    toAbout() {
      this.$router.push('/about')
    },
    toRewards() {
      this.$router.push('/rewards')
    },
    toTc() {
      this.$router.push('/tc')
    },
    toPrivary() {
      this.$router.push('/privary')
    },
    toNotification() {
      this.$router.push('/notification')
    },
    getBack() {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@mainColor: #98843a;
.menu {
  width: 100%;
  height: 100vh;
  .header {
    width: 100%;
    height: 277px;
    background-color: @mainColor;
    position: fixed;
    top: 0;
    left: 0;
    .top {
      width: 100%;
      height: 100%;
      padding-left: 80px;
      i {
        color: #000;
        font-size: 89px;
        line-height: 277px;
      }
    }
  }
  .content {
    width: 100%;
    height: 100%;
    padding: 80px;
    background-color: @mainColor;
    padding-top: 277px;
    li {
      font-size: 60px;
      letter-spacing: 13px;
      line-height: 180px;
      color: #000;
    }
  }
}
</style>
