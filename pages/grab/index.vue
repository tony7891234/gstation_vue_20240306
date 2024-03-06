<template>
	<view id="grab">
		<count-down></count-down>
		<view class="grab-info">
			<c-head :title="$t('grab.title')" :isBack="false"></c-head>
			<div class='card'>
				<div class="cardMsg">
					<p>{{$t('grab.today')}}</p>
					<p>{{ $t('moneyLogo') }}</text>{{ info.today_income || 0 | fix2}}</p>
				</div>

				<div class="cardMsg">
					<p>{{$t('grab.personal')}}</p>
					<p>{{ $t('moneyLogo') }}</text>{{ info.income || 0 | fix2}}</p>
				</div>
				<div class='cardMsg2'>
					<div class='info'>
						<p>{{$t('grab.completed')}}</p>
						<p>{{ info.completed_orders || 0 }}</p>
					</div>
					<div class='info'>
						<p>{{$t('grab.locked')}}</p>
						<p>{{ info.lock_orders || 0 }}</p>
					</div>
					<div class='info'>
						<p>{{$t('grab.unfinished')}}</p>
						<p>{{ info.unfinished_orders || 0 }}</p>
					</div>
				</div>
			</div>
			<div class='card' style="height:60px">
				<div class="cardMsg">
					<p>{{ $t('grab.frozen') }}</p>
					<p>{{ $t('moneyLogo') }}</text>{{ info.frozen_balance || 0 | fix2}}</p>
				</div>
				<div class="cardMsg">
					<p>{{$t('grab.current')}}</p>
					<p>{{ $t('moneyLogo') }}</text>{{ info.balance | fix2 }}</p>
				</div>
			</div>
		</view>
		<!-- <grab-scroll :list="list"></grab-scroll> -->
		<u-button class="u-margin-top-20" :custom-style="customStyle" shape="square" @click="handleGrab">
			{{$t('grab.grab')}}
		</u-button>

		<!-- <u-button class="u-margin-top-20" :custom-style="customStyle1" shape="square" @click="routePage('/pages/records/index', 3)">
			{{$t('grab.order_detail')}}
		</u-button> -->

		<u-button class="u-margin-top-20" :custom-style="customStyle1" shape="square" @click="routePage('/pages/order/index?type=0')">
			{{$t('grab.order_history')}}
		</u-button>
		<count-down @end="handleEnd" v-show="showLoading" :showLoading="showLoading"></count-down>

		<div style="width: 100%;height: 100px;"></div>
	</view>
</template>

<script>
	import {
		getGrabInfo,
		generate,
	} from '@/service/grab.api.js'
	export default {
		data() {
			return {
				luckyMsg: '',//幸运订单
				show: false,
				showModal: false,
				showLoading: false, // 倒计时
				title: 'Note',
				channel: '',
				value: '',
				isFirstTime: true,
				order_no: '', // 生成的订单号码
				dataList: [],
				info: {
					completed_orders: 0,
					frozen_balance: 0,
					income: 0,
					lock_orders: 0,
					unfinished_orders: 0,
					today_income: 0
				},
				customStyle: { // 按钮颜色，以兼容微信小程序的形式写
					background: "#6F67FC !important",
					margin: "14px 15px 0",
					height: "68rpx",
					lineHeight: "68rpx",
					color: "#ffffff"
				},
				customStyle1: { // 按钮颜色，以兼容微信小程序的形式写
					margin: "14px 15px 0",
					height: "68rpx",
					lineHeight: "68rpx",
					color: "#6F67FC",
					border:'1px solid #6F67FC'
				},
			}
		},
		filters: {
			fix2(data) {
				return Number(data).toFixed(2)
			}
		},
		methods: {
			routePage(url, type) { // 路由跳转
				if (url.indexOf('recharge') >= 0) {
					uni.switchTab({
						url
					})
					return
				}
				if (type) {
					this.$u.route({
						url,
						params: {
							type
						}
					})
				} else {
					this.$u.route({
						url
					})
				}
			},
			showList() {
				this.show = true
			},
			handleConfirm(e) {
				console.log(e[0].label)
				this.channel = e[0].labelres
				this.value = e[0].value
			},
			handleGrab() {
				generate().then((res) => {
					console.log(res)
					if (res.code === 0) {
						if (this.info.unfinished_orders === 0 || !this.info.unfinished_orders) {
							this.info.unfinished_orders = res.unfinished_orders
						}

						if(res.data && res.data.order_count == 0){	
							this.luckyMsg = res.data.lucky_msg
						}
						this.showLoading = false
						
						uni.showModal({
							content: this.$t('grab.pay'),
							confirmText: this.$t('confirm'),
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/order/detail_pay',
						
									})
								}
							},
						})
						// this.$store.commit('SET_ORDERARR', res.data)
					}
				})

			},
			// handleEnd() { // 倒计时到再跳转详情页
			// 	this.showLoading = false
			// 	let msg = this.$t('grab.pay')
			// 	if(this.luckyMsg != ''){
			// 		msg = this.luckyMsg
			// 	}

			// 	uni.showModal({
			// 		content: msg,
			// 		confirmText: this.$t('confirm'),
			// 		showCancel: false,
			// 		success: (res) => {
			// 			if (res.confirm) {
			// 				uni.navigateTo({
			// 					url: '/pages/order/detail_pay',

			// 				})
			// 			}
			// 		},
			// 	})
			// }
		},
		onShow() {
			getGrabInfo().then((res) => {
				this.info = {
					...this.info,
					...res.data
				}
			})
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../static/c.scss";

	page {
		height: 100%;
	}

	#grab {

		height: 100%;

		.grab-info {
			padding-bottom: 20rpx;

			.title {
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #23292e;
				font-size: 30rpx;
			}

			.money-icon {
				color: #000;
				font-size: 32rpx;
			}

			.num {
				font-size: 42rpx;
				font-family: DINPro-Medium, DINPro;
				font-weight: 500;
				color: #23292e;
				display: flex;
				align-items: center;
			}

			.grab-title {
				height: 96rpx;
				font-size: 34rpx;
				line-height: 96rpx;

				text-align: center;
				color: #FFFFFF;
			}

			.card {
				width: 620rpx;
				height: 140px;
				background: #FFFFFF;
				box-shadow: 0px 4px 7px 0px rgba(211, 211, 211, 0.5);
				border-radius: 8px;
				margin: 20px auto 0;
				padding: 30px 40rpx;

				.cardMsg {

					display: flex;
					justify-content: space-between;
					margin-bottom: 18px;

					p {
						font-size: 14px;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #FCA235;
						line-height: 20px;
					}

					p:first-of-type {
						color: #1B1B1B;
					}

				}

				.cardMsg2 {
					display: flex;
					justify-content: space-between;

					.info {
						width: 74px;

						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;


						p {
							color: #FCA235;
							line-height: 20px;
							font-size: 14px;
							text-align: center;


						}

						p:first-of-type {
							font-size: 12px;
							color: #1B1B1B;
							line-height: 17px;

							margin-bottom: 10px;
						}
					}
				}
			}

			.line1 {
				display: flex;
				align-items: center;
				height: 120rpx;

				.order {
					font-size: 30rpx;
				}

				.commission {
					background: #d6b075;
					color: #FFFFFF;
					text-align: center;
					border-radius: 4px;
					font-size: 11px;
				}
			}

			.line2 {
				display: flex;
				margin-bottom: 30rpx;
			}

			.line3 {
				display: flex;
				margin-bottom: 30rpx;
			}

			.line4 {
				display: flex;
			}
		}



		.good {
			background: #FFFFFF;
			padding: 10px;

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;

				image {
					width: 80rpx;
					height: 80rpx;
				}

				.item-right {
					width: 80%;

					.content {
						display: flex;
						justify-content: space-between;

						.good-name {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							max-width: 270rpx;
						}

						.content-detail {
							color: red;
						}
					}
				}
			}
		}
		.u-btn {
			height: 48px !important;

			border-radius: 8px !important;
		}
	}
</style>
