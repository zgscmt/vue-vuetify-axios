<template>
    <v-app>
        <div class="register">
            <v-row cols="6" justify="center" style="margin-top:15vh">
                <v-col cols="12" md="4">
                    <material-card color="#7066D7">
                        <template v-slot:heading class="bgColor">
                            <div class="display-2 font-weight-light" style="text-align:center">
                                欢迎注册
                            </div>

                            <div class="subtitle-1 font-weight-light" style="text-align:center">
                                Welcome to register
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
                                    <v-col cols="12" style="padding-top:0px;">
                                        <v-text-field
                                            prepend-inner-icon="mdi-lock"
                                            v-model="password_new"
                                            placeholder="请确认密码"
                                            :type="show ? 'text' : 'password'"
                                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                            solo
                                            @click:append="show = !show"
                                        />
                                    </v-col>

                                    <v-col cols="12" style="padding-top:0px">
                                        <v-btn color="#7066D7" block class="mr-0" @click="register">
                                            立即注册
                                        </v-btn>
                                    </v-col>
                                    <v-row justify="center">
                                        <v-col cols="12" style="text-align:center;padding-top:0px"
                                            >已有账号？<a @click="routerJump('/login')" href="javascript:;">立即登录</a></v-col
                                        >
                                    </v-row>
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
            password_new: "",
            snackbar: { message: "", color: "" }, //提示信息
        };
    },
    methods: {
        register() {
            // console.log(this.password)

            if (this.password !== this.password_new) {
                this.dialog.snackbar = true;
                this.snackbar.message = "密码不一致";
                this.snackbar.color = "error";
            } else {
                let params = {
                    user_name: this.user_name,
                    password: this.password,
                };
                this.post("register", params, (response) => {
                    if (response.code == 200) {
                        this.routerJump("/login");
                        this.toast(response);
                    }
                });
            }
        },
    },
};
</script>
<style lang="stylus" scoped>
.register{
    background: url("~@/assets/images/bg.jpg") no-repeat ;
    background-size: 100% 100%;
    height :100vh;

}
// .v-application .success {
//     background-color :#7066D7 !important;
// }
a{
    text-decoration :none
}
.forget:hover{
    color:#0069D9 !important
}
</style>
