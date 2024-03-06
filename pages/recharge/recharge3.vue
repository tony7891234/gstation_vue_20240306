<template>
    <div>
        <c-head :title="$t('recharge.title1')"></c-head>
        <view class="content">
            <!-- 二维码 -->
            <view id="qrcode" ref="qrcode" class="qrcode"></view>
            <!-- 倒计时 -->
            <view style="display: flex; justify-content: center; margin-bottom: 30rpx;">
                <u-count-down :timestamp="left_time" ></u-count-down>
            </view>
            <!-- 充值地址 -->
            <view class="adderss">
                <view class="title">{{ $t('recharge.RechargeAmount') }}</view>
                <view class="area" @click="copyText(amount)">
                    {{ (amount2) }} USDT
                    <image class="image" src="@/static/copy.png" />
                </view>
                <view class="title">{{ $t('recharge.RechargeAddress') }}</view>
                <view class="area address" @click="copyText(address)">
                    {{ address }}
                    <image class="image" src="@/static/copy.png" />
                </view>
            </view>

            <u-modal v-model="modalShow" :show-title="false" :confirm-text="$t('confirm')">
                <view class="slot-content">
                    <rich-text :nodes="modalContent"></rich-text>
                </view>
            </u-modal>

        </view>
    </div>
</template>

<script>
import { apiRechargeInfo } from "../../service/pay.api.js"
import QRCode from 'qrcodejs2';
export default {
    data() {
        return {
            amount: '',
            address: '',
            left_time: 0,
            modalContent: this.$t('recharge3_modalContent'),
            modalShow:true,
            amount2: ''
        }
    },
    methods: {

        copyText(text) {
            this.$copyText(text).then(
                res => {
                    this.$$showToast(this.$t('copySuccess'))
                },
                err => {
                    this.$$showToast(this.$t('copyError'))
                }
            )
        },
        // 获取页面数据
        requestRechargeInfo() {
            this.left_time = 0
            if (this.$refs.qrcode) {
                this.$refs.qrcode.$el.innerHTML = ''
            }
            apiRechargeInfo(this.amount).then(({ data }) => {
                this.address = data.address
                this.left_time = data.left_time
                this.amount2 = data.amount
                this.$nextTick(() => {
                    new QRCode("qrcode", {
                        text: this.address,
                        width: 150,
                        height: 150,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                })
            })
        },
    },

    onLoad({ amount }) {
        this.amount = amount
        this.requestRechargeInfo()
    }
}
</script>

<style lang="scss" scoped>
page {
    width: 100%;
    height: 100%;
}

.content {
    width: 708.33rpx;
    margin: 450rpx auto;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-shadow: 0rpx 4rpx 20rpx 2rpx rgba(199, 125, 125, 0.28);
    border-radius: 22rpx;
    transform: translateY(-400rpx);
    overflow: hidden;
    padding-top: 60rpx;

    .qrcode {
        width: 299.31rpx;
        height: 299.31rpx;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 71rpx;
    }

    .adderss {
        padding-top: 35rpx;
        border-top: 1rpx solid #D5D5D6;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 45rpx;

        .title {
            font-size: 31rpx;
            color: #2F2F31;
            font-weight: 500;
        }

        .area {
            width: 635rpx;
            // height: 90rpx;
            background: #F9F9FB;
            border-radius: 14rpx;
            margin: 26rpx auto;
            padding: 25rpx 27rpx;

            &.address {
                font-size: 26rpx;
            }

            .image {
                width: 20rpx;
                height: 20rpx;
                margin-left: 10rpx;
            }

        }

        .copy_btn {
            width: 151rpx;
            height: 63rpx;
            background: #2F2F31;
            border-radius: 14rpx;
            color: #F6F6F6;
            font-size: 28rpx;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .network {
            margin-top: 61rpx;
            // margin-bottom: 45rpx;
            display: flex;
            justify-content: center;
            align-items: center;

            .tab {
                width: 205rpx;
                height: 76rpx;
                border-radius: 14rpx;
                font-size: 31rpx;
                font-weight: 500;
                color: #F6F6F6;
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(217, 51, 49, .4);

                &.active {
                    background: rgba(217, 51, 49, 1);
                }

                // &:nth-child(1) {
                //     margin-right: 28rpx;
                // }
            }
        }
    }
}

.hint {
    display: flex;
    flex-direction: column;
    padding: 0 40rpx;

    .title {
        margin: 20rpx 0;
    }

    .text {
        font-size: 24rpx;
        color: #2F2F31;
        line-height: 34rpx;
    }
}

.btns {
    display: flex;
    justify-content: center;
    align-items: center;
}

/deep/ .u-count-down {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-40rpx);
}

.generate_new_address {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 334rpx;
    height: 75rpx;
    background: linear-gradient(270deg, #D93331, #FF7371);
    box-shadow: 0rpx 7rpx 10rpx 0rpx rgba(217, 51, 49, 0.41);
    border-radius: 38rpx;
    font-size: 35rpx;
    font-weight: 500;
    color: #FFFFFF;
    transform: translateY(-345rpx);

    &.again {
        background: linear-gradient(270deg, #FF7371, #D93331);
    }
}
</style>
