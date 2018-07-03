<template>
    <div>
        <div class="h-window" :style="{display:isShowWindow? 'block':'none'}"></div>
        <div class="h-content" :style="{display:isShowWindow? 'block':'none'}">
            <p>来自m.nubia.com的提示</p>
            <div class="tips">
                <h3>您确定不购买该商品？</h3>
                <div class="h-btn">
                    <button class="cancelBtn" @click="hideWindow">取消</button>
                    <button class="sureBtn" @click="deleteGoods()" :data-id="goodsId">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import $ from 'jquery'
    export default{
        data(){
            return{
                
            }
        },
        computed:{
            isShowWindow(){
                return this.$store.state.isShowWindow
            },
            goodsId(){
                console.log(this.$store.state.goodsId)
                return this.$store.state.goodsId
            }
        },
        methods:{
            hideWindow(){
                this.$store.state.isShowWindow=false;
            },
            deleteGoods(){
                this.$store.state.isShowWindow = false;
                var id=$('.sureBtn').attr('data-id');
                this.$store.state.num=id;
                console.log(id);
            }
        }
    }
</script>
<style>
 body,html{
        width:100%;
        height:100%;
        background-color:#f5f5f5;
    }
</style>
<style scoped>
    .h-window{
        width:100%;
        height:200%;
        position:absolute;
        left:0;top:0;
        opacity:0.5;
        background-color:#f5f5f5;
    }
    .h-content{
        width:70%;
        height:160px;
        position:fixed;
        left:50%;
        top:50%;
        transform:translate(-50%,-50px);
        z-index:10;
    }
    .h-content p{
        font-size:18px;
        width:100%;
        height:40px;
        background:#eee;
        text-align:center;
        line-height:40px;
    }
    .h-content .tips{
        width:100%;
        /*height:120px;*/
        background:#fff;
    }
    .h-content .tips h3{
        height:50px;
        width:86%;
        margin:0 auto;
        font-size:18px;
        line-height:50px;
        color:#666;
    }
    .h-content .tips .h-btn{
        width:86%;
        height:70px;
        margin:0 auto;
    }
    .h-content .tips .h-btn button{
        width:45%;
        height:40px;
        margin:10px 0 0 5px;
        border:1px solid #ccc;
        font-size:16px;
    }
    .h-content .tips .h-btn button:nth-of-type(2){
        background:#7396FF;
    }
</style>