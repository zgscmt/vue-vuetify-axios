<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app class="siderBox">
            <div class="sider">
                <v-toolbar-title style="color:#fff;text-align:center;padding-top:15px;font-weight:initial">
                    <span>{{ systemTitle }}</span>
                </v-toolbar-title>
                <hr style="background:#fff;width:90%;margin:0 auto;margin-top:10px" />
                <v-list dark>
                    <v-list-item link @click="getActiveRouter('/index')">
                        <v-list-item-action>
                            <v-icon :class="'/index' === activeRouter ? 'actived' : 'unactive'"
                                >mdi-view-dashboard</v-icon
                            >
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title :class="'/index' === activeRouter ? 'actived' : 'unactive'">{{
                                pageIndex
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-group
                        id="text_menu"
                        v-for="(item, index) in authMenu"
                        :key="index"
                        v-model="item.active"
                        :prepend-icon="item.action"
                        no-action
                        color="warning"
                    >
                        <template v-slot:activator>
                            <v-list-item-content id="text_menu">
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item v-for="subItem in item.children" :key="subItem.title">
                            <v-list-item-content>
                                <v-list-item-title>
                                    <a
                                        :class="subItem.router === activeRouter ? 'actived' : 'unactive'"
                                        @click="getActiveRouter(subItem.router)"
                                        >{{ subItem.text }}</a
                                    >
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </div>
        </v-navigation-drawer>
        <v-main :class="$vuetify.theme.dark ? 'mianBlack' : 'mainWhite'">
            <v-container class="fill-height" fluid>
                <!-- 标题栏 -->
                <v-app-bar app id="app-bar" fixed flat :color="$vuetify.theme.dark ? '#121212' : '#eeeeee'">
                    <v-btn :class="$vuetify.theme.dark ? 'iconBlack' : 'iconWhite'" icon @click.stop="drawer = !drawer">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                    <!-- 面包屑 -->
                    <v-toolbar-title>
                        <v-breadcrumbs class="hidden-sm-and-down" large style="padding:0px !important">
                            <v-breadcrumbs-item :disabled="false">
                                <a v-if="breadcrumbs.active" style="color:#1976D2" @click="getActiveRouter('/index')">
                                    {{ pageIndex }}
                                </a>
                            </v-breadcrumbs-item>
                            <img
                                v-if="breadcrumbs.active"
                                style="height:18px;width:18px"
                                :src="
                                    $vuetify.theme.dark
                                        ? require('../assets/images/slash_white.png')
                                        : require('../assets/images/slash_black.png')
                                "
                                alt="斜杆"
                            />
                            <v-breadcrumbs-item :disabled="false">
                                <span>{{ breadcrumbs.parent }}</span>
                            </v-breadcrumbs-item>
                            <img
                                v-if="breadcrumbs.active"
                                style="height:18px;width:18px"
                                :src="
                                    $vuetify.theme.dark
                                        ? require('../assets/images/slash_white.png')
                                        : require('../assets/images/slash_black.png')
                                "
                                alt="斜杆"
                            />
                            <!-- <v-icon v-if="breadcrumbs.active">mdi-chevron-right</v-icon> -->
                            <v-breadcrumbs-item :disabled="true">
                                <span style="color:gray">{{ breadcrumbs.active }}</span>
                            </v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </v-toolbar-title>

                    <v-spacer />

                    <!-- 搜索框 -->
                    <searchBar ref="searchValue" @refresh="render" style="margin-right:8px;" />
                    <!-- 全屏 -->
                    <tabNav />
                    <!-- 模式设置 -->
                    <a>
                        <img
                            v-if="$vuetify.theme.dark === false"
                            src="../assets/images/月亮.png"
                            width="24px"
                            height="24px"
                            style="margin-left:5px;margin-right:8px; color:black"
                            @click="exchange"
                            alt="转换"
                        />

                        <img
                            v-else
                            src="../assets/images/son_white.png"
                            width="23px"
                            height="23px"
                            style="margin-left:5px;margin-right:8px;"
                            @click="exchange"
                            alt="转换"
                        />
                    </a>
                    <!-- 国际化 -->
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <a v-on="on">
                                <img
                                    :src="
                                        $vuetify.theme.dark
                                            ? require('../assets/images/int_white.png')
                                            : require('../assets/images/int_black.png')
                                    "
                                    width="20px"
                                    height="20px"
                                    style="margin-left:8px;margin-right:10px;"
                                    alt="转换"
                            /></a>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>
                                    <div style="display:flex;flex-flow:column">
                                        <div>
                                            <a @click="changeType('zh')">中文</a>
                                        </div>
                                        <div style="margin-top:10px">
                                            <a @click="changeType('en')">English</a>
                                        </div>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <!-- 退出 -->
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-account</v-icon>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>
                                    <a @click="log_out()">{{ logout }}</a>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-app-bar>
                <!-- 主要内容 (通过路由跳转)-->
                <v-row fluid>
                  <go-up />
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive" class="margin_top_20"></router-view>
                    </keep-alive>
                    <router-view
                        v-if="undefined == $route.meta.keepAlive"
                        class="margin_top_20"
                        style="margin-top:0px;"
                    ></router-view>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import tabNav from "../components/tabNav";
import searchBar from "../components/searchBar";
import goUp from "../components/goUp"
import stroage from "good-storage"
export default {
    props: {
        source: String,
    },
    components: {
        tabNav,
        searchBar,
        goUp
    },
    data() {
        return {
            drawer: null,
            authMenu: this.$t("navMenu"),
            activeRouter: "",
            breadcrumbs: {
                parent: "",
                active: "",
            }, //面包屑导航
            pageIndex: "",
            systemTitle: "",
            logout: "", //退出
            showTabNav: true,
        };
    },
    mounted() {
        this.setTheme();
        this.getStart();
        this.refresh();
    },
    methods: {
        //动态赋值
        getStart() {
            let locale = window.localStorage.getItem("local");
            if (!locale) {
                window.localStorage.setItem("local", "zh");
                this.pageIndex = "首页";
                this.systemTitle = "表单管理系统";
                this.$refs.searchValue.getSearch(this.authMenu);
            } else {
                if (locale === "zh") {
                    this.pageIndex = "首页";
                    this.systemTitle = "表单管理系统";
                    this.logout = "退出";
                    this.$i18n.locale = "zh";
                    this.authMenu = this.$t("navMenu");
                    this.$refs.searchValue.getSearch(this.authMenu);
                }
                if (locale === "en") {
                    this.pageIndex = "Index";
                    this.$i18n.locale = "en";
                    this.logout = "log out";
                    this.systemTitle = "Form management system";
                    this.authMenu = this.$t("navMenu");
                    this.$refs.searchValue.getSearch(this.authMenu);
                }
            }
        },
        //设置主题
        setTheme() {
            let theme = window.localStorage.getItem("theme");
            if (!theme) {
                window.localStorage.setItem("theme", false);
            } else {
                if (theme === "false") {
                    this.$vuetify.theme.dark = false;
                } else {
                    this.$vuetify.theme.dark = true;
                }
            }
        },
        //切换语言
        changeType(type) {
            this.$i18n.locale = type;
            //监听localstroage里的local值
            this.$addStorageEvent(1, "local", type);
            this.authMenu = this.$t("navMenu");
            this.$refs.searchValue.getSearch(this.authMenu);
            this.getStart();
            this.refresh();
        },
        getActiveRouter(router) {
            this.routerJump(router);
            this.activeRouter = router;
            this.setActive(router);
        },
        //设置当前触发的系列内容
        setActive(router) {
            let allUrl = window.location.href;
            for (let i in this.authMenu) {
                let routerAll = this.authMenu[i].children;
                this.authMenu[i].active = false;
                for (let j in routerAll) {
                    if (!router) {
                        //不存在参数router
                        if (allUrl.indexOf(routerAll[j].router) > 0) {
                            this.breadcrumbs.active = routerAll[j].text;
                            this.breadcrumbs.parent = this.authMenu[i].text;
                            this.authMenu[i].active = true;
                        }
                    } else {
                        //存在参数router
                        if (router === routerAll[j].router) {
                            this.breadcrumbs.active = routerAll[j].text;
                            this.breadcrumbs.parent = this.authMenu[i].text;
                            this.authMenu[i].active = true;
                        }
                        //存在路由，且当前的路由是首页index
                        if (router === "/index") {
                            this.breadcrumbs.active = "";
                            this.breadcrumbs.parent = "";
                        }
                    }
                }
            }
        },
        //页面刷新
        refresh() {
            let url = window.location.pathname;
            this.activeRouter = url;
            this.setActive();
        },
        render(url) {
            this.activeRouter = url;
            this.setActive(url);
        },
        //改变主题背景
        exchange() {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.dark = false;
                window.localStorage.setItem("theme", false);
            } else {
                this.$vuetify.theme.dark = true;
                window.localStorage.setItem("theme", true);
            }
        },
        log_out(){
            stroage.clear();
            this.routerJump('/login')
        }
    },
};
</script>
<style lang="stylus" scoped>
.container.fill-height {
  align-items: flex-start;
}

.siderBox {
  background: rgba(0, 0, 0, 0.6) url('~@/assets/images/sidebar.jpg') !important;
  background-size: 100% 100%;

  .sider {
    background: black;
    opacity: 0.7;
    filter: alpha;
    height: 100%;
  }
}

.actived {
  text-decoration: none;
  color: yellow !important;
}

.unactive {
  text-decoration: none;
  color: #fff !important;
}
.mianBlack{
    background:#121212;
    height:100%;
}
.mainWhite{
    background:#eeeeee;
    height:100%;
}
.iconBlack{
    background:#272727;
    border-radius:40px;
    margin-left:5px !important;
}
.iconWhite{
    background:#fff;
    border-radius:40px;
    margin-left:5px !important;
}
.margin_top_20 {
  width: 98%;
  margin-left: 2%;
  margin-right: 2%;
}
</style>
