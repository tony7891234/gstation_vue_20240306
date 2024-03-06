<script>
import { getBalInfo } from '@/service/user.api.js'
import { getCustomerService } from '@/service/new_api.js'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            timeout: 60000, // 1分钟
            intervel: null
        }
    },
    onLaunch() {
        // for(let i = 0; i < 5; i++) {
        // 	console.log(1111)
        // 	uni.setTabBarItem({
        // 		index: i,
        // 		text: 'yyy'
        // 	})
        // }
        getCustomerService().then(res => {
            if (res.data) {
                uni.setStorageSync('telegram_service', res.data.telegram)
            }
        })

        if (this.$store.state.user.token && this.$store.state.user.token !== "") { // 立即获取一次金额
            this.getMoney()
        }
        this.intervel = setInterval(() => { // 不是最优，充值的时候再轮询
            let src = window.location.href.split('#')[0]
            // 本地环境不要轮训
            if (src == 'https://localhost:8080/' || src == 'https://localhost:8081/') {
                return false;
            }
            if (this.$store.state.user.token && this.$store.state.user.token !== "") {
                this.getMoney()
            }
        }, 100000)
    },
    methods: {
        ...mapMutations(['SET_USERINFO']),
        getMoney() {
            getBalInfo().then(res => {
                console.log('getBalInfo', res)
                if (res.data.balance / 1 !== this.$store.state.user.balance / 1) {
                    this.SET_USERINFO({
                        balance: res.data.balance,
                        frozen_balance: res.data.frozen_balance ? res.data.frozen_balance : 0,
                        withdraw_frozen_amount: res.data.withdraw_frozen_amount ? res.data.withdraw_frozen_amount : 0
                    })
                }
            })
        }
    },
    onShow() {
        console.log('App Show')
        uni.setTabBarItem({
            index: 0,
            text: this.$t('tabbar.home')
        });
        uni.setTabBarItem({
            index: 1,
            text: this.$t('tabbar.grab')
        });
        uni.setTabBarItem({
            index: 2,
            text: this.$t('tabbar.vip')
        });
        uni.setTabBarItem({
            index: 3,
            text: this.$t('tabbar.team')
        });
        uni.setTabBarItem({
            index: 4,
            text: this.$t('tabbar.my')
        });
    },
    onHide() {
        console.log('App Hide')
    },
}
</script>

<style lang="scss">
@import "./static/iconfont.css";
@import "./static/border.css";
@import "./static/c.scss";

page {
    background-color: $bgColor;
}

#cHead {
    .u-navbar {
        width: 100%;
        background: linear-gradient(251deg, $color1, $color2) !important;
        position: relative !important;
    }

    .u-status-bar {
        height: 44px !important;
    }

    .u-navbar-inner {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        background: linear-gradient(90deg, $color1, $color2) !important;
    }
}

.cardColor {
    background-color: $cardBgColor;
}

.bg-white {
    background-color: #FFFFFF;
}

.uni-tabbar::before {
    content: "";
    position: absolute;
    left: 50%;
    top: -30%;
    background-color: #fff;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    -webkit-border-radius: 50%;
    border-radius: 50%;
    width: 55px;
    padding: 22px;
    height: 55px;
}

.uni-tabbar {
    filter: drop-shadow(0 0 4px #bbb);

    .uni-tabbar__icon {
        width: 28px !important;
        height: 28px !important;
    }

    .uni-tabbar__icon {
        margin-top: 0 !important;
    }
}

#home {
    .icons-container {
        justify-content: space-around !important;
    }
}

#recharge,
#withdrawal {
    .u-form-item--left__content__label {
        font-size: 40rpx;
        justify-content: center !important;
    }

    .uni-input-input {
        font-size: 60rpx;
    }

    .bank .uni-input-input {
        font-size: 30rpx;
    }

    .u-radio-group {
        flex-direction: column;
        width: 100%;

        .u-radio {
            position: relative;
            padding: 20rpx 0;
            flex-flow: row-reverse;
            justify-content: space-between;

            .u-radio__label {
                display: flex;

                .img {
                    margin-right: 20rpx;
                }
            }
        }
    }
}

#login,
#register {
    .uni-input-input {
        color: #FFFFFF;
    }
}

#pwd {
    .uni-input-input {
        color: #000000;
    }
}

#keyboard {
    .u-drawer-content {
        border-radius: 20px 20px 0 0;
    }
}

#orderDetail,
#bind,
#address {
    .u-cell {
        border-bottom: 2px dashed #1e7eee;
        border-radius: 0 0 20px 20px;
    }

    .u-card {
        margin: 15px 0 !important;
    }
}

#team {
    .u-scroll-box {
        display: flex;
    }
}

/*每个页面公共css */
</style>
