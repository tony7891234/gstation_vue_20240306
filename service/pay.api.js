import request from './request.js'
import store from '../store/index.js'
// 获取充值方式
// export const getDepositWaysList = () => {
// 	return request({
// 		url: '/deposit/way',
// 		method: 'GET'
// 	})
// }

// 钱包 获取支付列表
export const getDepositWaysList = () => {
	return new Promise((resolve) => {
		resolve({
			contract: 'https://wa.me/+639451157440',
			online: [{
					title: 'UPI - online',
					icon: 'https://3668a.vip/wap/assets/images/bank/upi.png',
					payid: 'upi'
				},
				{
					title: 'Credit card',
					icon: 'https://3668a.vip/wap/assets/images/bank/银行卡.png',
					payid: 'credit-card'
				},
				{
					title: 'Online banking',
					icon: 'https://3668a.vip/wap/assets/images/bank/银行卡.png',
					payid: 'bank'
				}
			],
			offline: [{
				title: 'UPI',
				icon: 'https://3668a.vip/wap/assets/images/bank/upi.png',
				payid: 'upi'
			}],
			manual: [{
				title: 'whatsApp',
				icon: 'https://3668a.vip/wap/assets/images/bank/whatsapp.png'
			}]
		})
	})
}

// 获取充值商户
export const getmerChant = () => {
	return request({
		url: `/web/recharge/merchant`,
		method: 'GET',
	})
}


export const getBussiness = (id) => {
	return request({
		url: `/web/recharge/business/${id}`,
		method: 'GET',
	})
}


export const getBank = (id) => {
	return request({
		url: `/web/recharge/bank/${id}`,
		method: 'GET',
	})
}





// 充值
export const chargeServ = (form) => {
	return request({
		url: `/web/recharge/save`,
		method: 'POST',
		data: JSON.stringify({
			user_name: store.state.user.username,
			...form
		})
	})
}


export const chargePay3 = (url, form) => {
	return request({
		url: url,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		method: 'POST',
		data: form
	})
}

// 获取资金流水
export const getTransitionLists = (type = 0, current = 1, pageSize = 10) => {
	let data = {
		current,
		pageSize
	}
	if (type !== 0) {
		Object.assign(data, {
			type: type
		})
	}
	return request({
		url: '/nek/transrecord',
		method: 'POST',
		data
	})
}

// 获取提款银行卡账户信息
export const getWithdrawBankCards = () => {
	return request({
		url: '/web/withdraw/userbank',
		method: 'GET'
	})
}

// 绑定卡
export const bindCardServ = (form) => {
	return request({
		url: '/web/withdraw/bindbankcard',
		method: 'POST',
		data: JSON.stringify({
			...form
		})
	})
}

// 发起提现
export const withdrawlServ = (form) => {
	return request({
		url: '/web/withdraw/take',
		method: 'POST',
		data: JSON.stringify({
			amount: form.money,
			type: form.type,
			pay_pass:form.pay_pass
		})
	})
}


export const vip = (form) => {
	return request({
		url: '/web/withdraw/take',
		method: 'POST',

	})
}

//商品列表

export const shopList = (type,page) => {
	return request({
		url: '/web/orders',
		method: 'GET',

		data: {
			type: type,
			page:page
		}

	})
}


export const goodsList = (type,page) => {
	return request({
		url: '/web/goods',
		method: 'GET',

		
	})
}

//utsd信息
export const info = () => {
	return request({
		url: '/web/usdt/info',
		method: 'GET',
	
	})
}

//save
export const save = (user_usdt,usdt_amount) => {
	return request({
		url: '/web/usdt/save',
		method: 'POST',
		data: {
			user_usdt,
			usdt_amount
		}
	
	})
}


// getcode
export const getCode = (phone) => {
	return request({
		url: '/web/message_code',
		method: 'GET',
		data: {
			phone
		}
	
	})
}

// 获取充值信息
export const apiRechargeInfo = (amount) => {
    return request({
        url: `/web/usdt/address`,
        method: 'GET',
        data: {
            amount
        }
    })
}