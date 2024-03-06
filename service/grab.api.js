import request from './request.js'
// 获取抢单信息
export const getGrabInfo = (current) => {
	return request({
		url: `/web/order/member`,
		method: 'GET',
		header: {
			'Content-Type': 'application/json',
		}
	})
	// return new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		if ( current === 0) {
	// 			resolve([
	// 				{
	// 					time: '2021-04-08 12:14:24',
	// 					img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
	// 					order_no: 'A0408121416252',
	// 					amount: '936.00',
	// 					commission: '0.64%',
	// 					earnings: '7.99',
	// 					orderId: 'abcdsda31'
	// 				},
	// 				{
	// 					time: '2021-04-08 12:14:24',
	// 					img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
	// 					order_no: 'A0408121416252',
	// 					amount: '936.00',
	// 					commission: '0.64%',
	// 					earnings: '7.99',
	// 					orderId: 'abcdsda31'
	// 				},
	// 				{
	// 					time: '2021-04-08 12:14:24',
	// 					img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
	// 					order_no: 'A0408121416252',
	// 					amount: '936.00',
	// 					commission: '0.64%',
	// 					earnings: '7.99',
	// 					orderId: 'abcdsda31'
	// 				},
	// 				{
	// 					time: '2021-04-08 12:14:24',
	// 					img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
	// 					order_no: 'A0408121416252',
	// 					amount: '936.00',
	// 					commission: '0.64%',
	// 					earnings: '7.99',
	// 					orderId: 'abcdsda31'
	// 				},
	// 				{
	// 					time: '2021-04-08 12:14:24',
	// 					img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
	// 					order_no: 'A0408121416252',
	// 					amount: '936.00',
	// 					commission: '0.64%',
	// 					earnings: '7.99',
	// 					orderId: 'abcdsda31'
	// 				},
	// 				{
	// 					time: '2021-04-08 12:14:24',
	// 					img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
	// 					order_no: 'A0408121416252',
	// 					amount: '936.00',
	// 					commission: '0.64%',
	// 					earnings: '7.99',
	// 					orderId: 'abcdsda31'
	// 				},
	// 				{
	// 					time: '2021-04-08 12:14:24',
	// 					img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
	// 					order_no: 'A0408121416252',
	// 					amount: '936.00',
	// 					commission: '0.64%',
	// 					earnings: '7.99',
	// 					orderId: 'abcdsda31'
	// 				}
	// 			])
	// 		} else {
	// 			resolve([])
	// 		}
	// 	}, 2000)
	// })
}

export const getOrders = (index, page, limit) => {
	return request({
		url: `/web/record/list/${index}?page=${page}&limit=${limit}`,
		method: 'GET',
		showLoading: true
	})
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if ( current === 0) {
				resolve([
					{
						time: '2021-04-08 12:14:24',
						img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
						order_no: 'A0408121416252',
						amount: '936.00',
						commission: '0.64%',
						earnings: '7.99',
						orderId: 'abcdsda31'
					},
					{
						time: '2021-04-08 12:14:24',
						img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
						order_no: 'A0408121416252',
						amount: '936.00',
						commission: '0.64%',
						earnings: '7.99',
						orderId: 'abcdsda31'
					},
					{
						time: '2021-04-08 12:14:24',
						img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
						order_no: 'A0408121416252',
						amount: '936.00',
						commission: '0.64%',
						earnings: '7.99',
						orderId: 'abcdsda31'
					},
					{
						time: '2021-04-08 12:14:24',
						img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
						order_no: 'A0408121416252',
						amount: '936.00',
						commission: '0.64%',
						earnings: '7.99',
						orderId: 'abcdsda31'
					},
					{
						time: '2021-04-08 12:14:24',
						img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
						order_no: 'A0408121416252',
						amount: '936.00',
						commission: '0.64%',
						earnings: '7.99',
						orderId: 'abcdsda31'
					},
					{
						time: '2021-04-08 12:14:24',
						img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
						order_no: 'A0408121416252',
						amount: '936.00',
						commission: '0.64%',
						earnings: '7.99',
						orderId: 'abcdsda31'
					},
					{
						time: '2021-04-08 12:14:24',
						img: 'https://m.media-amazon.com/images/I/81FURbNad4L._AC_UY218_.jpg',
						order_no: 'A0408121416252',
						amount: '936.00',
						commission: '0.64%',
						earnings: '7.99',
						orderId: 'abcdsda31'
					}
				])
			} else {
				resolve([])
			}
		}, 500)
	})
}

// 生成订单
export const generate = () => {
	return request({
		url: `/web/order/generate`,
		method: 'GET',
	})
}

// 保存订单,id为当前订单的某个商品的id
export const saveOrderServ = (order_no, pwd) => {
	return request({
		url: `/web/order/save`,
		method: 'POST',
		data: JSON.stringify({
			order_no,
			pay_password: pwd
		})
	})
}

// grab 进入 订单详情时设置倒计时开始
// export const setTimeStart = (order_no, id) => {
// 	// return request({
// 	// 	url: `/web/order/save`,
// 	// 	method: 'POST',
// 	// 	data: JSON.stringify({
// 	// 		order_no,
// 	// 		goods_id: id
// 	// 	})
// 	// })
// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve({
// 				code: 0
// 			})
// 		}, 500) 
// 	})
// }

// order 进入（未完成）订单详情时设置倒计时开始
// export const setTimeStart = (order_no, id) => {
// 	// return request({
// 	// 	url: `/web/order/save`,
// 	// 	method: 'POST',
// 	// 	data: JSON.stringify({
// 	// 		order_no,
// 	// 		goods_id: id
// 	// 	})
// 	// })
// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve({
// 				code: 0
// 			})
// 		}, 500) 
// 	})
// }