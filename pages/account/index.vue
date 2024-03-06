<template>
    <div class='my'>
        <div class="container">
            <div class="header-box">
                <div class="member-info">
                    <p>{{ $t('account.username') + $store.state.user.username }}</p>
                    <p>{{ $t('account.vip') + ': ' + vip_level }}</p>
                    <p>{{ $t('account.code') + $store.state.user.invitation_code }}</p>
                </div>

                <div class="member-icon">
                    <img class='vip_img' :src="vipimg" />
                </div>
            </div>

            <div class="flex flex-between ai btn-list">
                <div class="btn-box">
                    <p>{{ $t('balance') }} </p>
                    <p>{{ $t('moneyLogo') }}&nbsp;{{ balance2 }}</p>

                </div>
            </div>

            <div class="content">

                <div class="data-box">
                    <div class="flex">
                        <div class="flex-1">
                            <p class="data-tit">{{ $t('account.todays_earnings') }}</p>
                            <p class="data-info">{{ todays_earnings }}</p>
                        </div>
                        <div class="flex-1">
                            <p class="data-tit">{{ $t('account.yesterday_earnings') }}</p>
                            <p class="data-info">{{ yesterday_earnings }}</p>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="flex-1">
                            <p class="data-tit">{{ $t('account.this_months_earniings') }}</p>
                            <p class="data-info">{{ this_months_earniings }}</p>
                        </div>
                        <div class="flex-1">
                            <p class="data-tit">{{ $t('account.last_months_earniings') }}</p>
                            <p class="data-info">{{ last_months_earniings }}</p>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="flex-1">
                            <p class="data-tit 111">{{ $t('account.total_revenue') }}</p>
                            <p class="data-info">{{ total_revenue }}</p>
                        </div>
                        <div class="flex-1">
                            <p class="data-tit">{{ $t('account.complete_the_task_today') }}</p>
                            <p class="data-info">{{ complete_the_task_today }}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class='function'>

            <div class='info' v-for="(item, index) in serviceCenterList" :key="index" @click='routePage(item.page)'>
                <img :src="item.icon" class="icon1" />
                <p>{{ item.name }}</p>
                <img class="icon2"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAABQ0lEQVQ4jY3Qu05UURQG4G9UOpCaiRpLEEyUs17AGwERraTjuax9AMXEoD6AxtsqvYBGjcEGNfoIY8HCjDhzDrvaxf7y///uNU1zB4GNzNx2hHMM64UeR8TsUdEt/MLZguc6UWY+xc0huBUR811JMvMZbuBnwUcRsdCKCj7HGn7gTMHzrajgiyF4uuCFVlTwZVX9jlP2N15sRQVfFdxDv+BiKyr4GqsFZwoG9AaDwTgHIqLBw4J7WOtEBefwxP6v/h5b79CZxkTdu1FEXKqUGXzEUiuKiCt4UEkfsJyZn8aiiLiM+ziJHaxk5mfGfHlEXMXmKDASFThI2C7wZfjNiREbNjFZ4Pph8E/SUKVJvK/R/4G/KCKuVaUpvKtKX0cB6DVNs4R7lfAWq23gYNPdAm9qw24bgOP9fn8CPdzOzG9dAP4AwFt8NX6830gAAAAASUVORK5CYII=" />

            </div>

        </div>


        <div style="width: 100%;height: 50px;"></div>
    </div>
</template>

<script>
import vip_img from '../../static/vip-tiyan.png'
import { logoutServ } from '@/service/user.api.js'
import {
    getBalInfo,
    getServiceUrl,
    getUserDetail
} from '@/service/user.api.js'
import {
    mapMutations
} from 'vuex'
export default {
    data() {
        return {
            balance2: '',
            code: '',
            time_left: '', // 冻结倒计时
            todays_earnings: '0',
            yesterday_earnings: '0',
            this_months_earniings: '0',
            last_months_earniings: '0',
            total_revenue: '0',
            complete_the_task_today: '0',
            vip_img: vip_img,
            vip_level: '',


        }
    },

    computed: {
        // balance2: function() {
        // 	let tmp = 0
        // 	const balance = this.$store.state.user.balance
        // 	if (balance) {
        // 		try {
        // 			tmp = Number(balance).toFixed(2)
        // 		} catch (e) {
        // 			tmp = 0
        // 		}
        // 	}
        // 	return tmp
        // },
        serviceCenterList() {
            return [
                {
                    icon: require('../../static/logo/recharge.png'),
                    page: '/pages/user/message',
                    name: this.$t('account.recharge'),
                },
                {
                    icon: require('../../static/logo/withdraw.png'),
                    page: '/pages/withdrawal/index',
                    name: this.$t('account.withdrawal'),
                },

                {
                    icon: require('../../static/icon2.png'),
                    page: '/pages/records/index',
                    name: this.$t('account.funds'),
                },

                {
                    icon: require('../../static/fun1.png'),
                    page: '/pages/user/profile',
                    name: this.$t('account.personal'),
                },
                // {
                // 	icon: require('../../static/my/fun2.png'),
                // 	page: '/pages/user/message',
                // 	name: this.$t('account.message'),
                // },
                // {
                // 	icon: require('../../static/my/fun3.png'),
                // 	page: '/pages/user/address',
                // 	name: this.$t('account.address'),
                // },
                {
                    icon: require('../../static/fun4.png'),
                    page: '/pages/user/security',
                    name: this.$t('account.security'),
                },
                {
                    icon: require('../../static/fun5.png'),
                    page: '/pages/invite/index',
                    name: this.$t('account.invite'),
                },
                {
                    icon: require('../../static/logo/income.png'),
                    page: '/pages/fund/index',
                    name: this.$t('fund.title5'),
                },
                {
                    icon: require('../../static/lang/icon.png'),
                    page: '/pages/language/index',
                    name: this.$t('language.title'),
                },
                //{
                // id: 'service',
                //	icon: service_ico,
                //	page: '/pages/account/service',
                //	name: this.$t('account.service'),
                //	},
    //             {
    //                 id: 'bian',
    //                 icon: require('../../static/bian.png'),
    //                 page: 'https://www.binance.com/',
    //                 name: 'Binance',
    //                 type: 'openUrl',
    //             },
				
				// {
				//     id: 'bian',
				//     icon: require('../../static/bian.png'),
				//     page: 'https://www.binance.com/',
				//     name: 'Binance',
				//     type: 'openUrl',
				// },
				// {
				//     id: 'bian',
				//     icon: require('../../static/bian.png'),
				//     page: 'https://www.binance.com/',
				//     name: 'Binance',
				//     type: 'openUrl',
				// },
				{
				    id: 'bian',
				    icon: require('../../static/usdt.png'),
				    page: '/pages/account/wallet',
					name: this.$t('wallet'),
				 
				   
				},
				
				
                {
                    icon: require('../../static/tuichu.png'),
                    page: 'exit',
                    name: this.$t('account.exit'),
                }

            ]
        },
        withdraw_frozen_amount2: function () {
            let tmp = 0
            const withdraw_frozen_amount = this.$store.state.user.withdraw_frozen_amount
            if (withdraw_frozen_amount) {
                try {
                    tmp = Number(withdraw_frozen_amount).toFixed(2)
                } catch (e) {
                    tmp = 0
                }
            }
            return tmp
        },
    },
    methods: {
        ...mapMutations(['SET_USERINFO']),

        routePage(url, type) { // 路由跳转
            if (url == 'exit') {
                logoutServ() // 远程退出
                this.$store.commit('SET_LOGOUT')
                uni.showToast({
                    icon: 'none',
                    title: this.$t('profile.tip1')
                })
                setTimeout(() => {
                    this.$u.route({
                        url: 'pages/auth/login'
                    })
                }, 500);

                return;
            }
            if (url.substring(0, 4) == 'http') {
                location.href = url;
                return;
            }
            if (url.indexOf('recharge') >= 0) {
                uni.switchTab({
                    url
                })
                return
            }
            if (type) {
                this.$u.route({
                    url,
                    params: {
                        type
                    }
                })
            } else {
                this.$u.route({
                    url
                })
            }
        },
        copyCode(e) {
            let url
            if (this.$store.state.user.invitation_code) {
                url = window.location.href.split('#')[0] + '#/pages/auth/register?icode=' + this.$store.state.user
                    .invitation_code
            } else {
                uni.showToast({
                    title: this.$t('account.tip1'),
                    duration: 1000,
                    icon: 'none'
                })
                return
            }
            uni.showModal({
                title: this.$t('account.tip2'),
                content: url,
                cancelText: this.$t('cancel'),
                confirmText: this.$t('confirm'),
                success: (res) => {
                    if (res.confirm) {
                        this.$copyText(url).then(
                            res => {
                                this.$$showToast(this.$t('copySuccess'))
                            },
                            err => {
                                this.$$showToast(this.$t('copyError'))
                            }
                        )
                    }
                },
            })

        },
        handleGetTimeLeft() {
            getUserDetail().then((res) => { // 获取用户信息

                if (res.data.hasOwnProperty('leave_seconds')) {
                    this.time_left = res.data.leave_seconds
                }

                if (res.data) {
                    this.todays_earnings = res.data.todays_earnings
                    this.yesterday_earnings = res.data.yesterday_earnings
                    this.this_months_earniings = res.data.this_months_earniings
                    this.last_months_earniings = res.data.last_months_earniings
                    this.total_revenue = res.data.total_revenue
                    this.complete_the_task_today = res.data.complete_the_task_today
                    this.vipimg = "../../static/" + res.data.vip_img + ".png"
                    this.vip_level = res.data.vip_level
                    this.balance2 = res.data.balance
                }
            })
        },
        handleGetService() {
            getServiceUrl().then((res) => { // 获取用户信息
                if (res && res.data) {
                    //const index = this.serviceCenterList.findIndex(obj => obj.id === 'service')
                    //this.serviceCenterList[index].page = res.data
                }
            })
        },
        handleEnd(res) {
            this.handleGetTimeLeft()
        },
    },
    onShow() {
        this.handleGetTimeLeft()
        // this.handleGetService()
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
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding-top: 22px;
    background: url(/../../static/top_bg..png) top/100% no-repeat;
}

.roleBox {
    width: 700rpx;
    height: 132px;
    background: #FFFFFF;
    box-shadow: 0px 4px 5px 0px rgba(213, 211, 211, 0.5);
    margin: -130px auto 0;
    position: relative;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1B1B1B;
    line-height: 17px;
    padding-top: 28px;
    border-radius: 10px;

    .avatar {
        width: 78px;
        height: 78px;
        border-radius: 50%;
        position: absolute;
        left: 17px;
        top: -28px;
    }

    .p1 {
        text-align: center;
        margin-bottom: 24px;
    }

    .p2 {
        margin-left: 17px;
        margin-bottom: 12px;

    }

    .invite {
        padding: 10px;
        height: 20px;
        border-radius: 10px;
        border: 1px solid #5B5FF8;
        color: #5B5FF8;
        font-size: 12px;
        position: absolute;
        right: 15px;
        bottom: 40px;
    }


}

.card {
    width: 700rpx;
    height: 154px;
    background: linear-gradient(209deg, #ECE8FF 0%, #5A5FFF 100%);
    border-radius: 8px;
    opacity: 0.8;
    margin: 20px auto;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    overflow: hidden;

    p {
        font-size: 12px;
        line-height: 17px;
        margin-left: 28px;
        margin-bottom: 6px;
    }

    p:first-of-type {
        margin-top: 15px
    }

    h3 {
        font-size: 20px;


        line-height: 28px;
        margin-left: 28px;
        margin-bottom: 6px;
    }

    .btnList {
        margin-top: 16px;
        display: flex;
        justify-content: center;

        .btn1,
        .btn2 {
            width: 104px;
            height: 29px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .btn1 {
            border-radius: 10px;
            border: 1px solid #FFFFFF;
            margin-right: 34px;
        }

        .btn2 {
            background: #FFFFFF;
            color: #5B5FF8;
            border: 1px solid #FFFFFF;
        }
    }



}

.function {
    width: 700rpx;
    margin: auto;

    background: #FFFFFF;
    box-shadow: 0px 4px 5px 0px rgba(211, 211, 211, 0.5);
    border-radius: 8px;
    font-family: PingFangSC-Semibold, PingFang SC;
    overflow: hidden;

    h3 {
        font-size: 14px;
        color: #1B1B1B;
        line-height: 20px;
        margin: 16px 0 20px 17px;

    }

    .around {
        justify-content: space-around;
        display: flex;

        .wrap {
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                width: 30px;
                height: 30px;
                margin-bottom: 10px;

            }
        }
    }
}

.shadow {
    width: 100%;
    height: 212px;
    background: linear-gradient(251deg, #5A5FFF 0%, #AC7EF4 100%);
}

.info {

    margin: 0px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #EEEEEE;
    height: 45px;

    .icon1 {
        width: 26px;
        height: 26px;
    }

    .icon2 {
        width: 5px;

    }

    p {
        flex: 1;
        margin-left: 10px;
        font-size: 14px;
    }


}

.container {
    padding-top: 22px;
    background: url(../../static/top_bg.png) top/100% no-repeat;
}

.container .header-box {
    position: relative;
    margin: 0 16px 0;
    padding: 18px 16px;
    background-image: -webkit-linear-gradient(right, #fcba09, #fceb09), -webkit-linear-gradient(#fceb09, #fceb09);
    background-image: linear-gradient(-90deg, #fcba09, #fceb09), linear-gradient(#fceb09, #fceb09);
    background-blend-mode: normal, normal;
    border-radius: 2px 2px 0px 0px;
}

.container .header-box .member-info {
    margin-bottom: 11px;
    color: #333;
    font-size: 14px;
    font-weight: 700;
}

.container .header-box .member-icon {
    position: absolute;
    right: 29px;
    top: -5px;
    z-index: 1;
    width: 76px;
    height: 69px;
}

.container .btn-list {
    margin: 0 16px 11px;
    padding: 14px 16px;
    background-image: -webkit-linear-gradient(left, #000, #2c2c2c), -webkit-linear-gradient(#f29b76, #f29b76);
    background-image: linear-gradient(90deg, #000, #2c2c2c), linear-gradient(#f29b76, #f29b76);
    background-blend-mode: normal, normal;
    border-radius: 0px 0px 2px 2px;
    font-size: 13px;
    color: #fff;
}

.ai {
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.flex-between {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}

.flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}

.container .content {
    margin: 0 16px;
}

.container .content .data-box {
    margin-bottom: 11px;
    background-color: #fff;
    line-height: 16px;
    border-radius: 2px;
}

.container .content .data-box .flex .flex-1 {
    padding: 16px;
}

.container .content .data-box .flex .flex-1:nth-child(1) {
    border-right: 1px solid #f2f2f2;
}

.container .content .data-box .flex:not(:last-child) {
    border-bottom: 1px solid #f2f2f2;
}

.vip_img {
    width: 100%;
    height: 100%;
}

.flex-1 {
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}

.container .content .data-box .flex .data-tit {
    height: 30px;
    font-size: 13px;
    font-weight: 700;
    color: #404040;
}

.container .content .data-box .flex .data-info {
    margin-top: 5px;
    font-size: 14px;
    color: #fe3a1d;
}
</style>
