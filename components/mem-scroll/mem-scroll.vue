<template>
	<view id="mem_scroll_container">


		<view id="mem_scroll_wrap" :style="'width:'+list.length*145 +'px'">


			<div class="box" v-for="(item, index) in list" :key="'item.name' + index">
				<div class='vip'>{{item.vip}}</div>
				<img :src="'https://api.shopee89.shop'+item.pictures" class="avatar" />
				<div class="name" style="margin: 10px 0;">{{ item.shop }}</div>
				<div class='p1'>
					<p>{{item.shop_name}}</p>
					<p>+{{item.profit}}</p>
				</div>
				<div class='p2'>{{$t('moneyLogo') +item.price.toFixed(2) }}</div>
				<!-- <div class="name" style="font-weight: bold;">{{$t('moneyLogo') +item.profit.toFixed(2) }}</div> -->
			</div>
			<!-- <view class="item u-padding-30 u-flex u-row-between border-bottom" v-for="(item, index) in list"
				:key="'item.name' + index">
				<view class="left u-flex">
					<u-image width="80rpx" height="80rpx" :src="item.src"></u-image>
					<view class="u-flex u-flex-col u-margin-left-10">
						<text class="name">{{ item.username }}</text>
						<text class="commission">{{ $t('home.commision') }}</text>
					</view>
				</view>
				<view class="right">{{$t('moneyLogo') + item.amount }}</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "mem-scroll",
		props: ['list'],
		data() {
			return {
				count: 0,
				vip: [
					require('../../static/vipImg/VIP5.png'),
					require('../../static/vipImg/VIP4.png'),
					require('../../static/vipImg/VIP3.png'),
					require('../../static/vipImg/VIP2.png'),
					require('../../static/vipImg/VIP1.png')
				],
			}
		},
		mounted() {

			const wrap = document.getElementById('mem_scroll_wrap')
			const container = document.getElementById('mem_scroll_container')
			// const wrap = document.getElementById('mem_scroll_wrap')
			// let originTop = wrap.style.top
			let top = wrap.style.left
			// setInterval(() => {
			// 	if (this.count === this.list.length - 3) {
			// 		container.removeChild(wrap)
			// 		setTimeout(() => {
			// 			container.appendChild(wrap)
			// 			wrap.style.left = 0
			// 			top = 0
			// 			this.count = 0
			// 		})
			// 	} else {
			// 		wrap.style.left = top - 144 + 'px'
			// 	}
			// 	top = top - 144
			// 	this.count += 1
			// }, 2000)
		}
	}
</script>

<style lang="scss">
	#mem_scroll_container {
		width: 700rpx;
		border-radius: 10px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 210px;

		// overflow: hidden;
		// background-color: #FFFFFF;
		overflow: scroll;

		#mem_scroll_wrap {
			position: absolute;
			left: 0px;
			top: 0px;
			transition: all 1s linear;
			height: 100%;
			
		}

		.item {
			width: 100%;
			box-sizing: border-box;

			.left {
				.commission {
					color: #CCCCCC;
				}
			}

			.right {
				color: #e9610a;
			}
		}


		.box {
			width: 134px;
			height: 167px;
			background-image: url(../../static/CasaImg/vipInfo.png);
			background-size: 100% 100%;
			
			box-shadow: 0px 4px 5px 0px rgba(211, 211, 211, 0.5);
			border-radius: 8px;
			display: inline-flex;
			margin-top: 20px;
			margin-right: 10px;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #1B1B1B;
			position: relative;
			.avatar {
				height: 75px;
				border-radius: 50%;
			}

			.name {
				font-size: 10px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				// 下面这句用来控制行数
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				padding: 0 10px;
			}
			.vip{
				font-size: 12px;
				position: absolute;
				color: #fff;
				top: 0px;
				right: 10px;
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
