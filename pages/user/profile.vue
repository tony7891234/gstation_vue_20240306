<template>
	<view>
		<c-head :title="$t('profile.title')" ></c-head>
		<view class="form">
			<view class="lines border-bottom">
				<text>{{ $t('bind.account') }}</text>
				<text>{{ this.$store.state.user.username }}</text>
			</view>
			<!-- <view class="lines border-bottom">
				<text>Phone number</text>
				<text>918****38234</text>
			</view> -->
			<view class="lines border-bottom" @click="$u.route(
				{
					url: 'pages/user/bindCard',
				})">
				<text>{{$t('profile.bank_card')}}</text>
				<view>
					<u-icon name="arrow-right" color="#cccccc" size="28"></u-icon>
				</view>
			</view>
		</view>
		<!-- <view @click="handleLogout" class="u-m-t-60 btn">{{$t('profile.logout')}}</view> -->
	</view>
</template>

<script>
	import { logoutServ } from '@/service/user.api.js'
	export default {
		data() {
			return {
				form: {
					account: '',
					name: '',
					bank: '',
					phone: '',
					email: '',
					ifsc: '',
					upi: ''
				},
				hasCard: false,
				cardInfo: null //银行卡信息
			}
		},
		methods: {
			handleLogout () {
				logoutServ() // 远程退出
				this.$store.commit('SET_LOGOUT')
				uni.showToast({
					icon: 'none',
					title: this.$t('profile.tip1')
				})
				setTimeout(() => {
					this.$u.route({
						url: 'pages/auth/login'
					})
				}, 500)
			}
		},
		// onShow() {
		// 	getUserInfoServ().then((res) => {
		// 		console.log('getUserInfoServ', res)
		// 		if (res.code === 0) {
		// 			this.cardInfo = {...this.cardInfo, ...res.data }
		// 			console.log('this.carInfo', this.cardInfo)
		// 			if (!res.data.bank_account || !res.data.bank_username || !res.data.bank_name || !res.data.ifsc || !res.data.email) {
		// 				this.hasCard = false
		// 			} else {
		// 				this.hasCard = true
		// 			}
		// 		}
				
		// 	})
		// }
	}
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
		background: linear-gradient(90deg,$color1,$color2);
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
