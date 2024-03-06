<template>
	<view id="withdrawal">
		<c-head :title="$t('withdrawal.title')"></c-head>
		<view class="bal-card">
			<view class="wrap border-bottom">
				<view class="current">
					<text>{{ $t('withdrawal.current') }}</text>
					<text class="current-amount">{{$t('moneyLogo')}}{{ Number($store.state.user.balance).toFixed(2) }}</text>
				</view>
				<view class="available">
					<text>{{ $t('withdrawal.available') }}</text>
					<text>{{ Number($store.state.user.balance).toFixed(2) }}</text>
				</view>
			</view>
			<!-- <view class="tips">
				{{ $t('withdrawal.tip1') }}
			</view> -->
		</view>
		<view class="money-section">
			<view>{{ $t('withdrawal.enter_amount') }}</view>
			<u-form :model="form" ref="uForm">
				<u-form-item :label="$t('moneyLogo')" prop="money">
					<u-input :focus="isFocus" type="number" v-model="form.money" placeholder="" />
				</u-form-item>

				<view class="tip">
					<text>
						{{$t('withdrawal.actual') +  $store.state.user.balance }}
					</text>
					<text style="color: rgb(216, 193, 142);opacity: 1;margin-left: 5px;" @click="handleAllWithdrawal">
						{{ $t('withdrawal.all_withdrawal') }}
					</text>
				</view>
			</u-form>
			<view class="table">
				<view class="item border-bottom">
					<text>{{ $t('withdrawal.your_cpf') }}</text>
					<text>{{ cardInfo.bank_account }}</text>
				</view>

				<view class="item border-bottom">
					<text>{{ $t('addr.username') }}</text>
					<text>{{ cardInfo.bank_username }}</text>
				</view>
				<view class="item border-bottom">
					<text>{{ $t('withdrawal.bank_name')}}</text>
					<text>{{ cardInfo.bank_name }}</text>
				</view>
				<view class="item border-bottom">
					<text>{{ $t('addr.phone') }}</text>
					<text>{{ cardInfo.phone }}</text>
				</view>
				<view class="item border-bottom">
					<text>{{ $t('bind.email') }}</text>
					<text>{{ cardInfo.email }}</text>
				</view>
				<!-- <view class="item border-bottom" >
					<text>{{ $t('bind.upi') }}</text>
					<text>{{ cardInfo.upi }}</text>
				</view> -->
				
				<!-- <u-form-item  prop="code" label-position="top" :border-bottom="true">
					<u-input v-model="form.code" style="width:100px" :placeholder="($t('auth.code'))" :clearable="false"/>
					<button class='btn' @click="sendCode()" :disabled="time>0" >{{time>0?time+' s':$t('auth.codeMsg')}}</button>
				</u-form-item> -->
			</view>
			<view class="u-margin-top-40 u-margin-bottom-20 u-font-12 tips-detail">
				{{ $t('withdrawal.tips') }}
				<view>{{ $t('withdrawal.tip2') }} </view>
				<view>{{ $t('withdrawal.tip3') }}</view>
			</view>
			<template>
				<u-button class="u-margin-top-20" :custom-style="customStyle" shape="square"
					@click="handleWithdrawal('bank')">
					{{ $t('confirm') }}
				</u-button>
				<!-- <u-button class="u-margin-top-20" :custom-style="customStyle1" shape="square"
					@click="handleWithdrawal('usdt')">
					USDT
				</u-button> -->
			</template>
			<!-- <template v-else>
			  	<u-button class="u-margin-top-20" type="default" disabled="" shape="square">Confirm</u-button>
			  </template> -->
		</view>
	</view>
</template>

<script>
	import {
		getWithdrawBankCards,
		withdrawlServ,
		getCode,
	} from '@/service/pay.api.js'
	import {
		getUserInfoServ
	} from '@/service/user.api.js'
	import {
		getmerChant,
		getBank
	} from '@/service/pay.api.js'
	export default {
		data() {
			return {
				customStyle: { // 按钮颜色，以兼容微信小程序的形式写
					background: "linear-gradient(90deg,#6dcab8,#3a78cb) !important",
					color: "#ffffff"
				},
				customStyle1: { // 按钮颜色，以兼容微信小程序的形式写
					background: "#f90",
					color: "#ffffff"
				},
				isFocus: false,
				form: {
					money: '',
					code:'',//验证码,
				},

				id: '', // 提款商户id
				cardInfo: {
					bank_account: '',
					pix: '',
					bank_username: '',
					bank_name: '',
					phone: '',
					email: '',
					ifsc: '',
					upi: '',
					id: ''
				},
				time:0,
				hasCard: false, // 是否有银行卡
				value: 'YBB-UPI', // 复选款的值
				activeIndex: 0,
				boxList: [],
				rules: {
					money: [{
							required: true,
							message: this.$t('auth.tips.pls'),
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['blur'],
						},
						{
							message: this.$t('withdrawal.tip6'),
							trigger: ['blur', 'change'],
							validator: (rule, value, callback) => {
								return value.indexOf('.') < 0
							}
						},
						// {
						// 	message: 'The minimum withdrawal amount is 200 !',
						// 	trigger: 'change',
						// 	validator: (rule, value, callback) => {
						// 		return Number(value) < 200
						// 	}
						// }
					],

					code: [{
							required: true,
							message: this.$t('auth.tips.pls'),
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['blur'],
						},
						{
							message: this.$t('withdrawal.tip6'),
							trigger: ['blur', 'change'],
							validator: (rule, value, callback) => {
								return value > 0
							}
						},
						// {
						// 	message: 'The minimum withdrawal amount is 200 !',
						// 	trigger: 'change',
						// 	validator: (rule, value, callback) => {
						// 		return Number(value) < 200
						// 	}
						// }
					],
				}
			}
		},
		filters: {
			splitStr(str) {
				let result
				result = '****' + str.substr(str.length - 4, str.length)
				return result
			}
		},
		methods: {
			sendCode(){
				getCode(this.cardInfo.phone).then((res) => {
					console.log('getcode', res)
					if (res.code === 0) {
						uni.showToast({
							icon: "none",
							title: this.$t('auth.getCodeSuccess'),
						})
						
						console.log('success')
						this.time = 60;
						var timmer = setInterval(()=>{
							this.time--
							if(this.time==0){
								clearInterval(timmer)
							}
						},1000)
					}
				})
			},
			handleAllWithdrawal() {
				this.isFocus = true
				setTimeout(() => {
					this.form.money = this.$store.state.user.balance
				})
			},
			handleWithdrawal(type) {
				this.$refs.uForm.validate(valid => {
					// console.log(this.form.money)
					if (valid) {
						if (!this.form.money && this.form.money !== 0) {
							uni.showToast({
								icon: "none",
								title: this.$t('onlinePay.placeholder')
							})
							return
						}

						// if(this.form.code == ''){
						// 	uni.showToast({
						// 		title: this.$t('usdt.empty_code'),
						// 		icon: 'none'
						// 	});
						// 	return;
						// }
						if (this.form.money === 0) {
							uni.showToast({
								icon: "none",
								title: this.$t('withdrawal.placeholder')
							})
							return
						}
						if (!this.hasCard) { // 没绑银行卡
							this.$u.route({
								url: 'pages/user/bindCard'
							})
						} else {
							console.log('this.form', this.form, type)
							withdrawlServ({
								...this.form,
								type
							}).then(res => {
								getUserInfoServ().then((res) => { // 获取用户信息
									if (res.code === 0) {
										uni.showModal({
											content: this.$t('withdrawal.tip4'),
											confirmText: this.$t('confirm'),
											showCancel:false
										})
									}
									this.$store.commit('SET_USERINFO', {
										realname: res.data.realname,
										phone: res.data.phone,
										address: res.data.address,
										balance: res.data.balance,
										frozen_balance: res.data.frozen_balance,
									})
								})
							})
						}
					} else {
						console.log('verify fail');
					}
				});
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onShow() {
			getUserInfoServ().then((res) => {
				console.log('getUserInfoServ', res)
				if (res.code === 0) {
					this.cardInfo = {
						...this.cardInfo,
						...res.data
					} // 这里不需要的也全部赋值了
					console.log('this.carInfo', this.cardInfo)
					if (!res.data.bank_account || !res.data.bank_username || !res.data.phone) { // 巴西只需要cpf和姓名
						this.hasCard = false
					} else {
						this.hasCard = true
					}
				}

			})
			// getmerChant().then((res) => { // 获取充值商户。和提款商户一致？
			// 	this.boxList = res.data
			// 	this.value = this.boxList[0].name // 默认选中
			// 	this.id = this.boxList[0].id
			// })
		}
	}
</script>

<style lang="scss" scoped>
	.bal-card {
		background: linear-gradient(315deg, #a78e6f, #d5bd9d);
		display: flex;
		border-radius: 8px;
		flex-direction: column;
		justify-content: flex-start;
		margin: 15px;
		padding: 15px;
		box-sizing: border-box;
		color: #FFFFFF;

		.wrap {
			display: flex;
			flex-direction: column;
			width: 100%;
			padding-bottom: 10px;

			.current {
				display: flex;
				flex-direction: column;
				align-items: flex-start;

				.current-amount {
					font-size: 64rpx;
				}
			}

			.available {
				margin-top: 10px;
				display: flex;
				justify-content: space-between;
			}
		}

		.tips {
			font-size: 14px;
			margin-top: 15px;
			opacity: .6;
		}
	}

	.money-section {
		padding: 20px;
		box-sizing: border-box;
		margin-top: 20rpx;
		background: #FFFFFF;

		.tip {
			background: #fff;
			display: flex;

			text {
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 10px;
				font-weight: 400;
				color: #334360;
				opacity: .4;
			}
		}

		.table {
			margin-top: 20px;

			.item {
				display: flex;
				justify-content: space-between;
				padding-bottom: 10px;
				margin-top: 15px;
			}
		}
	}

	.tips-detail {
		font-size: 13px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #a7aab6;
		line-height: 20px;
		text-align: justify;
	}

	.btns {
		.btn {
			width: 30%;
			height: 104rpx;
			line-height: 50px;
			text-align: center;
			color: #1e7eee;
			font-weight: 500;
			background: #f6fafe;
			border-radius: 8px;
			border: 1px solid #ddd;
			float: left;
			margin-top: 15px;
			font-size: 16px;

			&.active {
				border: 1px solid #1e7eee;

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

	.btn{
		padding: 5px 10px;
		border-radius: 5px;
		color: #000;
		background-color: #fff;
		font-size: 12px;
	}
</style>
