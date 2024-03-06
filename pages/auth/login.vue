<template>
    <view id="login">
        <view class="login-head u-flex u-row-center">
            {{ $t('auth.welcome') }}
        </view>
        <view class="form">
            <u-form :model="form" ref="uForm">
                <u-form-item prop="username" label-position="top" :border-bottom="false">
                    <u-input :border="true" class="input_type" v-model="form.username"
                        :placeholder="$t('auth.username_placeholder')" maxlength="15" :clearable="false" />
                </u-form-item>
                <u-form-item prop="password" label-position="top" :border-bottom="false">
                    <u-input :border="true" class="input_type" v-model="form.password"
                        :placeholder="$t('auth.password_placeholder')" type="password" :clearable="false" />
                </u-form-item>
            </u-form>
            <!-- <view class="u-text-right u-m-t-20 u-m-b-80">{{$t('auth.forget')}}</view> -->
            <u-button class="u-margin-top-20" @click="login" type="primary">{{ $t('auth.login') }}</u-button>
        </view>

        <view class="u-flex u-row-around theme-color u-font-32 routes">
            <view class="btn" @click="handleAlert">{{ $t('auth.tips.forget') }}</view>
            <uni-view class="line"></uni-view>
            <view class="btn" @click="$u.route({ url: '/pages/auth/register' })">{{ $t('auth.regNow') }}</view>
        </view>
        <view class="bottom"></view>
        <view class="language" @click="handleJump">
            <image class="icon" src="@/static/lang/icon.png" />
        </view>
        <view class="service_box" @click="toService" v-if="telegram_service">
            <image class="icon" src="@/static/service.png" />
        </view>
    </view>
</template>

<script>
import regs from '@/mixins/regs.mix.js'
import { loginServ, getUserInfoServ } from '@/service/user.api.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            telegram_service: ''
        }
    },
    mixins: [regs],
    computed: {
        ...mapGetters(['user']),
        disabled() { // 按钮是否可用
            const nameReg = /^[a-zA-Z]{1}\w{5,11}$/
            const pwdReg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,11}')
            return (this.$u.test.digits(this.form.username) || nameReg.test(this.form.username)) && pwdReg.test(this.form.password)
        },
        rules() {
            return {
                username: [
                    {
                        message: this.$t('auth.tips.unameError'),
                        // 可以单个或者同时写两个触发验证方式 ['change','blur']
                        trigger: 'change',
                        validator: (rule, value, callback) => {
                            return this.$u.test.digits(value) || this.regs[rule.field].test(value)
                        }
                    }
                ],
                password: [
                    {
                        message: this.$t('auth.tips.passError'), // 必须包含数字字母的组合
                        // 可以单个或者同时写两个触发验证方式 ['change','blur']
                        trigger: 'change',
                        validator: (rule, value, callback) => {
                            return value.length >= 6
                        }
                    }
                ]
            }
        }
    },
    onReady() {
        this.$refs.uForm.setRules(this.rules);
        this.telegram_service = uni.getStorageSync('telegram_service')
    },
    methods: {
        ...mapMutations(['SET_LOGOUT', 'SET_USERINFO']),
        handleJump() {
            setTimeout(() => {
                uni.navigateTo({
                    url: '/pages/language/index',
                    success: res => { }, fail: (err) => { console.log(`err ::->`, err); }, complete: () => { }
                })
            }, 100)
        },
        handleAlert() {
            uni.showToast({
                icon: 'none',
                title: 'Please contact online customer service.'
            })
        },
        toService() {
            if(window?.plus) {
                window.plus.runtime.openURL(this.telegram_service)
            } else {
                window.open(this.telegram_service)
            }
        },
        login() {
            this.$refs.uForm.validate(valid => {
                if (valid) {
                    loginServ(this.form).then(res => {

                        if (res.data.is_show == 1) {
                            window.localStorage.setItem('notice_type', res.data.notice_type)
                            window.localStorage.setItem('notice', res.data.notice)
                        }

                        console.log('SET_USERINFO', res)
                        res.username = this.form.username
                        this.SET_USERINFO(res)

                        getUserInfoServ().then((res) => { // 获取用户信息
                            this.SET_USERINFO({
                                realname: res.data.realname,
                                phone_number: res.data.phone_number,
                                address: res.data.address,
                                balance: res.data.balance,
                                frozen_balance: res.data.frozen_balance,
                                level: res.data.level,
                                invitation_code: res.data.invitation_code,
                                id: res.data.id
                            })
                        })

                        uni.showToast({
                            icon: 'none',
                            title: this.$t('auth.tips.loginSuccess')
                        })
                        this.form = {
                            username: '',
                            password: '',
                        }
                        setTimeout(() => {
                            uni.switchTab({
                                url: 'pages/home/index'
                            })
                        }, 500)
                    })
                } else {
                    console.log('verify fail');
                }
            });
        },

    }

}
</script>

<style lang="scss" scoped>
@import "../../static/c.scss";

page {
    height: 100%;
}

#login {
    background: linear-gradient(90deg, $color1, $color2) !important;
    z-index: 100000;
    height: 100%;

    .theme-color {
        color: #FFFFFF;
    }

    .login-head {
        padding-top: 25vh;
        box-sizing: border-box;
        background: linear-gradient(90deg, $color1, $color2) !important;
        font-size: 68rpx;
        color: #FFFFFF;
    }

    .form {
        width: 300px;
        margin: 0 auto;
    }

    .input_type {
        border-radius: 10px;
        height: 100rpx;
        align-items: center;
    }

    .routes {
        width: 600rpx;
        margin: 20rpx auto 0 auto;

        view {
            text-align: center;
        }
    }

    .btn {
        width: 300rpx;
    }

    .line {
        width: 1px;
        height: 10px;
        background: #fff;
        opacity: .6;
        margin: 0 5px;
    }
}

.language {
    position: fixed;
    top: 30rpx;
    right: 30rpx;
    z-index: 10000;
    .icon {
        width: 40rpx;
        height: 40rpx;
    }
}
.service_box {
    width: 100rpx;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 50rpx;
    right: 30rpx;
    z-index: 10000;
    border-radius: 50%;
    background: #fff;
    .icon {
        width: 80rpx;
        height: 80rpx;
    }
}
</style>
