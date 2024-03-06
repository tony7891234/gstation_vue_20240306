<template>
	<view id="orderDetail">
		<c-head :isBack="true" :title="$t('order.detail.title')" ></c-head>
		<view>
			<!-- <u-cell-group>
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
			</u-cell-group> -->
		</view>
		<view class="card order_status">
			{{ goodsStatus }}
			<!-- 只有待支付才显示倒计时 -->
			<u-count-down v-if="goodsInfo.status === 0" :timestamp="goodsInfo.seconds" color="#000000" :show-days="false"></u-count-down>
		</view>
		<u-card :title="goodsInfo.shop_name">
			<view class="u-flex" slot="body">
				<u-image class="left" width="100rpx" height="100rpx" :src="goodsInfo.pictures" mode="aspectFill"></u-image>
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
				<text> {{$t('moneyLogo') + Number(goodsInfo.amount).toFixed(2) }}</text>
			</view>
			<view class="u-flex u-row-between u-margin-top-10">
				<text>{{$t('order.detail.status')}}</text>
				<text class="paid_status">{{ paid_status }}</text>
			</view>
		</view>
		<u-button v-if="String(goodsInfo.status) === '0'" class="u-margin-top-20 detail-btn" shape="square"
			@click="handleConfirmOrder">{{$t('order.detail.pay')}}</u-button>
		<c-keyboard @passwordChange="handlePasswords" v-model="show"></c-keyboard>
	</view>
</template>

<script>
	import config from '../../config/index.js'
	import moment from 'dayjs'
	import { saveOrderServ, getOrders } from '@/service/grab.api.js'
	import { info } from '@/service/pay.api.js'
	export default {
		data() {
			return {
				rate:0,
				showLoading: false, // 倒计时
				goodsInfo: {
					// order_no: '',
					// id: '',
					// name: '',
					// price: '',
					// pictures: '',
					// nums: 0, // 商品数量?
					// status: '', // 未完成
					// commission: '',// 佣金
					// commission_rate: '',// 佣金费率
				},
				selectId: '', // 从index页面进来选择的商品id
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
				thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				time: null,
				time_diff: null, // 时间误差
				pay_password: '1', // 支付密码
				show: false // 键盘
			}
		},
		computed: {
			goodsStatus () {
				let status
				console.log('this.goodsInfo.status', this.goodsInfo.status)
				switch (String(this.goodsInfo.status)) {
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
				console.log('status', status)
				return status
			},
			paid_status () {
				let status
				switch (String(this.goodsInfo.status)) {
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
			handleSendPay () {
				saveOrderServ(this.goodsInfo.order_no, this.pay_password).then((res) => {
					console.log('saveOrderServ res', res)
					if (res.code === 0) {
						this.selectId = ''
						if (res.finished === 0) {
							uni.showToast({
								icon: 'success',
								title: this.$t('order.detail.tip9')
							})
							setTimeout(() => {
								this.setGoodsInfo()
							}, 1000)
						} else if (res.finished === 1) {
							uni.showModal({
								content: this.$t('order.detail.tip10'),
								showCancel: false,
								confirmText: this.$t('confirm'),
								success: (res) => {
									if	(res.confirm) {
										uni.switchTab({
											url: '/pages/order/index',
										})
										setTimeout(() => {
											uni.$emit('order',{
												index: 1 // 订单全部支付完后直接到商户支付那里
											})
										}, 500)
									}
								},
							})
						}
					}
				}, (err) => {
					if (err.code === -1) { // 错误时重置密码
						this.pay_password = null
					}
				})
			},
			handlePasswords (e) {
				this.pay_password = e
				// 输入完支付密码再去提交保存
				this.handleSendPay()
			},
			handleConfirmOrder () { // 确认保存订单
				if (!this.pay_password) {
					this.show = true
				} else {
					this.handleSendPay()
				}
			},
			setGoodsInfo () { // 设置当前订单
				let time_now = moment().unix()
				getOrders(0, 1, 20).then((res) => {
					let time_reacive = moment().unix()
					this.time_diff = time_reacive - time_now >= 1 ? Math.floor((time_reacive - time_now) / 2) : 0 //时间差小于一秒就不修正
					console.log('getOrders',res)
					if (res.data.length === 0) { // 返回空数据的情况
						return
					}
					res.data.sort((a, b) => {
						return a.sort - b.sort
					})
					res.data.forEach((item, index) => {
						
						if (String(item.id) === this.selectId) {
							console.log(item.id)
							this.goodsInfo = res.data[index]
							this.goodsInfo.pictures  = config.API_ASSETS + res.data[index].pictures
							this.goodsInfo.seconds  = this.timestamp(res.data[index].seconds)
							return
						}
					})
					if (!this.selectId) {
						this.goodsInfo = res.data[0]
						this.goodsInfo.pictures  = config.API_ASSETS + res.data[0].pictures
						this.goodsInfo.seconds  = this.timestamp(res.data[0].seconds)
					}
				})
			},
			timestamp (seconds) {
				let data
				data = seconds - this.time_diff
				if (data <= 0) {
					data = 0
				}
				return data
			},
		},
		onLoad(e) {
			console.log('e', e)
			this.selectId = e.id
			this.setGoodsInfo()
			
			//info().then(res => {
				// console.log(res)
			//	this.rate = res.data.rate;
			///	
				//console.log(this.rate)
			//});
		},
		// beforeRouteLeave(to, from, next) {
		// 	this.$store.commit('SET_CURRENTGOODS') // 离开页面的时候清空（表明不再连续支付），需要再次支付 去到order/detail页面
			
		// 	this.$store.commit('SET_ORDERARR')
		// 	// 导航离开该组件的对应路由时调用
		// 	// 可以访问组件实例 `this`
		// 	next();
		// },
	}
</script>

<style lang="scss" scoped>
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
		background: #6F67FC;
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
	background: #6F67FC!important;
	margin: 14px 15px 0;
	height: 90rpx;
	color: #ffffff;
	line-height: 68rpx;
}
</style>
