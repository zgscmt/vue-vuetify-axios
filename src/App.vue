<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import stroage from "good-storage";
export default {
    data() {
        return {};
    },
    mounted() {
        this.checkAuth();
    },
    methods: {
        checkAuth() {
            if (!stroage.has("node_token")) {
                this.routerJump("/login");
            }
        },
    },
};
</script>

<style lang="stylus">
#app
   height 100%
</style>
