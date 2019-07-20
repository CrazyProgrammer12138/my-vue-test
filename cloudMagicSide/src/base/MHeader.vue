<template>
    <div class="header">
      <!-- 插槽：动态显示header内容-->
      <slot></slot>
      <i class="iconfont icon-fanhui" v-if="back" @click="goBack"></i>
    </div>
</template>

<script>
    export default {
      // props获取组件传入的值
      props:{
        // 组件传值校验，什么类型，默认值，再用back判断
        // 组件传值的目的就是返回图标需不需要显示
        back: {
          type: Boolean,
          default: false
        }
      },
      name: "MHeader",
      data(){
        return {
          msg: this.back
        }
      },
      methods:{
        goBack:function(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped lang="less">
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    /*background: #afb9ee;*/
    background: #ffffff;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    i{
      position: absolute;
      left: 10px;
      font-size: 20px;
    }
  }
</style>
