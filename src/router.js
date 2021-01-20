import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
// import AgentList from './views/agent/List.vue'
Vue.use(Router)

const routes =[
  {
    path: '/',
    redirect: 'login',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
      },
      // {
      //   path: '/agent',
      //   redirect: '/list',
      //   name: 'Agent List',
      //   component: () => import(/* webpackChunkName: "demo" */ './views/agent/List.vue'),
      //   children: [
      //     {
      //       path: '/list',
      //       name: 'AgentList',
      //       // route level code-splitting
      //       // this generates a separate chunk (about.[hash].js) for this route
      //       // which is lazy-loaded when the route is visited.
      //       component: () => import(/* webpackChunkName: "demo" */ './views/agent/List.vue'),
      //     },
      //   ]
      // },
   
      {
        path: '/agent/list',
        name: 'AgentList',
        component: () => import(/* webpackChunkName: "demo" */ './views/agent/List.vue')
      },
      {
        path: '/agent/create',
        name: 'AgentCreate',
        component: () => import(/* webpackChunkName: "demo" */ './views/agent/Add.vue')
      },
      {
        path: '/agent/edit',
        name: 'AgentEdit',
        component: () => import(/* webpackChunkName: "demo" */ './views/agent/Edit.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
      }
    ]
  }
];


const router = new Router({
  linkExactActiveClass: 'active',
  routes
});



export default router;