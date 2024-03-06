<template>
	<view id="team">
		<!-- <u-calendar v-model="show" :mode="'range'" :confirm_btn_text="$t('confirm')" :start-text="$t('records.time_start')"  :end-text="$t('records.time_end')" @change="change">
			<view slot="tooltip" class="tooltip">
				{{$t('records.pls')}}
			</view>
		</u-calendar> -->
		<c-head :title="$t('team.title')"></c-head>
        
        <view class="dataitem border-bottom" style="z-index:100;position:fixed;" >
            <view class="right">
                <view class="item">
                    <view class="bottom">
                        <text class="tip1">{{$t('team.account')}}</text>
                        <text class="tip2">{{$t('team.phone')}}</text>
                        <text class="tip3">{{$t('team.register_time')}}</text>
                        <text class="tip4">{{$t('team.balance')}}</text>
                        <text class="tip5">{{$t('team.income')}}</text>
                    </view>
                </view>
            </view>
        </view>

		<div style="height:80px;"></div>
        <view class="dataitem border-bottom" v-for="(item, index) in dataList" :key="index">
            <view class="right">
                <view class="item">
                    <view class="bottom">
                        <text class="tip1">{{item.username}} </text>
                        <text class="tip2">{{item.phone}}</text>
                        <text class="tip3">{{item.create_time}}</text>
                        <text class="tip4">{{item.balance}}</text>
                        <text class="tip5">{{item.rebate_amount}}</text>
                    </view>
                </view>
            </view>
        </view>

		<c-pagination 
			v-if="dataList.length !== 0" 
			:current="this.page" 
			:total-items="this.total" 
			:page-items="10"
				@change="pageChange" 
				:show-icon="true" 
				:show-first="false" 
				:show-last="false">
		</c-pagination>

        <template v-if="dataList.length == 0">
            <view class="nodata">
                <img src="../../static/empty.png"/>
                <view class="empty">{{$t('team.no_data')}}</view>
            </view>
        </template>
	</view>
</template>

<script>
	import { getTeam1 } from '../../service/user.api.js'
	export default {
		data() {
			return {
				page:1,
				total:0,
				total_page : '',

				loadText: {
					loadmore: this.$t('loadText.loadmore'),
					loading: this.$t('loadText.loading'),
					nomore: this.$t('loadText.nomore')
				},
				status: 'loadmore',
				// list: [{
				// 		name: this.$t('team.direct')
				// 	}, {
				// 		name: this.$t('team.secondary')
				// 	}, 
				// 	// {
				// 	// 	name: this.$t('team.tertiary'),
				// 	// }
				// ],
				dataList: [
				],
				current: 0, // 当前tap，即type
				//total: 0, // 当前选定时间下的总页数
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
		computed: {
			total_pages() {
				//console.log('Math.ceil(this.total/10)', Math.ceil(this.total / 10))
				return Math.ceil(this.total / 10)
			}
		},
		methods: {
			handleRoute () {
				uni.switchTab({
					url: 'pages/grab/index'})
			},
			get () {

				console.log('get')
				// this.status = 'loading'
				// uni.showLoading({
				// 	title:  '',
				// })
				// 当前tap，选定时间下的某一页的数据
				getTeam1(this.current, this.beginTime,this.endTime, this.page).then(res => {
					// uni.hideLoading({
					// 	title:  '',
					// })
					this.dataList = res.data
					this.total = res.count
					// this.total_page = res.total_page

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
            console.log(e)
            this.current = Number(e.type)

            if(e.beginTime){
                this.beginTime = e.beginTime;
                this.endTime = e.endTime;
            }
            this.handleChange(this.current)
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
	//padding: 5px 10px;
	align-items: center;
	line-height: 25px;
	width: 100%;
	height: 68px;
	background: #FFFFFF;
	border: 1px solid #D9D9D9;
	margin: 0 auto 2px;
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
	margin-top: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.card {
	width: 700rpx;
	background: linear-gradient(90deg,$color1,$color2) !important;
	//padding: 36rpx;
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
	//padding: 10px;
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

.tip1{
    width: 20%;
}
.tip2{
    width: 22%;
}
.tip3{
    width: 28%;
}
.tip4{
    width: 15%;
}
.tip5{
    width: 15%;
}
</style>

