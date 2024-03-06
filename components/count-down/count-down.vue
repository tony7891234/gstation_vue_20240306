<template>
	<view>
		<u-mask :show="showLoading" :custom-style="{background: 'rgba(0, 0, 0, 0)'}">
			<view class="warp">
				<view class="rect" @tap.stop>
					<u-loading mode="flower" size="90"></u-loading>
					<view class="u-margin-top-10"style="color: #FFFFFF; font-size: 16px;">
						{{ value }}&nbsp;second
					</view>
				</view>
			</view>
			
		</u-mask>
	</view>
</template>

<script>
	export default {
		name:"count-down",
		props:{
			showLoading: {
				default: false,
				type: Boolean
			}
		},
		data() {
			return {
				value: 5,
				show: false,
			};
		},
		watch: {
			showLoading (val, oldVal) {
				if (val === true) {
					let timer
					timer = setInterval(() => {
						if (this.value > 0) {
							this.value -= 1
						} else {
							this.$emit('end')
							clearInterval(timer);
							timer = null;
							this.value = 5
						}
					}, 1000)
					this.$once('hook:beforeDestroy',()=>{
						clearInterval(timer);
						timer = null;
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.warp {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.rect {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	width: 300rpx;
	height: 200rpx;
	background-color: rgba(0, 0, 0, 0.5);
}
</style>
