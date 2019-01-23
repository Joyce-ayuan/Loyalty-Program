<template>
  <div class="outerRegister" ref="outerRegister">
      <div class="register" ref="register">
          <!-- <commonHeader></commonHeader> -->
          <div class="header">
            <div class="nav" @click="getMenu">
              <i class="fa fa-navicon"></i>
            </div>
            <div class="logo">
              <img src="@/assets/images/pong.jpg" alt>
            </div>
            <div class="card" @click="close">
              <i class="fa fa-close"></i>
            </div>
          </div>
          <div class="content">
              <div class="pic">
                  <img src="" alt="">
              </div>
              <div class="form">
                  <mt-field placeholder="First Name"></mt-field>
                  <mt-field placeholder="Last Name"></mt-field>
                  <mt-field placeholder="Mobile Number" type="tel"></mt-field>
                  <mt-field placeholder="Email" type="email"></mt-field>
                  <mt-field placeholder="Birthday MM/YYYY"></mt-field>
                  <mt-field placeholder="Gender"></mt-field>
                  <mt-field placeholder="Password" type="password"></mt-field>
                  <mt-field placeholder="Confirm Password" type="password"></mt-field>
                  <div class="btn" @click="toLogin">
                      <p>NEXT</p>
                  </div>
              </div>
          </div>
          <commonFooter></commonFooter>
      </div>
      <div class="menu" ref="menu" v-if="isLogin">
        <LoginMenu></LoginMenu>
      </div>
      <div class="menu" ref="menu" v-else>
        <Menu></Menu>
      </div>
  </div>
</template>

<script>
import commonHeader from '../components/common/LoginHeader.vue'
import commonFooter from '../components/common/Footer.vue'
import LoginMenu from '../menu/LoginMenu.vue'
import '../../static/js/kook.js'
import '../../static/js/kook.add.js'
export default {
  data() {
    return {
      isLogin: false
    }
  },
  components: { commonHeader, commonFooter, LoginMenu },
  methods: {
    toLogin() {
      this.axios({
        methods: 'post',
        url: 'http://localhost/amy/register/index.php'
      }).then(res => {
        if (parseInt(res.data.status) === 200) {
          this.$router.push('/login')
        }
      })
    },
    getMenu() {
      console.log(11)
      this.$refs.menu.style.display = 'block'
      this.$refs.register.style.overflow = 'hidden'
      this.$refs.register.style.marginTop = 0
      this.$refs.outerRegister.style.perspective = '200px'
      this.$refs.outerRegister.style.overflow = 'hidden'
      /* eslint-disable */
      kook('.register').toggle_cls('menu')
    },
    close() {
      window.history.go(-1)
    }
  },
  created() {
    if (parseInt(document.cookie.split('=')[1]) === 200) {
      this.isLogin = true
      console.log(this.isLogin)
    }
  },
  mounted() {
    this.$refs.menu.style.display = 'none'
  }
}
</script>

<style lang="less" scoped>
@mainColor: #8c722d;
.outerRegister {
  .register {
    width: 100%;
    height: 100%;
    padding-top: 280px;
    background: #000;
    .header {
      height: 277px;
      width: 100%;
      background-color: #000000;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      .logo {
        width: 350px;
        height: 88px;
        margin: 130px auto;
        img {
          width: 100%;
        }
      }
      .nav {
        position: absolute;
        top: 135px;
        left: 80px;
        i {
          color: #99843d;
          font-size: 89px;
        }
      }
      .card {
        position: absolute;
        top: 135px;
        right: 80px;
        i {
          color: #99843d;
          font-size: 89px;
        }
      }
    }
    .content {
      width: 100%;
      height: 100%;
      background: #000;
      .pic {
        width: 100%;
        height: 650px;
        background-color: #000;
        img {
          width: 597px;
          height: 597px;
          background-color: #f09;
          border-radius: 50%;
          margin: 80px auto;
        }
      }
      .form {
        width: 100%;
        height: 100%;
        padding: 100px 170px;
        background-color: #000;
        .btn {
          width: 441px;
          height: 100px;
          border-radius: 50px;
          background: @mainColor;
          text-align: center;
          line-height: 100px;
          color: #000;
          font-size: 50px;
          font-weight: 700;
          letter-spacing: 10px;
          margin: 150px auto;
        }
      }
    }
  }
}

// 切换效果
.outerRegister {
  .register {
    &.menu {
      margin-left: 80%;
      margin-top: -300px;
      backface-visibility: hidden;
      transition: 1s;
      transform: rotateY(-20deg);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99999;
    }
  }
}
</style>
