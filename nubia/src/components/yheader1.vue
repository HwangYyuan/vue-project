<template>
	<div class="ccb_header">
        <div class="fl">
            <a href="/#/home" title="nubia商城" class="home">
                <img src="../../static/imgs/m_logo.png">
            </a>
        </div>
        <ul class="fr">
            <li class="user fl">
                <a href="/#/mine" title="个人中心">
                    <span class="iconfont icon-yonghu">
                    </span>
                </a>
            </li>
            <li class="cart fl">
                <a href="/#/car" title="购物车">
                    <span class="iconfont icon-icon--"></span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
	export default {
		name: 'yheaer1'
	}
</script>

<style scoped>
	.ccb_header {
        border-bottom: 1px solid #ccc;
    	background: #fff;
	    position: relative;
		z-index: 2;
	}
	.home {
		display: block;
		width: 160px;
	    height: 26px;
	    padding: 12px 15px;
	}
	.home img {
		width: 100%;
		height: 25px;
	    display: block;
    	max-height: 100%;
   	 	margin: 0 auto;
	}
	.fr {
	    height: 50px;
	    text-align: center;
	    margin-right: 10px;
	}
	.fr li a {
	    display: block;
	    padding: 10px 5px 10px 7px;
	}
	.iconfont {
	    font-size: 26px;
	    color: #464646;
	}
	.icon-icon-- {
		font-size: 31px;
	}
	.cart {
		margin-top: -3px;
	}
</style>