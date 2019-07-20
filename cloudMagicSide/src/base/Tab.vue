<template>
  <div class="footer">
    <router-link to="/home">
      <i class="iconfont icon-home"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/product">
      <i class="iconfont icon-liebiaoyemian"></i>
      <span>产品</span>
    </router-link>
    <router-link to="/tool">
      <i class="iconfont icon-shoucang"></i>
      <span>工具</span>
    </router-link>
    <router-link to="/my">
      <i class="iconfont icon-add"></i>
      <span>我的</span>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: "Tab"
  }
</script>

<style scoped lang="less">
  .footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    border-top: 1px solid #ccc;
    background: #fff;
    a{
      display: flex;
      flex-direction: column; // 子标签垂直
      flex: 1;// 每个站一份
      align-items: center; // 横向居中
      justify-content: center;// 纵向居中
      color: #333;
    }
    a.router-link-active{
      color: red;
    }
  }
</style>
