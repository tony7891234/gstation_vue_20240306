<template>
	<view id="grab_scroll_container">
		<view class="list uni-flex uni-column">
			<view class="wrap-item">
				<view id="lis" class="lis uni-flex uni-column" :animation="animationData">
					<view>
						<view class="item u-padding-30 u-flex u-row-between" v-for="(item, index) in list" :key="'item.name' + index">
							<view class="left u-flex">
								<text class="u-text-center name1">{{ item.name }}</text>
								<text class="name u-text-center">{{ item.news }}</text>
							</view>
							<view class="right">{{ item.time }}</view>
						</view>
					</view>
					<view>
						<view class="item u-padding-30 u-flex u-row-between" v-for="(item, index) in list" :key="'item.src' + index">
							<view class="left u-flex">
								<text class="u-text-center">{{ item.name }}</text>
								<text class="name u-text-center">{{ item.news }}</text>
							</view>
							<view class="right">{{ item.time }}</view>
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
			animationData: {} //动画对象
		};
	},
	components: {},
	mounted() {
		this.prizeScroll();
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
			const lis = document.getElementById('lis')
			setInterval(() => {
				if (scrollHeightCount >= this.height / 2) {
					const childs0 = lis.childNodes[0]
					const div = childs0.cloneNode(true)
					const hei = childs0.clientHeight
					lis.appendChild(div)
					childs0.parentNode.removeChild(childs0)
					lis.style.paddingTop = Number(lis.style.paddingTop.split('p')[0])  + Number(hei) + 'px'; // 删除首个子元素需要撑开原有的空间
					scrollHeightCount = 0
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
	#grab_scroll_container {
		width: 750rpx;
		margin: 0 auto;
		display: flex;
		font-size: 12px;
		height: 45px;
		.list, .item {
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
			color: #ffffff;
			.left {
				.commission {
					color: #CCCCCC;
				}
			}
			.right {
			}
		}
		.name1 {
		}
		.name {
			color: red;
			margin-left: 5px;
		}
	}
</style>
