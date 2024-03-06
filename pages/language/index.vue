<template>
    <view class="CommonProblem" style="min-height: 100vh;">
        <c-head :title="$t('language.title')"></c-head>
        <view class="language-content">
            <view v-for="(item, index) in lang" :key="index" class="item" @click="handleSetLang(item.key, index)">
                <view class="content">
                    <image :src="item.icon" alt="" class="nation" />
                    <view class="title">{{ item.title }}</view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            lang: [
                {
                    title: "English",
                    key: "en",
                    icon: require("@/static/lang/en.png"),
                },
                {
                    title: "Türkçe",
                    key: "tu",
                    icon: require("@/static/lang/tu.png"),
                },
                {
                    title: "Português",
                    key: "pt",
                    icon: require("@/static/lang/pt.png"),
                },
                {
                    title: "简体中文",
                    key: "cn",
                    icon: require("@/static/lang/cn.png"),
                },
                {
                    title: "Frans ",
                    key: "fa",
                    icon: require("@/static/lang/fa.png"),
                }, {
                    title: "Nederland",
                    key: "helan",
                    icon: require("@/static/lang/helan.png"),
                },
            ],
        };
    },
    mounted() {

    },

    methods: {
        handleSetLang(lang, index) {
            this.$i18n.locale = lang;

            setTimeout(() => {
                uni.setStorageSync('lang', lang);
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
                uni.navigateBack()
            }, 100);
        },
    },
};
</script>
<style lang="scss" scoped>
.language-content {
    .item {
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        border-bottom: 1px solid #eee;

        &:last-child {
            border-bottom: none;
        }

        .content {
            display: flex;

            .nation {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                box-shadow: 0px 0px 1px rgba(0, 0, 0, .5);
            }

            .title {
                font-size: 14px;
                color: #333;
                margin-left: 11px;
            }
        }

        .check {
            width: 12px;
            height: 15px;
        }
    }
}
</style>
