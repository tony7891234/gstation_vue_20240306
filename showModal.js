uni.showModal({
	title: this.$t("wallet.index.note"),
	content: this.$t("wallet.index.whatsApp"),
	cancelText: this.$t("cancel"),
	confirmText: this.$t("confirm"),
	success: function (res) {
		if (res.confirm) {
		   window.location.href = that.depositWaysList.contract
		} else if (res.cancel) {
		}
	}
});