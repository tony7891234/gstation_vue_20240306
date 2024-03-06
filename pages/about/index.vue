<template>
	<view id="about">
		<c-head :title="title" ></c-head>
		<view class="content">
			<view>{{$t('about.stay')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				id: null,
			}
		},
		methods: {
			
		},
		onLoad(e) {
			this.title = e.name
			switch (e.name) {
				case 'About Us':
					this.id = 1
				case 'About Withdrawal':
					this.id = 2
				case 'About Investment income':
					this.id = 3
				case 'About Invitation':
					this.id = 4
			}
				
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 10px;
		box-sizing: border-box;
	}
</style>
