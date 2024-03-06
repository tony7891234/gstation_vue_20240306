<template>
	<view id="order">
		<c-head  :title="$t('order.title')"></c-head>
		<c-tabs-change :list="list" :isScroll="false" @indexChange="handleChange"  :current="current">
			<template v-if="dataList.length > 0">
				<view class="record-card">
					<u-card margin="30rpx 0"
						@click="routeDetail(item, index)"
						v-for="(item, index) in dataList"
					   :key="String(item.order_no) + index + current + 'a'">
					   <view class="card_head" slot="head">
							<text>{{ item.create_time }}</text>
							<text>{{ $t('order.no') + item.batch_no }}</text>
						</view>
						<view class="item" slot="body">
							<u-image class="left" width="100rpx" height="100rpx" :src="item.pictures ? item.pictures : '../../static/good.jpg'" mode="aspectFill"></u-image>
							<div style="height: 100%;width: 10px;"></div>
							<view class="mid">
								<view class="order-no">{{ item.order_no }}</view>
								<view class="amount">{{$t('order.amount') + $t('moneyLogo') + item.amount.toFixed(2) }}</view>
								<view class="amount">{{$t('order.commision') + item.commission_rate }}</view>
								<view class="amount">{{$t('order.earnings') + (item.amount * item.commission_rate).toFixed(2) }}</view>
								<!-- <view class="amount">Numbers:{{ item.num }}</view> -->
							</view>
							<view class="right">
								<view class="u-margin-bottom-10 u-flex u-flex-col u-col-center" v-if="current === 0 || current === 2">
									<text class="u-margin-bottom-10" style="color: #6F67FC;text-align: center;"  v-if="current === 0">{{$t('order.click')}}</text>
									<text class="u-margin-bottom-10" style="color: #6F67FC;text-align: center;"  v-if="current === 2">{{$t('order.waiting')}}</text>
									<u-count-down :timestamp="item.seconds" color="#6F67FC" :show-days="false" @end="handleEnd(index)" @change="handleTimeChange($event, index)"></u-count-down>
								</view>
								<!-- <text  v-if="current === 0" class="u-margin-bottom-10" style="text-align: center;">Time out!</text> -->
								<text v-if="current === 2" class="u-margin-bottom-10" style="color: #6F67FC; text-align: center;">{{$t('order.merchant')}}</text>
								<text  v-if="current === 1" class="u-margin-bottom-10" style="text-align: center;">{{$t('order.completed')}}</text>
								<text class="right_amount">+{{ (item.amount * item.commission_rate).toFixed(2)}}</text>
								<text  v-if="current === 3" class="u-margin-bottom-10" style="text-align: center;">{{$t('order.frozen')}}</text>
							</view>
						</view>
					</u-card>
				</view>
			</template>
			<template v-if="status !== 'loading' && dataList.length === 0">
				<view class="nodata">
					<u-icon name="order" size="100"></u-icon>
					<view>{{$t('order.no2')}}</view>
					<view class="btn"
					@click="handleRoute"
					>{{$t('order.grab')}}</view>
				</view>
			</template>
			<u-loadmore v-if="dataList.length !== 0  ||  status === 'loading'" :status="status" :load-text="loadText" class="u-margin-top-20" />
		</c-tabs-change>
	
	</view>
</template>

<script>
	import config from '../../config/index.js'
	import moment from 'dayjs'
	import { getOrders } from '../../service/grab.api.js'
	export default {
		data() {
			return {
				loadText: {
					loadmore: this.$t('order.load_more'),
					loading: this.$t('order.load_loading'),
					nomore: this.$t('order.load_no')
				},
				status: 'loadmore',
				list: [{
					name: this.$t('order.tap1')
				}, {
					name: this.$t('order.tap2')
				}, {
					name: this.$t('order.tap3'),
				}, {
					name: this.$t('order.tap4')
				}],
				dataList: [
				],
				current: 0, // 当前tap，即type
				page: 1,
				limit: 10,
				time_diff: null, // 时间差值,实际上客户看到的时间不需要修正
				isNotParamsJump: true, // 不是带参数的跳过来的,即正常的页面切换
			}
		},
		methods: {
			handleTimeChange (e, index) {
				this.$set(this.dataList, index, {...this.dataList[index], seconds: e})
			},
			timestamp (seconds) {
				let data
				if (this.current === 0) {
					data = seconds - this.time_diff
				} else if (this.current === 2) {
					data = seconds - this.time_diff
				}
				if (data <= 0) {
					data = 0
				}
				return data
			},
			handleRoute () {
				uni.switchTab({
					url: 'pages/grab/index'})
			},
			get (type) {
				this.status = 'loading'
				if (type === 'init') {
					this.page = 1
					this.dataList = []
				}
				let current_copy = this.current
				let time_now = moment().unix()
				getOrders(this.current, this.page, this.limit).then((res) => {
					let time_reacive = moment().unix()
					this.time_diff = time_reacive - time_now >= 1 ? Math.floor((time_reacive - time_now) / 2) : 0 //时间差小于一秒就不修正
					console.log('time diff', this.time_diff)
					if (current_copy !== this.current) {
						return
					}
					console.log('getOrders',res)
					this.status = 'loadmore'
					uni.stopPullDownRefresh()
					if (res.data.length === 0) { // 返回空数据的情况
						return
					}
					// if (res.data[0].seconds === 0) { // 如果返回的时间为0，跳到已完成
					// 	this.handleChange(1)
					// 	return
					// }
					if (res.data.length > 0 && res.data.length >= 10) {
						if (type === 'init') {
							this.dataList = res.data
						} else {
							this.dataList = this.dataList.concat(res.data)
						}
					} else if (res.data.length < 10 && res.data.length > 0) {
						this.status = 'nomore'
						this.dataList = this.dataList.concat(res.data)
					}
					if (this.current === 0) { // 待支付页面才进行排序
						this.dataList.sort((a, b) => {
							return a.sort - b.sort
						})
					}
					this.dataList.forEach((item, index2) => {
						if (item.pictures.indexOf('http') < 0) {
							item.pictures  = config.API_ASSETS + item.pictures
						}
						// item.show = true
						item.seconds = this.timestamp(item.seconds)
						// if (this.current === 0) {
						// 	item.timestamp = 10
						// } else if (this.current === 2) {
						// 	item.timestamp = 5
						// }
						
					})
				})
			},
			handleEnd (res) {
				// this.$set(this.dataList, index , {...this.dataList[index], show: false})
				console.log('End', res)
				if (this.current === 2) {
					this.handleChange(1)
				}
				if (this.current === 0) { // 时间到跳到冻结订单那里
					this.handleChange(3)
				}
			},
			handleLoadmore () {
				if (this.status !== 'nomore') {
					this.page += 1
					this.get('more')
				}
			},
			handleChange(index) {
				console.log('handleChange', index)
				this.dataList = []
				this.current = index
				this.page = 1
				this.get() 
			},
			routeDetail (obj, index) {
				// if (this.dataList[index].show === false) { // 说明订单被冻结了，不给继续支付
				// 	uni.showModal({
				// 		content: "The current order has been frozen, please contact customer service.",
				// 		confirmText: 'Confirm',
				// 		showCancel: false
				// 	})
				// 	return
				// }
				if (!this.$store.state.user.realname || !this.$store.state.user.phone_number || !this.$store.state.user.address) {
					uni.showModal({
						content: this.$t('order.tip1'),
						confirmText: this.$t('confirm'),
						success: (res) => {
							if	(res.confirm) {
								this.$u.route({
									url: 'pages/user/address'
								})
							}
						},
					})
					return
				}
				if (this.current === 0) {
					this.$u.route({ // 如果是待支付的，就跳到grab detail去连续支付
						url: '/pages/order/detail_pay',
						params: {
							...obj,
						}
					})
				} else {
					this.$u.route({
						url: '/pages/order/detail',
						params: {
							...obj,
							current: this.current
						}
					})
				}
				
			}
		},
		onReachBottom () {
			this.handleLoadmore()
		},
		onLoad () {
			this.get('init')
			this.isNotParamsJump = false // 刷新页面或者第一次的时候不让执行onShow
			uni.$on('order',(data) => {
				this.isNotParamsJump = false
				this.handleChange(Number(data.index))
			})
		},
		onShow () {
			console.log('onshow')
			if (this.isNotParamsJump) { // 正常的页面切换
				this.get('init')
			}
		    
		},
		onHide() {
			this.isNotParamsJump = true
		},
		onPullDownRefresh () {
			this.get('init')
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/c.scss";
	#order {
		margin-bottom: 25px;
		.nodata {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #CCCCCC;
			.btn {
				background: linear-gradient(90deg,$color1,$color2) !important;
				width: 240rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 15px;
				color: #FFFFFF;
				margin-top: 10px;
			}
		}
		.record-card {
			.item {
				background: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left {
					width: 90rpx;
					height: 90rpx;
				}
				.mid {
					color: #969393;
					margin-left: 5px;
					.order-no {
						color: #000000;
						font-weight: 700;
						font-size: 13px;
						line-height: 17px;
						overflow: hidden;
						text-overflow: ellipsis;
						max-width: 170px;
						white-space: nowrap;
						line-height: 20px;
					}
				}
				.right {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					line-height: 17px;
					.right_amount {
						width: 200rpx;
						padding: 5px 10px;
						text-align: center;
						box-sizing: border-box;
						background: #6F67FC;
						border-radius: 20px;
						color: #fff;
						font-size: 12px;
					}
				}
			}
		}
		.card_head {
			display: flex;
			justify-content: space-between;
		}
	}
	
</style>
