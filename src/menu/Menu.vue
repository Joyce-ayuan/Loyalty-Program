<template>
    <div class="menu">
        <div class="header">
            <div class="top">
              <i class="fa fa-navicon"></i>
            </div>
        </div>
        <div class="content">
          <ul>
            <li @click="getLogin">LOGIN/REGISTER</li>
            <li>...</li>
            <li @click="getHome">HOME</li>
            <li @click="getMembership">MEMBERSHIP.TIERS</li>
            <li>...</li>
            <li @click="getLocations">LOCATIONS</li>
            <li @click="getMore">More</li>
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
    // path：跳转路径  栗子：/home, /login
    jump(path) {
      if (location.href.split('#')[1] === path) {
        location.reload()
      } else {
        this.$router.push(path)
      }
    },
    getMenus() {
      this.axios({
        methods: 'get',
        url: 'http://localhost/amy/menu/index.php'
      }).then(res => {
        this.menus = res.data
      })
    },
    getLogin() {
      this.jump('/login')
    },
    getHome() {
      this.jump('/home')
    },
    getMembership() {
      this.jump('/card')
    },
    getLocations() {
      this.jump('/location')
    },
    getMore() {
      this.jump('/more')
    }
  },
  created() {
    this.getMenus()
  }
}
</script>

<style lang="less" scoped>
@mainColor: #98843a;
.menu {
  width: 100%;
  height: 100%;
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
    height: 100vh;
    padding: 80px;
    background-color: @mainColor;
    padding-top: 277px;
    ul {
      li {
        font-size: 60px;
        letter-spacing: 13px;
        line-height: 180px;
        color: #000;
      }
    }
  }
}
</style>
