<template>
	<div>
		<c-head :title="$t('usdt.title')"></c-head>
		<input id="input" />

		<div class="info" style="height: 100px;">
			<div class='msg'>
				<h3>{{$t('balance')}}</h3>
				<h3> {{$t('moneyLogo')}} {{this.balance}}</h3>
			</div>
		</div>

		<div class="info">
			<div class='msg'>
				<h3>{{$t('usdt.address')}}</h3>
				<p>{{key1}}</p>
			</div>
			<!-- <div class='btn' @click='copyText'>copy</div> -->
		</div>

		<!-- <div class="info" style="height: 50px;">
			<div class='msg'>
				<p>Rate:<span style='color:#6F67FC;font-size: 14px;margin-right: 20px;'>{{key2}} </span> Platform quantity:<span style='color:#6F67FC;font-size: 14px;margin-right: 20px;'>{{key3}} </span></p>
			</div>
		</div> -->

		<div class="info">
			<div class='msg'>
				<h3>{{$t('usdt.tip1')}}</h3>
				<u-input v-model="amount" type="number" :placeholder="$t('usdt.tip1')" />
			</div>
		</div>
		
		
		<div class="info">
			<div class='msg'>
				<h3>{{$t('auth.pay_pwd')}}</h3>
				<u-input v-model="pay_pass" type="password" :placeholder="$t('auth.pay_pwd')" />
			</div>
		</div>
<!-- 
		<div class="info">
			<div class="msg">
				<h5>Please use the registered phone to receive SMS</h5>
				<u-form-item  prop="code" label-position="top" :border-bottom="true">
				<u-input  v-model="code" style="width:200px" :placeholder="($t('auth.code'))" :clearable="false"/>
				<button class='new_btn' @click="sendCode()" :disabled=" time > 0 " >{{time > 0 ? time +'s' : $t('auth.codeMsg')}}</button>
				</u-form-item>
			</div> -->
			<!-- <u-form-item  prop="code" label-position="top" :border-bottom="true">
			<u-input  v-model="code" style="width:200px" :placeholder="($t('auth.code'))" :clearable="false"/>
			<button class='new_btn' @click="sendCode()" :disabled=" time > 0 " >{{time > 0 ? time +'s' : $t('auth.codeMsg')}}</button>
			</u-form-item>
			<span>sdfsdfsdf</span> -->
		<!-- </div> -->

		<u-button class="u-margin-top-20" shape="square" @click="handleRecharge" :disabled="!amount">
			{{$t('confirm')}}
		</u-button>

		<div style="padding:30px;font-size:14px;color:red;">
			<!-- <p>{{$t('withdrawal.tips')}} </p> -->
			<!-- <p>{{$t('withdrawal.tip7')}}</p> -->
		</div>
		
	</div>
</template>

<script>
	import {
		info,
		save,
		withdrawlServ,
		getCode
	} from "../../service/pay.api.js"
	import {
		getUserInfoServ
	} from '@/service/user.api.js'
	export default {
		data() {
			return {
				amount: '',
				address: '',
				key1: '',
				key2: '',
				key3: '',
				balance : '',
				pay_pass:'',
				time : 0,
				phone : '',
				code:'',
			}
		},
		methods: {
			sendCode(){
				getCode(this.phone).then((res) => {
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
					}else{
						uni.showToast({
							icon: "none",
							title: res.msg,
						})

					}
				})
			},

			handleRecharge() {
				
				if(!this.key1 || this.key1 == ''){
					uni.showModal({
						content: this.$t('usdt.empty_address'),
						confirmText: this.$t('confirm'),
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/user/bindCard',
								})
							}
						},
					})
					
					return
				}

				// if(this.code == '' || !this.code){
				// 	uni.showToast({
				// 		title: this.$t('usdt.empty_code'),
				// 		icon: 'none',
				// 		duration: 3000
				// 	});
				// 	return;
				// }

				if(this.amount > this.balance){
					uni.showToast({
						title: this.$t('withdrawal.tip5'),
						icon: 'none',
						duration: 3000
					});
					return;
				}
				
				withdrawlServ({ type : 'usdt', money : this.amount, pay_pass:this.pay_pass}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.amount = ''
						this.address = ''
						setTimeout(() => {
							this.$$back()
						}, 1000)

					}

					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});

					return
				})
			},
			copyText() {
				
				// this.$copyText(this.key1).then(
				// 	res => {
				// 		this.$$showToast(this.$t('copySuccess'))
				// 	},
				// 	err => {
				// 		this.$$showToast(this.$t('copyError'))
				// 	}
				// )
				
				
			}
		},
		watch: {
			// amount(val) {
			// 	this.key3 = Number(val * this.key2).toFixed(2)
			// }
		},
		onShow() {
			
			getUserInfoServ().then((res) => {
				console.log('getUserInfoServ', res)
				if (res.code === 0) {
					this.balance = res.data.balance
					this.phone = res.data.phone
					this.key1 = res.data.upi
				}

			})
		}
	}
</script>

<style lang="scss" scoped>
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

	.u-btn {
		width: 700rpx;
		margin-top: 40px !important;
		background: #6F67FC !important;
		color: #fff !important
	}

	uni-button[disabled] {

		color: rgba(0, 0, 0, .3) !important;
		border: 1px solid rgba(0, 0, 0, .3) !important;
		background-color: #fff !important;
	}
	
	.btn{
		padding: 5px 10px;border-radius: 5px;background: #6F67FC;
		color: white;
	}

	.new_btn{
		border-radius: 5px;
		// background: #6F67FC;	
		padding: 5px 10px;
		border-radius: 5px;
		color: #000;
		background-color: #fff;
		font-size: 12px;
		margin-left: 37px;
	}
</style>
