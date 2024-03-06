<template>
	<view id="pwd">
		<c-head :title="$t('pwd.title2')" ></c-head>
		<view class="form">
			<u-form :model="form" ref="uForm">
				<u-form-item prop="password" label-position="top" :border-bottom="false">
					<u-input :border="true" type="" class="input_type" v-model="form.password" :placeholder="$t('pwd.placeholder4')" type="password" maxlength="6" :clearable="false"/>
				</u-form-item>
				<u-form-item prop="password" label-position="top" :border-bottom="false">
					<u-input :border="true" class="input_type" v-model="form.new_password" :placeholder="$t('pwd.placeholder5')" type="password" maxlength="6" :clearable="false"/>
				</u-form-item>
				<u-form-item prop="confirm_pwd" label-position="top" :border-bottom="false">
					<u-input :border="true" class="input_type" v-model="form.confirm_pwd" :placeholder="$t('pwd.placeholder3')" type="password" maxlength="6" :clearable="false"/>
				</u-form-item>
			</u-form>
			<u-button @click="handleChangePwd" type="primary" class="u-m-t-60 btn">{{$t('addr.save')}}</u-button>
		</view>
	</view>
</template>

<script>
	import regs from '@/mixins/regs.mix.js'
	import { changePaymentPwdServ } from '@/service/user.api.js'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				form: {
					password: '',
					new_password: '',
					confirm_pwd: '',
				},
				show: false,
				id: 0
			}
		},
		mixins: [regs],
		computed: {
			rules() {
				return {
					password: [
						{
							required: true,
							message: this.$t('auth.tips.pls'), 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						},
						{
							type: 'number',
							message: this.$t('pwd.tip1'), 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						},
					],
					new_password: [
						{
							required: true,
							message: this.$t('auth.tips.pls'), 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						},
						{
							type: 'number',
							message: this.$t('pwd.tip1'), 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						},
					],
					confirm_pwd: [
						{
							required: true,
							message: this.$t('auth.tips.pls'), 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						},
						{
							message: this.$t('auth.tips.passDiff'), // 必须包含数字字母的组合
							// 可以单个或者同时写两个触发验证方式 ['change','blur']
							trigger: 'blur',
							validator: (rule, value, callback) => {
								return this.form.new_password === this.form.confirm_pwd
							}
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
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			...mapMutations(['SET_USERINFO']),
			serve(){ // 联系客服
				console.log(1111)
			},
			handlePasswords (e) {
				this.form.pay_password = e
			},
			handleInput () {
				this.show = true
			},
			handleChangePwd() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						changePaymentPwdServ(this.form).then(res => {
							if (res.code === 0) {
								this.form = {}
								uni.showToast({
									icon: 'none',
									title: this.$t('pwd.updated')
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
	#pwd {
		.title {
			padding: 16rpx 60rpx 0 60rpx;
			box-sizing: border-box;
			font-size: 48rpx;
			color: #FFFFFF;
		}
		.icon {
			
		}
		.login-head {
			height: 336rpx;
			color: red;
		}
		.form {
			border-radius: 30rpx;
			background-color: #FFFFFF;
			margin: 30rpx;
			padding: 20px;
		}
		.u-row-between {
			color: red;
		}
		.btn {
			background: linear-gradient(90deg,$color1,$color2);
			text-align: center;
			color: #FFFFFF;
			border-radius: 20px;
			font-size: 14px;
			padding: 10px;
		}
	}
</style>
