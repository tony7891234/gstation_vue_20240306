import config from '@/config/index.js'
import store from '@/store/index.js'
// import uni from 'uniap'

const { BASE_URL } = config

let pending = {}

// const removePending = (key) => {
//     delete this.pending[key]
// }

const request = ({
	url,
	method = 'GET',
	data = {}, 
	header = {'content-type': 'application/x-www-form-urlencoded'}, 
	showLoading = true
}) => {
	// 避免重复请求
	let key = url + method
	if (pending[key] && key.indexOf('/web/index/member') < 0) {
		return Promise.reject('Cancel request')
	}
	pending[key] = true
	
	let newHeader = header
	const token = store.state.user.token
	if (token) {
		newHeader = Object.assign(header, {
			"Auth-Token": token,
            'Accept-Language': uni.getStorageSync('lang') || 'en'
		}) // 实际因该从store里取 token, 这里要报错...
	} else {
        newHeader = Object.assign(header, {
            'Accept-Language': uni.getStorageSync('lang') || 'en'
        })
    }
	return new Promise((resolve, reject) => {
		showLoading && uni.showLoading()
		uni.request({
			url: `${BASE_URL}${url}`,
			method,
			data,
			dataType: 'application/json', // 返回的数据格式
			// withCredentials: true,
			header: newHeader,
			success: (res) => { // 可以格式话一下再resolve
				pending[key] = false
				if (res.statusCode === 200 && res.errMsg === 'request:ok') {
					let { data } = res
					
					if (typeof data === 'string' && data.startsWith('{')) { // 纯字符串返回的
						data = JSON.parse(data)
					}
					const { code, msg, result,rebate } = data
					let _data = {
						code,
						msg,
						result,
						rebate
					}
					if (data.data) {
						_data.data = data.data
					}
					if (data.count) {
						_data.count = data.count
					}
					if (data.token) {
						_data.token = data.token
					}
					if (data.finished === 0 || data.finished === 1) {
						_data.finished = data.finished
					}
					if (data.unfinished_orders) {
						_data.unfinished_orders = data.unfinished_orders
					}
					if (code === 0 || code == -101) { // data: {code: 200, reuslt:..., data:... }
						store.commit('SET_MESSAGE', msg)
						resolve(result || _data)
					} else if (code === -999) {
						store.commit('SET_LOGOUT')
						showToast('Authorization is invalid, please login again.')
						setTimeout(() => {
							uni.navigateTo({
							    url: '/pages/auth/login'
							});
						}, 1000)
						
					} else if(code === -100) { 
						// 抢单余额不足
						uni.showModal({
							content: msg,
							confirmText: 'Confirm',
							showCancel: false,
							success: (res) => {
								// if (res.confirm) {
									// uni.navigateTo({
									// 	url: '/pages/order/detail_pay',
		
									// })
								// }
							},
						})
					}else if(code === -1000){// 可以对code进行switch分类处理
						uni.showModal({
							content: msg,
							confirmText: 'Confirm',
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/user/message',
									})
								}
							},
						})
					}else{
						showToast(msg)
						reject(data)
					}
				} else {
					if (res.statusCode === 403) { // 登录过期/未登录
					console.log('403')
						store.commit('SET_LOGOUT')
						showToast('login expired')
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/auth/login'
							})
						}, 1000)
					} else {
						showToast(err && err.errMsg)
					}
					// reject(res)
				}
			},
			fail: (err) => {
				pending[key] = false
				showToast(err.errMsg)
				reject(err)
			},
			complete: () => {
				pending[key] = false
				showLoading && uni.hideLoading()
			}
		})
	})
}


// 其他接口
const request1 = ({
	url,
	method = 'GET',
	data = {}, 
	header = {'content-type': 'application/x-www-form-urlencoded'}, 
	showLoading = true
}) => {
	// 避免重复请求
	let key = url + method
	if (pending[key] && key.indexOf('/web/index/member') < 0) {
		return Promise.reject('Cancel request')
	}
	pending[key] = true
	
	let newHeader = header
	const token = store.state.user.token
	if (token) {
		newHeader = Object.assign(header, {
			"Auth-Token": token
		}) // 实际因该从store里取 token, 这里要报错...
	}
	return new Promise((resolve, reject) => {
		showLoading && uni.showLoading()
		uni.request({
			url: `https://api.mecalone.com${url}`,
			method,
			data,
			dataType: 'application/json', // 返回的数据格式
			// withCredentials: true,
			header: newHeader,
			success: (res) => { // 可以格式话一下再resolve
				pending[key] = false
				if (res.statusCode === 200 && res.errMsg === 'request:ok') {
					let { data } = res
					
					if (typeof data === 'string' && data.startsWith('{')) { // 纯字符串返回的
						data = JSON.parse(data)
					}
					const { code, msg, result } = data
					let _data = {
						code,
						msg,
						result
					}
					if (data.data) {
						_data.data = data.data
					}
					if (data.count) {
						_data.count = data.count
					}
					if (data.token) {
						_data.token = data.token
					}
					if (data.finished === 0 || data.finished === 1) {
						_data.finished = data.finished
					}
					if (data.unfinished_orders) {
						_data.unfinished_orders = data.unfinished_orders
					}
					if (code === 0) { // data: {code: 200, reuslt:..., data:... }
						store.commit('SET_MESSAGE', msg)
						resolve(result || _data)
					} else if (code === -999) {
						store.commit('SET_LOGOUT')
						showToast('A autorização é inválida, faça login novamente.')
						setTimeout(() => {
							uni.navigateTo({
							    url: '/pages/auth/login'
							});
						}, 1000)
						
					} else { // 可以对code进行switch分类处理
						showToast(msg)
						reject(data)
					}
				} else {
					if (res.statusCode === 403) { // 登录过期/未登录
					console.log('403')
						store.commit('SET_LOGOUT')
						showToast('login expired')
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/auth/login'
							})
						}, 1000)
					} else {
						showToast(err && err.errMsg)
					}
					// reject(res)
				}
			},
			fail: (err) => {
				pending[key] = false
				showToast(err.errMsg)
				reject(err)
			},
			complete: () => {
				pending[key] = false
				showLoading && uni.hideLoading()
			}
		})
	})
}



function showToast(title) {
	uni.showToast({ // 显示原因
		icon: 'none',
		mask: true,
		title
	})
}

export default request