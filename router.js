// router.js
import {RouterMount,createRouter} from 'uni-simple-router';
import store from 'store/index.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});

router.beforeEach((to, from, next) => {
  // 在store的state里已经初始化token，如果有的话
  if (to.meta.requiresAuth) { // 如果即将访问的路由信息有meta数据，则做登陆判断的逻辑 
    if (store.state.user.token) {
		// if (to.name === 'grab-detail') {
		// 	if (from.name === 'grab') { // grab-detail页面只能从grab页面进入
		// 		next()
		// 	} else {
		// 		next({
		// 			name: 'home'
		// 		})
		// 	}
		// }
		next()
    } else {
      next({
		  name: 'login'
	  }) // 设置了meta鉴权的路由必须得登陆
    }
  } else {
	  next()
  }
  
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})

export {
	router,
	RouterMount
}