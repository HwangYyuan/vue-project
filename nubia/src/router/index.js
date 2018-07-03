import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import registor from '@/components/page/registor'
import login from '@/components/page/login'
import shoppingCar from '@/components/page/shoppingCar'
import bulletWindow from '@/components/bulletWindow'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
        path:'/registor',
        name:'Registor',
        component: registor
    },{
        path:'/login',
        name:'Login',
        component: login
    },{
        path:'/shoppingCar',
        name:'ShoppingCar',
        component: shoppingCar
    },
    {
        path:'/bulletWindow',
        name:'BulletWindow',
        component: bulletWindow
    }
  ]
})
