import request from './request.js'
import store from '../store/index.js'


// 获取客服地址
export const getCustomerService = () => {
    return request({
        url: '/get_service_url',
        method: 'get',
    })
}