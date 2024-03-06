<template>
    <div>
        <c-head :is-back="true" :title="$t('recharge.title')"></c-head>
        <view class="bal-info">
            <view class="bal u-flex u-flex-col u-col-center">

                <view class="u-flex u-margin-bottom-30 u-margin-top-30" style="width: 100%;">
                    <view class="border-right  box1">
                        <view class="u-flex">
                            <view class="react react-red"></view>
                            <view class="u-margin-left-10 font1">{{ $t('balance') }}</view>
                        </view>
                        <view class="u-margin-top-10 font2">{{ $t('moneyLogo') + bal }}</view>
                    </view>

                    <view class="u-flex u-flex-col u-col-center border-left  box1">
                        <view class="u-flex">
                            <view class="react react-grey"></view>
                            <view class="u-margin-left-10 font1">{{ $t('home.freeze') }}:</view>
                        </view>
                        <view class="u-margin-top-10 font2">{{ $t('moneyLogo') + frozen }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="input_box">
            <u-input :placeholder="$t('recharge.enterAmount')" :border="true" v-model="rechargeAmount"></u-input>
        </view>        <!-- 			
			<div class="info" style="height: 50px;">
				<div class='msg'>
					<p>Rate:<span style='color:#6F67FC;font-size: 14px;margin-right: 20px;'>{{rate}} </span> Platform quantity:<span style='color:#6F67FC;font-size: 14px;margin-right: 20px;'>{{$t('moneyLogo') + (bal/rate).toFixed(2)}} </span></p>
				</div>
			</div>
				 -->

        <!-- 		<div class="info"  @click="routePage1('/pages/recharge/recharge1')">
				<img src="../../static/bank_recharge.png"/>
				<div class='msg'>
					<h3 style="margin-bottom:10px">{{$t('recharge.pay1')}}</h3>
					<p>charge</p>
				</div>
				<img style="width: 10px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAABQ0lEQVQ4jY3Qu05UURQG4G9UOpCaiRpLEEyUs17AGwERraTjuax9AMXEoD6AxtsqvYBGjcEGNfoIY8HCjDhzDrvaxf7y///uNU1zB4GNzNx2hHMM64UeR8TsUdEt/MLZguc6UWY+xc0huBUR811JMvMZbuBnwUcRsdCKCj7HGn7gTMHzrajgiyF4uuCFVlTwZVX9jlP2N15sRQVfFdxDv+BiKyr4GqsFZwoG9AaDwTgHIqLBw4J7WOtEBefwxP6v/h5b79CZxkTdu1FEXKqUGXzEUiuKiCt4UEkfsJyZn8aiiLiM+ziJHaxk5mfGfHlEXMXmKDASFThI2C7wZfjNiREbNjFZ4Pph8E/SUKVJvK/R/4G/KCKuVaUpvKtKX0cB6DVNs4R7lfAWq23gYNPdAm9qw24bgOP9fn8CPdzOzG9dAP4AwFt8NX6830gAAAAASUVORK5CYII="/>
			</div>
			 -->

        <div class="info" @click="routePage1('/pages/recharge/recharge3')">
            <img src="../../static/usdt_recharge.png" />
            <div class='msg'>
                <h3 style="margin-bottom:10px">{{ $t('recharge.pay2') }}</h3>
                <p>USDT</p>
            </div>
            <img style="width: 10px;"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAABQ0lEQVQ4jY3Qu05UURQG4G9UOpCaiRpLEEyUs17AGwERraTjuax9AMXEoD6AxtsqvYBGjcEGNfoIY8HCjDhzDrvaxf7y///uNU1zB4GNzNx2hHMM64UeR8TsUdEt/MLZguc6UWY+xc0huBUR811JMvMZbuBnwUcRsdCKCj7HGn7gTMHzrajgiyF4uuCFVlTwZVX9jlP2N15sRQVfFdxDv+BiKyr4GqsFZwoG9AaDwTgHIqLBw4J7WOtEBefwxP6v/h5b79CZxkTdu1FEXKqUGXzEUiuKiCt4UEkfsJyZn8aiiLiM+ziJHaxk5mfGfHlEXMXmKDASFThI2C7wZfjNiREbNjFZ4Pph8E/SUKVJvK/R/4G/KCKuVaUpvKtKX0cB6DVNs4R7lfAWq23gYNPdAm9qw24bgOP9fn8CPdzOzG9dAP4AwFt8NX6830gAAAAASUVORK5CYII=" />
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            rate: '',
            rechargeAmount: ''
        }
    },
    computed: {
        bal() {
            return Number(this.$store.state.user.balance).toFixed(2)
        },
        frozen() {
            return Number(this.$store.state.user.frozen_balance).toFixed(2)
        },


    },
    methods: {
        routePage1(url, type) { // 路由跳转
            if(this.rechargeAmount == '') return this.$u.toast(this.$t('recharge.enterAmount'))
            this.$u.route({
                url: url + '?amount=' + this.rechargeAmount,
            })
        },
    },

    onShow() {
        // info().then(res => {
        // 	this.rate = res.data.rate;
        // })
        // this.handleGetService()
    }
}


</script>

<style lang="scss" scoped>
.bal-info,
.input_box {

    width: 700rpx;
    margin: 20px auto;
}


.bal {
    background: #FFFFFF;
    border-radius: 8px;
    width: 100%;

    .bal_num {
        font-size: 50rpx;
        color: #35b9bf;
    }

    .react {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .react-red {
        background: #5B5FF8;
    }

    .react-yellow {
        background: #5B5FF8;
        ;
    }

    .react-grey {
        background: #727170;
    }


    .box1 {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-family: PingFangSC-Regular, PingFang SC;
        line-height: 22px;
        font-size: 16px;

        .font1 {

            font-weight: 400;
            color: #1B1B1B;
        }

        .font2 {

            font-weight: bold;
            color: #1B1B1B;

        }
    }
}

.info {
    width: 620rpx;

    height: 100px;
    background: #FFFFFF;
    box-shadow: 0px 4px 5px 0px rgba(213, 211, 211, 0.5);
    margin: 20px auto 0;
    position: relative;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1B1B1B;
    line-height: 17px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;

    img {
        width: 60px;

    }

    .msg {
        margin-right: 50px;
    }
}
</style>
