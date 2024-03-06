const themeColor = '#126e52'; // 主题色
const colorInverse = '#ffffff'; // 反色
// const bgColor = '#383838';
const textColor = '#c4c4c4';
const bgDark = '#494949';
export default {
	data() {
		return {
			// navBackgroundColor: themeColor, // 导航栏背景颜色
			
			noticeBgColor: themeColor, // 跑马灯背景颜色
			noticeColor: colorInverse, // 跑马灯颜色
			
			tabsSwiperBgColor: themeColor, // tabswiper 背景颜色
			tabsSwiperInactiveColor: colorInverse, // swiper 字体颜色
			tabsSwiperActiveColor: themeColor ,// swiper 激活后的颜色
			
			tabBgColor: bgDark, // 赛事详情tab背景
			tabInactive: textColor,
			tabActive: colorInverse,
			
			cellBg: bgDark,
			cellColor: textColor
		}
	}
}