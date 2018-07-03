<template>
    <div class="h-main">
        <div class="h-header">
            <a href="#">
                <img src="../../../static/imgs/m_logo.png" alt="" />
            </a>
        </div>
        <form action="#">
            <div class="h-user">
                <i></i>
                <input type="text" placeholder="邮箱/手机号码/用户名" v-model="phNum" @blur="phoneNum"/>
            </div>
            <p class="h-userTip" v-text="isShowNum"></p>
            <div class="h-pwd">
                <i></i>
                <input :type="bool? 'password' : 'text'" placeholder="密码" @blur="pwdNum" v-model="pwdNumber"/>
                <em :class="{'pwd-eye':true,'hide':bool}" @click="show"></em>
            </div>
             <p class="h-pwdTip" v-text="isShowPwd">12</p>
        </form>
        <div class="skip">
            <a href="#">手机验证码登录</a>
        </div>
        <div class="h-btn">
            <button @click="login">立即登录</button>
        </div>
        <div class="otherWay">
           <p></p>
           <span>其它方式登录</span>
           <p></p>
        </div>
        <div class="h-link">
            <a href="#" class="qq"></a>
            <a href="#" class="weibo"></a>
            <a href="#" class="paybao"></a>
        </div>
        <div class="h-bottom">
            <a href="#/registor">立即注册</a>
            <span>|</span>
            <a href="#">忘记密码？</a>
        </div>
    </div>
</template>
<script type="text/javascript">
import $ from 'jquery'
    export default{
        data(){
            return{
                bool:true,
                phNum:'',
                isShowNum:'',
                pwdNumber:'',
                isShowPwd:''
            }
        },
        methods:{
            show(){
                this.bool=!this.bool;
            },
            phoneNum(){
                this.phNum=$.trim(this.phNum);
                if(this.phNum.length==0){
                    this.isShowNum='用户名不能为空';
                }else{
                    this.isShowNum='';
                }
            },
            pwdNum(){
                this.pwdNumber=$.trim(this.pwdNumber);
                if(this.pwdNumber.length===0){
                    this.isShowPwd = '密码不能为空';
                }else{
                    this.isShowPwd = '';
                }
            },
            login(){
                this.phNum=$.trim(this.phNum);
                this.pwdNumber=$.trim(this.pwdNumber);
                if(this.phNum.length===0||this.pwdNumber.length===0){
                    alert("用户信息错误");
                }else{
                    $.ajax({
                    url:'http://localhost:54326/login',
                    data:{
                        userNum:this.phNum,
                        password:this.pwdNumber
                    },
                    success:function(data){
                        console.log(data)
                        if(data==='fail'){
                            alert("用户名或密码错误");
                        }else{
                            alert('登录成功');
                            location.href="#";
                        }
                    }
                   })
                }
            }
        }
    }
</script>
<style>
    body,html{
        width:100%;
        height:100%;
        background:#f5f5f5;
    } 
</style>
<style scoped>
    .h-header{
        margin:0 auto;
        width:50%;
        margin-top:40px;
        margin-bottom:40px;
    }
    .h-main .h-header img{
        width:100%;
        height:25px;
    }
    .h-main .h-user,.h-main .h-pwd{
        width:70%;
        height:40px;
        margin:0 auto;
        border:1px solid #ccc;
        border-radius:10px;
        background:#fff;
        position:relative;
    }
    .h-main .h-user i{
        display:inline-block;
        width:13%;
        height:25px;
        background:url("../../../static/imgs/h-id.png") no-repeat;
        background-size:60%;
        margin:8px 4px 8px 14px;
        vertical-align:middle;
    }
    .h-main .h-pwd i{
        display:inline-block;
        width:13%;
        height:25px;
        background:url("../../../static/imgs/h-pwd.png") no-repeat;
        background-size:60%;
        margin:8px 4px 8px 14px;
        vertical-align:middle;
    }
    .h-main .h-pwd input{
        width:50%;
        height:38px;
        font-size:16px;
    }
    .h-main .h-user input{
        width:70%;
        height:38px;
        font-size:16px;
    }
    .h-main .h-userTip,.h-main .h-pwdTip{
        width:70%;
        margin:5px auto;
        color:red;
        height:20px;
    }
    .h-main .h-pwd .pwd-eye{
        background:url("../../../static/imgs/pwd-eye.png");
        display:block;
        width:20px;
        height:20px;
        position:absolute;
        right:14px;
        top:10px;
        background-size:20px 40px;
    }
    .h-main .h-pwd .pwd-eye.hide{
        background-position:0 -20px;
    }
    .h-main .skip{
        width:70%;
        margin:0 auto;
        text-align:right;
    }
    .h-main .skip a{
        color:red;
    }
    .h-main .h-btn{
        width:70%;
        margin:10px auto;
    }
    .h-main button{
        width:100%;
        border:1px solid #ccc;
        border-radius:10px;
        height:40px;
        background:#e8380d;
        color:#fff;
        font-size:18px;
        margin-bottom:20px;
    }
    .h-main .otherWay{
        width:70%;
        margin:20px auto;
    }
    .h-main .otherWay p{
        display:inline-block;
        width:30%;
        height:5px;
        border-top:1px solid #BDC1C3;
    }
    .h-main .otherWay span{
       color:rgba(128, 128, 128, 0.85);
       font-size:16px;
       width:30%;
    }
    .h-main .h-link{
        width:50%;
        height:36px;
        margin:0 auto;
    }
    .h-main .h-link a{
        display:inline-block;
        width: 35px;
        height: 35px;
    }
    .h-main .h-link .qq{
    background: url("../../../static/imgs/third_login.png") no-repeat 0 0;
    background-size:cover;
    margin:0 6%;
    }
    .h-main .h-link .weibo{
    background: url("../../../static/imgs/third_login.png") no-repeat -35px 0;
    background-size:cover;
    margin:0 6%; 
    }
    .h-main .h-link .paybao{
     background: url("../../../static/imgs/third_login.png") no-repeat -70px 0;
    background-size:cover; 
    margin:0 6%;  
    }
    .h-main .h-bottom{
        width:100%;
        height:40px;
        text-align:center;
        position:absolute;
        bottom:0px;
        font-size:14px;
    }
    .h-main .h-bottom a{
        color:#000;
    }
    .h-main .h-bottom span{
        display:inline-block;
        margin:0 20px;
        color:#ddd;
    }
</style>