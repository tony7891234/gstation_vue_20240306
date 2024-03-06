<template>
	<u-navbar :immersive="true" title-width="400" :title="title" :title-bold='true' :is-back="isBack"
		:border-bottom="false" id="cHead" :back-icon-color="iconColor" title-color="#ffffff" :back-icon-name="backIcon"
		:custom-back="leftClick" :background="{backgroundColor: null}">
		<!-- <u-image width="292rpx" height="70rpx" v-if="!title" class="logo2" src="../../static/logo.png"></u-image> -->
	</u-navbar>
</template>

<script>
	import themeMix from '@/mixins/theme.mix.js'
	export default {
		name: 'NavBar',
		props: {
			borderBottom: {
				type: Boolean,
				default: true
			},
			backIcon: {
				type: String,
				default: 'arrow-left'
			},
			iconColor: {
				type: String,
				default: '#ffffff'
			},
			titleColor: {
				type: String,
				default: '#ffffff'
			},
			isBack: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: ''
			}
		},
		mixins: [themeMix],
		methods: {
			leftClick() { // 返回 / 菜单
				if (this.backIcon === 'list') {
					this.$u.route({
						url: 'pages/user/index'
					})
				} else {
					this.$$back()
				}
			},
			iconClick(index) { // 右侧icon图标
				if (index) {
					this.$$showToast('路由跳转,待定')
				} else {
					this.$$navigateTo('/pages/user/bet_records/index')
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/c.scss";

	.logo {
		color: #FFFFFF;
		font-weight: bold;
	}

	.logo2 {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 10rpx;
		z-index: 999;
	}

	#cHead {
		.u-navbar{
			background: linear-gradient(251deg, #5A5FFF 0%, #AC7EF4 100%)!important
		}
	}
</style>
