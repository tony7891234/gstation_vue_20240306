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
			<!-- <view @click="submit('whatsapp')" class="u-m-t-60 btn">{{$t('account.whatsapp')}}</view> -->
			<view @click="submit('telegram')" class="u-m-t-60 btn-1">{{$t('account.telegram')}}</view>
			<view class="msg"> <span style="color:red;">{{$t('account.tip3')}}： </span>  {{$t('account.tip4')}}</view>
		</view>
	</view>
</template>

<script>
	import regs from '@/mixins/regs.mix.js'
	import { getServiceUrl } from '@/service/user.api.js'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
                telegram:'',
                whatsapp:'',
			}
		},
		mixins: [regs],
		computed: {
			
		},
		watch: {
			
		},
		onReady() {
			
		},
		
		methods: {
			...mapMutations(['SET_USERINFO']),
			
            handleGetService() {
				getServiceUrl().then((res) => { // 获取用户信息
					if (res && res.data) {
						this.telegram = res.data.telegram
						this.whatsapp = res.data.whatsapp
					}
				})
			},
			submit(param) {

                if(param == 'telegram'){
                    location.href = this.telegram
                }
                if(param == 'whatsapp'){
                    location.href = this.whatsapp
                }
			}
		},
        onLoad() {
            this.handleGetService();
		},
		
	}
</script>

<style lang="scss" scoped>
	@import "../../static/c.scss";

    .msg{
        padding: 20px;
    }
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
