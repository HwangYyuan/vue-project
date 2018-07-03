<template>
    <div class="h-wrap">
        <div class="h-layout">
            <form action="#">
                <p class="h-text">用手机号注册</p>
                <input type="text" placeholder="请输入您的手机号码" class="num" @blur="focusOut" v-model="phoneNum"/>
                <p class="h-textNum" v-text="isShowText"></p>
                <div class="input-box">
                    <input :type="bool? 'password' : 'text'" placeholder="6-16个字符(数字、字母、符号至少包含两种)" @blur="pointOut" v-model="password"/>
                    <i :class="{'pwd-eye':true,'hide':bool}" @click="show"></i>
                </div>
                <p class="h-textPwd" v-text="isShowPwd"></p>
            </form>
            <div class="h-box">
                <input type="text" class="h-yanMa" v-model="yanMa" @blur="letOut" placeholder="请输入图片验证码"/>
                <span @click="randomLetterNum">{{getRandom}}</span>
            </div>
            <p class="h-randomNum" v-text="isShowMa"></p>
            <div class="h-phoneMa">
                <input type="text" class="phoneMa" placeholder="请输入手机验证码" v-model="buttonVal"  @blur="btnVal"/>
                <button @click="send">
                <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                <span v-if="!sendMsgDisabled">发送验证码</span>
                </button>
            </div>
            <p class="h-btnMa" v-text="isShowBtn"></p>
            <div class="h-bottom">
                <p>注册即表示您同意遵守努比亚账户的<a>用户协议</a>和<a>隐私协议</a></p>
                <button @click="submitVal">注册</button>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import $ from 'jquery'
    export default{
        data(){
            return{
                bool:true,
                phoneNum:'',
                password:'',
                isShowText:'',
                isShowPwd:'',
                getRandom:'',
                yanMa:'',
                isShowMa:'',
                time: 60, // 发送验证码倒计时
                sendMsgDisabled: false,
                buttonVal:'',
                isShowBtn:''
            }
        },
        methods:{
            show(){
                this.bool=!this.bool;
            },
            focusOut(){
                this.phoneNum=$.trim(this.phoneNum);
                // console.log(this.phoneNum.length)
                if(this.phoneNum.length==0||!(/^1[3-8]\d{9}$/g.test(this.phoneNum))){
                    this.isShowText='手机号码格式不正确';
                    return false;
                }else{
                    this.isShowText='';
                }
            },
            pointOut(){
                this.password=$.trim(this.password);
                if(this.password.length==0||!(/^[0-9a-z]{6,16}$/i.test(this.password))){
                    this.isShowPwd='密码长度必须为6~16位';
                }else{
                    this.isShowPwd='';
                }
            },
            randomLetterNum(){
                var str = '0123456789abcdefghijklmnopqrstuvwxyz';
                var res = '';
                for(var num = 0; num<4; num++){
                    res += str.charAt(parseInt(Math.random()*str.length));
                }
                this.getRandom=res
            },
            letOut(){
                this.yanMa=$.trim(this.yanMa);
                if(this.yanMa.length==0){console.log(111)
                    this.isShowMa='验证码不能为空';
                }else if(this.yanMa!=this.getRandom){
                    this.isShowMa='验证码不正确，请重新输入';
                }else{
                    this.isShowMa='';
                }
            },
            send(){
                let self = this;
                self.sendMsgDisabled = true;
                let timer = window.setInterval(function(){
                    if((self.time--)<=0){
                        self.time = 60;
                        self.sendMsgDisabled = false;
                        window.clearInterval(timer)
                    }
                },1000);
            },
            btnVal(){
                this.buttonVal = $.trim(this.buttonVal);
                if(this.buttonVal.length==0){
                    this.isShowBtn='请输入验证码';
                }else{
                    this.isShowBtn='';
                }
            },
            submitVal(){
                this.phoneNum = $.trim(this.phoneNum);
                this.password = $.trim(this.password);
                this.yanMa=$.trim(this.yanMa);
                this.buttonVal = $.trim(this.buttonVal);
                if(this.phoneNum.length===0||this.password.length===0||this.yanMa===0||this.buttonVal===0){
                    alert('用户信息错误，请重新填写');
                }else{
                    $.ajax({
                        url:'http://localhost:54326/registor',
                        data:{
                            phone:this.phoneNum,
                            password:this.password
                        },
                        success:function(data){
                            if(data=='用户已存在'){
                                alert('用户已存在，请重新注册')
                            }else{
                                location.href="#"
                                alert('注册成功');
                            }
                            
                        }
                    })
                }
                
            }
        },
        mounted:function(){
            var str = '0123456789abcdefghijklmnopqrstuvwxyz';
            var res = '';
            for(var num = 0; num<4; num++){
                res += str.charAt(parseInt(Math.random()*str.length));
            }
            this.getRandom=res;
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
    .h-wrap{
        width:90%;
        height:100%;
        margin: 0 auto;
    }
    .h-wrap .h-layout .h-text{
        border-bottom:1px solid #bbb;
        font-weight:bold;
        height:40px;
        line-height:40px;
        margin-bottom:20px;
    }
    .h-wrap .h-layout .num{
        width:97%;
        height:40px;
        border:1px solid #ccc;
        border-radius:10px;
        padding:0 5px;
        font-size:14px;
    }
    .h-wrap .h-layout .h-textNum,.h-wrap .h-layout .h-textPwd,.h-wrap .h-layout .h-randomNum,.h-wrap .h-layout .h-btnMa{
        height:25px;
        padding:0 10px;
        color:red;
    }

    .h-wrap .h-layout .input-box{
        background:#fff;
        width:97%;
        height:40px;
        border:1px solid #ccc;
        border-radius:10px;
        padding:0 5px;
        position:relative;
    } 
    .h-wrap .h-layout .input-box input{
        width:90%;
        height:40px;
        line-height:40px;
        font-size:14px;
    }
    .h-wrap .h-layout .input-box .pwd-eye{
        background:url("../../../static/imgs/pwd-eye.png");
        display:block;
        width:20px;
        height:20px;
        position:absolute;
        right:14px;
        top:10px;
        background-size:20px 40px;
    }
    .h-wrap .h-layout .input-box .pwd-eye.hide{
        background-position:0 -20px;
    }
    .h-wrap .h-layout .h-box{
        overflow:hidden;
    }
    .h-wrap .h-layout .h-box .h-yanMa,.h-wrap .h-layout .h-phoneMa .phoneMa{
        width:65%;
        height:40px;
        border:1px solid #ccc;
        border-radius:10px;
        float:left;
        font-size:16px;
    }
    .h-wrap .h-layout .h-box span{
        background:url("../../../static/imgs/yanma.png");
        display:inline-block;
        width:30%;
        height:40px;
        float:right;
        border:1px solid #0000D9;
        letter-spacing:7px;
        color:red;
        font-size:24px;
        line-height:40px;
        text-align:center;
    }
    .h-wrap .h-layout .h-phoneMa{
        height:40px;
        overflow:hidden;
    }
    .h-wrap .h-layout .h-phoneMa button{
        width:30%;
        height:40px;
        float:right;
        border-radius:30px;
        background:#e8380d;
        color:#fff;
    }
    .h-wrap .h-layout .h-bottom{
        width:100%;
    }
    .h-wrap .h-layout .h-bottom p{
        font-size:12px;
        color:#999;
        text-align:center;
        margin-bottom:10px;
    }
    .h-wrap .h-layout .h-bottom p a{
        text-decoration:underline;
        color:#e8380d;
    }
    .h-wrap .h-layout .h-bottom button{
        height:40px;
        width:100%;
        border-radius:30px;
        background:#e8380d;
        color:#fff;
        font-size:18px;
    }
</style>