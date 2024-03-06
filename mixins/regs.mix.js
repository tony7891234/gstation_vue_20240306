export default {
	data() {
		return {
			regs: {
				username: /^[a-zA-Z]{1}\w{5,14}$/, // 首字母必须是字母,6-15位的数字和密码组合
				password: /^\S+$/, // 匹配至少六位的字母或者数字或者下划线或者汉字。/^\S.*\S$|(^\S{0,1}\S$)/
				realname: /^.{2,}$/, // 匹配2个以上任意字符
				bank_username: /^.{2,}$/ // 匹配2个以上任意字符
				// realname: /^[\u4e00-\u9fa5]{2,5}$/  // 中文
			},
			isValid: false
		}
	}
}