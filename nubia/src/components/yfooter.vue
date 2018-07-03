<template>
	<div class="ccb_footer">
		<a href="#" title="首页">
			<span class="iconfont icon-shouye"></span> 首页
		</a>
		<a href="#/cate" title="分类">
			<span class="iconfont icon-fenlei"></span> 分类
		</a>
		<a href="#" title="发现">
			<span class="iconfont icon-sousuo"></span> 发现
		</a>
		<a href="#" title="购物车">
			<span class="iconfont icon-icon--"></span> 购物车
		</a>
		<a href="#" title="我">
			<span class="iconfont icon-yonghu"></span> 我
		</a>
	</div>
</template>

<script>
	export default {
		name: 'yfooter'
	}
</script>

<style scoped>
	.ccb_footer {
		display: flex;
		position: fixed;
		bottom: 0;
		z-index: 999;
		background-color: #f4f3ef;
		height: 0.693333rem;
		width: 100%;
		max-width: 9.6rem;
		margin: 0 auto;
		font-family: "Microsoft Yahei", "微软雅黑", Arial, Helvetica, sans-serif;
	}
	.ccb_footer a {
		flex: 1;
		text-align: center;
		color: #666;
		padding-top: 0.066667rem;
		line-height: 0.266667rem;
	}
	.ccb_footer a:first-child {
		color: #f05d4b;
	}
	.ccb_footer a span {
		display: block;
	}
</style>