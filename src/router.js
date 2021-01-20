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
        path: '/organization/list',
        name: 'organizationList',
        component: () => import(/* webpackChunkName: "demo" */ './views/organization/List.vue')
      },
      {
        path: '/organization/create',
        name: 'organizationCreate',
        component: () => import(/* webpackChunkName: "demo" */ './views/organization/Add.vue')
      },
      {
        path: '/organization/edit',
        name: 'organizationEdit',
        component: () => import(/* webpackChunkName: "demo" */ './views/organization/Edit.vue')
      },
      {
        path: '/agent/list',
        name: 'agentList',
        component: () => import(/* webpackChunkName: "demo" */ './views/agent/List.vue')
      },
      {
        path: '/agent/create',
        name: 'agentCreate',
        component: () => import(/* webpackChunkName: "demo" */ './views/agent/Add.vue')
      },
      {
        path: '/department/list',
        name: 'departmentList',
        component: () => import(/* webpackChunkName: "demo" */ './views/department/List.vue')
      },
      {
        path: '/department/create',
        name: 'departmentCreate',
        component: () => import(/* webpackChunkName: "demo" */ './views/department/Add.vue')
      },
      {
        path: '/department/edit',
        name: 'departmentEdit',
        component: () => import(/* webpackChunkName: "demo" */ './views/department/Edit.vue')
      },

      {
        path: '/agent/edit',
        name: 'agentEdit',
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