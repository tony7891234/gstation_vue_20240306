<template>
	<view class="container">
        <view class="content">
            <c-head v-if="p_type == 1" :title="$t('fund.transfer')"></c-head>
            <c-head v-if="p_type == 2" :title="$t('fund.buy')"></c-head>
            <view v-if="p_type == 1" class="list-box">
                <view class="title-info">{{$t('fund.transfer')}}</view>
                <view class="flex flex-between ai transfer-box">
                    <view class="from-to">
                        <view>{{$t('fund.from')}}</view>
                        <div style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkCAYAAACTz/ouAAABbUlEQVRIie2XsUvDQBTGf2mlYAe7+l84SScVnBScRIRO4hDoJDgU2sWC0A4uChXErVBxLers4CI4u4qro1uhFKM8eIHzTNJr6CT3IPD6ve9+H0na4xpE4Q6OVQeWgSXgHbh0WbbgSteAFe2fXAMKMwTkKh/gA3yAD/ABPuD/BczzcRXspgI8A7U5wGvKqsRJZeABqAI3enrIW3VlVJVZloAmsGbc0RXQyhHQ0rXxUxFmUz50gHvL3AXOgMABHKi3a+nC7EjAGNgFBpahAVwDxQx4UT0NSx8ocxzfzhdwAPQsYwjcAqUEeElnoaX3lCXMX0fHb+AI+ARODH1fz6OLhiZfjDtgy4KfAm1TSDqbtjXk3NBs0GrCumPgwhbTflxiPASilLlZkXr/wLMCpPrAHjDJ8EzU008zTNsehsA2MEqYjXQ2zAK47D+PwKa+l7ikF01mmeW6wb0AG8CHXtKLNrVm+YfzCqxr/+a0AvgBStI+bC5BgQ4AAAAASUVORK5CYII=&quot;); background-position: 0% 0%; background-size: 100% 100%; background-repeat: no-repeat;"></div>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkCAYAAACTz/ouAAABbUlEQVRIie2XsUvDQBTGf2mlYAe7+l84SScVnBScRIRO4hDoJDgU2sWC0A4uChXErVBxLers4CI4u4qro1uhFKM8eIHzTNJr6CT3IPD6ve9+H0na4xpE4Q6OVQeWgSXgHbh0WbbgSteAFe2fXAMKMwTkKh/gA3yAD/ABPuD/BczzcRXspgI8A7U5wGvKqsRJZeABqAI3enrIW3VlVJVZloAmsGbc0RXQyhHQ0rXxUxFmUz50gHvL3AXOgMABHKi3a+nC7EjAGNgFBpahAVwDxQx4UT0NSx8ocxzfzhdwAPQsYwjcAqUEeElnoaX3lCXMX0fHb+AI+ARODH1fz6OLhiZfjDtgy4KfAm1TSDqbtjXk3NBs0GrCumPgwhbTflxiPASilLlZkXr/wLMCpPrAHjDJ8EzU008zTNsehsA2MEqYjXQ2zAK47D+PwKa+l7ikF01mmeW6wb0AG8CHXtKLNrVm+YfzCqxr/+a0AvgBStI+bC5BgQ4AAAAASUVORK5CYII=" draggable="false">
                        <view>{{$t('fund.to')}}</view>
                    </view>

                    <view class="transfer-method">
                        <view class="transfer-method-info">
                            <view style="border-bottom: 1px solid #e5e5e5;">{{tips1}}</view>
                            <view>{{tips2}}</view>
                        </view>
                    </view>

                    <view class="flex flex-ajcenter change-icon" @click="changInfo()">
                        <view class="imgage">
                            <div style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABu0lEQVRoge2Zz0oDMRDGv7W9K3jwzXrwtodKwbYv4tEiCx76fGJLPaswEpnIdk2ySTe7Mwv7g0CbTDbzNX8mOy2IaIYRczVm56FYQBFrqFHAC4BPAF/8OYg2ASsADzwDBX9ehTpoEmAc3TnqdyERWgT4nLd4RWgQ0Oa8xSlCWkCs85Z/IiQDWQng9cK+SwB7CM6AOWGeHPXryLq/vppOIeNo5aivPMJ+kRJAALYAPrgsPc5bKrax9lvboPEy9934Pg8ZT5c5aSYBmbkZu4BkYgQsALzx6ZCzmGcuugqIOUbNQLddB/JwBHBXazJL6NAw7XyM9uV8FiT3gPn1N10fEpyejH16Y4oD0kwCpMm5IZOvAQ6uUzvkEGCi6bNUvIiJxG0vGH1Gatd4Z2jfA8c2gxwCNjEDXUBUpM6xhERpzkCRkptPtO2FuoB7AO9cyojBSrY9cF8ZzBIiojkRneicR25rMuO2OieuH7yE1rMv6ZqakO2V+ibOkmwdmvoe2IdykAHWUs7DcQoFE6kOfAnZwXAFslgR4s4jEInbRKhwHi1XCZ8INc4j4i5UcSEulSbnofT/gSSmd2JRAPwAodAJ0AB4l3IAAAAASUVORK5CYII=&quot;); background-position: 0% 0%; background-size: 100% 100%; background-repeat: no-repeat;"></div>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABu0lEQVRoge2Zz0oDMRDGv7W9K3jwzXrwtodKwbYv4tEiCx76fGJLPaswEpnIdk2ySTe7Mwv7g0CbTDbzNX8mOy2IaIYRczVm56FYQBFrqFHAC4BPAF/8OYg2ASsADzwDBX9ehTpoEmAc3TnqdyERWgT4nLd4RWgQ0Oa8xSlCWkCs85Z/IiQDWQng9cK+SwB7CM6AOWGeHPXryLq/vppOIeNo5aivPMJ+kRJAALYAPrgsPc5bKrax9lvboPEy9934Pg8ZT5c5aSYBmbkZu4BkYgQsALzx6ZCzmGcuugqIOUbNQLddB/JwBHBXazJL6NAw7XyM9uV8FiT3gPn1N10fEpyejH16Y4oD0kwCpMm5IZOvAQ6uUzvkEGCi6bNUvIiJxG0vGH1Gatd4Z2jfA8c2gxwCNjEDXUBUpM6xhERpzkCRkptPtO2FuoB7AO9cyojBSrY9cF8ZzBIiojkRneicR25rMuO2OieuH7yE1rMv6ZqakO2V+ibOkmwdmvoe2IdykAHWUs7DcQoFE6kOfAnZwXAFslgR4s4jEInbRKhwHi1XCZ8INc4j4i5UcSEulSbnofT/gSSmd2JRAPwAodAJ0AB4l3IAAAAASUVORK5CYII=" draggable="false">
                        </view>
                    </view>
                </view>
            
            </view>
            <view class="list-box">
                <view class="flex flex-between ai item-box">
                    <view>
                        {{$t('fund.amount')}}
                    </view>
					<u-input  :placeholder="min" v-model="amount" :clearable="false" maxlength="15" class="flex-1"/>
                    <view>{{$t('moneyLogo')}}</view>
                    <view class="color-red" @click="max">{{$t('max')}}</view>
                </view>
               <!-- <view class="pay_pwd" style="height:50px">
					<u-input v-model="password" type="password" :placeholder="$t('fund.tip1')" :clearable="false" maxlength="15" class="flex-1"/>
                </view> -->
            </view>
            <view class="max-num">
                {{tips3}} : {{balance}} {{$t('moneyLogo')}}
            </view>
            <view v-if="p_type == 1" class="btn tc" @click="submit()">
                {{$t('fund.confirm_transfer')}}
            </view>

            <view v-if="p_type == 2" class="btn tc" @click="submit()">
                {{$t('fund.buy')}}
            </view>
			
			<view class="list-box">
				<div style="height: 10px;"></div>
				<view style="font-size: 20px;">{{$t('fund.rule')}}</view>
				<view v-for="(item2,index2) in rules" :key="index2">
				<div style="height: 5px;"></div>
				<view style="font-size: 18px;">{{item2}}</view>
				</view>
				
				<div style="height: 20px;"></div>
			</view>
        </view>
	</view>
</template>

<script>
    import {
		getP2pIndex,
        p2pSubmit
	} from '@/service/user.api.js'

	export default {
		data() {
			return {
				tips1 : this.$t('fund.account_balance'),
				tips2 : this.$t('fund.fund_balance'),
				tips3 : '',
                amount: '',
                password:'',
                balance : 0,
                type : 1,
                p_id : '',
                p_type : '',
				rules:[],
				min: this.$t('fund.minnum'),
				min_num:'',//起投金额
			}
		},
		
		methods: {
            // 变更转入转出方式
			changInfo(){
                if(this.type == 1){
                    this.tips1 = this.$t('fund.fund_balance')
                    this.tips2 = this.$t('fund.account_balance')
                    this.type = 2
					this.tips3 = this.$t('fund.account_balance')
                }else{
                    this.tips1 = this.$t('fund.account_balance')
                    this.tips2 = this.$t('fund.fund_balance')
                    this.type = 1
					this.tips3 = this.$t('fund.fund_balance')
                }
                this.getMoney()
                this.amount = ''
            },
            getMoney(){
                getP2pIndex(this.rules.length == 0 ? this.p_id : null).then((res)=> {
					if(this.rules.length == 0){
						this.rules = res.data.rules
						this.min = this.min + ' ' + res.data.min
						this.min_num = res.data.min
					}
                    if(this.type == 1){
                        this.balance = res.data.balance
						this.tips3 = this.$t('fund.account_balance')
                    }else{
                        this.balance = res.data.fund_balance
						this.tips3 = this.$t('fund.fund_balance')
                    }
                });
            },

            max(){
                if(this.balance <= 0){
                    this.$$showToast(this.$t('fund.tip2'))
                    return;
                }
                this.amount = this.balance
            },

            routePage(url, type) { // 路由跳转
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

            submit(){
                if(this.amount == ''){
                    this.$$showToast(this.$t('fund.tip4'))
                    return;
                }
                // if(this.password == ''){
                //     this.$$showToast(this.$t('fund.tip1'))
                //     return;
                // }
                if(this.balance <= 0){
                    this.$$showToast(this.$t('fund.tip2'))
					return
                }
				
				if(this.amount < this.min_num){
					this.$$showToast(this.min)
					return
				}

                p2pSubmit(this.p_id, this.type, this.amount, this.password).then((res)=>{
                    if(res.code === 0){
                        this.amount = ''
                        this.password = ''
                        uni.showToast({
                            icon: 'success',
                            title: this.$t('fund.tip3')
						})

                        setTimeout(() => {
                            this.getMoney()
                        }, 1000)
                    }
                });
            }
		},
       
		onLoad(e) {
            this.p_id = e.type;
            this.p_type = e.type1;
            this.getMoney();
		}
	}
</script>

<style lang="scss">
@import "../../static/c.scss";

.container{
    // background: #090908 url(../../static/bg.jpg) top/100% no-repeat;
    background:#ffffff;
    min-height: 100vh;  
    padding-bottom: 16px;
}

.container .content{
    margin: 0 16px;
    color: #999;
    font-size: 15px;
}
.container .content .list-box{
    margin-top: 20px;
    padding: 0 16px;
    background-color: #fff;
    border-radius: 10px;
    border:1px solid;
}
.container .content .list-box .title-info{
    height: 45px;
    border-bottom: 1px solid #e5e5e5;
    line-height: 45px;
    font-size: 17px;
    font-weight: 700;
    color: #000000;
}

.container .content .list-box .transfer-box{
    padding: 25px 0;
    font-size: 13px;
    color: #7e7e7e;
}
.ai {
    align-items: center;
}
.flex-between {
    justify-content: space-between;
}
.flex {
    display: flex;
}

.flex-ajcenter {
    align-items: center;
    justify-content: center;
}


.container .content .list-box .transfer-box .from-to > img {
    width: 15px;
    height: 20px;
}

.container .content .list-box .transfer-box .transfer-method .transfer-method-info {
    padding-bottom: 5px;
    border-bottom: 1px solid #e5e5e5;
}

.container .content .list-box .transfer-box .transfer-method .transfer-method-info view:last-child {
    margin-top: 27px;
}

.container .content .list-box .transfer-box .change-icon {
    width: 54px;
    height: 54px;
    background-color: #ff8554;
    border-radius: 5px;
}

.container .content .list-box .transfer-box .change-icon>image {
    display: block;
    width: 26px;
    height: 26px;
}

.item-box {
    padding: 15px 0;
    color: #666;
}

.container .content .list-box .item-box view:not(:last-child) {
    margin-right: 11px;
}

.color-red{
    color: #fe654c
}

.container .content .list-box .pay-pwd{
    border-top: 1px solid #e5e5e5;
}

.container .content .max-num {
    height: 39px;
    padding: 0 16px;
    border-bottom: 1px solid hsla(0,0%,89.8%,.2);
    line-height: 39px;
    font-size: 13px;
    color: rgb(0, 0, 0);
}
.container .content .btn {
    height: 48px;
    margin-top: 11px;
    background: rgb(111, 103, 252);
    // background-image: linear-gradient(90deg, #5A5FFF, #AC7EF4),linear-gradient(#fff,#fff);
    background-blend-mode: normal,normal;
    border-radius: 5px;
    line-height: 48px;
    font-size: 17px;
    font-weight: 700;
    color: #fff;
}
.tc {
    text-align: center!important;
}

.title-info2{
    float: right;
    margin-top: -33px;
    font-size: 17px;
    font-weight: 700;
    color: #000000;
}
</style>

