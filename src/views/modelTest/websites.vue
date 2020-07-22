<template>
    <div class="websites">
        <v-row>
            <v-col cols="12" sm="4">
                <v-btn depressed small color="primary" @click="dialog.add = true">{{$t(`${mainHead}.add`)}}</v-btn>
            </v-col>
        </v-row>

        <material-card
            icon="mdi-clipboard-text"
            title="Websites Table"
            class="px-5 py-3"
            color="success"
            style="margin-top:30px !important"
        >
            <!-- 加载遮罩层 -->
            <v-overlay :value="overlay" color="#fff" :absolute="true" opacity="0.9">
                <v-progress-circular indeterminate color="blue" size="32"></v-progress-circular>
            </v-overlay>
            <v-data-table
                :headers="headers"
                :items="tableData"
                :page.sync="page_num"
                :items-per-page="page_size"
                hide-default-footer
                :server-items-length="total"
                class="elevation-1"
                disable-sort
                @page-count="pageCount = $event"
                @pagination="pagination"
            >
                <template v-slot:item.operation="{ item }">
                    <v-btn depressed small @click="webInfo(item.id)" color="primary">{{$t(`${mainHead}.data_info`)}}</v-btn>
                    <v-btn
                        depressed
                        small
                        @click="webEdit(item.id)"
                        color="warning"
                        style="margin-left:2px;margin-right:2px"
                        >{{$t(`${mainHead}.data_update`)}}</v-btn
                    >
                    <v-btn depressed small @click="webDel(item.id)" color="error">{{$t(`${mainHead}.data_del`)}}</v-btn>
                </template>
            </v-data-table>
            <div class="text-center pt-2" style="display:flex;align-items:center;justify-content:center">
                <p style="text-align:center;margin-bottom:0px">共{{ total }}条</p>
                <v-pagination v-model="page_num" :length="pageCount" :total-visible="7"></v-pagination>
            </div>
        </material-card>

        <!-- 弹出提示 -->
        <v-snackbar v-model="dialog.snackbar" top :timeout="1000" :color="snackbar.color">
            {{ snackbar.message }}
        </v-snackbar>

        <v-row justify="center">
            <!-- 新增数据 -->
            <v-dialog v-model="dialog.add" max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{$t(`${mainHead}.add`)}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field :label="$t(`${mainHead}.name`)" solo v-model="pageForm.name"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field :label="$t(`${mainHead}.url`)" solo v-model="pageForm.url"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field :label="$t(`${mainHead}.alexa`)" solo v-model="pageForm.alexa"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field :label="$t(`${mainHead}.country`)" solo v-model="pageForm.country"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" small @click="dialog.add = false">{{$t(`${mainHead}.btn_cancel`)}}</v-btn>
                        <v-btn color="primary" small @click="sureAdd">{{$t(`${mainHead}.btn_confirm`)}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- 查看详情 -->
            <v-dialog v-model="dialog.info" max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{$t(`${mainHead}.info`)}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field :label="$t(`${mainHead}.name`)" solo v-model="infoForm.name"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field :label="$t(`${mainHead}.url`)" solo v-model="infoForm.url"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field :label="$t(`${mainHead}.alexa`)" solo v-model="infoForm.alexa"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field :label="$t(`${mainHead}.country`)" solo v-model="infoForm.country"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" small @click="dialog.info = false">{{$t(`${mainHead}.btn_confirm`)}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- 编辑内容 -->
            <v-dialog v-model="dialog.update" max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{$t(`${mainHead}.update`)}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field :label="$t(`${mainHead}.name`)" solo v-model="editForm.name"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field :label="$t(`${mainHead}.url`)" solo v-model="editForm.url"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field :label="$t(`${mainHead}.alexa`)" solo v-model="editForm.alexa"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field :label="$t(`${mainHead}.country`)" solo v-model="editForm.country"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" small @click="dialog.update = false">{{$t(`${mainHead}.btn_cancel`)}}</v-btn>
                        <v-btn color="primary" small @click="sureEdit">{{$t(`${mainHead}.btn_confirm`)}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
import materialCard from "../../components/materialCard";
export default {
    components: {
        materialCard,
    },
    data() {
        return {
            headers: [],
            tableData: [],
            page_num: 1,
            pageCount: 0,
            total: 0,
            page_size: 5,
            mainHead: "navMenu[1].children[1].prompt",
            url: [],
            overlay: false, //加载展示
            //设置模态框
            dialog: {
                add: false,
                info: false,
                update: false,
                del: false,
                snackbar: false, //提示信息
            },
            snackbar: { message: "", color: "" }, //提示信息
            //新增数据
            pageForm: {
                name: "",
                url: "",
                alexa: "",
                country: "",
            },
            //查看详情
            infoForm: {
                name: "",
                url: "",
                alexa: "",
                country: "",
            },
            //修改数据
            editForm: {
                id: "",
                name: "",
                url: "",
                alexa: "",
                country: "",
            },
        };
    },
    mounted() {
        var that = this;
        window.addEventListener("setItem", function(e) {
            if (e.key === "local") {
                that.headers = that.$t("navMenu[1].children[1].headers");
            }
        });
        var local = window.localStorage.getItem("local");
        that.$i18n.locale = local;
        that.headers = that.$t("navMenu[1].children[1].headers");
    },
    activated() {
        this.getData();
    },
    methods: {
        getData() {
            let params = {
                page_num: this.page_num,
                page_size: this.page_size,
            };
            this.overlay = true;
            this.post("websites", params, (response) => {
                this.overlay=false
                this.tableData = response.data;
                this.total = response.paging.total;
                this.toast(response);
            });
        },
        //公共部分
        common(response) {
            this.dialog.snackbar = true;
            this.snackbar.message = response.message;
            this.snackbar.color = response.message;
        },
        // 新增数据
        sureAdd() {
            this.post("addWebsite", this.pageForm, (response) => {
                this.dialog.add = false;
                this.common(response);
                this.getData();
            });
        },
        // 查看详情
        webInfo(id) {
            let params = {
                id: id,
            };
            this.post("webInfo", params, (response) => {
                this.dialog.info = true;
                this.infoForm = response.data[0];
            });
        },
        //编辑内容
        webEdit(id) {
            this.dialog.update = true;
            this.editForm.id = id;
            let params = {
                id: id,
            };
            this.post("webInfo", params, (response) => {
                this.dialog.update = true;
                this.editForm = response.data[0];
            });
        },
        sureEdit() {
            this.post("webEdit", this.editForm, (response) => {
                this.common(response);
                this.dialog.update = false;
                this.getData();
            });
        },
        webDel(id) {
            console.log(id);
            let params = {
                id: id,
            };
            this.post("webDel", params, (response) => {
                this.common(response);
                this.getData();
            });
        },
        pagination(e) {
            this.page_num = e.page;
            this.getData();
        },
    },
};
</script>
