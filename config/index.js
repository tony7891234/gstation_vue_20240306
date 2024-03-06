const isDev = process.env.NODE_ENV === 'development'

const LANG = 'en' // 默认语言 en pu sp

let API_DEV, API_ASSETS, API_PRO, DOWNLOAD_URL,HOME_URL

// 正式
API_DEV = 'https://api.shopee78.store'
API_ASSETS = 'https://img.shopee78.store'
API_PRO = 'https://api.shopee78.store'
DOWNLOAD_URL = 'https://shopee78.store'
HOME_URL = 'https://shopee78.store'

export default {
	LANG,
	API_ASSETS,
	BASE_URL: isDev ? API_DEV : API_PRO, // api域名
	IMAGE_PATH: '', // 图片域名
	TRUN_ON_LOCAL: true, // 开启本地存储
	DOWNLOAD_URL,
	HOME_URL
}
