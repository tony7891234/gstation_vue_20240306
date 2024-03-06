import request from './request.js'

// 获取公告列表
export const getNoticeListServ = (type = undefined, page = 1, per_page = 10) => {
	let obj = {
		page,
		per_page
	}
	if (type !== undefined) { // 0 赛事， 1,系统公告
		obj.type = type
	}
	// return new Promise((resolve, reject) => {
	// 	request({
	// 		url: '/nor/getnotices',
	// 		method: 'POST',
	// 		data: obj,
	// 		showLoading: false
	// 	}).then(res => {
	// 		const _res = []
	// 		res.data.map(item => {
	// 			_res.push({
	// 				'created': item.createtime,
	// 				'action': item.action,
	// 				'title': item.title,
	// 				'content': item.body
	// 			})
	// 		})
	// 		resolve(_res)
	// 	})
	// })
}

/// 获取消息列表
export const getMsgListServ = (page = 1, per_page = 10) => {
	// let obj = {
	// 	page,
	// 	per_page
	// }
	// if (type !== undefined) { // 0 赛事， 1,系统公告
	// 	obj.type = type
	// }
	// return new Promise((resolve, reject) => {
	// 	request({
	// 		url: '/nek/messagelist',
	// 		method: 'POST',
	// 		data: {
	// 			page,
	// 			per_page
	// 		},
	// 		showLoading: false
	// 	}).then(res => {
	// 		const _res = []
	// 		res && res.data && res.data.map(item => {
	// 			_res.push({
	// 				'time': item.createtime,
	// 				'action': item.action,
	// 				'title': item.title,
	// 				'content': item.body
	// 			})
	// 		})
	// 		resolve(_res)
	// 	})
	// })
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([
				{
					list: [
						{
							title: 'Welcome!',
							time: '2021-01-01',
							content: 'Bem-vindo ao Lottle Mall!'
						}
					]
				}
			])
		}, 2000)
	})
}