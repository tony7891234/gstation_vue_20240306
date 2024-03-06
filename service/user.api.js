import request from './request.js'
import qs from 'qs'
// 登录
export const loginServ = (user) => {
	return request({
		url: '/web/login',
		method: 'POST',
		data: JSON.stringify({
			username: user.username, // 用户名
			password: user.password // 密码
		}),
		header: {
			'content-type': 'application/json'
		},
		showLoading: true
	})
}
// 注册
export const registerServ = (user) => {
	
	return request({
		url: '/web/register',
		method: 'POST',
		data: JSON.stringify({
			username: user.username, // 用户名
			// nickname: user.realname, // 真实姓名
			password: user.password, // 密码
			phone: user.bank_code+user.phone_number, // 密码
			pay_password: String(user.pay_password), // 支付密码
			invitation_code: user.invitation_code, // 邀请码
			code:user.code, //验证码
			tg:user.tg,
		}),
		showLoading: false
	})
}

// 修改登录密码
export const changePwdServ = (form) => {
	console.log(form)
	return request({
		url: '/web/member/chpwd',
		method: 'PUT',
		data: JSON.stringify({
			old_password: form.password,
			new_password: form.new_password,
			confirm_password: form.confirm_pwd,
		}),
		showLoading: false
	})
}

// 修改支付密码
export const changePaymentPwdServ = (form) => {
	return request({
		url: '/web/member/chppwd',
		method: 'PUT',
		data: JSON.stringify({
			old_password: form.password,
			new_password: form.new_password,
			confirm_password: form.confirm_pwd,
		}),
		showLoading: false
	})
}

// 注册时校验用户名是否存在
export const registerCheckServ = (user) => {
	return request({
		url: '/web/register/check',
		method: 'POST',
		data: JSON.stringify({
			username: user, // 用户名
		}),
		showLoading: true
	})
}

// 获取用户信息
export const getBalInfo = () => {
	return request({
		url: '/web/index/member',
		method: 'GET',
		showLoading: false
	})
}

// 获取用户信息
export const getUserDetail = (type='info') => {
	return request({
		url: '/web/member/detail',
		method: 'GET',
		showLoading: false,
		data: {
			type
		},
	})
}

// 获取URL
export const getServiceUrl = () => {
	return request({
		url: '/get_service_url',
		method: 'GET',
		showLoading: false
	})
}

// 获取滾動列表
export const getScrolllist = () => {
	return request({
		url: '/web/carousel ',
		method: 'GET',
		showLoading: false
	})
}




// 获取入款账户信息
export const getAccount = () => {
	return new Promise((resolve) => {
		resolve({
			account: 'fanworld@yesbank'
		})
	})
}





// 获取通知列表
export const getNotes = (page, size = 10) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const data = [{
				date: '2020-12-17 05:00:00',
				list: [{
					title: '存款成功到账',
					time: '2020-12-17 08:46:10',
					content: '您的存款金额800元成功到账，请及时查看您的【中心钱包】'
				}]
			}]
			resolve(data)
		}, 500)
	})
}

// 获取用户参与活动的状态
export const getTasks = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const data = {
				deposit: {
					start_time: '2020.1.1',
					list: [{
							title: '累积存1000再送5',
							money_now: '800.00',
							money_target: '1000.00',
							finish_status: 'parti'
						},
						{
							title: '累积存3000再送50',
							money_now: '800.00',
							money_target: '3000.00',
							finish_status: 'lock'
						},
						{
							title: '累积存5000再送100',
							money_now: '800.00',
							money_target: '5000.00',
							finish_status: 'lock'
						},
						{
							title: '累积存10000再送200',
							money_now: '800.00',
							money_target: '10000.00',
							finish_status: 'lock'
						},
						{
							title: '累积存20000再送500',
							money_now: '800.00',
							money_target: '20000.00',
							finish_status: 'lock'
						},
						{
							title: '累积存500送2',
							money_now: '800.00',
							money_target: '500.00',
							finish_status: 'finished'
						}
					]
				},
				bet: {
					start_time: '2020.1.1',
					list: [{
							title: '累积投注1000再送5',
							money_now: '800.00',
							money_target: '1000.00',
							finish_status: 'parti'
						},
						{
							title: '累积投注3000再送10',
							money_now: '800.00',
							money_target: '3000.00',
							finish_status: 'lock'
						},
						{
							title: '累积投注3000再送10',
							money_now: '800.00',
							money_target: '3000.00',
							finish_status: 'lock'
						},
						{
							title: '累积投注3000再送10',
							money_now: '800.00',
							money_target: '3000.00',
							finish_status: 'lock'
						},
						{
							title: '累积投注3000再送10',
							money_now: '800.00',
							money_target: '3000.00',
							finish_status: 'lock'
						},
						{
							title: '累积投注500送2',
							money_now: '800.00',
							money_target: '500.00',
							finish_status: 'finished'
						}
					]
				},
				gift: {
					start_time: '2020.1.1',
					list: [
						[{
							title: '注册送10',
							finish_status: 'finished'
						}, ],
						[{
							title: '首存1000送50',
							money_now: '800.00',
							money_target: '3000.00',
							finish_status: 'finished'
						}, ]
					]
				}
			}
			resolve(data)
		}, 500)
	})
}

// 获取活动列表
export const getPromotions = () => {
	return new Promise((resolve) => {
		const data = [{
				title: '首存50送18',
				id: '1', // 标识哪种活动， 1 代表参加首存
				img: 'https://www.nmgdjkj.com/rbdsweb/f0e532e2-b18c-47b8-afd9-3d3222800ed3.png',
				end: '2025年12月31日'
			},
			{
				title: '推荐好友',
				id: '2', // 标识哪种活动， 2 代表推荐好友
				img: 'https://www.nmgdjkj.com/rbdsweb/6bd71f69-854c-4335-9079-8fdd4088355a.png',
				end: '2025年12月31日'
			},
			{
				title: '累计存送',
				id: '3', // 标识哪种活动， 3 代表累计存送
				img: 'https://www.nmgdjkj.com/rbdsweb/327e0f9f-9214-4ccf-8164-c637958a9679.png',
				end: '2025年12月31日'
			},
			{
				title: '累计投注送3',
				id: '4', // 标识哪种活动， 4 代表累计投注送
				img: 'https://www.nmgdjkj.com/rbdsweb/dc484453-9ad3-43be-a449-80f95f052ced.png',
				end: '2025年12月31日'
			}
		]
		resolve(data)
	})
}

// 获取活动的详情
// 获取活动列表
export const getPromotionDetail = ((id) => {
	return new Promise((resolve) => {
		let data
		if (id === '2' || id === '3') {
			data = {
				list: [{
						deposit: 50,
						number: 5,
						rebate: 15
					},
					{
						deposit: 50,
						number: 10,
						rebate: 20
					},
					{
						deposit: 50,
						number: 20,
						rebate: 50
					},
					{
						deposit: 300,
						number: 1,
						rebate: 20
					},
					{
						deposit: 300,
						number: 5,
						rebate: 120
					},
					{
						deposit: 300,
						number: 10,
						rebate: 150
					},
				]
			}
		} else if (id === '4') {
			data = {
				list: [{
						deposit: 500,
						rebate: 2
					},
					{
						deposit: 1000,
						rebate: 5
					},
					{
						deposit: 3000,
						rebate: 10
					},
					{
						deposit: 10000,
						rebate: 40
					},
					{
						deposit: 50000,
						rebate: 220
					},
					{
						deposit: 200000,
						rebate: 1000
					}
				]
			}
		}
		resolve(data)
	})
})


// 获取推广码
export const getQR = ((id) => {
	return new Promise((resolve) => {
		resolve([{
				src: 'http://www.baidu.com/',
				code: '123456'
			},
			{
				src: 'http://www.sohu.com/',
				code: '123456'
			},
		])
	})
})

// 获取代理名下的统计信息列表
export const getStatiscs = ((timeArr, page = 1) => {
	return new Promise((resolve) => {
		resolve({ // 选择特定日期返回的数据
			total: {
				total: '8000',
				deposit: '10000',
				bet: '5000',
				win: '3800',
				profit_lose: '2000'
			},
			list: [{
					name: 'leaon',
					total: '8000',
					deposit: '10000',
					bet: '5000',
					win: '3800',
					profit_lose: '2000'
				},
				{
					name: 'leaon',
					total: '8000',
					deposit: '10000',
					bet: '5000',
					win: '3800',
					profit_lose: '2000'
				},
				{
					name: 'leaon',
					total: '8000',
					deposit: '10000',
					bet: '5000',
					win: '3800',
					profit_lose: '2000'
				},
				{
					name: 'leaon',
					total: '8000',
					deposit: '10000',
					bet: '5000',
					win: '3800',
					profit_lose: '2000'
				},
				{
					name: 'leaon',
					total: '8000',
					deposit: '10000',
					bet: '5000',
					win: '3800',
					profit_lose: '2000'
				},
			],
		})
	})
})


export const logoutServ = () => {
	return request({
		url: '/web/logout',
		method: 'POST'
	})
}


// 获取用户信息
export const getUserInfoServ = (userInfo) => {
	return request({
		url: '/web/member',
		method: 'GET',
		showLoading: false
	})
}

// 修改用户地址信息
export const updateUserInfoServ = (userInfo) => {
	console.log('updateUserInfoServ')
	return request({
		url: '/web/member/edit',
		method: 'PUT',
		data: JSON.stringify(userInfo)
	})
}

// 获取bills
export const getBills = (current, beginTime, endTime, page, limit = 20) => {
	return request({
		url: `/web/record/rds?` + qs.stringify({
			page: page,
			type: current + 1,
			start_time: beginTime,
			end_time: endTime,
			limit: limit
		}),
		method: 'GET',
	})
}
// return new Promise((resolve, reject) => {
// setTimeout(() => {
// 		if ( current === 0) {
// 			resolve([])
// 			// resolve([
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// 	{
// 			// 		time: '2021-04-08 12:14:24',
// 			// 		rate: '+7.46',
// 			// 		content: 'First level return commission',
// 			// 	},
// 			// ])
// 		} else {
// 			resolve([])
// 		}
// 	}, 2000)
// })

// 获取代理数据列表
export const getTeamReport = (current, beginTime, endTime, page) => {
	// return request({
	// 	url: `/nek/xiazhu`,
	// 	method: 'POST',
	// 	header: {
	// 		'Content-Type': 'application/json',
	// 	},
	// 	data: {
	// 		normal: arr, // 正常注单
	// 		special: chuanObj // 串关注单
	// 	}
	// })
	// return new Promise((resolve, reject) => {
	// 	setTimeout(() => {
	// 		if ( current === 0) {
	// 			resolve([
	// 			])
	// 		} else {
	// 			resolve([])
	// 		}
	// 	}, 2000)
	// })



}


export const getTeam = (current, beginTime, endTime, page) => {


	return request({
		url: `/web/rebate/record?`,
		data: {
			level:current+1,
			beginTime,
			endTime,
			page,
			limit:10
		},
		method: 'GET',
	})

}

export const getTeam1 = (type, start, end, page) => {

	return request({
		url: `/web/record/rds_new`,
		data: {
			type,start,end,page
		},
		method: 'GET',
	})

}


export const getMemer = (current, beginTime, endTime, page) => {


	return request({
		url: `/web/rebate/member?`,
		data: {
			level:current+1,
			beginTime,
			endTime,
			page,
			limit:10
		},
		method: 'GET',
	})

}




export const get_income = () => {


	return request({
		url: `/web/get_income`,
		method: 'GET'
	})

}

export const new_index = () => {


	return request({
		url: `/web/new_index`,
		method: 'GET'
	})

}



export const team = (start,end)=>{
	return request({
		url: `/web/team/detail`,
		method: 'GET',
		
		data: {
	
			
			start,end
			
			
		},
		
	})
	
}

export const gord = ()=>{
	
	return request({
		url: `/web/member/gold`,
		method: 'GET',
		data: {
		},
	})
}

export const getP2pIndex = (product_id)=>{
	return request({
		url:`/web/p2p/index`,
		method:'GET',
		data:{
			product_id
		}
	})
}


export const p2pSubmit = (p_id, type, amount, password) => {
	return request({
		url: `/web/p2p/create`,
		data: JSON.stringify({
			product_id:p_id,
			type:type,
			amount:amount,
			// password:password,
		}),
		method: 'POST',
	})

}

export const getP2pList = () => {
	return request({
		url: `/web/p2p/product`,
		data: {},
		method: 'GET',
	})

}

export const getP2pRule = (id) => {
	return request({
		url: `/web/p2p/rule`,
		data: {
			id
		},
		method: 'GET',
	})

}

export const getEarning = (page, type) => {

	return request({
		url: `/web/p2p/earning`,
		// data: {
		// 	page,type
		// },
		data: JSON.stringify({
			page:page,
			type:type
		}),
		method: 'POST',
	})

}




export const getLottery = (buy) => {
	return request({
		url: `/web/member/lottery?buy=${buy}`,
		data: {
		},
		method: 'GET',
	})

}

export const priceList = () => {
	return request({
		url: `/web/member/price`,
		data: {
		},
		method: 'GET',
	})

}


export const apiP2pProduct = () => {
	return request({
		url: `/web/p2p/product`,
		data: {
		},
		method: 'GET',
	})
}
export const upgradeVip = (level) => {
	return request({
		url: `/web/member/upgradeVip`,
		data: {
			level
		},
		method: 'GET',
	})

}
