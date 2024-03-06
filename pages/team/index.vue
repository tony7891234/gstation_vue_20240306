<template>
	<view id="team">
		<c-head :title="$t('team.title')" :isBack="false">
		</c-head>

		<view class="container">
			<view class="bg">
				<uni-view>{{$t('invite.tip1')}}</uni-view>
				<uni-view>{{$t('invite.tip2')}}</uni-view>
			</view>
			<view class="left">
				<view class="code">
					{{$t('invite.invitation')}}:
					<br>
					{{ code }}</view>
				<!-- <view class="qrimg">
				    <tki-qrcode
					:showLoading="false"
				    ref="qrcode"
				    :val="this.src"
				    :size="300"
				    :onval="true"
				    :loadMake="true"
				    :usingComponents="true"/>
				</view> -->
			</view>
			<view class="right">
				<view type="button" class="btn" @click="copyCode">{{ $t('invite.copy') }}</view>
				<!-- <u-button type="button" class="btn btn2" @click="handleGo">{{ $t('invite.reward') }}</u-button> -->
			</view>
		</view>

		<t-calendar v-model="show" :mode="'range'" :confirm_btn_text="$t('confirm')"
			:start-text="$t('records.time_start')" :end-text="$t('records.time_end')" @change="change">
			<view slot="tooltip" class="tooltip">
				{{$t('records.pls')}}
			</view>
		</t-calendar>
		
		<view class="time-select">
			<view class="select" @click="showDates">
				{{$t('records.time')}}
				<u-icon name="arrow-down-fill"></u-icon>
			</view>
			
		</view>
		<view class="card">
			<view class="line2 border-bottom">
				<view class="item">
					<view class="title">{{$t('team.team_total')}}</view>
					<!-- <view class="num">{{ team_data.team_info.team_total}}</view> -->
					<view class="num">{{data.team_total}}</view>
				</view>
				
				<view class="item">
					<view class="title">{{$t('team.team_recharge')}}</view>
					<view class="num">{{data.team_recharge}}</view>
					<!-- <view class="num">{{ team_data.team_info.team_recharge|| 0 | fix2}}</view> -->
				</view>
				
			</view>

			<view class="line2 border-bottom">
				<view class="item">
					<view class="title">{{$t('team.team_rebate')}}</view>
					<view class="num">{{data.team_withdraw}}</view>
					<!-- <view class="num">{{ team_data.team_info.team_rebate|| 0 | fix2}}</view> -->
				</view>
				<view class="item">
					<view class="title">{{$t('account.yesterday_earnings')}}</view>
					<view class="num">{{data.yesterday_income}}</view>
					<!-- <view class="num">{{ team_data.team_info.new_team_total }}</view> -->
				</view>
			</view>
			<!-- <view class="line2 border-bottom">
				<view class="item">
					<view class="title">{{$t('team.new_team_recharge')}}</view>
					<view class="num">{{data.new_team_recharge}}</view>
				</view>
				<view class="item">
					<view class="title">{{$t('team.new_team_rebate')}}</view>
					<view class="num">{{data.new_team_withdraw}}</view>
				</view>
			</view> -->
		</view>

		<template v-if="data">
			<scroll-view scroll-y="true">
				<view class="scroll-container">
					<div class="msgtitle">{{$t('team.tip11')}}</div>
					<view class="dataitem border-bottom" >
						<view class="item">
							<view class="shouru">{{$t('team.tip2')}}: {{data.total_income}}</view>
							<view class="shouru">{{$t('team.tip3')}}: {{data.task_income}}</view>
							<view class="shouru">{{$t('team.tip4')}}: {{data.recharge_rebate}}</view>
						</view>
					</view>
					<div class="msgtitle">{{$t('team.tip12')}}</div>
					<view class="dataitem border-bottom" >
						<view class="item">
							<view class="shouru">{{$t('team.team_total')}}: {{data.task_team_size}}</view>
							<view class="shouru">{{$t('team.tip1')}}: {{data.task_team_rebate}}</view>
							<view class="shouru detail"  @click="routePage1('pages/team/detail', 1)">{{$t('team.go')}}</view>
						</view>
						
					</view>
					<div class="msgtitle">{{$t('team.tip13')}}</div>
					<view class="dataitem border-bottom" >
						<view class="item">
							<view class="shouru">{{$t('team.team_total')}} : {{data.recharge_team_size}}</view>
							<view class="shouru">{{$t('team.tip1')}} : {{data.recharge_team_rebate}}</view>
							<view class="shouru detail" @click="routePage1('pages/team/detail', 2)">{{$t('team.go')}}</view>
						</view>
					</view>

					<!-- <div class="msgtitle">{{$t('team.team_recommend_list')}}</div>
					<view class="dataitem border-bottom" v-for="(item, index) in team_data.team_recommend_list"
						:key="item.content + index">
						<view class="left">
						</view>
						<view class="right">
							<view class="item">
								<view class="top">
									<text>{{index=='team_1'?$t('team.level1'):index=='team_2'?$t('team.level2'):$t('team.level3')}}</text>
									<text>{{$t('team.count')}} : {{item.count}}</text>
								</view>
								<view class="bottom">
									<text> </text>
									<text>{{$t('team.total')}} : {{item.total}}</text>
								</view>
							</view>
						</view>
					</view> -->
				</view>
			</scroll-view>
		</template>



		<!-- <div class="info" @click="routePage1('/pages/team/index1')" style="height:50px">
		

				<h3 >{{$t('team.go')}}</h3>
			
		
			<img style="width: 10px;"
				src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAABQ0lEQVQ4jY3Qu05UURQG4G9UOpCaiRpLEEyUs17AGwERraTjuax9AMXEoD6AxtsqvYBGjcEGNfoIY8HCjDhzDrvaxf7y///uNU1zB4GNzNx2hHMM64UeR8TsUdEt/MLZguc6UWY+xc0huBUR811JMvMZbuBnwUcRsdCKCj7HGn7gTMHzrajgiyF4uuCFVlTwZVX9jlP2N15sRQVfFdxDv+BiKyr4GqsFZwoG9AaDwTgHIqLBw4J7WOtEBefwxP6v/h5b79CZxkTdu1FEXKqUGXzEUiuKiCt4UEkfsJyZn8aiiLiM+ziJHaxk5mfGfHlEXMXmKDASFThI2C7wZfjNiREbNjFZ4Pph8E/SUKVJvK/R/4G/KCKuVaUpvKtKX0cB6DVNs4R7lfAWq23gYNPdAm9qw24bgOP9fn8CPdzOzG9dAP4AwFt8NX6830gAAAAASUVORK5CYII=" />
		</div> -->
		
		<c-pagination v-if="dataList.length !== 0" :current="this.page" :total-items="this.total" @change="pageChange"
			:show-icon="true" :show-first="false" :show-last="false"></c-pagination>

		<div style="width: 100%;height: 50px;"></div>
	</view>
</template>

<script>
	import {
		team
	} from '../../service/user.api.js'
    import TCalendar from '@/components/t-calendar/t-calendar.vue'
	export default {
		data() {
			return {
				// 邀请
				deposit_status: 'unlock',
				current: 0,
				src: '',
				code: '', // 推荐码



				total_recharge: '',
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
				data:[],
				dataList: [],
				current: 0, // 当前tap，即type
				total: 0, // 当前选定时间下的总页数
				page: 1,
				beginTime: '',
				endTime: '',
				show: false,
				info: {

				},
				team_data: {

				},

			}
		},
		filters: {
			fix2(data) {
				return Number(data).toFixed(2)
			}
		},
		methods: {
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

			handleRoute() {
				uni.switchTab({
					url: 'pages/grab/index'
				})
			},
			routePage1(url, type) { // 路由跳转
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
							type:type, beginTime:this.beginTime,endTime:this.endTime
						}
					})
				} else {
					this.$u.route({
						url
					})
				}
			},
			get(type) {

				this.status = 'loading'
				uni.showLoading({
					title: '',
				})
				// 当前tap，选定时间下的某一-页的数据
				team(this.beginTime, this.endTime).then((res) => {

					this.data = res.data
					// uni.hideLoading({
					// 	title:  '',
					// })
					// this.status = 'loadmore'
					// this.total = res.count
					// this.dataList = res.data
					// this.info = res.rebate
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
				this.get()
			}
		},
		// onReachBottom () {
		// 	console.log('onReachBottom')
		// 	this.handleLoadmore()
		// },
		onLoad(obj) {
			console.log('records onLoad')
			if (obj.type) {
				this.current = Number(obj.type)
				this.handleChange(this.current)
			}
			this.handleInit()


			console.log('invite onload', obj)
			if (this.$store.state.user.invitation_code) {
				this.src = window.location.href.split('#')[0] + '#/pages/auth/register?icode=' + this.$store.state.user.invitation_code
				this.code = this.$store.state.user.invitation_code
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/c.scss";

	#team {
		height: 100%;
		.container {
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-direction: column;
			background-color:#FFFFFF;
			// .bg {
			// 	background: url(../../static/invite_bg.png);
			// 	background-size: 100% auto;
			// 	background-position: 0 -120rpx;
			// 	width: 100%;
			// 	height: 400rpx;
			// 	display: flex;
			// 	flex-direction: column;
			// 	align-items: center;
			// 	color: #FFFFFF;
			// }
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

	.tooltip {
		padding: 0 5px;
		width: 100%;
		text-align: center;
	}

	.time-select {
		width: 700rpx;
		margin: 20px auto;

		.select {}

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
		background: linear-gradient(90deg, $color1, $color2) !important;
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

	.dataitem {
		display: flex;
		padding: 10px;
		box-sizing: border-box;

		// .left {
		// 	background-color: #9be2b1;
		// 	border-radius: 50%;
		// 	width: 0rpx;
		// 	height: 76rpx;
		// }
		

		// .right {
		// 	margin-left: 10px;
		// 	flex: 1;

		// 	.item {
		// 		.top {
		// 			display: flex;
		// 			justify-content: space-between;

		// 			text:nth-child(1) {
		// 				font-weight: bold;
		// 			}

		// 			text:nth-child(2) {
		// 				color: red;
		// 				font-weight: bold;
		// 			}
		// 		}

		// 		.bottom {
		// 			display: flex;
		// 			justify-content: space-between;
		// 			opacity: 0.6;
		// 		}
		// 	}
		// }
	}

	.title {
		margin-bottom: 10px;

	}

	.shouru{
		display: inline-block;
		padding: 5px;
		width: 33%;
	}

	.shouru-1{
		// display: inline-block;
		padding: 2px;
	}

	.item{
		width: 100%;
	}

	.detail{
		display: inline-block;
		margin-bottom: 10px;
		font-size: 16px;
		color: #5A5FFF;
		float: right;
	}

	.empty {
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #868686;
		line-height: 20px;
	}

	.info {
		width: 620rpx;

		height: 100px;
		background: #FFFFFF;
		box-shadow: 0px 4px 5px 0px rgba(213, 211, 211, 0.5);
		margin: 20px auto 0;
		position: relative;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #1B1B1B;
		line-height: 17px;
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
		align-items: center;

		img {
			width: 60px;

		}

		.msg {
			margin-right: 50px;
		}


	}

	

	.msgtitle {
		margin: 20px auto;
		width: 700rpx;
		font-weight: bold;
	}
</style>
