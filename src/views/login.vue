<template>
    <v-app>
        <div class="login">
            <v-row justify="center" style="margin-top:21vh">
                <v-col cols="12" md="4">
                    <material-card color="success">
                        <template v-slot:heading>
                            <div class="display-2 font-weight-light" style="text-align:center">
                                欢迎登录
                            </div>

                            <div class="subtitle-1 font-weight-light" style="text-align:center">
                                Complete your profile
                            </div>
                        </template>

                        <v-form>
                            <v-container class="py-0">
                                <v-row style="padding:0px !important">
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="user_name"
                                            prepend-inner-icon="mdi-account"
                                            placeholder="请输入姓名"
                                            solo
                                        />
                                    </v-col>
                                    <v-col cols="12" style="padding-top:0px;">
                                        <v-text-field
                                            prepend-inner-icon="mdi-lock"
                                            v-model="password"
                                            placeholder="请输入密码"
                                            :type="show ? 'text' : 'password'"
                                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                            solo
                                            @click:append="show = !show"
                                        />
                                    </v-col>
                                    <v-row justify="center">
                                        <v-col cols="6" style="text-align:center;padding-top:0px;"
                                            ><a href="javascript:;" @click="forget()" class="forget" style="color:gray"
                                                >忘记密码？</a
                                            ></v-col
                                        >
                                        <v-col cols="6" style="text-align:center;padding-top:0px"
                                            >没有账号？<a href="javascript:;" @click="routerJump('/register')"
                                                >立即注册</a
                                            ></v-col
                                        >
                                    </v-row>
                                    <v-col cols="12">
                                        <v-btn color="success" block class="mr-0" @click="login">
                                            立即登录
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                    </material-card>
                </v-col>
            </v-row>
        </div>
        <!-- 弹出提示 -->
        <v-snackbar v-model="dialog.snackbar" top :timeout="1000" :color="snackbar.color">
            {{ snackbar.message }}
        </v-snackbar>
    </v-app>
</template>
<script>
import materialCard from "../components/materialCard";
import stroage from "good-storage";
export default {
    components: {
        materialCard,
    },
    data() {
        return {
            show: false,
            user_name: "",
            password: "",
            snackbar: { message: "", color: "" }, //提示信息
        };
    },
    methods: {
        login() {
            // console.log(this.password)
            let params = {
                user_name: this.user_name,
                password: this.password,
            };
            this.post("login", params, (response) => {
                if (response.code == 200) {
                    stroage.set("node_token", response.token);
                    this.routerJump("/index");
                    this.toast(response);
                }
            });
        },
        forget() {
            this.dialog.snackbar = true;
            this.snackbar.message = '功能未完善';
            this.snackbar.color = "error";
        },
    },
};
</script>
<style lang="stylus" scoped>
.login{
    background: url("~@/assets/images/bg.jpg") no-repeat ;
    background-size: 100% 100%;
    height :100vh;

}
a{
    text-decoration :none
}
.forget:hover{
    color:#0069D9 !important
}
</style>
