import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect:'/index',
        children:[
          //首页详情
          {
              path:'/informData',
              name:"informData",
              component:()=>import('../views/inform/informData.vue')
          },
          {
            path:'/formType',
            name:'formType',
            component:()=>import('../views/inform/formType.vue')
          },
          //创建表单
          {
            path:'/creatForm',
            name:"creatForm",
            component:()=>import('../views/inform/creatForm.vue')
          },
          {
            path: '/index',
            name: 'index',
            component: () => import('../views/index.vue')
          },
         //   调用百度地图
          {
            path:'/map',
            name:'map',
            component:()=>import('../views/modelTest/map.vue')
          },
          //网站的名称
          {
              path:'/websites',
              name:'websites',
              component:()=>import('../views/modelTest/websites.vue'),
              meta:{
                keepAlive:true
            }
          },
          {
            path:'/upload',
            name:'upload',
            component:()=>import('../views/modelTest/upload.vue'),
        }
        ],
    
      },
      //登录
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')
      },
      //注册
    {
        path:'/register',
        name:'register',
        component:()=>import('../views/register.vue')
      },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
