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
        name: 'organization-list',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/organization/List.vue'),
        meta: {
          middleware: [
            auth
          ]
        },
      },
      {
        path: '/organization/create',
        name: 'organization-create',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/organization/Add.vue')
      },
      {
        path: '/organization/edit',
        name: 'organization-edit',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/organization/Edit.vue')
      },
      {
        path: '/group/list',
        name: 'group-list',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/group/List.vue')
      },
      {
        path: '/group/create',
        name: 'group-create',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/group/Add.vue')
      },
      {
        path: '/group/edit',
        name: 'group-edit',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/group/Edit.vue')
      },
      {
        path: '/topic/list',
        name: 'topic-list',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/topic/List.vue')
      },
      {
        path: '/topic/create',
        name: 'topic-create',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/topic/Add.vue')
      },
      {
        path: '/topic/edit',
        name: 'topic-edit',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/topic/Edit.vue')
      },
      {
        path: '/question/list',
        name: 'question-list',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/question/List.vue'),
      },
      {
        path: '/answer/list',
        name: 'answer-list',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/answer/List.vue')
      },
      {
        path: '/answer/create',
        name: 'answer-create',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/answer/Add.vue')
      },
      {
        path: '/agent/list',
        name: 'agent-list',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/agent/List.vue')
      },
      {
        path: '/agent/create',
        name: 'agent-create',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/agent/Add.vue')
      },
      {
        path: '/department/list',
        name: 'department-list',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/department/List.vue')
      },
      {
        path: '/department/create',
        name: 'department-create',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/department/Add.vue')
      },
      {
        path: '/department/edit',
        name: 'department-edit',
        meta: {
          middleware: [
            auth
          ]
        },
        component: () => import(/* webpackChunkName: "demo" */ '@/views/department/Edit.vue')
      },
      {
        path: '/conversation',
        name: 'chat-conversation',
        component: () => import(/* webpackChunkName: "demo" */ '@/views/Conversation.vue'),
        meta: {
          middleware: [
            auth
          ]
        },
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