<template>
	<view>
		<c-head :title="$t('vip.title')" :isBack="false"></c-head>
		<div class='box' v-for="(item,index) in list" :key="index" :style="'background:'+item.background">
			<div class='left'>
				<img :src="item.img" />
				<p style="width:100px;">{{item.title}}</p>
				<h6 style="width:100px;">{{$t('moneyLogo')}}{{item.amount}} (R{{ (item.amount*rate).toFixed(0)}})</h6>
			</div>
			<div class="main">
				<div class='box1' style="width: 85px;margin-right: 10px;">
					<p>{{$t('vip.info1')}}</p>
					<p>{{item.info1}} </p>
				</div>
				<div class='box1'>
					<p>{{$t('vip.info2')}}</p>
					<p>{{$t('moneyLogo')}}{{item.info2}} (R{{ (item.info2*rate).toFixed(0)}})</p>
				</div>
				<div class='box1' style="width: 85px;margin-right: 10px;">
					<p>{{$t('vip.info3')}}</p>
					<p>{{$t('moneyLogo')}}{{item.info3}} (R{{ (item.info3*rate).toFixed(0)}})</p>
				</div>
				<div class='box1'>
					<p>{{$t('vip.info4')}}</p>
					<p>{{item.info4}} {{$t('vip.day')}}</p>
				</div>
			</div>
		</div>
		
		<div style="width: 100%;height:20px"></div>
	</view>
</template>

<script>
	import {
		getmerChant,info
	} from '../../service/pay.api.js'
	export default {
		data() {
			return {
				rate:'0',
				list: [
				{
					img: require('../../static/vipImg/VIP1.png'),
					// title: 'Deneyim kullanıcıları',
					title:'Free Member',
					amount: '0',
					info1: '10',
					info2: '1.2',
					info3: '36',
					info4: '7',
					background: 'linear-gradient(226deg, rgb(102 95 185) 0%, rgb(155 171 248) 49%, rgb(135 133 210) 100%'
				}
				,
				{
					img: require('../../static/vipImg/VIP1.png'),
					// title: 'Deneyim kullanıcıları',
					title:'Full Member',
					amount: '30',
					info1: '10',
					info2: '1.5',
					info3: '45',
					info4: '10',
					background:'linear-gradient(226deg, rgb(228, 171, 9) 0%, rgb(248, 199, 155) 49%, rgb(235, 197, 187) 100%'
				}, {
					img: require('../../static/vipImg/VIP1.png'),
					title: 'vip1',
					amount: '100',
					info1: '15',
					info2: '5',
					info3: '150',
					info4: '180',
					background:'linear-gradient(226deg, rgb(133, 96, 173) 0%, rgb(246, 180, 180) 100%)'
				}, {
					img: require('../../static/vipImg/VIP2.png'),
					title: 'vip2',
					amount: '300',
					info1: '15',
					info2: '15',
					info3: '450',
					info4: '180',
					background:'linear-gradient(226deg, rgb(145, 184, 232) 0%, rgb(241, 198, 169) 100%)'
				}, {
					img: require('../../static/vipImg/VIP3.png'),
					title: 'vip3',
					amount: '1000',
					info1: '20',
					info2: '50',
					info3: '1500',
					info4: '180',
					background:'linear-gradient(226deg, rgb(12, 80, 115) 0%, rgb(35, 110, 149) 49%, rgb(175, 172, 158) 100%)'
				} ,{
					img: require('../../static/vipImg/VIP4.png'),
					title: 'vip4',
					amount: '2000',
					info1: '20',
					info2: '100',
					info3: '3000',
					info4: '180',
					background:'linear-gradient(226deg, rgb(103, 145, 234) 0%, rgb(213, 234, 245) 54%, rgb(150, 205, 236) 100%)'
				},{
					img: require('../../static/vipImg/VIP5.png'),
					title: 'vip5',
					amount: '5000',
					info1: '20',
					info2: '250',
					info3: '7500',
					info4: '180',
					background:'linear-gradient(223deg, rgb(244, 169, 123) 0%, rgb(253, 225, 181) 45%, rgb(253, 147, 115) 100%)'
				}]
			}
		},
		mounted() {
			// info().then(res => {
			// 	this.rate = res.data.rate;
			// });
		},
		onShow(){
			//info().then(res => {
				// console.log(res)
				// this.rate = res.data.rate;
				
				// console.log(this.rate)
			//});
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 700rpx;
		height: 160px;
		// background: #FFFFFF;
		box-shadow: 0px 4px 5px 0px rgba(211, 211, 211, 0.5);
		border-radius: 8px;
		display: flex;
		margin: 0 auto 20px;
		
		color: #fff;
		.left {
			width: 75px;
			display: flex;
			flex-direction: column;
			margin-left: 33px;
			align-items: center;
			font-size: 14px;
			font-weight: 600;
			margin-right: 28px;

			img {
				width: 45px;
				height: 53px;
				margin: 12px 0;
			}
		
			p {
				text-align: center;


				margin-bottom: 15px;
			}

			h3 {
				// color: #5B5FF8;
				text-align: center;
			}
		}

		.main {
			flex: 1;

			display: flex;

			flex-wrap: wrap;
			margin-top: 30px;

			.box1 {
				width: 100px;


				p {
					text-align: left;
					font-size: 10px;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					// color: #FCA235;
					line-height: 17px;
				}

				p:first-of-type {
					// color: #1B1B1B;
					margin-bottom: 8px;
				}
			}
		}
	}

	.box:first-of-type {
		margin-top: 20px;
	}
</style>
