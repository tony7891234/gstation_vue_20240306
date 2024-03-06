<template>
	<view id="keyboard">
		<u-keyboard
			:tooltip="false"
			@cancel="handleCancel"
			@backspace="handleDel"
			@change="handleKeybordChange"  ref="uKeyboard" mode="number" v-model="visible">
			<view class="title">{{$t('keyboard.tip1')}}</view>
			<u-message-input :maxlength="6" :value="messageValue" :disabled-keyboard="true"></u-message-input>
		</u-keyboard>
	</view>
</template>

<script>
	export default {
		name:"c-keyboard",
		props: {
		  value: {
			type: Boolean,
			default:false
		  }
		},
		watch:{
			value(val) {
				this.visible = val;
			},
			visible(val) {
				this.$emit('input', val);
				this.messageValue = ''
			}
		},
		data() {
			return {
				visible: false,
				messageValue: ''
			};
		},
		methods: {
			handleKeybordChange (e) {
				if	(this.messageValue.length < 6) {
					this.messageValue = this.messageValue + String(e)
				}
				if (this.messageValue.length === 6) {
					this.$emit('input', false); // 关闭键盘，上传密码
					this.$emit('passwordChange', this.messageValue);
					this.messageValue = ''
				}
			},
			handleDel () {
				this.messageValue = this.messageValue.slice(0, this.messageValue.length - 1)
			},
	
		}
	}
</script>

<style lang="scss">
	@import "../../static/c.scss";
	#keyboard {
		.title {
			background: linear-gradient(90deg,$color1,$color2) !important;
			padding: 10rpx;
			text-align: center;
			color: #FFFFFF;
			font-weight: bold;
			height: 100rpx;
			line-height: 80rpx;
			font-size: 38rpx;
			border-radius: 20px 20px 50% 50%;
			z-index: 999;
		}
	}
</style>
