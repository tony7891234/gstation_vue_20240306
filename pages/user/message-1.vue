<template>
	<view>
		<c-head :title="$t('msg.title')" ></c-head>
		<view class="data_of_date" v-for="(item, index) in dataList" :key="'notifications' + index">
			<!--还需要包裹滚动区域？ @scrolltolower="loadmore" -->
			<u-card 
				:border-radius='10'
				:border='false'
				thumb="../../../static/images/records.svg"
				v-for="(item2, index2) in item.list"
				margin="20rpx 10rpx" padding="20"
				:show-head = 'false'
				:show-foot = 'false'
				:key="index2 + 'notifications'">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">
							<view class="order-detail-body">
								<view>{{ item2.title }}</view>
								<view>{{ item2.time }}</view>
								<view>{{ item2.content }}</view>
							</view>
						</view>
					</view>
				</view>
			</u-card>
		</view>
		<u-loadmore :margin-bottom='20' :margin-top='20' :status="status" :load-text="loadText"/>
	</view>
</template>

<script>
	import moment from 'dayjs'
	import { getMsgListServ } from '@/service/notice.api.js'
	export default {
		computed: {
			loadText() {
				return {
					loadmore: this.$t("loadText.loadmore"),
					loading: this.$t("loadText.loading"),
					nomore: this.$t("loadText.nomore")
				}
			}
		},
		data() {
			return {
				page: 1, // 默认第一页
				pageSize: 10,
				list: [],
				dataList: [], // 请求回来的数据数组
				status: 'loading'
			}
		},
		methods: {
			async handleGetData (index) {
				this.page = index || 1
				this.status = 'loading'
				// this.dataList = []
				const data = await getMsgListServ(this.page)
				this.status = data.length < this.pageSize ? 'nomore' : 'loadmore'
				this.dataList = this.list.concat(data)
			},
			leftClick() { // 返回 / 菜单
				if (this.backIcon === 'list') {
					this.$u.route({
						url: 'pages/user/index'
					})
				} else {
					this.$$back()
				}
			},
		},
		onLoad() {
			this.handleGetData()
		},
		async onPullDownRefresh () {
			this.list = []
			this.dataList = []
			uni.startPullDownRefresh()
			await this.handleGetData(1)
			uni.stopPullDownRefresh()
		},
		onReachBottom() { // 触底
			if(this.status === 'nomore') {
				return
			}
			this.handleGetData(++this.page)
		}
	}
</script>

<style lang="scss" scoped>
	.u-body-item-title {
		display: flex;
		flex-direction: column;
		width: 100%;
		font-size: 28rpx !important;
		.item {
			display: flex;
			width: 100%;
			justify-content: space-between;
			margin-bottom: 40rpx;
			&:nth-child(3) {
				margin-bottom: 0;
			}
			&.header {
				.header-left {
					display: flex;
					align-items: center;
					image {
						width: 40rpx;
						height: 40rpx;
					}
					text {
						margin-left: 3px;
						&.team {
							color: $wordColor;
							font-size: 35rpx;
						}
						&.odds {
							color: #41d3e2;
						}
					}
				}
				.header-right {
					.stage {
						margin-right: 3px;
					}
				}
			}
		}
		.odds-result {
			width: 8px;
			height: 12px;
			clip-path: polygon(0 0,100% 0,100% 75%,50% 100%,0 75%);
			border-radius: 1px 1px 0 0;
			position: absolute;
			right: 0;
			margin-top: 45px;
			&.lose {
				background-color: #93a0c4;
			}
			&.win {
				background-color: $themeColor;
			}
		}
		.order-detail-body {
			view:nth-child(1) {
				color: $wordColor;
				font-size: 32;
			}
			view:nth-child(1), view:nth-child(2) {
				margin-bottom: 10rpx;
			};
		}
	}
	.data_of_date {
		margin-top: 15px;
		.date {
			line-height: 30px;
			height: 30px;
			padding: 0 10px;
			margin: 0 5px 10px 5px;
			background-color: $themeColor;
			color: $wordColor;
			font-weight: bold;
		}
		.settlement {
			view {
				margin-bottom: 10rpx;
			}
			.status{
				text:nth-child(1) {
					color: #c5c1c1;
					font-size: 35rpx;
				}
			}
			.order {
				font-size: 12px;
			}
			.bet {
				.money {
					margin-left: 7px;
					font-size: 34rpx;
					color: $wordColor;
				}
			}
		}
	}
</style>
