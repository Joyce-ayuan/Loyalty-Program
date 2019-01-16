<template>
    <div class="menu">
        <div class="header">
            <div class="top"></div>
        </div>
        <commonFooter></commonFooter>
    </div>
</template>

<script>
import commonFooter from '../components/common/Footer.vue'
export default {
  components: { commonFooter }
}
</script>

<style lang="less" scoped>
@mainColor: #98843a;
.menu {
  .header {
    width: 100%;
    height: 277px;
    background-color: @mainColor;
    .top {
      height: 83px;
      height: 100%;
      background-color: #897734;
    }
  }
}
</style>
