<template>
	<view>
		<c-head :title="$t('vip.title')" :isBack="false"></c-head>
		<div class='box' v-for="(item,index) in list" :key="index" :style="'background:'+item.background+';'">
			<!-- <div class="zhezhao" :style="''+item.level+''"> 
			</div>
			<img class="zhezhao-img" src="../../static/lock.png" :style="''+item.level+''"/> -->
			<div class='left'>
				<img :src="item.img" />
				<p style="width:100px;">{{item.title}}</p>
				<h3 style="width:100px;">{{ item.amount_1 + $t('moneyLogo') }} </h3>
			</div>
			<div class="main">
				<div class='box1' style="width: 85px;margin-right: 10px;">
					<p>{{$t('vip.info1')}}</p>
					<p>{{item.info1}} </p>
				</div>
				<div class='box1'>
					<p>{{$t('vip.info2')}}</p>
					<p>{{  item.day_income  + $t('moneyLogo') }} </p>
				</div>

				<div class='box1' style="width: 85px;margin-right: 10px;">
					<p>{{$t('vip.commission_per_task')}}</p>
					<p>{{  item.commission_per_task + $t('moneyLogo') }}</p>
				</div>

				<div class='box1'>
					<p>{{$t('vip.info4')}}</p>
					<p>{{item.info4}} {{$t('vip.day')}}</p>
				</div>

				<div class='box1' style="width: 85px;margin-right: 10px;">
				</div>

				<div class='box1' :style="''+item.level_1+''" style="z-index:970">
					<p class="button" style="text-align: center;z-index:970" @click="routePage(item.amount_1, item.title, item.level_num)">{{$t('vip.join')}}</p>
				</div>
			</div>
		</div>
		<div style="width: 100%;height:20px"></div>
	</view>
</template>
<script>
	import {getUserDetail,upgradeVip} from '../../service/user.api.js'

	export default {
		data() {
			return {
				rate:'0',
				level:'',
				list:[]
			}
		},
		mounted() {
		
		},
		methods: {
			routePage(amount = 100, vip = 'VIP1', level) { // 路由跳转
				if(vip.length > 4){
					vip = vip.charAt(0).toUpperCase() + vip.slice(1)
				}else{
					vip = vip.toUpperCase()
				}
				uni.showModal({
					content: this.$t('vip.tip1') + this.$t('moneyLogo') +amount + this.$t('vip.tip2') + vip + '?',
					confirmText: this.$t('confirm'),
					cancelText: this.$t('cancel'),
					showCancel: true,
					success: (res) => {
						if (res.confirm) {
							upgradeVip(level).then(res=>{
								if(res.code == 0){
									uni.showToast({
										icon: 'success',
										title: this.$t('success')
									})
									
									setTimeout(() => {
										this.getUser()
									}, 1000)
								}
							})
						
						}
					},
				})
			},
			
			getUser(){
					
					getUserDetail('level').then(res=>{
						this.level = res.data;
						let dis = 'display:none;';
						// 是那个层级 那个层级就 display:none;
						let free_member = '';
						let vip1 = '';
						let vip2 = '';
						let vip3 = '';
						let vip4 = '';
						let vip5 = '';
						let vip6 = '';
						let vip7 = '';
						let vip8 = '';
						let vip9 = '';
						let vip10 = '';
					
						let free_member_1 = '';
						let vip1_1 = '';
						let vip2_1 = '';
						let vip3_1 = '';
						let vip4_1 = '';
						let vip5_1 = '';
						let vip6_1 = '';
						let vip7_1 = '';
						let vip8_1 = '';
						let vip9_1 = '';
						let vip10_1 = '';
						
						if(this.level == 'VIP0'){
							free_member = dis;
							free_member_1 = dis;
						}
						if(this.level == 'VIP1'){
							vip1 = dis;
							free_member_1 = vip1_1 = dis;
						}
						if(this.level == 'VIP2'){
							vip2 = dis;
							free_member_1  = vip1_1 =  vip2_1 = dis
						}
						if(this.level == 'VIP3'){
							vip3 = dis;
							free_member_1   =  vip1_1 = vip2_1 =  vip3_1= dis
						}
						if(this.level == 'VIP4'){
							vip4 = dis;
							free_member_1  =  vip1_1 =  vip2_1 = vip3_1 = vip4_1 = dis
						}
						if(this.level == 'VIP5'){
							vip5 = dis;
							free_member_1  =  vip1_1 = vip2_1 = vip3_1 =  vip4_1 = vip5_1 = dis
						}
						if(this.level == 'VIP6'){
							vip6 = dis;
							free_member_1  =  vip1_1 = vip2_1 = vip3_1 =  vip4_1 = vip5_1 = vip6_1 = dis
						}
						
						if(this.level == 'VIP7'){
							vip7 = dis;
							free_member_1  =  vip1_1 = vip2_1 = vip3_1 =  vip4_1 = vip5_1 = vip6_1 = vip7_1 = dis
						}
						
						if(this.level == 'VIP8'){
							vip8 = dis;
							free_member_1  =  vip1_1 = vip2_1 = vip3_1 =  vip4_1 = vip5_1 = vip6_1 = vip7_1 =  vip8_1 = dis
						}
						
						if(this.level == 'VIP9'){
							vip9 = dis;
							free_member_1  =  vip1_1 = vip2_1 = vip3_1 =  vip4_1 = vip5_1 = vip6_1 = vip7_1 =  vip8_1 =  vip9_1 =dis
						}
						
						if(this.level == 'VIP10'){
							vip10 = dis;
							free_member_1  =  vip1_1 = vip2_1 = vip3_1 =  vip4_1 = vip5_1 = vip6_1 = vip7_1 =  vip8_1 =  vip9_1 = vip10_1 = dis
						}
						
						this.list = [
							{
								level_num : 30,
								level : free_member,
								level_1: free_member_1,
								img: require('../../static/VIP0.png'),
								title:'vip0',
								amount_1 :'0',//法币金额
								info1: '1',//任务数
								day_income: '1.2',//每天收益 法币
								// month_income: '36',//月收益 U
								info4: '3',//天数
								commission_per_task:'1.2',
								// month_total : this.$t('vip.month_income'),
								background: 'linear-gradient(226deg, rgb(102 95 185) 0%, rgb(155 171 248) 49%, rgb(135 133 210) 100%'
							}
							,
							{
								level_num : 31,
								level : vip1,
								level_1: vip1_1,
								img : require('../../static/VIP1.png'),
								title : 'vip1',
								amount_1 :'50',
								info1: '2',
								day_income: '5.8',//每天收益 法币
								// month_income: '174',//月收益 U
								info4: '--',//天数
								commission_per_task:'2.9',
								// month_total : this.$t('vip.month_income'),
								background:'linear-gradient(226deg, rgb(228, 171, 9) 0%, rgb(248, 199, 155) 49%, rgb(235, 197, 187) 100%'
							}, 
							{
								level_num : 32,
								level : vip2,
								level_1: vip2_1,
								img: require('../../static/VIP2.png'),
								title: 'vip2',
								amount_1 :'160',
								info1: '3',
								day_income: '21',//每天收益 法币
								// month_income: '2250',//月收益 法币
								info4: '--',//天数
								commission_per_task:'7',
								// month_total : this.$t('vip.month_income'),
								background:'linear-gradient(226deg, rgb(133, 96, 173) 0%, rgb(246, 180, 180) 100%)'
							}, 
							{
								level_num : 33,
								level : vip3,
								level_1: vip3_1,
								img: require('../../static/VIP3.png'),
								title: 'vip3',
								amount_1 :'480',
								info1: '5',
								day_income: '52.8',//每天收益 法币
								// month_income: '6750',//月收益 法币
								info4: '--',
								commission_per_task:'10.6',
								// month_total : this.$t('vip.month_income'),
								background:'linear-gradient(226deg, rgb(145, 184, 232) 0%, rgb(241, 198, 169) 100%)'
							},
							{
								level_num : 34,
								level : vip4,
								level_1: vip4_1,
								img: require('../../static/VIP4.png'),
								title: 'vip4',
								amount_1 :'1000',
								info1: '7',
								day_income: '128.8',//每天收益 法币
								// month_income: '22500',//月收益 法币
								info4: '--',
								commission_per_task:'18.4',
								// month_total : this.$t('vip.month_income'),
								background:'linear-gradient(226deg, rgb(12, 80, 115) 0%, rgb(35, 110, 149) 49%, rgb(175, 172, 158) 100%)'
							} ,
							{
								level_num : 35,
								level : vip5,
								level_1: vip5_1,
								img: require('../../static/VIP5.png'),
								title: 'vip5',
								amount_1 :'2800',
								info1: '10',
								day_income: '318.8',//每天收益 法币
								// month_income: '45000',//月收益 法币
								info4: '--',
								commission_per_task:'31.88',
								// month_total : this.$t('vip.month_income'),
								background:'linear-gradient(226deg, rgb(103, 145, 234) 0%, rgb(213, 234, 245) 54%, rgb(150, 205, 236) 100%)'
							},
							{
								level_num : 36,
								level : vip6,
								level_1: vip6_1,
								img: require('../../static/VIP5.png'),
								title: 'vip6',
								amount_1 :'6000',
								info1: '15',
								day_income: '888',//每天收益 法币
								// month_income: '45000',//月收益 法币
								info4: '--',
								commission_per_task:'59.2',
								// month_total : this.$t('vip.month_income'),
								background:'linear-gradient(226deg, rgb(103, 145, 234) 0%, rgb(213, 234, 245) 54%, rgb(150, 205, 236) 100%)'
							},
							{
								level_num : 37,
								level : vip7,
								level_1: vip7_1,
								img: require('../../static/VIP5.png'),
								title: 'vip7',
								amount_1 :'10000',
								info1: '15',
								day_income: '1388',//每天收益 法币
								// month_income: '45000',//月收益 法币
								info4: '--',
								commission_per_task:'92.5',
								// month_total : this.$t('vip.month_income'),
								background:'linear-gradient(226deg, rgb(103, 145, 234) 0%, rgb(213, 234, 245) 54%, rgb(150, 205, 236) 100%)'
							},
							{
								level_num : 38,
								level : vip8,
								level_1: vip8_1,
								img: require('../../static/VIP5.png'),
								title: 'vip8',
								amount_1 :'18800',
								info1: '15',
								day_income: '2868',//每天收益 法币
								// month_income: '45000',//月收益 法币
								info4: '--',
								commission_per_task:'191.2',
								// month_total : this.$t('vip.month_income'),
								background:'linear-gradient(226deg, rgb(103, 145, 234) 0%, rgb(213, 234, 245) 54%, rgb(150, 205, 236) 100%)'
							},
							{
								level_num : 39,
								level : vip9,
								level_1: vip9_1,
								img: require('../../static/VIP5.png'),
								title: 'vip9',
								amount_1 :'30000',
								info1: '20',
								day_income: '5088',//每天收益 法币
								// month_income: '45000',//月收益 法币
								info4: '--',
								commission_per_task:'254.4',
								// month_total : this.$t('vip.month_income'),
								background:'linear-gradient(226deg, rgb(103, 145, 234) 0%, rgb(213, 234, 245) 54%, rgb(150, 205, 236) 100%)'
							},
							{
								level_num : 40,
								level : vip10,
								level_1: vip10_1,
								img: require('../../static/VIP5.png'),
								title: 'vip10',
								amount_1 :'68800',
								info1: '30',
								day_income: '13788',//每天收益 法币
								month_income: '45000',//月收益 法币
								info4: '--',
								commission_per_task:'459.6',
								// month_total : this.$t('vip.month_income'),
								background:'linear-gradient(226deg, rgb(103, 145, 234) 0%, rgb(213, 234, 245) 54%, rgb(150, 205, 236) 100%)'
							},
						]
					})
							
				
			}
		},
		onShow(){
			
			this.getUser()
		}
	}
</script>

<style lang="scss" scoped>

	
	.button{
		width: 70px;
		font-size: 18px;
		text-align: center;
		top: -10px;
		padding: 2px 4px;
		background-image: -webkit-linear-gradient(left,#24ed4d,#00af37),-webkit-linear-gradient(#fff,#fff);
		background-image: linear-gradient(90deg,#24ed4d,#00af37),linear-gradient(#fff,#fff);
		background-blend-mode: normal,normal;
		border-radius: 2px;
		font-size: 16px;
		color: #fff;
	}
	.zhezhao{
		height:180px;
		width:360px;
		position: absolute;
		background:white;
		opacity: 0.7;
	}
	.zhezhao-img{
		position: absolute;
		margin-left: 125px;
		margin-top: 30px;
	}

	.box {
		width: 700rpx;
		height: 180px;
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
