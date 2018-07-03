<template>
    <div class="h-layout">
        <div class="isShowEmpty" v-show="isShowEmpty">
            <yheader1 style="background:white;" class="clearfix"/>
            <div class="h-main">
                <div class="h-nubia">
                    <img src="../../../static/imgs/emptycart.png" alt="" />
                </div>
                <div class="toShopping">
                    <h3>购物车还是空的</h3>
                    <p>现在就去选购吧</p>
                </div>
                <div class="tipsBtn">
                    <a href="#">去逛逛</a>
                </div>
            </div>
            <yfooter style="background:white;"/>
        </div>
        <div class="isShowCar" v-show="!isShowEmpty">
            <c_header :ptitle="title" style="backgroundColor:#fff;"/>
            <div class="h-wrap" v-for="(a,index) in data">
                <div class="imgurl">
                    <img :src="a.img" alt="" />
                </div>
                <div class="h-list">
                    <i class="removeGoods" @click="showWindow(a.id)" :index="index" :id="a.id" :data-num="num">
                        <img src="../../../static/imgs/close_btn.png" alt="" />
                    </i>
                    <p class="goodsName" v-text="a.title"></p>
                    <div class="order-items">
                        <p class="goodsPrice" v-text="'售价：￥'+a.price"> 
                        </p>
                    </div>
                    <div class="items_footer">
                        <div class="btn-cnts" :id="a.id">
                            <a class="reduce-btn" @click="reduce">-</a>
                            <input type="text"  :value="a.qty" readonly="readonly">
                            <a class="add-btn" @click="add">+</a>
                        </div>
                        <span class="subtotal" v-text="'小计：￥'+a.price*a.qty+'元'"></span>
                    </div>
                </div>
            </div>
            <div class="h-total">
                <p>金额合计&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span v-text="'￥'+total+'元'"  class="totalMoney"></span></p>
            </div>
            <div class="settleAccount">
                <button>去结算</button>
            </div>
        </div>
        <div class="isShowWindow">
            <bulletWindow style="width:100%;height:100%;"/>
        </div>
    </div>
</template>
<script type="text/javascript">
import $ from 'jquery'
import c_header from '../c_header'
import yfooter from '../yfooter'
import yheader1 from '../yheader1'
import bulletWindow from '../bulletWindow'
    export default{
        components:{
            c_header,
            yfooter,
            yheader1,
            bulletWindow
        },
        computed:{
            num(){
                var num=this.$store.state.num;
                var id=$('.removeGoods').attr('id');
                var self=this;
                new Promise((resolve,reject)=>{
                    $.ajax({
                    url:'http://localhost:54326/getNum',
                    data:{
                        type:'del',id:num
                    },
                    success:function(data){
                        resolve(data);
                    }
                })
                }).then((data)=>{
                    self.data=data;
                    self.total=0;
                    $.map(data,function(item){
                        self.total+=item.price*item.qty*1;
                        return self.total
                    })
                    if(self.data.length>0){
                        self.isShowEmpty=false;
                    }else{
                        self.isShowEmpty=true;
                    } 
                })
                return this.$store.state.num
            }
        },
        data(){
            return{
                data:[],
                title:'购物车',
                isShowEmpty:true,
                total:0,
                isShowWindow:false,
                list:0
            }
        },
        methods:{
            add:function(e){
                var number = $(e.target).prev().val();//获取数量
                number++;
                $(e.target).prev().val(number);//将数量重新写入input里
                var currentNumber=number;//重新获取数量
                var prevPrice = $(e.target).parent().parent().prev().text();//获取单价
                var reg=/\d+/g;
                var id=$(e.target).parent().attr('id');//获取id
                prevPrice=Number(prevPrice.match(reg));
                var totalPrice = currentNumber*prevPrice;
                $(e.target).parent().next().text('售价：￥'+totalPrice+'元');
                var prevTotal=$('.totalMoney').html();
                prevTotal=Number(prevTotal.match(reg));
                var currentTotal = prevTotal + prevPrice;
                $('.totalMoney').html('￥'+currentTotal+'元');
                $.ajax({
                    url:'http://localhost:54326/getNum',
                    data:{qty:currentNumber,type:'add',id:id}
                })
            },
            reduce:function(e){
                var number = $(e.target).next().val();
                var prevPrice = $(e.target).parent().parent().prev().text();//获取单价
                var id=$(e.target).parent().attr('id');//获取id
                var reg=/\d+/g;
                prevPrice = Number(prevPrice.match(reg));
                var prevTotal=$('.totalMoney').html();
                prevTotal=Number(prevTotal.match(reg));
                if(number<=1){
                    var currentNumber=$(e.target).next().val(1);
                    var totalPrice = number*prevPrice;
                    $(e.target).parent().next().text('售价：￥'+totalPrice+'元');
                }else{
                    number--;
                    $(e.target).next().val(number);
                    var currentNumber=$(e.target).next().val();//重新获取数量
                    var currentPrice =  currentNumber * prevPrice;
                    $(e.target).parent().next().text('售价：￥'+currentPrice+'元');
                    var currentTotal =  prevTotal - prevPrice;
                    $('.totalMoney').html('￥'+currentTotal+'元');
                    $.ajax({
                    url:'http://localhost:54326/getNum',
                    data:{qty:currentNumber,type:'reduce',id:id}
                    })
                }
            },
            showWindow:function(id){
               this.$store.state.isShowWindow=true;
                this.$store.state.goodsId=id;
                var id=$('')
            }
        },
        mounted:function(){
            var self=this
            $.ajax({
                url:'http://localhost:54326/getLength',
                success:function(data){
                    self.data=data;
                    $.map(self.data,function(item){
                        self.total+=item.price*item.qty*1;
                        return self.total
                    })
                    if(self.data.length>0){
                        self.isShowEmpty=false;
                    }else{
                        self.isShowEmpty=true;
                    } 
                    console.log(self.str)
                }
            })
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
    .h-layout .h-main{
        width:100%;
    }
    .h-layout .h-main .h-nubia{
        width:58%;
        height:58%;
        margin:25% auto;
    }
    .h-layout .h-main .h-nubia img{
        width:100%;
        height:100%;
        background-size:cover;
    }
    .h-layout .h-main .toShopping{
        width:58%;
        margin:0 auto;
        margin-top:-20%;
    }
    .h-layout .h-main .toShopping h3{
        font-size:18px;
        text-align:center;
        color:#50555b;
    }
    .h-layout .h-main .toShopping p{
        font-size:16px;
        color:#87888c;
        text-align:center;
        line-height:30px;
    }
    .h-layout .h-main .tipsBtn{
        width:58%;
        height:40px;
        margin:3% auto;
    }
    .h-layout .h-main .tipsBtn a{
        display:block;
        color: #515459;
        text-shadow: rgba(0,0,0,0.1) 0 1px 0;
        width:100%;
        height:40px;
        font-size:18px;
        text-align:center;
        line-height:40px;
        box-shadow: rgba(0,0,0,0.1) 3px 3px 0px,rgba(0,0,0,0.1) 3px 3px 0 inset;
        border-top-color: #d3d4d5;
        border-left-color: #dadbdd;
        border-right-color: #dadbdd;
        border-bottom-color: #dadbdd;
    }
    .h-wrap{
        width:100%;
        overflow:hidden;
        background:#fff;
        margin:2% 0;
    }
    .h-wrap .imgurl{
        margin:2% 0.5%;
        width:28%;
        float:left;
    }
    .h-wrap .imgurl img{
        width:90px;
        height:90px;
        border:1px solid #e0d7e3;
        vertical-align:middle;
    }
    .h-wrap .h-list{
        margin:2% 0;
        width:71%;
        float:right;
        position:relative;
    }
    .h-wrap .h-list i{
        width:28px;
        height:28px;
        position:absolute;
        right:0px;
        top:2px;
    }
    .h-wrap .h-list i img{
        display: block;
        max-height: 100%;
        margin: 0 auto;
    }
    .h-wrap .h-list .goodsName{
        font-size:16px;
        color:#51545a;
    }
    .h-wrap .h-list .goodsPrice{
        color:#87888c;
        font-size:14px;
        margin:2% 0;
    }
    .h-wrap .h-list .items_footer{
        margin-top:5%;
        padding:2% 0;
        border-top: 1px solid #e5e5e5;
        overflow: hidden;
        margin-right:2%;
    }
    .h-wrap .h-list .items_footer .btn-cnts{
        width:50%;
        float:left;
        margin-top:2%;
        height:30px;
    }
    .h-wrap .h-list .items_footer .btn-cnts a{
        text-align:center;
        line-height:30px;
        font-size:16px;
        display:block;
        float:left;
        width:30px;
        height:30px;
        border:1px solid #e0d7e3;
    }
    .h-wrap .h-list .items_footer .btn-cnts input{
        font-size:16px;
        text-align:center;
        width:33%;
        height:30px;
        float:left;
        border:1px solid #e0d7e3;
    }
    .h-wrap .h-list .items_footer .subtotal{
        width:50%;
        height:40px;
        line-height:40px;
        float:left;
        color:#000;
        text-align:right;
        font-size:14px;
    }
    .h-total{
        margin-right:10px;
        margin-bottom:90px;
        width:100%;
        height:50px;
        background:#fff;
        text-align:right;
        font-size:18px;
        line-height:50px;

    }
    .h-total span{
        color:red;
    }
    .settleAccount{
        position:fixed;
        background:#f5f5f5;
        bottom:0;left:0;
        width:100%;
        height:80px;
        border-top: 1px solid #dcdcdc;
        box-shadow: rgba(0,0,0,0.2) 0 2px 4px,#fff 0 1px 0 0 inset;
        z-index: 10;
    }
    .settleAccount button{
        display:block;
        width:90%;
        height:46px;
        margin:0 auto;
        line-height:50px;
        color:#fff;
        font-size:20px;
        background: rgb(255, 77, 77);
        border-radius:30px;
        margin-top:17px;
    }
</style>