<!-- <template>
	<view id="toney_scroll_container">
		<view class="list uni-flex uni-column">
			<view class="wrap-item">
				<view id="lis" class="lis uni-flex uni-column" :animation="animationData">
					<view>
						<view class="item u-padding-30 u-flex u-row-between border-bottom" v-for="(item, index) in list" :key="'item.name' + index">
							<view class="left u-flex">
								<u-image width="80rpx" height="80rpx" :src="item.src"></u-image>
								<view class="u-flex u-flex-col u-margin-left-10">
									<text class="name">{{ item.username }}{{ $t('home.withdrawal2') }}</text>
								</view>
							</view>
							<view class="right">{{$t('moneyLogo') + item.amount }}</view>
						</view>
					</view>
					<view>
						<view class="item u-padding-30 u-flex u-row-between border-bottom" v-for="(item, index) in list" :key="'item.src' + index">
							<view class="left u-flex">
								<u-image width="80rpx" height="80rpx" :src="item.src"></u-image>
								<view class="u-flex u-flex-col u-margin-left-10">
									<text class="name">{{ item.username }}{{ $t('home.withdrawal2') }}</text>
								</view>
							</view>
							<view class="right">{{$t('moneyLogo') + item.amount }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array
		}
	},
	data() {
		return {
			scrollHeight: 0, //向上滚动距离
			height: 0, //.lis高度（滚动框高度）
			animationData: {}, //动画对象
			timer: null
		};
	},
	components: {},
	mounted() {
		this.prizeScroll();
	},
	activated() {
		// this.$forceUpdate()
		this.prizeScroll();
	},
	deactivated() {
		// console.log('tony deactivated')
		this.scrollHeight = 0
		this.height = 0
		this.animationData = {}
		clearInterval(this.timer)
		this.timer = null
		// this.$forceUpdate()
	},
	methods: {
		getHeight(Class) {
			let query = uni.createSelectorQuery().in(this);
			query
				.selectAll(Class)
				.boundingClientRect(data => {
					this.height = data[0].height;
				})
				.exec();
		},
		prizeScroll() {		
			let speed = 50;
			let scrollHeightCount = 0;
			let animation = uni.createAnimation({
				duration: this.getHeight('.lis') / speed,
				timingFunction: 'linear',
				delay: 0
			});
			// const lis = document.getElementById('lis')
			this.timer = setInterval(() => {
				// if (scrollHeightCount >= this.height / 2) {
				// 	const childs0 = lis.childNodes[0]
				// 	const div = childs0.cloneNode(true)
				// 	const hei = childs0.clientHeight
				// 	lis.appendChild(div)
				// 	childs0.parentNode.removeChild(childs0)
				// 	lis.style.paddingTop = Number(lis.style.paddingTop.split('p')[0])  + Number(hei) + 'px'; // 删除首个子元素需要撑开原有的空间
				// 	scrollHeightCount = 0
				// }
				if (Math.floor(this.scrollHeight) === Math.floor(this.height / 2)) {
					this.scrollHeight = 0
					this.animationData = {}
				}
				this.scrollHeight = this.scrollHeight + 1;
				scrollHeightCount += 1;
				animation.translateY(-this.scrollHeight).step();
				this.animationData = animation.export();
			}, speed);
		}
	}
};
</script>

<style lang="scss">
	#toney_scroll_container {
		width: 700rpx;
		border-radius: 10px;
		margin: 0 auto;
		display: flex;
		height: 210px;
		background-color: #FFFFFF;
		.list, .item {
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
			.left {
				.commission {
					color: #CCCCCC;
				}
			}
			.right {
				color: #e9610a;
			}
		}
	}
</style> -->
<template>
	<view id="mem_scroll_container1">

		<view id="mem_scroll_wrap1" :style="'width:'+list.length*145 +'px'">

			<div class="box" v-for="(item, index) in list" :key="'item.name' + index" >
				<img :src="item.level?vip[last(item.level)]:vip[0]" class="avatar" />
				<div class="name" style="margin: 10px 0;">{{ item.username }}</div>
				<div class="name" style="margin-bottom: 6px">{{$t('cong')}}</div>
				<div class="name">{{$t('earn')}} {{$t('moneyLogo') + item.income }}</div>
			</div>
			<!-- <view class="item u-padding-30 u-flex u-row-between border-bottom" v-for="(item, index) in list"
				:key="'item.name' + index">
				<view class="left u-flex">
					<u-image width="80rpx" height="80rpx" :src="item.src"></u-image>
					<view class="u-flex u-flex-col u-margin-left-10">
						<text class="name">{{ item.username }}</text>
						<text class="commission">{{ $t('home.commision') }}</text>
					</view>
				</view>
				<view class="right">{{$t('moneyLogo') + item.amount }}</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "mem-scroll",
		props: ['list'],
		data() {
			return {
				count: 0,
				vip: [
					require('../../static/VIP1.png'),
					require('../../static/VIP2.png'),
					require('../../static/VIP3.png'),
					require('../../static/VIP4.png'),
					require('../../static/VIP5.png')
				],
			}
		},
		mounted() {

			const wrap = document.getElementById('mem_scroll_wrap1')
			const container = document.getElementById('mem_scroll_container1')
			// const wrap = document.getElementById('mem_scroll_wrap')
			// let originTop = wrap.style.top
			let top = wrap.style.left
			 setInterval(() => {
			 	if (this.count === this.list.length - 3) {
			 		container.removeChild(wrap)
			 		setTimeout(() => {
			 			container.appendChild(wrap)
			 			wrap.style.left = 0
			 			top = 0
			 			this.count = 0
			 		})
			 	} else {
			 		wrap.style.left = top - 144 + 'px'
			 	}
			 	top = top - 144
			 	this.count += 1
			 }, 2000)
		},
		methods:{
			last(e){
				var i = Number(e.charAt(e.length-1)) - 1
				return i
			}
		}
	}
</script>

<style lang="scss">
	#mem_scroll_container1 {
		width: 700rpx;
		border-radius: 10px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 210px;

		// overflow: hidden;
		// background-color: #FFFFFF;
		overflow: scroll;

		#mem_scroll_wrap1 {
			width: 10000px;
			position: absolute;
			left: 0px;
			top: 0px;
			transition: all 1s linear;
			height: 100%;
	
		}

		.item {
			width: 100%;
			box-sizing: border-box;

			.left {
				.commission {
					color: #CCCCCC;
				}
			}

			.right {
				color: #e9610a;
			}
		}


		.box {
			width: 134px;
			height: 167px;
			background: #FFFFFF;
			box-shadow: 0px 4px 5px 0px rgba(211, 211, 211, 0.5);
			border-radius: 8px;
			display: inline-flex;
			margin-top: 20px;
			margin-right: 10px;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #1B1B1B;

			.avatar {
				height: 60px;
				border-radius: 50%;
			}

			.name {
				font-size: 10px;
			}
		}
	}
</style>
