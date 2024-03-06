export default {
	install (Vue) {
		// back
		Vue.prototype.$$back = (delta = 1, animationDuration = 300, animationType="pop-out") => {
			// #ifdef APP-PLUS
			uni.navigateBack({
				delta,
				animationDuration,
				animationType
			})
			// #endif
			// #ifdef H5
			history.back()
			// #endif
		}
		
		// navigateTo
		Vue.prototype.$$navigateTo = (url) => {
			uni.navigateTo({
				url,
				success: () => {
					// nothing
				},
				fail: (err) => {
					console.log(err)
					uni.showToast({
						icon: 'none',
						title: 'route error!'
					})
				},
				complete: () => {
					// nothing
				}
			})
		}
		
		// showToast
		Vue.prototype.$$showToast = (title) => {
			uni.showToast({
				title,
				icon: 'none',
				success: () => {
					
				},
				fail: (err) => {
					console.log(err)
				},
				mask: true
			})
		}
		
		// showModal
		Vue.prototype.$$showModal = uni.showModal
	}
}