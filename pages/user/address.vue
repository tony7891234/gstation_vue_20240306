<template>
	<view id="address">
		<c-head :title="$t('account.service')" ></c-head>
		<view class="form">
			<!-- <view class="lines">
				<u-form :model="form" ref="uForm">
					<u-form-item :label="$t('addr.username')" prop="realname" label-position="top" :border-bottom="true">
						<u-input v-model="form.realname" :placeholder="$t('addr.realname')" :clearable="false"/>
					</u-form-item>
					<u-form-item :label="$t('addr.phone')" prop="phone_number" label-position="top" :border-bottom="true">
						<u-input v-model="form.phone_number" type ="'number'" :placeholder="$t('addr.number')" :clearable="false"/>
					</u-form-item>
					<u-form-item :label="$t('addr.your_addr')" prop="address" label-position="top" :border-bottom="true">
						<u-input v-model="form.address" :type="'textarea'" :placeholder="$t('addr.pls_enter_addr')" :clearable="false"/>
					</u-form-item>
				</u-form>
			</view> -->
			<view @click="submit" class="u-m-t-60 btn">Whatsapp</view>
			<view @click="submit" class="u-m-t-60 btn-1">Telegram</view>
		</view>
	</view>
</template>

<script>
	import regs from '@/mixins/regs.mix.js'
	import { getUserInfoServ, updateUserInfoServ } from '@/service/user.api.js'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				form: {
					realname: '',
					phone_number: '',
					address: '',
				},
				show: false,
			}
		},
		mixins: [regs],
		computed: {
			rules() {
				return {
					realname: [
						{
							required: true,
							message: this.$t('auth.tips.pls'), 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						},
						{
							message: this.$t('auth.tips.realnameError'), // 必须包含数字字母的组合
							// 可以单个或者同时写两个触发验证方式 ['change','blur']
							trigger: 'change',
							validator: (rule, value, callback) => {
								return this.regs[rule.field].test(value)
							}
						}
					],
					phone_number: [
						{ 
							required: true,
							message: this.$t('auth.tips.pls'), 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
					address: [
						{ 
							required: true,
							message: this.$t('auth.tips.pls'), 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
				}
			}
		},
		watch: {
			form: {
				deep: true,
				handler(newVal) {
					const validateArr = ['username', 'realname', 'password']
					for(let i = 0; i < validateArr.length; i++) {
						const current = validateArr[i]
						if (!this.regs[current].test(this.form[current])) {
							this.isValid = false
							return
						}
					}
					this.isValid = this.form['password'] === this.form['confirm_pwd']
				}
			}
		},
		onReady() {
			// const tab = document.querySelector('.uni-tabbar-bottom')
			// tab.style.display = 'block'
		},
		onLoad() {
			this.form.realname = this.$store.state.user.realname
			this.form.phone_number = this.$store.state.user.phone_number
			this.form.address = this.$store.state.user.address
		},
		methods: {
			...mapMutations(['SET_USERINFO']),
			handleSelectConfirm (res) {
				this.form.bank = res[0].label
			},
			serve(){ // 联系客服
				console.log(1111)
			},
			handlePasswords (e) {
				this.form.pay_password = e
			},
			handleInput () {
				this.show = true
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					console.log('submit,valid', valid)
					if (valid) {
						updateUserInfoServ(this.form).then((res) => {
							if (res.code === 0) {
								uni.showToast({
									title: this.$t('addr.success')
								})
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
								getUserInfoServ().then((res) => { // 重新获取用户信息
									this.SET_USERINFO({
										realname: res.data.realname,
										phone_number: res.data.phone_number,
										address: res.data.address,
										balance: res.data.balance,
										frozen_balance: res.data.frozen_balance,
									})
								})
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
	#address {
		.icon {
			
		}
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
				background: linear-gradient(90deg, #63c05f, #61b478);
				text-align: center;
				color: #FFFFFF;
				border-radius: 20px;
				font-size: 14px;
				padding: 10px;
			}
			.btn-1 {
				background: linear-gradient(90deg, #00b7fc, #2791e5);
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
