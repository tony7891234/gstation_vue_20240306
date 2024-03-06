<template>
	<view id="invite">
		<c-head :title="$t('invite.title')"></c-head>
		<view class="container">
			<view class="bg">
				<uni-view>{{$t('invite.tip1')}}</uni-view>
				<uni-view>{{$t('invite.tip2')}}</uni-view>
			</view>
			<view class="left">
				
				<!-- <view >
					<img style="width: 50px;height: 44px;" @click="handleGrab" src="../../static/dollar-coin.png" alt="">
					<p style="float: right;margin-top: 18px;margin-left: 10px; color: #000000;
    font-size: 17px;
    font-weight: bold;">{{$t('invite.tip6')}}</p>
				</view> -->
				
				<view class="code">
					{{$t('invite.invitation')}}:
					<br>
					{{ code }}</view>
				<view class="qrimg">
				    <tki-qrcode
					:showLoading="false"
				    ref="qrcode"
				    :val="this.src"
				    :size="300"
				    :onval="true"
				    :loadMake="true"
				    :usingComponents="true"/>
				</view>
				
				
			</view>
			<view class="right">
				<view type="button" class="btn" @click="copyCode">{{ $t('invite.copy') }}</view>
				<!-- <u-button type="button" class="btn btn2" @click="handleGo">{{ $t('invite.reward') }}</u-button> -->
			</view>
			
			<view>
				<view style="float: left;margin: 10px;"><img @click="routePage(1)" src="../../static/facebook.png" style="width: 40px;height: 40px;" alt=""></view>
				<view style="float: left;margin: 10px;"><img @click="routePage(2)" src="../../static/whatsapp.png" style="width: 40px;height: 40px;" alt=""></view>
				<view style="float: left;margin: 10px;"><img @click="routePage(3)" src="../../static/telegram.png" style="width: 40px;height: 40px;" alt=""></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getQR,gord } from '@/service/user.api.js'
	export default {
		computed: {
			navStyle () {
				return this.$store.state.navStyle
			},
			val () {
				// return `${this.src}?i_code=${this.code}`
				return ''
			}
		},
		data() {
			return {
				deposit_status: 'unlock',
				current: 0,
				src: '',
				code: '', // 推荐码
				is_gord : 1,
				is_gord_msg : '',
			}
		},
		onLoad(obj) {
			console.log('invite onload', obj)
			if (this.$store.state.user.invitation_code) {
				this.src = window.location.href.split('#')[0] + '#/pages/auth/register?icode=' + this.$store.state.user.invitation_code
				this.code = this.$store.state.user.invitation_code
			}
		},
		methods: {
			handleGrab() {
				if(this.is_gord == 2){
					uni.showToast({
						title: this.$t('invite.tip7'),
						duration: 1000,
						icon: 'none'
					})
					return;
				}
				this.is_gord = 2
				gord().then((res) => {
					console.log('msg'+res.msg)
					this.is_gord_msg = res.msg
					uni.showToast({
						title: this.is_gord_msg,
						duration: 1000,
						icon: 'none'
					})
				})
			},
			
			routePage(e){
				if(e==1){
					location.href ='https://www.facebook.com/';//
				}
				if(e==2){
					location.href ='https://www.whatsapp.com/';//
				}
				if(e==3){
					location.href ='https://telegram.org/';//
				}
			},
			copyCode (e) {
				if (!this.$store.state.user.invitation_code) {
					uni.showToast({
						title: this.$t("invite.tip3"),
						duration: 1000,
						icon: 'none'
					})
					return
				}
				uni.showModal({
					title: this.$t("invite.tip4"),
					content: this.src,
					cancelText: this.$t("cancel"),
					confirmText: this.$t("confirm"),
					success: (res) => {
						if	(res.confirm) {
							if (this.src) {
								this.$copyText(this.src).then(
									res => {
										this.$$showToast(this.$t("copySuccess"))
									},
									err => {
										this.$$showToast(this.$t("copyError"))
									}
								)
							} else {
								uni.showToast({
									title: this.$t("invite.tip5"),
									duration: 1000,
									icon: 'none'
								})
							}
						}
					},
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/c.scss";
#invite {
	height: 100%;
	.container {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		background-color:#FFFFFF;
		.bg {
			background: url(../../static/invite_bg.png);
			background-size: 100% auto;
			background-position: 0 -120rpx;
			width: 100%;
			height: 400rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #FFFFFF;
		}
		.left {
			display: flex;
			flex-direction: column;
			align-items: center;
			.code {
				color: #000000;
				font-size: 32rpx;
				font-weight: bold;
				text-align: center;
				margin-bottom: 10px;
				padding: 5px;
			}
		}
		.right {
			.btn {
				margin-top: 10px;
				margin-bottom: 10px;
				background: linear-gradient(90deg,$color1,$color2) !important;
				padding: 10px;
				border-radius: 5px;
				color: #FFFFFF;
				width: 200rpx;
				text-align: center;
			}
		}
	}
}
</style>
