<template>
    <view id="register">
        <c-keyboard @passwordChange="handlePasswords" v-model="show"></c-keyboard>
        <view class="title">{{ $t('auth.sign_up') }}</view>
        <!-- <view class="icon u-flex u-row-center">
			<u-image class="img" shape="circle" width="180rpx" height="180rpx" src="../../static/user1.jpeg"></u-image>
		</view> -->
        <view class="form">
            <u-form :model="form" ref="uForm">
                <u-form-item :label="$t('auth.username')" prop="username" label-position="top" :border-bottom="true">
                    <u-input v-model="form.username" :placeholder="$t('auth.tips.username')" :clearable="false"
                        maxlength="15" />
                </u-form-item>
                <u-form-item :label="$t('auth.password')" prop="password" label-position="top" :border-bottom="true">
                    <u-input v-model="form.password" :placeholder="$t('auth.tips.password')" type="password"
                        :clearable="false" />
                </u-form-item>
                <u-form-item :label="$t('auth.confirmPassword')" prop="confirm_pwd" label-position="top"
                    :border-bottom="true">
                    <u-input v-model="form.confirm_pwd" :placeholder="$t('auth.tips.confirmPassword')" type="password"
                        :clearable="false" />
                </u-form-item>
               <u-form-item :label="$t('auth.pay_pwd')" prop="pay_password" label-position="top" :border-bottom="true">
                    <u-input v-model="form.pay_password" @click="handleInput" :placeholder="$t('auth.tips.arabic')"
                        type="password" :clearable="false" maxlength="6" />
                </u-form-item>

               <u-form-item :label="$t('auth.tel')" label-position="top" :border-bottom="true">
                    <u-input v-model="form.bank_name" :type="'select'" @click="show1 = true" 
                        :clearable="false" />
                    <u-select :confirm-text="'Confirm'" :cancel-text="'Cancel'" @confirm="handleSelectConfirm"
                        v-model="show1" :list="list" label-name="bank_name" value-name="bank_code"></u-select>

                    <u-input v-model="form.phone_number" :placeholder="$t('auth.tips.tel')" :clearable="false" />
                </u-form-item>

               <!-- <u-form-item :label="$t('auth.tel')" prop="phone_number" label-position="top" :border-bottom="true">
               <u-select v-model="form.quhao" :clearable="false"/> 
                <u-select v-model="show" :list="list" label-name="bank_name" value-name="bank_code">
                </u-select>
               <u-input v-model="form.phone_number" :placeholder="$t('auth.tips.tel')" :clearable="false"/>
                </u-form-item> -->
               
               <!-- <u-form-item :label="$t('auth.code')" prop="code" label-position="top" :border-bottom="true">
                    <u-input v-model="form.code" :placeholder="$t('auth.tips.code')" :clearable="false" />
                    <button class='btn' @click="sendCode()" :disabled="time > 0">{{ time > 0 ? time + 's' :
                        $t('auth.codeMsg') }}</button>
                </u-form-item> -->
                <u-form-item :label="$t('auth.invite')" prop="invitation_code" label-position="top" :border-bottom="true">
                    <u-input v-model="form.invitation_code" :placeholder="$t('auth.tips.invite')" :clearable="false" />
                </u-form-item>
				
				<u-form-item :label="$t('auth.tg')" prop="invitation_code" label-position="top" :border-bottom="true">
				    <u-input v-model="form.tg" :placeholder="$t('auth.tg')" :clearable="false" />
				</u-form-item>
            </u-form>
            <u-button @click="register" type="primary" class="u-m-t-60">{{ $t('auth.regNow') }}</u-button>
            <u-button @click="$u.route({ url: '/pages/auth/login' })" class="u-m-t-20">{{ $t('auth.tips.already')
            }}</u-button>
        </view>
        <!-- <view class="u-flex u-row-between u-p-40 u-font-32">
			<view @click="$u.route({url: '/pages/auth/login'})">{{$t('auth.goLogin')}}</view>
			<view @click="serve">{{$t('auth.contact')}}</view>
		</view> -->
       <view class="language" @click="handleJump">
            <image class="icon" src="@/static/lang/icon.png" />
        </view>
        <view class="service_box" @click="toService" v-if="telegram_service">
            <image class="icon" src="@/static/service.png" />
        </view>
    </view>
</template>

<script>
import {
    getBank,
    getCode
} from '@/service/pay.api.js'

import regs from '@/mixins/regs.mix.js'
import { registerServ, registerCheckServ } from '@/service/user.api.js'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                confirm_pwd: '',
                pay_password: '',
                invitation_code: '',
                phone_number: '', // 移动电话号码
                quhao: '', // 国家区号
				tg:'',//tg
				selected:'44',
                bank_code: '',
                bank_name: '',

                // code: '',//验证码,

            },
            list: [],
            show: false,
            show1: false,
            time: 0,
            telegram_service: ''
        }
    },
    mixins: [regs],
    computed: {
        rules() {
            return {
                username: [
                    {
                        required: true,
                        message: this.$t('auth.tips.pls'),
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    },
                    {
                        message: this.$t('auth.tips.length'),
                        // 可以单个或者同时写两个触发验证方式 ['change','blur']
                        trigger: ['change', 'blur'],
                        validator: (rule, value, callback) => {
                            return value.trim().length >= 6 && this.regs[rule.field].test(value)
                        }
                    },
                    {
                        message: this.$t('auth.tips.already'),
                        // 可以单个或者同时写两个触发验证方式 ['blur']
                        trigger: 'blur',
                        asyncValidator: (rule, value, callback) => {
                            registerCheckServ(this.form.username).then(res => {
                                console.log('registerCheckServ', res)
                                // 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
                                if (res.code === 0) {
                                    // 如果校验通过，也要执行callback()回调
                                    callback();
                                } else {
                                    callback(new Error(res.msg));
                                }
                            })
                        },
                    }
                ],
                password: [
                    {
                        required: true,
                        message: this.$t('auth.tips.pls'),
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    },
                    {
                        message: this.$t('auth.tips.length'), // 必须包含数字字母的组合
                        // 可以单个或者同时写两个触发验证方式 ['change','blur']
                        trigger: ['change', 'blur'],
                        validator: (rule, value, callback) => {
                            return value.length >= 6
                        }
                    }
                ],
                confirm_pwd: [
                    {
                        required: true,
                        message: this.$t('auth.tips.pls'),
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    },
                    {
                        message: this.$t('auth.tips.passDiff'), // 必须包含数字字母的组合
                        // 可以单个或者同时写两个触发验证方式 ['change','blur']
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            return this.form.password === this.form.confirm_pwd
                        }
                    }
                ],
                pay_password: [
                    {
                        required: true,
                        message: this.$t('auth.tips.pls'),
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    },
                ],
                phone_number: [
                    {
                        required: true,
                        message: this.$t('auth.tips.pls'),
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    },
                ],
                invitation_code: [
                    {
                        required: true,
                        message: this.$t('auth.tips.pls'),
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    },
                ],
            }
        }
    },
    watch: {
        form: {
            deep: true,
            handler(newVal) {
                const validateArr = ['username', 'realname']
                for (let i = 0; i < validateArr.length; i++) {
                    const current = validateArr[i]
                    if (!this.regs[current].test(this.form[current])) {
                        this.isValid = false
                        return
                    }
                }
                this.isValid = this.form['password'] === this.form['confirm_pwd']
            }
        }
    },
    onReady() {
        this.$refs.uForm.setRules(this.rules);
        this.telegram_service = uni.getStorageSync('telegram_service')
    },
    onLoad() {
        let invitation_code = this.$route.query.icode
        if (invitation_code) {
            this.form.invitation_code = invitation_code
        }
        getBank(-1).then((res) => {
            if (res.code === 0) {
                this.list = res.data
                this.form.bank_name = this.list[0].bank_name
                this.form.bank_code = this.list[0].bank_code

                console.log(this.form);
            }
        })
    },
    methods: {
        ...mapMutations(['SET_USERINFO']),

        handleSelectConfirm(res) {
            this.form.bank_name = res[0].label
            this.form.bank_code = res[0].value
        },
        toService() {
            if (window?.plus) {
                window.plus.runtime.openURL(this.telegram_service)
            } else {
                window.open(this.telegram_service)
            }
        },
        handleInput() {
            this.show = true
        },
        handleJump() {
            setTimeout(() => {
                uni.navigateTo({
                    url: '/pages/language/index',
                    success: res => { }, fail: (err) => { console.log(`err ::->`, err); }, complete: () => { }
                })
            }, 100)
        },
        sendCode() {
            getCode(this.form.phone_number).then((res) => {
                console.log('getcode', res)
                if (res.code === 0) {
                    uni.showToast({
                        icon: "none",
                        title: this.$t('auth.getCodeSuccess'),
                    })

                    console.log('success')
                    this.time = 60;
                    var timmer = setInterval(() => {
                        this.time--
                        if (this.time == 0) {
                            clearInterval(timmer)
                        }
                    }, 1000)
                } else {
                    uni.showToast({
                        icon: "none",
                        title: res.msg,
                    })

                }
            })
        },
        serve() { // 联系客服
            console.log(1111)
        },
        handlePasswords(e) {
            this.form.pay_password = e
        },

        register() {
            this.$refs.uForm.validate(valid => {
                // console.log('valid', valid)
				
                if (valid) {
                    registerServ(this.form).then(res => {
                        uni.showToast({
                            icon: 'none',
                            title: this.$t('auth.tips.regSuccess')
                        })
                        setTimeout(() => {
                            this.$$navigateTo('/pages/auth/login')
                        }, 1000)
                    })
                } else {
                    console.log('verify fail');
                }
            });
        }

    }

}
</script>

<style lang="scss" scoped>
@import "../../static/c.scss";

page {
    background: linear-gradient(90deg, $color1, $color2) !important;
}

#register {
    .title {
        padding: 16rpx 60rpx 0 60rpx;
        box-sizing: border-box;
        font-size: 48rpx;
        color: #FFFFFF;
    }

    .icon {}

    .login-head {
        height: 336rpx;
        color: red;
    }

    .form {
        border-radius: 30rpx;
        padding: 20rpx 60rpx 30rpx 60rpx;
    }

    .u-row-between {
        color: red;
    }
}

.btn {
    padding: 5px 10px;
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    font-size: 12px;
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
