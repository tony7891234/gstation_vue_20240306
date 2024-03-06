<template>
	<div>
		<c-head :title="$t('shop.title')"></c-head>
		<!-- <div class="partners_box" :style="'background:'+item.background">
			<div class="partners_msg">
				<p>{{item.msg}}</p>
				<p>{{item.msg}}.com</p>
			</div>
			<img :src="item.img" />
		</div> -->

		<!-- <div class='list'>
			<div class="shop" v-for="(item,index) in list" :key='index'>
				<img :src="item.pictures" />
				<p class='name'>{{item.name}}</p>
				<p class='price'>{{$t('moneyLogo')}} {{item.price.toFixed(2)}}</p>
			</div>
		</div> -->
		
		<div class="wrap">
			<div class="box" v-for="(item, index) in list" :key="'item.name' + index">
				<div class='vip'>{{item.vip}}</div>
				<img :src="'https://api.shopee89.shop'+item.pictures" class="avatar" />
				<div class="shop_name">{{item.shop_name}}</div>
				<div class="stars">
					<u-icon v-for="(item2, index2) in item.star" :key="'fill' + index2" name="star-fill" color="rgb(255, 170, 0)"></u-icon>
					<u-icon v-for="(item3, index3) in (8 - item.star)" :key="'not-fill' + index3" name="star" ></u-icon>
				</div>
				<div class="name" style="margin: 5px 0;">{{ item.shop }}</div>
				<div style="font-size: 28rpx; font-weight: bold;">{{$t('shop.commission')}}</div>
				<div style="color: rgb(255, 170, 0); font-weight: 600;">+ {{item.profit}}</div>
			</div>
		</div>
		
		
		<c-pagination
		 v-if="list.length !== 0"
		 :current="this.page"
		 :total-items="this.total"
		 :page-items="20"
		  @change="pageChange"
		   :show-icon="true"
			:show-first="false"
			 :show-last="false"></c-pagination>
	</div>
</template>

<script>
	import {
		shopList
	} from "../../service/pay.api.js"
	export default {

		data() {
			return {
				page:1,
				total:0,
				partnersList:[{

				}],
				
				// partnersList: [{
				// 		img: require('../../static/partner1.png'),
				// 		msg: 'sahibinden',
				// 		background: 'linear-gradient(226deg, #484144 0%, #CBB49C 48%, #BEA988 100%)'
				// 	},
				// 	{
				// 		img: require('../../static/partner2.png'),
				// 		msg: 'n11',
				// 		background: 'linear-gradient(226deg, #6791EA 0%, #D5EAF5 54%, #96CDEC 100%)'
				// 	}, {
				// 		img: require('../../static/partner3.png'),
				// 		msg: 'hepsiburada',
				// 		background: 'linear-gradient(226deg, #E4AB09 0%, #F8C79B 49%, #EBC5BB 100%)'
				// 	}, {
				// 		img: require('../../static/partner4.png'),
				// 		msg: 'gittgidiyor',
				// 		background: 'linear-gradient(226deg, #0C5073 0%, #236E95 49%, #AFAC9E 100%)'
				// 	}, {
				// 		img: require('../../static/partner5.png'),
				// 		msg: 'trendyol',
				// 		background: 'linear-gradient(226deg, #91B8E8 0%, #F1C6A9 100%)'
				// 	}, {
				// 		img: require('../../static/partner6.png'),
				// 		msg: 'amazon',
				// 		background: 'linear-gradient(226deg, #8560AD 0%, #F6B4B4 100%)'
				// 	}
				// ],
				
				type: "",
				item: '',
				list: []
			}
		},
		
		methods:{
			get(){
				shopList(this.type,this.page).then(res => {
					console.log(res.count)
					this.list = res.data
					this.total = res.count
				})
			},
			pageChange(e) {
				console.log('翻页', e);
				this.page = e.current
				this.get()
			}
		},

		mounted() {
			this.type = this.$route.query.type
			this.item = this.partnersList[this.type - 1]
			this.get()
			
		}

	}
</script>

<style lang="scss" scoped>
	.partners_box {
		width: 700rpx;
		height: 116px;

		box-shadow: 0px 4px 5px 0px rgba(211, 211, 211, 0.5);
		border-radius: 10px;
		margin-bottom: 18px;
		display: flex;
		justify-content: center;
		align-items: center;

		margin: 20px auto;

		.partners_msg {
			width: 85px;

			font-size: 14px;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 24px;
			margin-right: 43px;
		}

		img {
			width: 160px;
			height: 96px;
		}
	}

	.list {
		width: 700rpx;
		margin: auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.shop {
			width: 340rpx;
			height: 200px;
			background: #FFFFFF;
			box-shadow: 0px 4px 5px 0px rgba(211, 211, 211, 0.5);
			border-radius: 8px;
			margin-bottom: 20px;

			img {
				width: 240rpx;
				height: 240rpx;
				margin: 20rpx 50rpx;
			}

			.name {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				// 下面这句用来控制行数
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				padding: 0 20rpx;
				font-size: 12rpx;
			}
			.price{
				font-size: 14px;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #5B5FF8;
				line-height: 14px;
				padding: 0 25rpx;
				margin-top: 10px;
			}
		}
	}
	.wrap {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
		height: 100%;
		padding: 0 10px;
		.box {
			width: 48%;
			height: 800rpx;
			padding: 8px;
			box-sizing: border-box;
			background-color: #fff;
			// height: 167px;
			// background-image: url(../../static/CasaImg/vipInfo.png);
			background-size: 100% 100%;
			
			box-shadow: 0px 4px 5px 0px rgba(211, 211, 211, 0.5);
			border-radius: 8px;
			display: inline-flex;
			margin-top: 20px;
			justify-content: center;
			align-items: flex-start;
			flex-direction: column;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #1B1B1B;
			position: relative;
			.avatar {
				height: 450rpx;
				width: 100%;
				margin-top: 10px;
			}
			.stars {
				display: flex;
				align-items: center;
				align-self: flex-start;
			}
			.name {
				font-size: 10px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				// 下面这句用来控制行数
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				align-self: flex-start;
			}
			.shop_name {
				align-self: flex-start;
				font-size: 32rpx;
			}
			.vip{
				font-size: 12px;
				position: absolute;
				color: #fff;
				top: 10px;
				left: 10px;
				background-color: rgba(254, 92, 68, 0.9);
				padding: 3px;
			}
			
			.p1{
				width: 66px;
				height: 33px;
				position: absolute;
				left: 0px;
				bottom:0px;
				font-size:12px;
				color: #fff;
				text-align: center;
			}
			.p2{
				width: 66px;
				height: 20px;
				right: 0px;
				bottom:0px;
				font-size:12px;
				color: #fff;
				text-align: center;
				position: absolute;
			}
		}
	}
	
</style>
