<template>
	<view class="icons">
		<view class="title border-bottom" v-if="title">{{ title }}</view>
		<view class="icons-container">
			<view class="icons-wrap" v-for="(item, index) in list" :key="item.icon + index" @click="routePage(item.page, item.type)">
				<!-- <u-image :width="size?size:80" :height="size?size:80" :src="item.icon"></u-image> -->
				<img :src="item.icon" style="width: 30px;height: 30px;"/>
				<text>{{ item.name }}</text>
				<text v-if="item.money" style="margin-top: 5px;">{{ item.money }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"navIcons",
		data() {
			return {

			};
		},
		props: ['list', 'title','size'],
		methods: {
			routePage(url, type) { // 路由跳转
				// if	(url.indexOf('recharge') >= 0) {
				// 	uni.switchTab({
				// 		url
				// 	})
				// 	return
				// }
				if (type) {
					if (type === 'openUrl') {
						// #ifdef H5
						window.open(url)
						// #endif
						// #ifdef APP-PLUS
						plus.runtime.openWeb(url)
						// #endif
					} else {
						this.$u.route({
							url,
							params: {
								type
							}
						})
					}
				} else {
					this.$u.route({
						url
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.icons {
		padding: 5px;
		margin: 0 auto;
		background: none;
		border-radius: 10px;
		box-sizing: border-box;
		width: 700rpx;
		.title {
			padding: 10px 10px 10px 20px;
			font-size: 14px;
			font-weight: 700;
			margin-bottom: 10px;
		}
		.icons-container {
			padding: 5px;
			border-radius: 5px;
			display: flex;
			flex-wrap: wrap;
			background: none;
			.icons-wrap {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 20%;
				margin-top: 10px;
			
				text {
					text-align: center;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					font-size: 12px;
					margin-top:11px
				}
			}
		}
	}
</style>
