import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
// import store from '../store'

import guest from './middleware/guest'
import auth from './middleware/auth'
// import isSubscribed from './middleware/isSubscribed'



// import AgentList from '@/views/agent/List.vue'
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '@/views/Dashboard.vue'),
        meta: {
          middleware: [
            auth,
          ]
        },
      },
      {
        path: '/organization/list',
        name: 'organizationList',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/organization/List.vue'),
        meta: {
          middleware: [
            auth
          ]
        },
      },
      {
        path: '/organization/create',
        name: 'organizationCreate',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/organization/Add.vue')
      },
      {
        path: '/organization/edit',
        name: 'organizationEdit',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/organization/Edit.vue')
      },
      {
        path: '/topic/list',
        name: 'organizationList',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/topic/List.vue')
      },
      {
        path: '/topic/create',
        name: 'topicCreate',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/topic/Add.vue')
      },
      {
        path: '/topic/edit',
        name: 'topicEdit',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/topic/Edit.vue')
      },
      {
        path: '/question/list',
        name: 'questionList',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/question/List.vue'),
      },
      {
        path: '/answer/list',
        name: 'answerList',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/answer/List.vue')
      },
      {
        path: '/answer/create',
        name: 'answerCreate',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/answer/Add.vue')
      },
      {
        path: '/agent/list',
        name: 'agentList',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/agent/List.vue')
      },
      {
        path: '/agent/create',
        name: 'agentCreate',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/agent/Add.vue')
      },
      {
        path: '/department/list',
        name: 'departmentList',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/department/List.vue')
      },
      {
        path: '/department/create',
        name: 'departmentCreate',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/department/Add.vue')
      },
      {
        path: '/department/edit',
        name: 'departmentEdit',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/department/Edit.vue')
      },

      {
        path: '/agent/edit',
        name: 'agentEdit',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/agent/Edit.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/UserProfile.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/Maps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/Tables.vue')
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
        component: () => import(/* webpackChunkName: "demo" */ '@/views/Login.vue'),
        meta: {
          middleware: [
            guest
          ]
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/Register.vue')
      }
    ]
  }
];


const router = new Router({
  linkExactActiveClass: 'active',
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
  }


  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })

})

function middlewarePipeline(context, middleware, index) {
  const nextMiddleware = middleware[index]

  if (!nextMiddleware) {
    return context.next
  }

  return () => {
    const nextPipeline = middlewarePipeline(
      context, middleware, index + 1
    )

    nextMiddleware({ ...context, next: nextPipeline })

  }
}

export default router;