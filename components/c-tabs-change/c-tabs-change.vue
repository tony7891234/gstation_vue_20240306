<template>
	<view id="tabs-change">
		<view style="width: 100%;">
			<u-tabs :list="list" :is-scroll="isScroll" :current="current" @change="change"></u-tabs>
		</view>
		<view class="contents-container">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"c-tabs-change",
		props: {
			list: {
				type: Array,
				default: [{}, {}, {}]
			},
			isScroll: {
				type: Boolean,
				default: false
			},
			current: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {}
		},
		methods: {
			change(index) {
				this.$emit('indexChange', index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	#tabs-change {
		width: 100%;
	}
</style>
