<template>
    <div class="searchBar" style="margin-top:25px">
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-text-field
                    :label="$t('navMenu[0].search')"
                    class="input_width"
                    dense
                    outlined
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    @input="searchValue"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-list v-if="searchData.length > 0" style="background-color:#fff">
                <v-list-item-group>
                    <v-list-item v-for="(item, index) in searchData" :key="index">
                        <v-list-item-content>
                            <v-list-item-title
                                style="color:black"
                                @click="toRouter(item.router)"
                                v-text="item.text"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group> 
            </v-list>
        </v-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            search: "",
            searchList: [],
            searchData: [], //筛选后的数据
        };
    },

    methods: {
        getSearch(value) {
            this.searchList = [];
            let allMenus =value 
            allMenus.forEach((item) => {
                let childMenu = item.children;
                childMenu.forEach((nav) => {
                    this.searchList.push(nav);
                });
            });
        },
        searchValue() {
            var search = this.search;
            if (search) {
                this.searchData = this.searchList.filter(function(product) {
                    // 每一项数据
                    // console.log(product);
                    return Object.keys(product).some(function(key) {
                        // 每一项数据的参数名
                        // console.log(key)
                        return (
                            String(product[key])
                                // toLowerCase() 方法用于把字符串转换为小写。
                                .toLowerCase()
                                // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
                                .indexOf(search) > -1
                        );
                    });
                });
            } else {
                this.searchData = [];
            }
        },
        toRouter(router) {
            this.routerJump(router);
            this.searchData = [];
            this.search = "";
            this.$emit("refresh", router);
        },
    },
};
</script>
<style lang="stylus" scoped>
@media screen and (max-device-width: 500px) {
    //窗口可视化宽度小于等于500px  设置宽度
    .input_width{
        width:125px;
    }
}
</style>
