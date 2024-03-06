export default {
	beforeCreate() {
		console.log(this.$route)
		console.log('onInit',this.$store.state)
		// if (!this.$store.state.user.token) {
		// 	console.log(this.$route)
		// 	this.$u.route({
		// 		url: 'pages/auth/login'
		// 	})
		// }
	}
}