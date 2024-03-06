<template>
	<view id="bind">
		<c-head :title="$t('bind.title')"></c-head>
		<view class="form">
			<view class="title">{{ $t('bind.pay_info') }}</view>
			<view class="tips">{{ $t('bind.tip1') }}</view>
			<view class="lines">
				<u-form :model="form" ref="uForm">
		
					<u-form-item :label="$t('bind.phone_num')" prop="phone" label-position="top" :border-bottom="true">
						<u-input v-model="form.phone" type="number" :placeholder="$t('bind.placeholder3')"
							:clearable="false" />
					</u-form-item>
					<u-form-item :label="$t('bind.email')" prop="email" label-position="top" :border-bottom="true">
						<u-input v-model="form.email" :placeholder="$t('bind.placeholder4')" :clearable="false" />
					</u-form-item>
			
					<u-form-item :label="$t('bind.upi')" prop="upi" label-position="top" :border-bottom="true">
						<u-input v-model="form.upi" :placeholder="$t('bind.placeholder_upi')" :clearable="false" />
					</u-form-item>
				</u-form>
			</view>
			<view @click="submit" class="u-m-t-60 btn">{{ $t('addr.save') }}</view>
			<u-card :title="$t('withdrawal.tips')">
				<view style="opacity: .4;" slot="body">
					{{ $t('bind.tip2') }}
				</view>
			</u-card>
		</view>
		<view style="height: 56px;width: 100%;"></view>
	</view>
</template>
<script>
	import regs from '@/mixins/regs.mix.js'
	import {
		bindCardServ,
		getBank
	} from '@/service/pay.api.js'
	import {
		getUserInfoServ
	} from '@/service/user.api.js'
	import {
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				form: {
					phone: '',
					email: '',
					upi: '',
				},
				show: false,
				bankList: [],
				bankListData: [], // 包含银行的各种数据
			}
		},
		mixins: [regs],
		computed: {
			rules() {
				return {
					phone: [{
						required: true,
						message: this.$t('auth.tips.pls'),
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur'],
					}],
					email: [{
							required: true,
							message: this.$t('auth.tips.pls'),
							// 可以单个或者同时写两个触发验证方式
							trigger: ['change', 'blur'],
						},
						{
							message: 'The mailbox format is incorrect.',
							// 可以单个或者同时写两个触发验证方式 ['change','blur']
							trigger: ['change', 'blur'],
							validator: (rule, value, callback) => {
								return this.$u.test.email(value)
							}
						}
					],
					// upi: [
					//     {
					//         required: true,
					//         message: this.$t('auth.tips.pls'),
					//         // 可以单个或者同时写两个触发验证方式
					//         trigger: ['change', 'blur'],
					//     }
					// ],
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			// const tab = document.querySelector('.uni-tabbar-bottom')
			// tab.style.display = 'block'
		},
		onLoad(e) {
			getUserInfoServ().then((res) => {
				if (res.code === 0) {
					console.log('getUserInfoServ', res.data)
					this.form = {
						...this.form,
						...res.data
					} // 这里不需要的也全部赋值了

				}
			})
			getBank(1).then((res) => {
				if (res.code === 0) {
					// this.bankList = Object.entries(res.data).map(e => {
					// 	return {
					// 		label: e[1],
					// 		value: e[0]
					//  }
					// })
					
					this.bankList = res.data
				} else {
					uni.showToast({
						title: 'Failed to get the bank list, please re-enter the page.'
					})
				}

			})
		},
		methods: {
			...mapMutations(['SET_USERINFO']),
			handleSelectConfirm(res) {
				this.form.bank_name = res[0].label
				this.form.bank_code = res[0].value
			},
			serve() { // 联系客服
				console.log(1111)
			},
			handlePasswords(e) {
				this.form.pay_password = e
			},
			handleInput() {
				this.show = true
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						let form = {
							phone: this.form.phone,
							email: this.form.email,
							upi: this.form.upi,
						}
						bindCardServ(form).then((res) => {
							if (res.code === 0) {
								uni.showToast({
									title: this.$t('addr.success')
								})
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							}
						})
					} else {
						console.log('verify fail');
					}
				});
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import "../../static/c.scss";

	#bind {
		.icon {}

		.login-head {
			height: 336rpx;
			color: red;
		}

		.form {
			border-radius: 30rpx;
			padding: 20rpx 30rpx 30rpx 30rpx;

			.title {
				padding: 20rpx 0 30rpx 0;
				font-size: 23px;
				font-family: Myriad Pro;
				font-weight: 700;
				color: #000000;
				text-align: left;
			}

			.tips {
				opacity: .4;
			}

			.lines {
				padding: 10px;
				background: #FFFFFF;
			}

			.btn {
				background: linear-gradient(90deg, $color1, $color2);
				text-align: center;
				color: #FFFFFF;
				border-radius: 20px;
				font-size: 14px;
				padding: 10px;
			}
		}

		.u-row-between {
			color: red;
		}
	}
</style>
