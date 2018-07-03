<template>
  <div class="head">
    <div class="header">
      <span class="iconfont icon-zuojiantou back"></span>
      <div class="h1" v-text="ptitle"></div>
      <div class="head-right">
        <span class="iconfont icon-caidan" @click="showNav"></span>
      </div>
    </div>
    <div class="nav" :style="{display:`${isShowNav?'flex':'none'}`}">
      <a class="home"><span class="iconfont icon-shouye"></span><span>首页</span></a>
      <a class="userCenter"><span class="iconfont icon-yonghu"></span><span>个人中心</span></a>
      <a class="myCollection"><span class="iconfont icon-icon--"></span><span>购物车</span></a>
    </div>
  </div>

</template>

<script>
  import $ from 'jquery'

  //把尺寸放大N倍（N是window.devicePixelRadio）
  var wd = document.documentElement.clientWidth * window.devicePixelRatio/10;
  //物理像素*设备像素=真实像素
  document.getElementsByTagName('html')[0].style.fontSize = wd + 'px';

  export default {
    name: "c_cate_header",
    data(){
      return{
        item_sum: 0,
        isShowNav: false
      }
    },
    props:{
      ptitle:String
    },
    methods:{
      showNav(){
       $('.nav').slideToggle()
      }
    }
  }
</script>
<style scoped>
  .head{
    position:relative;
  }
  .header{
    font-size: 0.26rem;
    line-height: 0.72rem;
    height: 0.813333rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
  }
  .header .back{
    display: block;
    width: 0.746667rem;
    text-align: center;
  }
  .header .h1{
    padding-left: 0.43333rem;
    color: #565656;
  }
  .header .head-right{
    width: 1.16rem;
    text-align: center;
  }
  .iconfont{
    font-size: 0.25rem;
  }

  .nav{
    position:absolute;
    font-size: 0.03rem;
    height: 0.68rem;
    width:100%;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-around;
    overflow: hidden;
    color: #555;
    background: #fff;
    z-index:999;
  }
  .nav a{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.08rem 0;
  }
  .nav a:nth-child(2){
    margin-left: 0.18rem;
  }
  .nav a .iconfont{
    font-size: 0.25rem;
    padding-bottom: 0.08rem;
  }
</style>
