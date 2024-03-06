<template>
	<view class="container">
        <c-head :isBack="true" :title="$t('fund.title')" ></c-head>
        <div style="height:10px"></div>
        <view class="content">
            <view class="list-box">
                <view class="recode-btn">
                    <view class="flex flex-ajcenter" @click="routePage('pages/fund/record')">
                        <!-- <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAXCAYAAADpwXTaAAABk0lEQVQ4jZ2VzStEURjGf8OEBbGYUhYaKaFsZHbsLSSlSFOyVlj4E1ih7KxkQ1aKUvYiK2VqrKQoKQ1N+VjQGI8OZ67rdmfunfvUqdt7zvvxvM95z0WSWUuSPhQNeUlTJk5MUg1QBLJADxCneghIm2DGuWDdt4F9uxkWg8Ai8GIoxl3kOi3tatZYybnGk70YgaIDv/6cAH0hfHeBWbfBW5nBKpAD6gLWNLARVNk5sAK0BFT2DmSAhGPxCJCUlAl52/YkJSoJYDAJXAVUZTAOrAXRbAKWgXqX7aKM0nmgv1qaI/ac3/2rSHMIuPTYDoHGIN5+NEeBHc+12QKeowRLAymg1mUzs7puq5sDkq699tKHd9A7gFvgCOj1JBkAzoA24AlosPaEk9hHgHJDnrRnHiS9SjqWdG1tn7JVVYtWYMb21PTyxjI68FMzDLqBTeDeBjr96XUEmgYFSTlJRUlZSc3mjKH5ZdWKARP2xfDD30D/CmYegjtg2Lk2NutChF/Jo6Qud/VuGvOS3kIGMmqm/rVB4ht5TlXYosIiIAAAAABJRU5ErkJggg==" alt=""> -->
                        <span>
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;margin:5px">{{$t('fund.record')}}</font></font>
                        </span>
                    </view>
                </view>

                <view class="perRank-funding">
                    <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{$t('fund.fund_balance')}}</font></font>
                    <view class="data-info">
                        <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{fund_balance}}</font></font>

                    </view>
                </view>

                <view class="flex flex-between item-box">
                    <view class="flex-1 data-box">
                        <view class="data-tit">
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{$t('fund.yesterday')}}</font></font>
                        </view>
                        <view class="">
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{fund_yesterday_balance}}</font></font>
                        </view>
                    </view>
                    <!-- <view class="flex-1 data-box">
                        <view class="data-tit">
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{$t('fund.daily_return')}}</font></font>
                        </view>
                        <view>
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{rate}}</font></font>
                        </view>
                    </view> -->
                     <view class="flex-1 data-box">
                        <view class="data-tit">
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{$t('fund.total_revenue')}}</font></font>
                        </view>
                        <view>
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{fund_total_balance}}</font></font>
                        </view>
                    </view>

                    <!-- <view class="flex-1 data-box">
                        <view class="data-tit">
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{$t('fund.inactive_fund_balance')}}</font></font>
                        </view>
                        <view>
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{balance}}</font></font>
                        </view>
                    </view> -->
                </view>

                <view class="flex flex-between item-box ">
                     <view class="flex-1 data-box">
                        <view class="data-tit">
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{$t('fund.inactive_fund_balance')}}</font></font>
                        </view>
                        <view>
                            <font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{balance}}</font></font>
                        </view>
                    </view>
                </view>

            </view>
            <view class="dataitem" v-for="(item, index) in p2pList" :key="index">
                <view class="item" @click="changPname(item.name, index)">
                    <view class="shouru name">{{item.name}}</view>
                    <view class="shouru ratered">{{item.total_profit}}%</view>
                </view>
                <view class="item" @click="changPname(item.name, index)">
                    <view class="shouru ratetitle">{{$t('fund.tip5')}}</view>
                    <view class="shouru name">{{item.total_day}} {{$t('fund.day')}}</view>
                </view>
                <view class="item">
                    <button @click="routePage('/pages/fund/transfer', item.id, item.type)" v-if="item.status == 1" class="goumai">{{$t('fund.buy')}}</button> 
                    <button @click="noBuy()" v-if="item.status == 2" class="goumai1">{{$t('fund.buy')}}</button> 
                </view>
            </view>

            <template v-if="p2pList.length == 0">
                <view class="nodata">
                    <img src="../../static/empty.png"/>
                    <view class="empty">{{$t('fund.no_data')}}</view>
                </view>
            </template>
            <!-- <view class="tips-tit">
                <font style="vertical-align: inherit;"><font style="vertical-align: inherit;color: black;">{{$t('fund.description')}}</font></font>
            </view> -->
           <!-- <view class="tips-box">
                
                <view v-for="(item2,index2) in p2prule" :key="index2">
                <view v-if="index2 == 0">{{p_name}} Rule:</view>
                <view>{{item2}}</view>
                </view>
            </view> -->
        </view>
    </view>
</template>

<script>

    import {
		getP2pIndex,
        getP2pList
	} from '@/service/user.api.js'

	
	export default {
		data() {
			return {
				fund_balance : 0,
                balance :0,
                fund_total_balance:0,
                fund_yesterday_balance:0,
                rate:0,
                p_name : '',
                p2pList:[],
                p2prule:[],
			}
		},

		computed: {
		
		},
		methods: {
            changPname(name, index){
                //this.p_name = name
                //this.p2prule = this.p2pList[index].rules
            },
			routePage(url, type, type1) { // 路由跳转
			
				if (type) {
					this.$u.route({
						url,
						params: {
							type,type1
						}
					})
				} else {
					this.$u.route({
						url
					})
				}
			},
            noBuy(){
                this.$$showToast(this.$t('fund.tip6'))
            },

            revertData(){
                getP2pIndex().then((res)=>{
                    this.fund_balance = res.data.fund_balance_new
                    this.balance = res.data.fund_balance
                    this.fund_total_balance = res.data.fund_total_balance
                    this.fund_yesterday_balance = res.data.fund_yesterday_balance
                });
            },

           
		},
		onShow() {
            this.revertData();

            getP2pList().then((res)=>{
                // console.log(res)
                this.p2pList = res.data

                if(res.data.length > 0){
                    this.p_name = res.data[0].name
                    //this.p2prule = res.data[0].rules
                }
            });
		},
        onload(){
            this.revertData()
        }
	}
</script>

<style lang="scss" scoped>
.nodata {
	margin-top: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.empty{
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #868686;
	line-height: 20px;
}

.container {
    min-height: 100vh;
    padding-bottom: 16px;
    background: #ffffff;
}
.container .content{
    // margin: 10px;
    margin: 2px 10px;
    color: #fff;
}
//linear-gradient(90deg, #5A5FFF, #AC7EF4)
.container .content .list-box{
    position: relative;
    margin-bottom: 16px;
    padding: 16px 19px;
    background-image: linear-gradient(90deg, #5A5FFF, #AC7EF4);
    background-blend-mode: normal,normal;
    border-radius: 8px 8px 8px 8px;
}

.recode-btn{
    position: absolute;
    right: 17px;
    top: 0;
    z-index: 1;
    padding: 8px 8px;
    background-color: #8c8c8c;
    border-radius: 0px 0px 12px 12px;
    font-size: 13px;
}

.flex-ajcenter {
    align-items: center;
    justify-content: center;
}
.flex {
    display: flex;
}
.container .content .list-box .perRank-funding {
    width: 70%;
    font-weight: 700;
    font-size: 12px;
}
.container .content .list-box .perRank-funding .data-info{
    margin-top: 5px;
    font-size: 29px;
}

.container .content .list-box .item-box{
    margin-top: 27px;
    font-size: 14px;
    font-weight: 700;
}

.container .content .list-box .item-box .data-box:not(:last-child) {
    margin-right: 11px;
}

.flex-1 {
    position: relative;
    flex: 1;
}
.container .content .list-box .item-box .data-box .data-tit {
    height: 28px;
    margin-bottom: 8px;
    font-size: 9px;
}
.container .content .btn {
    height: 48px;
    margin-bottom: 24px;
    padding: 0 11px;
    background-image: linear-gradient(90deg, #5A5FFF, #AC7EF4),linear-gradient(#fff,#fff);
    background-blend-mode: normal,normal;
    border-radius: 5px;
    line-height: 48px;
    font-size: 17px;
    font-weight: 700;
}
.tc {
    text-align: center!important;
}

.container .content .tips-tit{
    margin-bottom: 12px;
    font-size: 15px;
    font-weight: 700;
}

.container .content .tips-box {
    min-height: 395px;
    // box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 5%);
    border-radius: 6px;
    font-size: 18px;
    color: black;
    // max-width: 100%;
}

.container .content .tips-box img {
    max-width: 100%;
}

.dataitem {
		display: flex;
		justify-content: space-between;
		padding: 5px 10px;
		align-items: center;
		line-height: 25px;
		width: 700rpx;
		height: 68px;
		background: #FFFFFF;
		border: 1px solid #D9D9D9;
		margin: 0 auto 15px;
		border-radius: 8px;

		.rate {
			color: #f80;
			flex: 1;
			margin-left: 30px;
			pointer-events: none;
		}

		.content {
			text-align: end;
		}
	}

    .item{
		width: 100%;
	}

    .shouru{
		//display: inline-block;
		padding: 1px;
		//width: 35%;
        color: black;
	}

    .goumai{
        width: 100px;
        height: 26px;
        line-height: normal;
        border-radius: 10px;
        font-size:18px;
        padding: 0;
        color: rgb(255, 255, 255);
        background-color: rgb(255, 0, 0) !important;
    }

     .goumai1{
        width: 100px;
        height: 26px;
        line-height: normal;
        border-radius: 10px;
        font-size: 18px;
        padding: 0;
        color: rgb(255, 255, 255);
        background-color: rgb(170, 170, 170) !important;
    }

    .ratered{
        color: red;
        font-size:12px ;
    }

    .ratetitle{
        color: #8c8c8c;
       // width:14vh;
    }

    .name{
        //width:12vh;
    }


</style>
