import Vue from 'vue'
import Vuex from 'vuex'
import chuan from '@/plugins/chuan.js'
import { comb, getOdds } from '@/plugins/comb.util.js'
import { USER, MATCH, ODD, BET } from '@/plugins/const.js'
import CONFIG  from '@/config/index.js'
Vue.use(Vuex)

// 本地存储的变量名称
const BET_LIST = '__betList__'
const BET_IDS = '__betIds__'
const CHUAN_LIST = '__chuanList__'
const USER_INFO = '__userinfo__'
const GAME_IDS = '__gameIds__' // 查看哪些游戏(足球/篮球/板球....)

// 是否开启本地存储
const STORE_LOCAL = CONFIG.TRUN_ON_LOCAL // 是否开启本地存储

function getIds (arr, key = MATCH.BET_KEY) { // _id: cc_number   odd_id
	return arr.map(item => item[key])
}

const store = new Vuex.Store({
	state: {
		lang: CONFIG.LANG,
		common: {
			showDownload: CONFIG.SHOW_DOWNLOAD // 是否显示顶部下载条
		},
		order: [], // 一次生成的订单数组
		currentGoods: {}, // 当前detail页面显示的订单
		user: {
			bankCard: '', // 如果没有，提款时会跳绑卡界面
			username: '', // 用户名
			token: '', // 随意设置一个token即为登录状态
			balance: USER.INIT_BALANCE, // 余额
			frozen_balance: 0, // 冻结余额
			withdraw_frozen_amount: 0, // 提款冻结金额
			realname: '', // 真实姓名
			phone_number: '', // 手机
			address: '', // 收货地址
			id: '',
			...uni.getStorageSync(USER_INFO)} ,
		resMsg: '', // response message
		oddsIdsForTimers: {}, // 存储从上升或者下降状态恢复的定时器，用来在下次过来的时候清理前面的定时器
		oddsIdsForTimersForBetList: {}, // 存储出单列表的定时器，与上面区分开来
	},
	mutations: {
		['HIDE_DOWNLOAD'](state) {
			state.common.showDownload = false
		},
		['SET_USERINFO'](state, user) { // 存储用户信息
			console.log('user', user)
			const newUser = user ? Object.assign(state.user, user) : {}
			state.user = {...newUser}
			STORE_LOCAL && uni.setStorageSync(USER_INFO, newUser)
		},
		['SET_ORDERARR'](state, arr) { // 存储用户信息
			if (arr) { //有商品，就更新
				state.order = arr
			} else { // 没有就清空
				state.order = []
			}
		},
		['SET_CURRENTGOODS'](state, obj) { // 当前待支付的商品
			if (obj) { //有商品，就更新
				state.currentGoods = obj
			} else { // 没有就清空
				state.currentGoods = {}
			}
		},
		['SET_LOGOUT'](state) { // 登出
			this.commit('SET_USERINFO')
			this.commit('SET_ORDERARR')
			this.commit('SET_CURRENTGOODS')
			uni.clearStorage()
		},
		['SET_MESSAGE'](state, msg) { // 设置消息
			state.resMsg = msg
		},
		['SET_GAMEIDS'](state, ids) {
			state.gameIds = ids
			STORE_LOCAL && uni.setStorageSync(GAME_IDS, ids)
		},
	},
	actions: {
		
	},
	getters: {
		user: state => state.user,
		common: state => state.common,
		betList: state => state.betList,
		betIds: state => state.betIds,
		chuanList: state => state.chuanList,
		matchDetail: state => state.matchDetail,
		resMsg: state => state.resMsg,
		gameIds: state => state.gameIds
	}
})

export default store