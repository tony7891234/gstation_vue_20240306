<template>
    <view id="home">
        <div style="width: 100%;height: 30px;"></div>
        <view class="wrap cardColor">
            <u-swiper :height="400" :border-radius="20" class="box" :list="list"></u-swiper>
        </view>
        <div class="info" @click="routePage1('/pages/introduce/index')">
            <img
                src='../../static/logo/gongsi.png' style="width: 100rpx;" />
            <div class='msg'>
                <h3 style="margin-bottom:0px">{{ $t('introduce.title') }}</h3>
                <p>{{ $t('home.agency') }}</p>
            </div>
            <img style="width: 10px;"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAABQ0lEQVQ4jY3Qu05UURQG4G9UOpCaiRpLEEyUs17AGwERraTjuax9AMXEoD6AxtsqvYBGjcEGNfoIY8HCjDhzDrvaxf7y///uNU1zB4GNzNx2hHMM64UeR8TsUdEt/MLZguc6UWY+xc0huBUR811JMvMZbuBnwUcRsdCKCj7HGn7gTMHzrajgiyF4uuCFVlTwZVX9jlP2N15sRQVfFdxDv+BiKyr4GqsFZwoG9AaDwTgHIqLBw4J7WOtEBefwxP6v/h5b79CZxkTdu1FEXKqUGXzEUiuKiCt4UEkfsJyZn8aiiLiM+ziJHaxk5mfGfHlEXMXmKDASFThI2C7wZfjNiREbNjFZ4Pph8E/SUKVJvK/R/4G/KCKuVaUpvKtKX0cB6DVNs4R7lfAWq23gYNPdAm9qw24bgOP9fn8CPdzOzG9dAP4AwFt8NX6830gAAAAASUVORK5CYII=" />
        </div>
        <!-- 视频 -->
       <!-- <view class="video_box">
            <video :src="src" controls="controls"
                poster="../../static/video_pic.png"
                style="width: 100%;height: 400rpx;"></video>
				<view>&emsp;</view>
				
            <u-read-more :toggle="true" :closeText="$t('readMore')" :openText="$t('packUp')" :showHeight="200">
                {{ $t('videoDesc') }}
            </u-read-more>
        </view> -->
        <!-- 收益 -->
        <u-notice-bar mode="horizontal" class="title" :bg-color="'none'" :color="'#000'" :list="newsList"
            style="margin-top: 20px;">
        </u-notice-bar>
        <navIcons :list="navList"></navIcons>
        <!-- 商城 -->
        <view class="title">{{ $t('fund.title') }}</view>
        <view class="drag1" style="right: 0px;bottom: 60px;top:60vh" @click="(lucky())"></view>
        <view class="p2p_list">
            <view class="p2p_item" v-for="item of p2pData" :key="item.id" @click="(routePage1('/pages/fund/transfer?type='+item.id+'&type1=2'))">
                <text class="text1">{{item.name}}</text>
                <!-- <text class="text1">04</text> -->
                <text class="text1">+{{item.total_profit}} %</text>
                <!-- <text class="">[fixed]</text> -->
                <text class="">{{item.total_day}} {{$t('fund.Validity_period')}}</text>
                <!-- <text class="">purchased</text> -->
                <text class="">{{$t('fund.initial_imvestment')}}</text>
                <text class="">{{$t('fund.amount')}}:{{item.start_amount}}</text>
                <view class="process_box">
                    <view class="process" :style="{ width: `${item.progress}%` }"></view>
                    <text class="count">{{ item.progress }}%</text>
                </view>
            </view>
        </view>
        <!-- <view class="partners-1">
            <div class="padding-box" style="margin: 0 auto;">
                <div class="flex flex-wrap card-list">
                    <div class="flex flex-column card-item" @click="routePage1('/pages/shop/index', 1, 'free member')">
                        <div class="level-info">
                            <p>{{ $t('home.free_member') }}</p>
                        </div>
                        <div class="lock flex flex-ajcenter img" v-if="vip_1_src">
                            <img src="../../static/lock.png" style="width: 56px; height: 56px" alt="">
                        </div>
                        <div class="flex flex-ajcenter img">
                            <img src="../../static/ebay.jpeg" style="width: 126px;height: 126px;" alt="">
                        </div>
                        <div class="card-info card-info-1 tc">
                            <p class="item-title">ebay</p>
                            <p>ebay.com</p>
                        </div>
                    </div>
                    <div class="flex flex-column card-item" @click="routePage1('/pages/shop/index', 2, 'VIP1')">
                        <div class="level-info">
                            <p>VIP1</p>
                        </div>
                        <div class="lock flex flex-ajcenter img" v-if="vip_2_src">
                            <img src="../../static/lock.png" style="width: 56px; height: 56px" alt="">
                        </div>
                        <div class="flex flex-ajcenter img">
                            <img src="../../static/etsy.jpeg" style="width: 126px;height: 126px;" alt="">
                        </div>
                        <div class="card-info card-info-2 tc">
                            <p class="item-title">etsy</p>
                            <p>etsy.com</p>
                        </div>
                    </div>

                </div>
                <div class="flex flex-wrap card-list">
                    <div class="flex flex-column card-item" @click="routePage1('/pages/shop/index', 3, 'VIP2')">
                        <div class="level-info">
                            <p>VIP2</p>
                        </div>
                        <div class="lock flex flex-ajcenter img" v-if="vip_3_src">
                            <img src="../../static/lock.png" style="width: 56px; height: 56px" alt="">
                        </div>
                        <div class="flex flex-ajcenter img">
                            <img src="../../static/zalando.jpeg" style="width: 126px;height: 126px;" alt="">
                        </div>
                        <div class="card-info card-info-3 tc">
                            <p class="item-title">zalando</p>
                            <p>zalando.com</p>
                        </div>
                    </div>
                    <div class="flex flex-column card-item" @click="routePage1('/pages/shop/index', 4, 'VIP3')">
                        <div class="level-info">
                            <p>VIP3</p>
                        </div>
                        <div class="lock flex flex-ajcenter img" v-if="vip_4_src">
                            <img src="../../static/lock.png" style="width: 56px; height: 56px" alt="">
                        </div>

                        <div class="flex flex-ajcenter img">
                            <img src="../../static/wayfair.jpeg" style="width: 126px;height: 126px;" alt="">
                        </div>
                        <div class="card-info card-info-4 tc">
                            <p class="item-title">wayfair</p>
                            <p>wayfair.com</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap card-list">
                    <div class="flex flex-column card-item" @click="routePage1('/pages/shop/index', 5, 'VIP4')">
                        <div class="level-info">
                            <p>VIP4</p>
                        </div>
                        <div class="lock flex flex-ajcenter img" v-if="vip_5_src">
                            <img src="../../static/lock.png" style="width: 56px; height: 56px" alt="">
                        </div>
                        <div class="flex flex-ajcenter img">
                            <img src="../../static/shoopee.png" style="width: 126px;height: 126px;" alt="">
                        </div>
                        <div class="card-info card-info-5 tc">
                            <p class="item-title">shopee</p>
                            <p>shopee.tw</p>
                        </div>
                    </div>
                    <div class="flex flex-column card-item" @click="routePage1('/pages/shop/index', 6, 'VIP5')">
                        <div class="level-info">
                            <p>VIP5</p>
                        </div>
                        <div class="lock flex flex-ajcenter img" v-if="vip_6_src">
                            <img src="../../static/lock.png" style="width: 56px; height: 56px" alt="">
                        </div>
                        <div class="flex flex-ajcenter img">
                            <img src="../../static/amazon.jpeg" style="width: 126px;height: 126px;" alt="">
                        </div>
                        <div class="card-info card-info-6 tc">
                            <p class="item-title">amazon</p>
                            <p>amazon.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </view> -->
        <view class="title" style="margin-top: 0;">{{ $t('home.title2') }}</view>
        <tony-scroll :list="honorList"></tony-scroll>
        <div style="width: 100%;height: 50px;"></div>
        <div v-if="displayNone" @touchmove.prevent @mousewheel.prevent class='popContainer' @click="hide()">
            <img :src="img_src" alt="">
        </div>
        <!-- <view class="drag" style="right: 0px;bottom: 60px;" @click="(routePage1('/pages/invite/index'))"></view> -->
        <!-- <view class="zhuan" style="left: 0px;top: 500px;" @click="(routePage1('/pages/lucky/index'))"></view> -->
        <view class="drag" style="right: 10px;bottom: 60px;" @click="open"></view>
        <view class="modal">
            <uni-popup ref="popup" class="bg" @change="show = false" :is-mask-click="false">
                <view class="popup-content" v-if="show">
                    <view class="tip-title">
                        {{ $t('home.tip.title') }}
                    </view>
                    <!-- <img src="../../static/xx.png" alt="" class="close" @click="closePop"> -->
                    <span class="close" @click="closePop">X</span>
                    <LuckyWheel ref="myLucky" width="600rpx" height="600rpx" :blocks="blocks" :prizes="prizes"
                        :buttons="buttons" @start="startCallBack" @end="endCallBack" />
                    <view class="tip">
                        <p>{{ $t('home.tip.content1') }}</p>
                        <p>{{ $t('home.tip.content2') }}</p>
                        <p>{{ $t('home.tip.content3') }}</p>
                    </view>
                </view>

            </uni-popup>
        </view>
        <u-modal v-model="modalShow" :show-title="false" :confirm-text="$t('confirm')">
			<view class="slot-content">
				<rich-text :nodes="modalContent"></rich-text>
			</view>
		</u-modal>

    </view>
</template>
		
<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import LuckyWheel from '@/components/@lucky-canvas/uni/lucky-wheel.vue'
import auth from '@/mixins/auth_route.mix.js'

import {
    getLottery,
    new_index,
    getUserDetail,
    apiP2pProduct
} from '@/service/user.api.js'

import config from '../../config'
export default {
    components: {
        uniPopup,
        LuckyWheel
    },
    mixins: [auth],
    computed: {
        bal() {
            console.log('xiangyingle', this.$store.state.user)
            // this.getScrolllist()
            return Number(this.$store.state.user.balance).toFixed(2)
        },
        frozen() {
            return Number(this.$store.state.user.frozen_balance).toFixed(2)
        },
    },
    data() {
        return {
			src:  config.HOME_URL + '/company_profile.mp4',
            show: false,
            modalShow: false,
            modalContent: '',
            displayNone: false,
            img_src: '',
            vip_level: '',
            vip_1_src: true,
            vip_2_src: true,
            vip_3_src: true,
            vip_4_src: true,
            vip_5_src: true,
            vip_6_src: true,
            balance: 0,
            frozen_balance: 0,
            list: [{
                image: require('../../static/banner1.png'),
            },
			{
                image: require('../../static/banner3.png'),
            },
			{
			    image: require('../../static/banner/banner-4.jpg'),
			},
			{
			    image: require('../../static/banner/banner-5.jpg'),
			},
			{
			    image: require('../../static/banner/banner-6.jpg'),
			},
            ],
            navList: [

                {
                    icon: require('../../static/logo/recharge.png'),
                    page: '/pages/user/message',
                    name: this.$t('home.navList1')
                },
                {
                    icon: require('../../static/logo/withdraw.png'),
                    page: '/pages/withdrawal/index',
                    name: this.$t('home.navList2')
                },


                {
                    icon: require('../../static/kf.png'),
                    page: '/pages/account/service',
                    name: this.$t('home.navList3')
                },

                {
                    icon: require('../../static/logo/question.png'),
                    page: '/pages/problem/index',
                    name: this.$t('home.navList4')
                },
                //下载app
                // {
                // 	icon: require('../../static/download.png'),
                // 	page: config.DOWNLOAD_URL,
                // 	name: this.$t('home.navList5'),
                // 	type: 'openUrl',
                // },

            ],
            newsList: [
                this.$t('home.news1'),
                this.$t('home.news2'),
            ],

            mem_news_lists: [],
            honorList: [],
            blocks: [{
                padding: '13px',
                // background: '',
                imgs: [
                    {
                        src: '../../static/zhuanpan-bg1.png',
                        width: '600rpx',
                        height: '600rpx',
                        rotate: true
                    }
                ]
            }],
            prizes: [],
            buttons: [
                {
                    radius: '100rpx',
                    pointer: true,
                    imgs: [
                        {
                            src: '../../static/zhuanpan-arrow.png',
                            top: '-300rpx',
                            width: '600rpx',
                            height: '600rpx'
                        }
                    ]
                }
            ],
            award: 0,
            msg: '',
            index: 0,
            p2pData: []
        }
    },
    methods: {
        hide() {
            this.displayNone = false
        },

        routePage(name) { // 路由跳转
            this.$u.route({
                url: '/pages/about/index',
                params: {
                    name: name,
                }
            })
        },

        routePage1(url, type, vip_level = '') { // 路由跳转
            if (type && this.vip_level == '') {
                url = '/pages/auth/login';
                this.$u.route({
                    url
                })
                return;
            }

            if (url.indexOf('recharge') >= 0) {
                uni.switchTab({
                    url
                })
                return
            }
            if (type) {
                if (vip_level != '' && vip_level != this.vip_level) {
                    uni.showToast({
                        icon: 'error',
                        title: "Your level is not enough",
                    })
                    return;
                }
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

        newIndex() {
            new_index().then((res) => {
                this.honorList = res.data.honorList

                const arr = []
                for (let i = 0; i < res.data.price.length; i++) {
                    arr.push({ fonts: [{ text: '', top: '10%' }], background: '' })
                }
                this.prizes = arr
            })
        },
        // getScrolllist() {
        // 	get_income().then((res) => {
        // 		this.honorList = res.data.honorList

        // 		const arr = []
        // 		for(let i = 0; i< res.data.price.length; i++) {
        // 			arr.push({fonts:[{text:'',top:'10%'}],background:''})
        // 		}
        // 		this.prizes = arr
        // 	})
        // },
        getUrlInfo() {
            getUserDetail('level').then((res) => { // 获取用户信息
                if (res.data) {
                    let notice = window.localStorage.getItem('notice')
                    let notice_type = window.localStorage.getItem('notice_type')
                    if (notice_type == 'text') {
                        // uni.showModal({
                        //     content: notice,
                        //     showCancel: false,
                        //     confirmText: this.$t('confirm'),
                        //     success: (res) => { },
                        // })
                        this.modalShow = true
                        this.modalContent = notice
                    }
                    if (notice_type == 'img') {
                        this.displayNone = true
                        this.img_src = config.API_ASSETS + notice
                    }
                    if (notice) {
                        window.localStorage.removeItem('notice')
                        window.localStorage.removeItem('notice_type')
                    }

                    this.vip_level = res.data;

                    if (this.vip_level == 'free member') {
                        this.vip_1_src = false
                    }
                    if (this.vip_level == 'VIP1') {
                        this.vip_2_src = false
                    }
                    if (this.vip_level == 'VIP2') {
                        this.vip_3_src = false
                    }
                    if (this.vip_level == 'VIP3') {
                        this.vip_4_src = false
                    }
                    if (this.vip_level == 'VIP4') {
                        this.vip_5_src = false
                    }
                    if (this.vip_level == 'VIP5') {
                        this.vip_6_src = false
                    }
                }
            })
        },
        open() {
            this.$refs.popup.open('center')
            setTimeout(() => {
                this.show = true
            }, 400)
        },
        closePop() {
            this.$refs.popup.close()
        },
        // getPriceList () {
        // 	priceList().then(res => {
        // 		if (res.code === 0) {
        // 			const arr = []
        // 			for(let i = 0; i< res.data.length; i++) {
        // 				arr.push({fonts:[{text:'',top:'10%'}],background:''})
        // 			}
        // 			this.prizes = arr
        // 		}
        // 	})
        // },
        async startPlay() {
            const res = await getLottery()
            if (this.prizes.length == 0) {
                this.newIndex()
            }
            if (res.code == -101) {
                return uni.showModal({
                    title: this.$t('hint'),
                    content: this.$t('redeemLottery'),
                    confirmText: this.$t('confirm'),
                    cancelText: this.$t('cancel'),
                    success: async ({ confirm, cancel }) => {
                        if (confirm) {
                            // 确认
                            const res = await getLottery(1)
                            if (res.code === 0) this.turntableRotates(res)
                        } else if (cancel) {
                            // 取消
                        }
                    }
                })
            }
            if (res.code === 0) this.turntableRotates(res)
        },
        // 转盘转动
        turntableRotates(res) {
            this.$refs.myLucky.play()
            this.index = parseInt(res.data)
            this.msg = res.msg
            setTimeout(() => {
                this.$refs.myLucky.stop(this.index)
            }, 2000)
        },

        startCallBack() {
            this.startPlay()

        },
        endCallBack(prize) {
            uni.showToast({
                icon: 'none',
                title: this.msg,
                duration: 3000
            });
        },
        // 请求p2p产品
        async requestP2pProduct() {
            const { data } = await apiP2pProduct()
            this.p2pData = data
        }
    },
    created() {
        // this.getPriceList()
        this.requestP2pProduct()
    },
    onShow() {
        if (this.$store.state.user.username != '') {
            this.getUrlInfo()
        }
    },
    onLoad() {
        // this.getPriceList()
        this.newIndex()
		
    }
}
</script>

<style lang="scss">
.p2p_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20rpx;
    margin-top: 20rpx;

    .p2p_item {
        padding-top: 20rpx;
        width: 49%;
        margin-bottom: 20rpx;
        background: #fff;
        border-radius: 10rpx;
        box-shadow: 0 0 10rpx #ccc;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .text1 {
            font-size: 30rpx;
            font-weight: 500;
        }

        .process_box {
            width: 100%;
            height: 50rpx;
            background: #989898;
            color: #fff;
            text-align: center;
            line-height: 50rpx;
            border-radius: 10rpx;
            position: relative;

            .process {
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                background: #E3484D;
                border-radius: 10rpx;
            }

            .count {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
}

.tip-title {
    color: #FFFFFF;
    text-align: center;
    width: 600rpx;
    margin: 50rpx 0;
    font-size: 40rpx;
    font-weight: 800;
    // position: absolute;
    // left: 0;
    top: -150rpx;
}

.tip {
    color: #e75152;
    font-weight: 600;
    text-align: center;
    width: 500rpx;
    margin: 20rpx 50rpx;
    // background: #9c27b0;
    // background-color: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    padding: 8px;
    // position: absolute;
    // left: 50rpx;
    // top: -150rpx;
}

.uni-popup {
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.4);

}

.popup-content {
    // background-color: rgba(0, 0, 0, 0.5);
    background-image: url('../../static/bg.png');
    // background-color: #8b62a9;
    padding: 5rpx 50rpx 40rpx;
}
.slot-content {
    padding: 20rpx 50rpx 40rpx;
    // max-height: 800rpx;
    // overflow-y: auto;
}

.close {
    font-size: 50rpx;
    color: #cccc;
    position: absolute;
    top: 0;
    right: 10rpx;
    z-index: 1;
}

.popContainer {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    // background: blue;
    >img {
        width: 100%;
        height: 100%;
        object-fit: contain
    }
}
.video_box {
    width: 100%;
    padding: 0 18rpx;
    video {
        border-radius: 10rpx;
    }
}
.img_info {
    background-image: url(data:image/png;base64,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);
    background-position: 0% 0%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.padding-box {
    padding: 27px 15px;
}

.padding-box .card-list .card-item:nth-child(odd) {
    margin-right: 11px;
}

.padding-box .card-list .card-item {
    position: relative;
    width: 184px;
    height: 140px;
    margin-bottom: 11px;
    border-radius: 2px;
    color: #fff;
    font-size: 13px;
}

.flex-column {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-flow: column;
    flex-flow: column;
}

.flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}

.padding-box .card-list .card-item .level-info {
    position: absolute;
    right: 9px;
    top: 0;
    height: 18px;
    line-height: 18px;
    color: #fff;
    font-size: 13px;
    z-index: 1;
    display: flex;
    padding: 0 11px;
    background-color: #4c47a3;
    border-radius: 0px 0px 6px 6px;
}

.padding-box .card-list .card-item .img {
    overflow: hidden;
    height: 88px;
    background-color: #fff;
    border-radius: 2px 2px 0 0;
}

.flex-ajcenter {
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
}

.padding-box .card-list .card-item .img uni-image {
    width: 126px;
    height: 126px;
}

.padding-box .card-list .card-item .card-info {
    padding: 11px;
    background-image: -webkit-linear-gradient(left, #fb0000, #ff7368), -webkit-linear-gradient(#fff, #fff);
    background-image: linear-gradient(90deg, #fb0000, #ff7368), linear-gradient(#fff, #fff);
    background-blend-mode: normal, normal;
    border-radius: 0 0 2px 2px;
}

.tc {
    text-align: center !important;
}

.padding-box .card-list .card-item .card-info .item-title {
    font-size: 17px;
}

.padding-box .card-list .card-item .lock {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 140px;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 2px;
    z-index: 99;
}


.padding-box .card-list .card-item .card-info-1 {
    background-image: linear-gradient(90deg, #a494ce, #b1ccea), linear-gradient(#fff, #fff);
}

.padding-box .card-list .card-item .card-info-2 {
    background-image: linear-gradient(90deg, #456b23, #b1ccea), linear-gradient(#fff, #fff);
}

.padding-box .card-list .card-item .card-info-3 {
    background-image: linear-gradient(90deg, #9c3db1, #e2c2e9), linear-gradient(#fff, #fff);
}

.padding-box .card-list .card-item .card-info-4 {
    background-image: linear-gradient(90deg, #2960c5, #e2c2e9), linear-gradient(#fff, #fff);
}

.padding-box .card-list .card-item .card-info-5 {
    background-image: linear-gradient(90deg, #4a84c7, #e2c2e9), linear-gradient(#fff, #fff);
}

.padding-box .card-list .card-item .card-info-6 {
    background-image: linear-gradient(90deg, #ea9b11, #e2c2e9), linear-gradient(#fff, #fff);
}

#home {
    .logo {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10rpx;
        z-index: 999;
    }

    .icons-container {
        justify-content: space-around !important;
    }

    .wrap {
        width: 680rpx;
        border-radius: 10px;
        margin: 0px auto 20rpx auto;
    }


    .title {
        margin: 0 auto;
        width: 700rpx;
        font-weight: bold;
        margin-top: 20px;
    }

    .about {
        width: 700rpx;
        margin: 10px auto 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .item {
            width: 340rpx;
            height: 340rpx;
            display: flex;
            border-radius: 5px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #FFFFFF;

            &:nth-child(1),
            &:nth-child(2) {
                margin-bottom: 10px;
            }

            .text {
                font-weight: bold;
            }
        }
    }

    .partners {
        width: 700rpx;
        margin: 1px auto 0rpx auto;

        .partners_box {
            width: 49%;
            height: 116px;
            // background: linear-gradient(226deg, #6791EA 0%, #D5EAF5 54%, #96CDEC 100%);
            box-shadow: 0px 4px 5px 0px rgba(211, 211, 211, 0.5);
            border-radius: 10px;
            margin-bottom: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .partners_msg {
            width: 85px;

            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 24px;
            margin-right: 43px;
        }
    }
}

.partners-1 {
    width: 740rpx;
    margin: 1px auto 0rpx auto;
}

.partners_img {
    width: 120px;
    height: 90px;
    border-radius: 10px;
}

.shadow {
    width: 100%;
    overflow: hidden;
    height: 305px;
    background: linear-gradient(251deg, #5A5FFF 0%, #AC7EF4 100%);
    position: absolute;
    top: 0;
    left: 0;

    h3 {
        text-align: center;
        margin-top: 10px;
        color: white;
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
        widows: 40px;

    }
}


.drag {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    background: url("../../static/block-img.png") 50%/100% no-repeat;
    width: 55px;
    height: 55px;
    position: fixed;
    z-index: 999;
    animation: rotating 3s linear infinite;
    -webkit-animation: rotating 3s linear infinite;
    -moz-animation: rotating 3s linear infinite;
    -o-animation: rotating 3s linear infinite;

}

@keyframes rotating {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(359deg);
    }
}

.zhuan {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    background: url("../../static/block-img.png") 50%/100% no-repeat;
    width: 55px;
    height: 55px;
    position: fixed;
    z-index: 999;
    animation: rotating 3s linear infinite;
    -webkit-animation: rotating 3s linear infinite;
    -moz-animation: rotating 3s linear infinite;
    -o-animation: rotating 3s linear infinite;
}
</style>

