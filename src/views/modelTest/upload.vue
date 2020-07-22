<template>
    <div class="upload">
        <material-card
            icon="mdi-clipboard-text"
            title="idCard Table"
            class="px-5 py-3"
            color="success"
            style="margin-top:30px !important"
        >
            <!-- 加载遮罩层 -->
            <v-overlay :value="overlay" color="#fff" :absolute="true" opacity="0.9">
                <v-progress-circular indeterminate color="blue" size="32"></v-progress-circular>
            </v-overlay>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center" v-for="(nav, ol) in headers" :key="ol">{{ nav.text }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in tableList" :key="index">
                            <td class="text-center">
                                <v-img :src="item.img_head" class="imgs" style="height:100px;width:150px"></v-img>
                            </td>
                            <td class="text-center">
                                <v-img
                                    v-if="tableList.length != 0"
                                    :src="item.img_back"
                                    class="imgs"
                                    style="height:100px;width:150px"
                                ></v-img>
                            </td>
                            <td class="text-center">
                                <v-btn
                                    v-if="item.user_id != undefined"
                                    depressed
                                    small
                                    @click="updateImg(item.user_id)"
                                    color="success"
                                    style="margin-left:2px;margin-right:2px"
                                    >{{$t(`${mainHead}.verified`)}}</v-btn
                                >
                                <v-btn
                                    depressed
                                    small
                                    @click="dialog.upload = true"
                                    color="warning"
                                    v-else
                                    style="margin-left:2px;margin-right:2px"
                                    >{{$t(`${mainHead}.unverified`)}}</v-btn
                                >
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </material-card>
        <!-- 弹出提示 -->
        <v-snackbar v-model="dialog.snackbar" top :timeout="1000" :color="snackbar.color">
            {{ snackbar.message }}
        </v-snackbar>

        <!-- 图片操作 -->
        <v-row justify="center">
            <!-- 上传 -->
            <v-dialog v-model="dialog.upload" max-width="400px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{$t(`${mainHead}.upload`)}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col class="text-center" cols="12">
                                    <span class="text-card">{{$t(`${mainHead}.id_card_font`)}}</span>
                                    <div class="addImages">
                                        <input
                                            type="file"
                                            class="file"
                                            id="fileInput"
                                            @change="getFileHead($event)"
                                            accept="image/png, image/jpeg, image/gif, image/jpg"
                                        />
                                        <div class="text-detail" v-if="'' === this.imgHead">
                                            <span>+</span>
                                            <p>{{$t(`${mainHead}.click`)}}</p>
                                        </div>
                                        <div class="imgs" v-if="'' !== this.imgHead">
                                            <img :src="imgHead" width="160px" height="125px" />
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" class="text-center">
                                    <span class="text-card">{{$t(`${mainHead}.id_card_reverse`)}}</span>
                                    <div class="addImages">
                                        <input
                                            type="file"
                                            class="file"
                                            id="fileInput"
                                            @change="getFileBack($event)"
                                            accept="image/png, image/jpeg, image/gif, image/jpg"
                                        />
                                        <div class="text-detail" v-if="'' === this.imgBack">
                                            <span>+</span>
                                            <p>{{$t(`${mainHead}.click`)}}</p>
                                        </div>
                                        <div class="imgs" v-if="'' !== this.imgBack">
                                            <img :src="imgBack" width="160px" height="125px" />
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" small @click="dialog.upload = false">{{$t(`${mainHead}.btn_cancel`)}}</v-btn>
                        <v-btn color="primary" small @click="sureUpload">{{$t(`${mainHead}.btn_confirm`)}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- 重新上传 -->
            <v-dialog v-model="dialog.update" max-width="400px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{$t(`${mainHead}.update`)}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col class="text-center" cols="12">
                                    <span class="text-card">{{$t(`${mainHead}.id_card_font`)}}</span>
                                    <div class="addImages">
                                        <input
                                            type="file"
                                            class="file"
                                            id="fileInput"
                                            @change="getFileHead($event)"
                                            accept="image/png, image/jpeg, image/gif, image/jpg"
                                        />
                                        <div class="text-detail" v-if="'' === this.imgHead">
                                            <span>+</span>
                                            <p>{{$t(`${mainHead}.click`)}}</p>
                                        </div>
                                        <div class="imgs" v-if="'' !== this.imgHead">
                                            <img :src="imgHead" width="160px" height="125px" />
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" class="text-center">
                                    <span class="text-card">{{$t(`${mainHead}.id_card_reverse`)}}</span>
                                    <div class="addImages">
                                        <input
                                            type="file"
                                            class="file"
                                            id="fileInput"
                                            @change="getFileBack($event)"
                                            accept="image/png, image/jpeg, image/gif, image/jpg"
                                        />
                                        <div class="text-detail" v-if="'' === this.imgBack">
                                            <span>+</span>
                                            <p>{{$t(`${mainHead}.click`)}}</p>
                                        </div>
                                        <div class="imgs" v-if="'' !== this.imgBack">
                                            <img :src="imgBack" width="160px" height="125px" />
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" small @click="dialog.update = false">{{$t(`${mainHead}.btn_cancel`)}}</v-btn>
                        <v-btn color="primary" small @click="sureUpate()">{{$t(`${mainHead}.btn_confirm`)}}</v-btn>
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
            mainHead: "navMenu[1].children[2].prompt",
            imgHead: "",
            imgBack: "",
            file: "",
            overlay: false,
            headers: [],
            tableList: [],
            dialog: {
                upload: false,
                update: false,
            },
            update_id: "",
            snackbar: { message: "", color: "" }, //提示信息
        };
    },
    mounted() {
        var that = this;
        window.addEventListener("setItem", function(e) {
            if (e.key === "local") {
                that.headers = that.$t("navMenu[1].children[2].headers");
            }
        });
        var local = window.localStorage.getItem("local");
        that.$i18n.locale = local;
        that.headers = that.$t("navMenu[1].children[2].headers");

        this.getData();
    },
    methods: {
        getData() {
            this.overlay = true;
            let false_data = [
                {
                    img_head: require("../../assets/images/no.jpg"),
                    img_back: require("../../assets/images/no.jpg"),
                },
            ];
            this.post("getImg", {}, (response) => {
                this.overlay = false;
                if (response.data.length != 0) {
                    this.tableList = response.data;
                } else {
                    this.tableList = false_data;
                }
            });
        },
        //选择图片
        getFileHead(event) {
            this.file = event.target.files[0];

            //创建 formData 对象
            let formData = new FormData();
            // 向 formData 对象中添加文件
            formData.append("file", this.file);
            this.post("upload", formData, (response) => {
                this.imgHead = response.url;
            });
        },
        getFileBack(event) {
            this.file = event.target.files[0];
            //创建 formData 对象
            let formData = new FormData();
            // 向 formData 对象中添加文件
            formData.append("file", this.file);
            this.post("upload", formData, (response) => {
                this.imgBack = response.url;
            });
        },

        //上传
        sureUpload() {
            let params = {
                img_head: this.imgHead,
                img_back: this.imgBack,
            };
            this.post("insert", params, (response) => {
                this.dialog.upload = false;
                this.getData();
            });
        },
        //重新认证
        updateImg(id) {
            console.log(id);
            this.update_id = id;
            this.dialog.update = true;
            this.post("getImg", {}, (response) => {
                this.imgHead = response.data[0].img_head;
                this.imgBack = response.data[0].img_back;
            });
        },
        sureUpate(){
            let params={
                user_id:this.update_id,
                img_head:this.imgHead,
                img_back:this.imgBack
            }
            this.post('updateImgs',params,response=>{
                this.dialog.update=false;
                this.getData();
                this.toast(response)
                
            })
        }
    },
};
</script>
<style lang="stylus" scoped>

.addImages{
    display: inline-block;
    width: 160px;
    height: 125px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px dashed darkgray;
    background: #f8f8f8;
    position: relative;
    overflow: hidden;
}
.text-detail{
    margin-top: 40px;
    text-align: center;
}
.text-detail>span{
    font-size: 40px;
}
.file{
    position: absolute;
    top: 0;
    left: 0;
    width: 140px;
    height: 125px;
    opacity: 0;
}
.imgs{
    display :block;
    margin :0 auto;
    margin-top:5px
}
.text-card{
    display: grid;
    justify-self: center;
    align-self: center;
    text-align :center
}
.text-all{
    text-align :center
}
</style>
