<template>
	<view id="team">
		<u-calendar v-model="show" :mode="'range'" :confirm_btn_text="$t('confirm')" :start-text="$t('records.time_start')"  :end-text="$t('records.time_end')" @change="change">
			<view slot="tooltip" class="tooltip">
				{{$t('records.pls')}}
			</view>
		</u-calendar>
		<c-head :title="$t('team.title')"></c-head>
		<c-tabs-change :list="list" :isScroll="true" @indexChange="handleChange" :current="current">
			<view class="card">
				<view class="line2 border-bottom">
					<view class="item">
						<view class="title"><!-- {{$t('team.today_commision')}} -->Month total</view>
						<view class="num"><text class="money-icon">{{$t('moneyLogo')}}</text>{{ info.month_total|| 0 | fix2}}</view>
					</view>
					
					<view class="item">
						<view class="title"><!-- {{$t('team.num')}} -->Rebate point</view>
						<view class="num"><text class="money-icon"></text>{{info.rebate_point}}</view>
					</view>
				</view>
				<view class="line2 border-bottom">
					<view class="item">
						<view class="title"><!-- {{$t('team.today_recharge')}} -->Yesterday</view>
						<view class="num"><text class="money-icon">{{$t('moneyLogo')}}</text>{{ info.yesterday || 0 | fix2}}</view>
					</view>
					<view class="item">
						<view class="title"><!-- {{$t('team.today_withdraw')}} -->Team size</view>
						<view class="num">{{total?total:0}}</view>
					</view>
				</view>
			</view>
			<view class="time-select" >
				<view class="select" @click="showDates">
					{{$t('records.time')}} <u-icon name="arrow-down-fill"></u-icon>
				</view>
				<view class="nums">
					<text>{{$t('team.today_recharge') + total_recharge }}</text>
					<text>{{$t('team.total_withdraw') + total_withdraw }}</text>
				</view>
			</view>
			<template v-if="dataList.length > 0 && status !== 'loading'">
				<scroll-view scroll-y="true">
					<view class="scroll-container">
						<view class="dataitem border-bottom" v-for="(item, index) in dataList" :key="item.content + index">
							<view class="left">
							</view>
							<view class="right">
								<view class="item">
									<view class="top">
										<text>{{item.day}}</text>
										<text>rebate_profit : {{item.rebate_profit}}</text>
									</view>
									<view class="bottom">
										<text>{{item.username}}</text>
										<text>user_profit : {{item.user_profit}}</text>
									</view>
								</view>
							</view>
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
		<c-pagination
		 v-if="dataList.length !== 0"
		 :current="this.page"
		 :total-items="this.total"
		  @change="pageChange"
		   :show-icon="true"
			:show-first="false"
			 :show-last="false"></c-pagination>
			 
			<div style="width: 100%;height: 50px;"></div>
	</view>
</template>

<script>
	import { getMemer, getTeam } from '../../service/user.api.js'
	export default {
		data() {
			return {
				total_recharge:'',
				total_withdraw: '',
				loadText: {
					loadmore: this.$t('loadText.loadmore'),
					loading: this.$t('loadText.loading'),
					nomore: this.$t('loadText.nomore')
				},
				status: 'loadmore',
				list: [{
						name: this.$t('team.direct')
					}, {
						name: this.$t('team.secondary')
					}, 
					// {
					// 	name: this.$t('team.tertiary'),
					// }
				],
				dataList: [
				],
				member_list: [
					
				],
				current: 0, // 当前tap，即type
				total: 0, // 当前选定时间下的总页数
				page: 1,
				beginTime: '',
				endTime: '',
				show: false,
				info: {
					
				},
			}
		},
		filters: {
			fix2 (data) {
				return Number(data).toFixed(2)
			}
		},
		methods: {
			handleRoute () {
				uni.switchTab({
					url: 'pages/grab/index'})
			},
			get (type) {
				
				if(this.current == 1){
					getMemer(this.current, this.beginTime, this.endTime, this.page).then((res) => {
					
						uni.hideLoading({
							title:  '',
						})
						this.status = 'loadmore'
						//this.total = res.count
						//this.dataList = res.data
						this.member_list = res.data
						//this.info = res.rebate
						// console.log(this.info)
					
						// if (res.length > 0 && res.length >= 10) {
						// 	if (type === 'init') {
						// 		this.dataList = res
						// 	} else {
						// 		this.dataList = this.dataList.concat(res)
						// 	}
						// } else if (res.length < 10 && res.length > 0) {
						// 	this.status = 'nomore'
						// 	this.dataList = res
						// }
					})
					return;
				}

				this.status = 'loading'
				uni.showLoading({
					title:  '',
				})

				// 当前tap，选定时间下的某一页的数据
				getTeam(this.current, this.beginTime, this.endTime, this.page).then((res) => {
					
					uni.hideLoading({
						title:  '',
					})
					this.status = 'loadmore'
					this.total = res.count
					this.dataList = res.data
					this.member_list = res.member_list
					this.info = res.rebate
					// console.log(this.info)
				
					// if (res.length > 0 && res.length >= 10) {
					// 	if (type === 'init') {
					// 		this.dataList = res
					// 	} else {
					// 		this.dataList = this.dataList.concat(res)
					// 	}
					// } else if (res.length < 10 && res.length > 0) {
					// 	this.status = 'nomore'
					// 	this.dataList = res
					// }
				})
			},
			handleInit () {
				this.get('init')
			},
			handleLoadmore () {
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
			routeDetail (id) {
				this.$u.route({
					url: '/pages/order/detail',
					params: {
						id
					}
				})
			},
			showDates () { // 显示日历数据
				this.show = true
			},
			change(e) { // 日历change事件
				console.log('日历', e);
				this.beginTime = e.startDate
				this.endTime =  e.endDate
				this.page = 1
				this.handleInit()
			},
			pageChange(e) {
				console.log('翻页', e);
				this.page = e.current
				this.get()
			}
		},
		// onReachBottom () {
		// 	console.log('onReachBottom')
		// 	this.handleLoadmore()
		// },
		onLoad(e) {
			console.log('records onLoad')
			if	(e.type) {
				this.current = Number(e.type)
				this.handleChange(this.current)
			}
			this.handleInit()
		}
	}
</script>

<style lang="scss">
@import "../../static/c.scss";
.tooltip {
	padding: 0 5px;
	width: 100%;
	text-align: center;
}
.time-select {
	width: 700rpx;
	margin: 20px auto;
	.select {
		
	}
	.nums {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		text {
			width: 40%;
		}
	}
}
.dataitem {
	display: flex;
	justify-content: space-between;
	padding: 5px 10px;
	align-items: center;
	line-height: 25px;
	width: 700rpx;
	height: 68px;
	background: #FFFFFF;
	border: 1px solid #D9D9D9;
	margin: 0 auto 15px;
	border-radius: 8px;
	.rate {
		color: #f80;
		flex: 1;
		margin-left: 30px;
		pointer-events: none;
	}
	.content {
		text-align: end;
	}
}
.scroll-container {
	height: calc(100vh - 776rpx - 66rpx);
}
.nodata {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.card {
	width: 700rpx;
	background: linear-gradient(90deg,$color1,$color2) !important;
	padding: 36rpx;
	margin: 0 auto;
	border-radius: 5px;
	color: #FFFFFF;
	margin-top: 20px;
	.item {
		width: 50%;
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
	margin: 20rpx 0;
	padding-bottom: 20rpx;
}
.line3 {
	display: flex;
	margin-bottom: 30rpx;
}
.line4 {
	display: flex;
}
.dataitem{
	display: flex;
	padding: 10px;
	box-sizing: border-box;
	.left {
		background-color: #9be2b1;
		border-radius: 50%;
		width: 0rpx;
		height: 76rpx;
	}
	.right {
		margin-left: 10px;
		flex: 1;
		.item {
			.top {
				display: flex;
				justify-content: space-between;
				text:nth-child(1) {
					font-weight: bold;
				}
				text:nth-child(2) {
					color: red;
					font-weight: bold;
				}
			}
			.bottom {
				display: flex;
				justify-content: space-between;
				opacity: 0.6;
			}
		}
	}
}
.title{
	margin-bottom: 10px;
	
}
.empty{
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #868686;
	line-height: 20px;
}
</style>

