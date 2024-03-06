<template>
	<view id="orderDetail">
		<c-head :isBack="true" :title="$t('order.detail.title')" ></c-head>
		<!-- <u-navbar :immersive="true" title-width="400" :title="'Order details'" :title-bold='true' :is-back="true" :back-icon-color="iconColor" title-color="#ffffff" :back-icon-name="backIcon" :custom-back="leftClick" class="container"
					:background="{backgroundColor: null}">
		</u-navbar> -->
		<view>
			<u-cell-group>
				<u-cell-item
					:icon-style="iconStyle"
					icon="../../static/location.png" title="">
					<view slot="title" class="title">
						<view class="adress">{{ $store.state.user.address }}</view>
						<view class="info">
							<text class="name">{{ $store.state.user.realname }}</text>
							<text class="phone">{{ $store.state.user.phone_number }}</text>
						</view>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="card order_status">
			{{ goodsStatus }}
			<!-- 只有待支付才显示倒计时 -->
			<u-count-down v-if="Number(goodsInfo.current) === 0" :timestamp="time" color="#000000" :show-days="false"></u-count-down>
		</view>
		<u-card :title="goodsInfo.shop_name">
			<view class="u-flex" slot="body">
				<u-image class="left" width="100rpx" height="100rpx" :src="goodsInfo.pictures ? goodsInfo.pictures : '../../static/good.jpg'" mode="aspectFill"></u-image>
				<view class="right">
					<view class="goods">{{ goodsInfo.goods_name }}</view>
					<view>
						<view class="u-flex u-row-between">
							<text class="u-font-16 money">{{$t('moneyLogo') + Number(goodsInfo.price).toFixed(2) }}</text>
							<text>x{{ goodsInfo.num }}</text>
						</view>
						<view class="tag">{{$t('order.detail.official')}}</view>
					</view>
				</view>
			</view>
		</u-card>
		<view class="card num">
			<view class="u-flex u-row-between u-margin-top-10">
				<text>{{$t('order.detail.order_no')}}</text>
				<text>{{ goodsInfo.order_no }}<u-button class="copy" @click="copyCode">{{$t('order.detail.copy')}}</u-button></text>
			</view>
			<view class="u-flex u-row-between u-margin-top-10">
				<text>{{$t('order.detail.total')}}</text>
				<text>{{$t('moneyLogo') + Number(goodsInfo.amount).toFixed(2) }}</text>
			</view>
			<!-- <view class="u-flex u-row-between u-margin-top-10">
				<text>Commission</text>
				<text>{{ goodsInfo.commission }}</text>
			</view>
			<view class="u-flex u-row-between u-margin-top-10">
				<text>Commission Rate</text>
				<text>{{ goodsInfo.commission_rate }}</text>
			</view> -->
			<!-- <view class="u-flex u-row-between u-margin-top-10">
				<text>Earnings</text>
				<text>{{ goodsInfo.earnings }}</text>
			</view> -->
			<view class="u-flex u-row-between u-margin-top-10">
				<text>{{$t('order.detail.status')}}</text>
				<text class="paid_status">{{ paid_status }}</text>
			</view>
		</view>
		<u-button v-if="goodsInfo.status === '0'" class="u-margin-top-20 detail-btn" shape="square"
			@click="handleConfirmOrder">{{$t('order.detail.pay')}}</u-button>
		<!-- <count-down @end="handleEnd" v-show="showLoading" :showLoading="showLoading"></count-down> -->
		<c-keyboard @passwordChange="handlePasswords" v-model="show"></c-keyboard>
	</view>
</template>

<script>
	import config from '../../config/index.js'
	import { saveOrderServ } from '@/service/grab.api.js'
	import moment from 'dayjs'
	export default {
		data() {
			return {
				showLoading: false, // 倒计时
				enablePay: true, // 是否
				goodsInfo: {
				},
				// iconColor: '#ffffff',
				// backIcon: 'arrow-left',
				iconStyle: {
					background: "linear-gradient(90deg,#6dcab8,#3a78cb)",
					borderRadius: "50%",
					width: '60rpx',
					height: '60rpx',
					display: 'flex',
					justifyContent: 'center'
				},
				customStyle: { // 按钮颜色，以兼容微信小程序的形式写
					
				},
				title: 'AMAZON Flagship store',
				time: null,
				show: false // 键盘
			}
		},
		computed: {
			goodsStatus () {
				let status
				switch (this.goodsInfo.status) {
					case "0":
						status = this.$t('order.detail.tip1')
						break
					case "1":
						status = this.$t('order.detail.tip2')
						break
					case "2":
						status = this.$t('order.detail.tip3')
						break
					case "3":
						status = this.$t('order.detail.tip4')
						break
				}
				return status
			},
			paid_status () {
				let status
				switch (this.goodsInfo.status) {
					case "0":
						status = this.$t('order.detail.tip5')
						break
					case "1":
						status = this.$t('order.detail.tip6')
						break
					case "2":
						status = this.$t('order.detail.tip7')
						break
					case "3":
						status = this.$t('order.detail.tip8')
						break
				}
				return status
			},
		},
		methods: {
			leftClick() { // 返回 / 菜单
				uni.switchTab({
					url: '/pages/order/index'
				})
				uni.$emit('order',{
					index: this.goodsInfo.current
				})
			},
			handleConfirmOrder () { // 确认保存订单
				// let time = 3600 - (moment().unix() - moment(this.goodsInfo.update_time).unix())
				// if	(time <= 0) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: 'The order has expired and cannot continue to pay!'
				// 	})
				// 	return
				// }
				this.show = true
			},
			handleSetTimeStart () {
				 // 3600秒减去（当前系统时间减去订单生成时间）得到倒计时
				// this.time = 3600 - (moment().unix() - moment(this.goodsInfo.update_time).unix())
				this.time = this.goodsInfo.seconds
			},
			handlePasswords (e) {
				this.pay_password = e
				// 输入完支付密码再去提交保存
				saveOrderServ(this.goodsInfo.order_no, this.pay_password).then((res) => {
					console.log('zhifuchenggon1 res', res)
					if (res.code === 0) {
						if (res.finished === 0) {
							uni.showToast({
								icon: 'success',
								title: this.$t('order.detail.tip9')
							})
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/order/index'
								})
								uni.$emit('order',{
									index: this.goodsInfo.current
								})
							}, 1000)
						} else if (res.finished === 1) {
							uni.showModal({
								content: this.$t('order.detail.tip10'),
								confirmText: this.$t('confirm'),
								success: (res) => {
									if	(res.confirm) {
										uni.switchTab({
											url: '/pages/order/index',
										})
										uni.$emit('order',{
											index: 2 // 订单全部支付完后直接到商户支付那里
										})
									}
								},
							})
						}
					}
				})
			},
			copyCode (e) {
				this.$copyText(this.goodsInfo.order_no).then(
					res => {
						this.$$showToast(this.$t("copySuccess"))
					},
					err => {
						this.$$showToast(this.$t("copyError"))
					}
				)
				
			},
		},
		onLoad(e) {
			console.log('order e', e)
			this.goodsInfo = { ...e }
			this.handleSetTimeStart()
		},
	}
</script>

<style lang="scss" scoped>
@import "../../static/c.scss";
// .container {
// 	height: 44px;
// 	width: 100%;
// 	background: linear-gradient(90deg,$color1,$color2) !important;
// }
// .logo {
// 	color: #FFFFFF;
// 	font-weight: bold;
// }
.title {
	.adress {
		font-size: 15px;
		font-weight: bold;
	}
	.info {
		font-size: 13px;
		.phone {
			margin-left: 5px;
		}
	}
}
.card {
    padding: 15px;
    background: #fff;
    margin-top: 10px;
    border-radius: 10px;
}
.order_status {
	font-size: 13px;
	background: #fbf8d9;
	font-weight: bold;
}
.left {
	width: 180rpx;
	height: 180rpx;
}
.right {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 490rpx;
	height: 180rpx;
	margin-left: 10px;
	.goods {
		font-size: 14px;
		font-weight: 400;
	}
	.tag {
		color: #fff;
		font-size: 12px;
		padding: 2px 5px;
		border-radius: 5px;
		background: #4caf50;
		display: inline-block;
		margin-top: 3px;
	}
	.money {
		font-weight: bold;
	}
}
.num {
	color: #999;
	.paid_status {
		color: #3a78cb;
		font-weight: 700;
	}
	.copy  {
		display: inline-block;
		border-radius: 10px;
		font-size: 24rpx;
		height: 45rpx;
		line-height: 45rpx;
		margin-left: 5px;
		color: #3a78cb;
	}
}
.detail-btn {
	background: #4caf50 !important;
	margin: 14px 15px 0;
	height: 68rpx;
	color: #ffffff;
	line-height: 68rpx;
}
</style>
