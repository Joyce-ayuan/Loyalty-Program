<template>
    <div class="menu">
        <div class="header">
            <div class="top">
              <i class="fa fa-navicon"></i>
            </div>
        </div>
        <div class="content">
          <p v-for="item in menus" :key="item.id" @click="getMenuDetails">{{ item.menuName }}</p>
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
    getMenuDetails() {
      this.$router.push('/login')
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
    height: 100%;
    padding: 80px;
    background-color: @mainColor;
    padding-top: 277px;
    p {
      font-size: 60px;
      letter-spacing: 13px;
      line-height: 180px;
    }
  }
}
</style>
