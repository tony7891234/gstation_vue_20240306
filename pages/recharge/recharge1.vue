<template>
	<view id="recharge">
		<c-head :title="$t('recharge.title')" ></c-head>
		<u-form :model="form" ref="uForm">
		<div class="card">
			<div class='cardMsg1'>
				<p>{{$t('balance')}}</p>
				<p>{{ $t('moneyLogo')+ Number($store.state.user.balance).toFixed(2) }}</p>
			</div>
			<h3>{{$t('recharge.enter')}}</h3>

			<u-form-item :label="'R.'" prop="money">
				<u-input v-model="form.amount" type="number" @input="changAmount" placeholder="" />
			</u-form-item>
			<view style="margin-top:20px">
				<text>
					{{$t('recharge.tip1_part1') + minMoney + $t('recharge.tip1_part2') + maxMoney }}
				</text>
			</view>
		</div>

		<div class='form'>
			
				<!-- <div class="info" style="height: 50px;">
					<div class='msg'>
						<p style="font-size: 16px;">Rate:<span style='color:#6F67FC;font-size: 18px;margin-right: 5px;'>{{key2}} </span> Platform amount:<span style='color:#6F67FC;font-size: 18px;margin-right: 20px;'>{{key3}} </span></p>
					</div>
				</div> -->

				<view class="u-margin-top-40 u-margin-bottom-20">{{$t('recharge.quick')}}</view>
				<view class="btns u-flex u-row-between u-flex-wrap">
					<button class="btn" @click="handleSelect(index)" :class="{'active': activeIndex === index}" v-for="(item, index) in btns
				  " :key="item + index" >{{ item }}</button>
				</view>
				<view style="margin: 30px 0 0 0;font-size: 28rpx;">{{$t('recharge.tip2')}}</view>
				<u-form-item :border-bottom="false" label="" class="border-top">
					<u-radio-group v-model="value" @change="radioGroupChange">
						<u-radio v-for="(item, index) in boxList" :key="index" shape="circle" :name="item.name">
							<!-- 	<u-image class="img" width="50rpx" height="50rpx" :src="item.img"></u-image> -->
							<view class="border-bottom line"></view>
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<!-- <view style="margin: 30px 0 0 0;font-size: 28rpx;" v-if="">{{$t('recharge.tip3')}}</view>
			<u-form-item class="bank" v-if="form.pay_type !== 1 || form.pay_type !== 2" label="" prop="bank_name" label-position="top" :border-bottom="true">
				<u-input  v-model="form.bank_name" :type="'select'" @click="show = true" :placeholder="$t('recharge.placeholder1')" :clearable="false"/>
				<u-select :confirm-text="$t('confirm')" :cancel-text="$t('cancel')" @confirm="handleSelectConfirm" v-model="show" :list="bankList"></u-select>
			</u-form-item> -->
				<template v-if="Number(form.amount) > 0">
					<u-button class="u-margin-top-20"  shape="square"
						@click="handleRecharge" :disabled="Number(form.amount)<minMoney||Number(form.amount)>maxMoney">
						{{$t('confirm')}}
					</u-button>
				</template>
				<template v-else>
					<u-button class="u-margin-top-20 btn" type="default" disabled="" shape="square" disabled>{{ $t('confirm') }}
					</u-button>
				</template>
				<view class="u-margin-top-40 u-margin-bottom-20 u-font-12"
					style="line-height: 24px;text-align: justify;">{{$t('recharge.tip4')}}</view>
			

		</div>
		</u-form>
		<div style="width: 100%;height: 50px;"></div>
	</view>
</template>

<script>
	import {
		getmerChant,
		getBussiness,
		getBank,
		chargeServ,
		chargePay3,
		info,
	} from '@/service/pay.api.js'
	// import merchant from '../../static/merchant.png'
	export default {
		data() {
			return {
				customStyle: { // 按钮颜色，以兼容微信小程序的形式写
					background: "linear-gradient(90deg,#6dcab8,#3a78cb) !important",
					color: "#ffffff"
				},
				form: {
					amount: '',
					bank_name: '', // 银行名称
					business_id: '',
					bank_id: '',
					pay_type: ''
				},
				amount: '',
				key1: '',
				key2: '',
				key3: '',
				show: false,
				bankList: [], // 银行列表,纯名字
				bankListData: [], // 包含银行的各种数据
				value: '', // 复选款的值
				value2: '', // 复选款的值
				activeIndex: null,
				minMoney: '',
				maxMoney: '',
				id: '', // 通道id
				btns: [200, 500, 1000, 3000, 5000, 10000, 20000, 30000, 50000],
				boxList: [],
				paymentList: []
			}
		},
		computed: {
			rules() {
				return {
					money: [
						// {
						// 	required: true,
						// 	message: 'Please enter!', 
						// 	// 可以单个或者同时写两个触发验证方式 
						// 	trigger: ['change','blur'],
						// },
					],
					bank_name: [{
						message: this.$t('auth.tips.pls'),
						required: true,
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}, ],
					// money: [
					// 	{
					// 		required: true,
					// 		message: 'Please enter!', 
					// 		// 可以单个或者同时写两个触发验证方式 
					// 		trigger: ['change','blur'],
					// 	},
					// ]

				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			handleSelectConfirm(res) {
				console.log('handleSelectConfirm', res[0])
				this.form.bank_name = res[0].label
				this.form.bank_id = res[0].value
			},

			changAmount(){
				//console.log(this.form.amount)
				this.key3 = Number(this.form.amount / this.key2).toFixed(2)
			},
			handleSelect(index) {
				this.activeIndex = index
				this.form.amount = this.btns[index]

				this.key3 = Number(this.form.amount / this.key2).toFixed(2)
			},
			set(index) {

				this.minMoney = this.boxList[index].min_money
				this.maxMoney = this.boxList[index].max_money
				this.form.pay_type = this.boxList[index].id

				// 切换通道时先清空通道数据
				this.form = {
					...this.form,
					...{
						bank_name: '', // 银行名称
						business_id: '',
						bank_id: '',
					}
				}
				this.paymentList = []
				this.bankList = []
				this.bankListData = []

				// this.getBnb()
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) { // 选择充值通道
				console.log('radioGroupChange', e);
				this.boxList.forEach((item, index) => {
					if (item.name === e) {
						this.form.pay_type = item.id
						if (this.form.pay_type !== 3) {
							this.set(index)
						} else { // 支付3

						}
					}
				})

			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange2(e) {
				this.paymentList.forEach((item, index) => {
					if (item.payment_type === e) {
						console.log('radioGroupChange2', item.payment_code);
						this.form.business_id = item.id
					}
				})

			},
			getBnb() {
				if (this.form.pay_type === 3) {
					getBussiness(this.form.pay_type).then((res) => {
						console.log('getBussiness', res)
						if (res.code === 0) {
							this.paymentList = res.data
							this.form.business_id = this.paymentList[0].id
							this.value2 = this.paymentList[0].payment_type
						}
					})
				}
				getBank(this.form.pay_type).then((res) => {
					console.log('getBank', res)
					if (res.code === 0) {
						this.bankListData = res.data
						this.bankListData.forEach((item, index) => {
							let obj = {
								label: item.bank_name,
								value: item.id
							}
							this.bankList.push(obj)
						})
					}

				})
			},
			handleRecharge(e) {
				this.$refs.uForm.validate(valid => {
					console.log('valid', valid)
					if (valid) {
						chargeServ(this.form).then((res) => {
							console.log('recharge', res)
							if (res.code === 0) {
								uni.showToast({
									icon: 'none',
									title: this.$t('recharge.success')
								})
								console.log('this.form.pay_type', this.form.pay_type)
								setTimeout(() => {
									if (this.form.pay_type === 3) {
										let formData = new FormData()
										let str = ''
										for (let key in res.data) {
											if (key !== 'url') {
												str += `${key}=${res.data[key]}&`
											}
										}
										str = str.substr(0, str.length - 1)
										var form = document.createElement("form");
										document.body.appendChild(form);
										form.method = "post";
										form.action = res.data.url + '?' + str
										form.submit();
									} else {
										window.location.href = res.data.pay_url
									}
								}, 1000)
							}
						})
					} else {
						console.log('verify fail');
					}
				});
			}
		},
		watch: {
			amount(val) {
				this.key3 = Number(val * this.key2).toFixed(2)
			}
		},
		onShow() {
			// this.handleSelect(2)
			getmerChant().then((res) => {
				// res.data.forEach((item, index) => {
				// 	if (item.id === 3) { // 如果有支付3
				// 		res.data.splice(index, 1, {
				// 			name: "Brazil pay3",
				// 			id: 3
				// 		})
				// 	}
				// })
				this.boxList = res.data
				this.value = this.boxList[0].name // 默认选中
				this.set(0)
			});
			// info().then(res => {

			// 	this.key1 = res.data.address;
			// 	this.key2 = res.data.rate;

			// });
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		width: 700rpx;
		margin: auto;
		font-family: PingFangSC-Regular, PingFang SC;
		color: #1B1B1B;
	}

	.card {
		width: 620rpx;
		padding: 40rpx;
		height: 174px;
		background: #FFFFFF;
		box-shadow: 0px 4px 7px 0px rgba(211, 211, 211, 0.5);
		border-radius: 8px;
		margin-top: 20px;
		margin: 20px auto;
		font-family: PingFangSC-Regular, PingFang SC;
		color: #1B1B1B;

		.cardMsg1 {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-family: PingFangSC-Regular, PingFang SC;


			p {
				font-size: 36rpx;
				font-weight: bold;
			}

			p:first-of-type {
				font-size: 28rpx;
				font-weight: 400;
			}

		}

		h3 {
			margin: 22rpx 0
		}
	}


	.money-section {

		box-sizing: border-box;
		margin-top: 20rpx;
		background: #FFFFFF;

		.tip {

			padding-left: 20px;
			height: 40px;
			line-height: 40px;
			background: #fff;

			text {

				font-size: 12px;
				font-weight: 400;
				color: #334360;
				opacity: .4;
			}
		}
	}

	.btns {
		.btn {
			width: 30%;
			height: 104rpx;
			line-height: 50px;
			text-align: center;
			color: #5B5FF8;
			font-weight: 500;
			
			border-radius: 8px;
			border: 1px solid #ddd;
			float: left;
			margin-top: 15px;
			font-size: 16px;
			border: 1px solid #5B5FF8;

			&.active {
				background:#5B5FF8 ;
				color: #fff;

			}
		}
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

		.msg {
			width: 100%;

			h3 {
				font-size: 16px;
				margin-bottom: 10px;
			}
		}
	}

	.line {
		width: 590rpx;
		height: 0;
		position: absolute;
		left: 80rpx;
		bottom: 0
	}

	.bank {
		font-size: 40rpx;
	}
	
	.u-btn{
		background: #6F67FC !important;
		color:#fff !important
	}
	uni-button[disabled]{
		color: rgba(0,0,0,.3)!important;
		border: 1px solid rgba(0,0,0,.3)!important;
		background-color: #fff !important;
	}
</style>
