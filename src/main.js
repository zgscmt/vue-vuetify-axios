import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Router from 'vue-router'

//本地存储
import storage from "good-storage";

// vue 设置国际化
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'zh',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        'zh': require('./assets/js/navMenu'),   // 中文语言包
        'en': require('./assets/js/navMenuEn')    // 英文语言包
    }
})
//监听Stroage中值的变化 type=1=>localStroage type=2=>sessionStorage
Vue.prototype.$addStorageEvent = function (type, key, data) {
    if (type === 1) {
		// 创建一个StorageEvent事件
		var newStorageEvent = document.createEvent('StorageEvent');
		const storage = {
		    setItem: function (k, val) {
		        localStorage.setItem(k, val);
		        // 初始化创建的事件
		        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
		        // 派发对象
		        window.dispatchEvent(newStorageEvent);
		    }
		}
		return storage.setItem(key, data);
	} else {
		// 创建一个StorageEvent事件
		var newStorageEvent = document.createEvent('StorageEvent');
		const storage = {
		    setItem: function (k, val) {
		        sessionStorage.setItem(k, val);
		        // 初始化创建的事件
		        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
		        // 派发对象
		        window.dispatchEvent(newStorageEvent);
		    }
		}
		return storage.setItem(key, data);
	}
}

//网络请求
import axios from 'axios'
Vue.prototype.$axios = axios;
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//公共css
import "@/assets/stylus/import.styl";



//引用百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
    /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
    //不要做违法行为哦，谢谢
    ak: '9477AHRXGHj14MV6Rm8cEn8MQn5oM7Vg'
  })

//引入eaharts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

//全局mixin
import { globalMixin } from './assets/js/mixin.js';
Vue.mixin(globalMixin);

//设置路由重复点击
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//设置请求的接口
if ('development' === process.env.NODE_ENV) {
    axios.defaults.baseURL = "http://127.0.0.1:3000/";
  
  } else {
    if ('test' === externalConfig.env) {
      axios.defaults.baseURL = externalConfig.domain.test;
      // Vue.prototype.$https = externalConfig.domain.https;//没有api/auth的接口
    } else {
      axios.defaults.baseURL = externalConfig.domain.production;
      // Vue.prototype.$https = externalConfig.domain.https;//没有api/auth的接口
    }
  }

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        config.headers.Authorization =`Bearer ` + storage.get('node_token');    
        return config;
    },
    error => {
        return Promise.reject(error);
    });

Vue.config.productionTip = false    

new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App)
}).$mount('#app')
