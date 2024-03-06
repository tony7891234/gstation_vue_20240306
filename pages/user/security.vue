<template>
	<view>
		<c-head :title="$t('pwd.title3')" ></c-head>
		<view class="form">
			<view class="lines border-bottom">
				<text>{{ $t('pwd.login_pwd') }}</text>
				<view @click="$u.route(
				{
					url: 'pages/user/pwd',
				})">
					<text style="color: #ffb702;">{{ $t('pwd.protecting') }}</text>
					<u-icon name="arrow-right" color="#CCCCCC" size="28"></u-icon>
				</view>
			</view>
			<view class="lines border-bottom">
				<text>{{ $t('pwd.pay_pwd') }}</text>
				<view @click="$u.route(
				{
					url: 'pages/user/pwd2',
				})">
					<text style="color: #ffb702;">{{ $t('pwd.protecting') }}</text>
					<u-icon name="arrow-right" color="#CCCCCC" size="28"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import "../../static/c.scss";
	.form {
		padding: 10px;
		border-radius: 10px;
	}
	.lines {
		padding: 20px;
		background: #FFFFFF;
		font-size: 32rpx;
		display: flex;
		justify-content: space-between;
	}
	.btn {
		background: #FFFFFF;
		text-align: center;
		color: #FFFFFF;
		border-radius: 20px;
		font-size: 14px;
		position: fixed;
		width: 90%;
		height: 80rpx;
		line-height: 80rpx;
		bottom: 65px;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
