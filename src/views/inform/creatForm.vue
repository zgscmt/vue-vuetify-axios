<template>
    <div class="createFrom" ref="scroll">
        <v-form>
            <v-container fluid>
                <v-row>
                    <v-col cols="12" sm="2" md="2" style="padding:3px !important;">
                        <v-text-field
                            v-model="pageForm.name"
                            dense
                            solo
                            :placeholder="$t(`${mainHead}.prompt.name`)"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" style="padding:3px;">
                        <v-text-field
                            v-model="pageForm.address"
                            dense
                            solo
                            :placeholder="$t(`${mainHead}.prompt.adr`)"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" style="padding:3px !important">
                        <v-text-field
                            v-model="pageForm.idcard"
                            dense
                            solo
                            :placeholder="$t(`${mainHead}.prompt.card`)"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" style="padding:3px !important">
                        <v-select
                            v-model="pageForm.gender"
                            dense
                            :items="$t(`${mainHead}.prompt.gender.gender`)"
                            :label="$t(`${mainHead}.prompt.gender.sex`)"
                            solo
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" style="padding:3px !important">
                        <v-select
                            v-model="pageForm.isTeam"
                            dense
                            :items="$t(`${mainHead}.prompt.party_member.isTeam`)"
                            :label="$t(`${mainHead}.prompt.party_member.title`)"
                            solo
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" style="padding:3px !important">
                        <v-text-field
                            v-model="pageForm.phone"
                            dense
                            solo
                            :placeholder="$t(`${mainHead}.prompt.phone`)"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" style="padding:3px !important;">
                        <v-text-field
                            v-model="pageForm.type"
                            dense
                            solo
                            :placeholder="$t(`${mainHead}.prompt.type`)"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" style="padding:3px !important">
                        <v-btn v-if="!bulForm.loading" color="primary" @click="search">
                            <i class="fa fa-search"></i>
                            {{ $t(`${mainHead}.btn`) }}
                        </v-btn>
                        <v-btn v-if="bulForm.loading" color="primary">
                            <i class="fa fa-spinner fa-spin"></i>
                            {{ $t(`${mainHead}.btn`) }}
                        </v-btn>
                        <!-- 提示信息 -->
                        <v-snackbar v-model="bulForm.snackbar" top :timeout="1000" :color="bulForm.color">{{
                            bulForm.message
                        }}</v-snackbar>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>

        <material-card
            icon="mdi-clipboard-text"
            title="Simple Table"
            class="px-5 py-3"
            color="success"
            style="margin-top:30px !important"
        >
            <v-data-table
                :headers="headers"
                :items="desserts"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                class="elevation-1"
                @page-count="pageCount = $event"
            ></v-data-table>
            <div class="text-start pt-2" id="pageList">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
        </material-card>
        <go-up class="goup" />
    </div>
</template>
<script>
import materialCard from "../../components/materialCard";
import goUp from "../../components/goUp";
export default {
    components: {
        materialCard,
        goUp,
    },
    data() {
        return {
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,
            mainHead: "navMenu[0].children[1]",
            pageForm: {
                name: "",
                address: "",
                idcard: "",
                phone: "",
                gender: "",
                idTeam: "",
                type: "",
            },
            //所需参数
            bulForm: {
                loading: false,
                message: "",
                snackbar: false,
                color: "",
            },
            loading: false,
            message: "",
            snackbar: false,
            headers: [],
            desserts: [
                {
                    name: "Frozen Yogurt",
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: "1%",
                },
                {
                    name: "Ice cream sandwich",
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: "1%",
                },
                {
                    name: "Eclair",
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: "7%",
                },
                {
                    name: "Cupcake",
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: "8%",
                },
                {
                    name: "Gingerbread",
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: "16%",
                },
                {
                    name: "Jelly bean",
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: "0%",
                },
                {
                    name: "Lollipop",
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: "2%",
                },
                {
                    name: "Honeycomb",
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: "45%",
                },
                {
                    name: "Donut",
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: "22%",
                },
                {
                    name: "KitKat",
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: "6%",
                },
            ],
        };
    },
    mounted() {
        var that = this;
        window.addEventListener("setItem", function(e) {
            if (e.key === "local") {
                that.headers = that.$t("navMenu[0].children[1].headers");
            }
        });
        var local = window.localStorage.getItem("local");
        that.$i18n.locale = local;
        that.headers = that.$t("navMenu[0].children[1].headers");
    },
    methods: {
        search() {
            this.bulForm.loading = true;

            setTimeout(() => {
                this.bulForm.loading = false;
                this.bulForm.snackbar = true;
                this.bulForm.message = "获取成功";
                this.bulForm.color = "success";
            }, 1000);
        },
    },
};
</script>
<style lang="stylus" scoped>
.v-data-table thead tr:last-child th {
  text-align: center !important;
}
.goup{
    position :fixed;
    bottom:10px;
    right:10px
}
@media screen and (max-device-width: 500px){
    #pageList{
        display :none;
        visibility :hidden;
    }

}
</style>
