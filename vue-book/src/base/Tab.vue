<template>
    <div class="footer">
      <router-link to="/home">
        <i class="iconfont icon-home"></i>
        <span>首页</span>
      </router-link>
      <router-link to="/list">
        <i class="iconfont icon-liebiaoyemian"></i>
        <span>列表</span>
      </router-link>
      <router-link to="/collect">
        <i class="iconfont icon-shoucang"></i>
        <span>收藏</span>
      </router-link>
      <router-link to="/add">
        <i class="iconfont icon-add"></i>
        <span>添加</span>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "Tab"
    }
</script>

<style scoped lang="less">
  //lang：告诉style使用语言是less
  // flex布局：display: flex;
  // 方向：flex-direction: row / column
  // 垂直居中：justify-content: center;
  // 横向居中：align-item: center
  // 比例：flex: 1
  // router-link-exact-active：确切激活的 /home  /home/a  需要完成匹配
  // router-link-active：激活的 /home /home/a 需要一级匹配
  .footer{
    // 定位会脱离文档流，宽高消失, 所以设置width: 100%;
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
    }
    a.router-link-active{
      color: red;
    }
  }

</style>
