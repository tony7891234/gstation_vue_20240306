import Vue from 'vue'
import store from './store/index'
import App from './App'
import axios from '@/service/request.js'
import VueClipboard from 'vue-clipboard2'
import {router,RouterMount} from './router.js'  //路径换成自己的
import LuckDraw from 'vue-luck-draw'
Vue.use(router)
Vue.use(LuckDraw)
// Vue.use(Alert) // 注册全局的自定义组件

Vue.use(VueClipboard)



// uview
import uView from "uview-ui"
Vue.use(uView)

// i18n部分的配置
// 引入语言包，注意路径
import VueI18n from 'vue-i18n'
import pt from '@/static/locales/pt.js';
import tu from '@/static/locales/tu.js';
import en from '@/static/locales/en.js';
import cn from '@/static/locales/cn.js';
import helan from '@/static/locales/helan.js';
import fa from '@/static/locales/fa.js';
Vue.use(VueI18n)

import JRouter from '@/plugins/j-router.js'
Vue.use(JRouter)

// import Socket from '@/plugins/socket.js'
// Vue.use(Socket)
const locale = uni.getStorageSync('lang') || 'en'
const i18n = new VueI18n({
	// 默认语言
	locale,
	// 引入语言文件
	messages: {
		cn,en,fa,helan,pt,tu
	}
});



// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
console.log('2')
Vue.prototype._i18n = i18n;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	i18n,
    ...App
})

// app.$mount()
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,router,'#app')
	window.onload = function() { // 禁止苹果缩放
		document.addEventListener('touchstart', function(event) {
		if (event.touches.length > 1) {
		event.preventDefault()
		}
		})
		document.addEventListener('gesturestart', function(event) {
		event.preventDefault()
		})
	}
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif