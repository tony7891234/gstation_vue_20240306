<template>
	<div>
		<c-head :title="$t('recharge.title1')"></c-head>
		<input id="input" />
		<div class="info">
			<div class='msg'>
				<h3>{{$t('recharge.usdt_address')}}</h3>
				<p>{{key1}}</p>
			</div>
			<div class='btn' @click='copyText'>{{$t('recharge.copy')}}</div>
		</div>

		<div class="info" style="height: 50px;">
			<div class='msg'>
				<p>Rate:<span style='color:#6F67FC;font-size: 14px;margin-right: 20px;'>{{key2}} </span> Platform quantity:<span style='color:#6F67FC;font-size: 14px;margin-right: 20px;'>{{key3}} </span></p>
			</div>
		</div>

		<div class="info">
			<div class='msg'>
				<h3>{{$t('recharge.usdt_amount')}}</h3>
				<u-input v-model="amount" type="number" :placeholder="$t('recharge.usdt_amount')" />
			</div>
		</div>
		<div class="info">
			<div class='msg'>
				<h3>{{$t('recharge.you_usdt_address')}}</h3>
				<u-input v-model="address" :placeholder="$t('recharge.you_usdt_address')" />
			</div>

		</div>

		<u-button class="u-margin-top-20" shape="square" @click="handleRecharge" :disabled="!amount||!address">
			{{$t('confirm')}}
		</u-button>
		
	</div>
</template>

<script>
	import {
		info,
		save
	} from "../../service/pay.api.js"
	export default {
		data() {
			return {
				amount: '',
				address: '',
				key1: '',
				key2: '',
				key3: ''
			}
		},
		methods: {
			handleRecharge() {
				save(this.address, Number(this.amount).toFixed(2)).then(res => {
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
				
				this.$copyText(this.key1).then(
					res => {
						this.$$showToast(this.$t('copySuccess'))
					},
					err => {
						this.$$showToast(this.$t('copyError'))
					}
				)
				
				
			}
		},
		watch: {
			amount(val) {
				this.key3 = Number(val * this.key2).toFixed(2)
			}
		},
		onShow() {
			info().then(res => {

				this.key1 = res.data.address;
				this.key2 = res.data.rate;

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
</style>
