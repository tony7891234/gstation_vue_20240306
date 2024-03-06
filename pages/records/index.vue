<template>
	<view>
		<u-calendar v-model="show" :mode="'range'" :confirm_btn_text="$t('confirm')"
			:start-text="$t('records.time_start')" :end-text="$t('records.time_end')" @change="change">
			<view slot="tooltip" class="tooltip">
				{{$t('records.pls')}}
			</view>
		</u-calendar>
		<c-head :title="$t('records.title')">
		</c-head>
		<c-tabs-change :list="list" :isScroll="true" @indexChange="handleChange" :current="current">
			<view class="time-select">
				<view class="select" @click="showDates">
					{{ beginTime + '-' + endTime }}
					<u-icon name="arrow-down-fill"></u-icon>
				</view>
				<view class="nums">
					<!-- 	<text>{{$t('records.total') + total_number }}</text>
					<text>{{$t('records.current') + current_number }}</text>
					<text>{{$t('records.total_amount') + total_amount }}</text> -->
					<text>{{$t('records.current_amount') + Number(current_amount).toFixed(2) }}</text>
				</view>
			</view>
			<template v-if="dataList.length > 0 && status !== 'loading'">
				<scroll-view scroll-y="true">
					<view class="scroll-container">
						<view class="dataitem border-bottom" v-for="(item, index) in dataList"
							:key="item.order_no + item.tag">

							<!-- 充值记录 -->
							<template v-if="current === 0">
								<view class="rate">
									<view class="time">{{item.create_time}}</view>
									{{$t('records.order_no') + item.order_no}}
									<br>
									{{$t('records.amount') + item.amount}}
								</view>
								<view class="content">
									<template v-if="Number(item.status) === 0">
										{{$t('records.unpaid')}}
									</template>
									<template v-if="Number(item.status) === 1">
										{{$t('records.paid')}}
									</template>
									<template v-if="Number(item.status) === 2">
										{{$t('records.unsucceeded')}}
									</template>
									<template v-if="Number(item.status) === 3">
										{{$t('records.failed')}}
									</template>
								</view>
							</template>
							<!-- 提款记录 -->
							<template v-if="current === 1">
								<view class="rate">
									{{$t('records.order_no') + item.order_no}}
									<br>
									{{$t('records.submit_amount') + item.amount}}
									<br>
									{{$t('records.received_amount') + (item.amount - (item.amount*item.withdraw_rate)).toFixed(2)}}
								</view>
								<view class="content">
									<template v-if="Number(item.status) === 0">
										{{$t('records.creating')}}
									</template>
									<template v-if="Number(item.status) === 1">
										{{$t('records.succeeded')}}
									</template>
									<template v-if="Number(item.status) === 2">
										{{$t('records.paying')}}
									</template>
									<template v-if="Number(item.status) === 3">
										{{$t('records.failed')}}
									</template>
								</view>
							</template>
							<!-- 抓取记录 -->
							<template v-if="current === 2">
								<view class="rate">
									{{item.goods_name}}
								</view>
								<view class="content">
									<template v-if="Number(item.status) === 0">
										{{$t('records.unfinished')}}
									</template>
									<template v-if="Number(item.status) === 1">
										{{$t('records.finished')}}
									</template>
									<template v-if="Number(item.status) === 2">
										{{$t('records.settlement')}}
									</template>
									<template v-if="Number(item.status) === 3">
										{{$t('records.frozen')}}
									</template>
								</view>
							</template>
							<!-- 抓取记录 -->
							<template v-if="current === 3">
								<view class="rate">
									
									{{item.create_time}}
									
									<br>
								
									{{$t('records_form')}} : {{item.to_username}}
								</view>
								<br>
								
								
								<view class="content">
									{{item.money}} {{$t('moneyLogo1')}}
								</view>
							</template>
						</view>
					</view>
				</scroll-view>
			</template>
			<template v-if="status !== 'loading' && dataList.length === 0">
				<view class="nodata">
					<img src="../../static/empty.png"/>
					<view class="empty">{{$t('records.no_records')}}</view>
				</view>
			</template>
		</c-tabs-change>
		<c-pagination v-if="dataList.length !== 0" :current="this.page" :total-items="total" page-items="20"
			@change="pageChange" :show-icon="true" :show-first="false" :show-last="false"></c-pagination>
	</view>
</template>

<script>
	import {
		getBills
	} from '../../service/user.api.js'
	import dayjs from 'dayjs'
	export default {
		data() {
			return {
				total_number: '0',
				current_number: '0',
				total_amount: '0',
				current_amount: '0',
				loadText: {
					loadmore: this.$t('loadText.loadmore'),
					loading: this.$t('loadText.loading'),
					nomore: this.$t('loadText.nomore')
				},
				status: 'loadmore',
				list: [
					// {
					// 	name: 'All'
					// },
					{
						name: this.$t('records.recharge')
					},
					{
						name: this.$t('records.withdraw'),
					},
					{
						name: this.$t('records.grab')
					},
					{
						name: this.$t('records.commission')
					},
					// {
					// 	name: 'Financial'
					// },
					// {
					// 	name: 'VIP'
					// },
				],
				dataList: [],
				current: 0, // 当前tap，即type
				total: 0, // 当前选定时间下的总页数
				page: 1,
				beginTime: '',
				endTime: '',
				show: false
			}
		},
		computed: {
			total_pages() {
				console.log('Math.ceil(this.total/20)', Math.ceil(this.total / 20))
				return Math.ceil(this.total / 20)
			}
		},
		methods: {
			handleRoute() {
				uni.switchTab({
					url: 'pages/grab/index'
				})
			},
			countAmount() { // 计算当前页的总金额
				this.current_amount = 0
				this.dataList.forEach((item, index) => {
					if (this.current === 3) {
						this.current_amount += item.money
					} else {
						this.current_amount += item.amount
					}
				})
			},
			get(type) {
				this.status = 'loading'
				uni.showLoading({
					title: '',
				})
				// 当前tap，选定时间下的某一页的数据
				getBills(this.current, this.beginTime, this.endTime, this.page).then((res) => {
					console.log('get bills', res)
					uni.hideLoading({
						title: '',
					})
					this.status = 'loadmore'
					this.total = res.count
					if (res.data.length > 0 && res.data.length >= 20) {
						if (type === 'init') {
							this.dataList = res.data
						} else {
							this.dataList = this.dataList.concat(res)
						}
					} else if (res.data.length < 20 && res.data.length > 0) {
						this.status = 'nomore'
						this.dataList = res.data
					}
					this.countAmount()
				})
			},
			handleInit() {
				this.get('init')
			},
			handleLoadmore() {
				if (this.status !== 'nomore') {
					this.page += 1
					this.get('more')
				}
			},
			handleChange(index) {
				this.dataList = []
				this.current = index
				this.page = 1 // 切换tap页面变为1
				this.get('init')
			},
			routeDetail(id) {
				this.$u.route({
					url: '/pages/order/detail',
					params: {
						id
					}
				})
			},
			showDates() { // 显示日历数据
				this.show = true
			},
			change(e) { // 日历change事件
				console.log('日历', e);
				this.beginTime = e.startDate
				this.endTime = e.endDate
				this.page = 1
				this.handleInit()
			},
			pageChange(e) {
				console.log('翻页', e);
				this.page = e.current
				this.get('init')
			}
		},
		onReachBottom() {
			this.handleLoadmore()
		},
		onLoad(e) {
			this.beginTime = dayjs().startOf('months').format('YYYY-MM-DD')
			this.endTime = dayjs().format('YYYY-MM-DD')
			if (e.type) {
				this.current = Number(e.type)
				this.handleChange(this.current)
			} else {
				this.handleInit()
			}
		}
	}
</script>

<style lang="scss">
	.tooltip {
		padding: 0 5px;
		width: 100%;
		text-align: center;
	}

	.time-select {
		padding: 10px;

		.select {}

		.nums {
			opacity: .4;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}

	.dataitem {
		display: flex;
		justify-content: space-between;

		align-items: center;
		width: 700rpx;
		height: 90px;
		padding: 20px 40rpx;
		background: #FFFFFF;
		border: 1px solid #D9D9D9;
		margin: 0 auto 14px;
		line-height: 20px;

		.time {
			font-weight: 600;
			color: #1B1B1B;
		}

		.rate {
			color: #7B7B7B;
			flex: 1;
			margin-right:20rpx;
			pointer-events: none;
			font-size: 12px;
		}

		.content {
			text-align: end;
		}
	}

	.scroll-container {
		height: calc(100vh - 200px);
	}

	.nodata {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 500px;
	}
	.empty{
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #868686;
		line-height: 20px;
	}
</style>
