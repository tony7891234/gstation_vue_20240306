<template>
	<view id="lucky">
		<c-head :title="$t('lucky.title')"></c-head>
		<view class="container">
			<view>
				<LuckyWheel ref="myLucky" width="600rpx" height="600rpx" :blocks="blocks" :prizes="prizes"
					:buttons="buttons" @start="startCallBack" @end="endCallBack" />
			</view>
		</view>
	</view>
</template>

<script>
	import LuckyWheel from '@/components/@lucky-canvas/uni/lucky-wheel.vue'
	import {
		getLottery,
		priceList
	} from '@/service/user.api.js'
	export default {
		components: {
			LuckyWheel
		},
		computed: {
		
		},
		data() {
			return {
				blocks: [{
					padding: '13px',
					background: '#617df2',
					imgs: [
						{
							src: '../../static/zhuanpan-bg1.png',
							width: '600rpx',
							height: '600rpx',
							rotate: true
						}
					]
				}],
				prizes: [
					// {
					// 	fonts: [{
					// 		text: '',
					// 		top: '10%'
					// 	}],
					// 	background: '#e9e8fe'
					// },
					// {
					// 	fonts: [{
					// 		text: '',
					// 		top: '10%'
					// 	}],
					// 	background: '#b8c5f2'
					// },
					// {
					// 	fonts: [{
					// 		text: '',
					// 		top: '10%'
					// 	}],
					// 	background: '#e9e8fe'
					// },
					// {
					// 	fonts: [{
					// 		text: '',
					// 		top: '10%'
					// 	}],
					// 	background: '#b8c5f2'
					// },
					// {
					// 	fonts: [{
					// 		text: '',
					// 		top: '10%'
					// 	}],
					// 	background: '#e9e8fe'
					// },
					// {
					// 	fonts: [{
					// 		text: '',
					// 		top: '10%'
					// 	}],
					// 	background: '#b8c5f2'
					// },
					// {
					// 	fonts: [{
					// 		text: '',
					// 		top: '10%'
					// 	}],
					// 	background: '#e9e8fe'
					// },
					// {
					// 	fonts: [{
					// 		text: '',
					// 		top: '10%'
					// 	}],
					// 	background: '#b8c5f2'
					// },
				],
				buttons: [
					// {
					// 	radius: '50px',
						// background: '#617df2'
					// },
					// {
					// 	radius: '45px',
						// background: '#afc8ff'
					// },
					// {
					// 	radius: '40px',
						// background: '#869cfa',
					// 	pointer: true,
					// 	fonts: [{
					// 		text: this.$t('lucky.text1') + '\n' + this.$t('lucky.text2'),
					// 		top: '-20px'
					// 	}]
					// },
					{
						radius: '50px',
						pointer: true,
						imgs: [
							{
								src: '../../static/zhuanpan-arrow.png',
								top: -150,
								width: '600rpx',
								height: '600rpx'
							}
						]
					}
				],
				award: 0,
				msg: '',
				index: 0
			}
		},
		onLoad(obj) {
			
		},
		created () {
			this.getPriceList()
		},
		methods: {
			getPriceList () {
				priceList().then(res => {
					if (res.code === 0) {
						const arr = []
						for(let i = 0; i< res.data.length; i++) {
							arr.push({fonts:[{text:'',top:'10%'}],background:''})
							// arr[i].fonts[0].text = res.data[i].total
							// arr[i].background = i%2 == 0 ? '#e9e8fe' : '#b8c5f2'
						}
						this.prizes = arr
					}
				})
			},
			startPlay () {
				getLottery().then(res => {
					if (res.code === 0) {
						this.index = parseInt(res.data)
						this.msg = res.msg
						this.$refs.myLucky.play()
						setTimeout( () => {
							this.$refs.myLucky.stop(this.index)
						}, 3000)
					} else {
						console.log(res)
					}
				}) 
			},
			startCallBack() {
				this.startPlay()
				
			},
			endCallBack(prize) {
				uni.showToast({
					icon: 'none',
					title: this.msg,
					duration: 3000
				});
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import "../../static/c.scss";

	#lucky {
		height: 100vh;

		.container {
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-direction: column;
			padding-top: 100px;

			.bg {
				background: url(../../static/invite_bg.png);
				background-size: 100% auto;
				background-position: 0 -120rpx;
				width: 100%;
				height: 400rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #FFFFFF;
			}

			.left {
				display: flex;
				flex-direction: column;
				align-items: center;

				.code {
					color: #000000;
					font-size: 32rpx;
					font-weight: bold;
					text-align: center;
					margin-bottom: 10px;
					padding: 5px;
				}
			}

			.right {
				.btn {
					margin-top: 10px;
					margin-bottom: 10px;
					background: linear-gradient(90deg, $color1, $color2) !important;
					padding: 10px;
					border-radius: 5px;
					color: #FFFFFF;
					width: 200rpx;
					text-align: center;
				}
			}
		}
	}
</style>
