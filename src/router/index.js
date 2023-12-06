import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/views/layout/Layout'

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/bind',
    component: () => import('@/views/login/bind'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index/index'),
        name: 'Dashboard',
        meta: { title: '主页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/tool',
    component: Layout,
    redirect: 'index',
    hidden: true,
    children: [
      {
        path: 'info/:id',
        component: () => import('@/views/info/toolInfo'),
        name: '工具详情',
        meta: { title: '工具详情', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/require',
    component: Layout,
    redirect: 'index',
    hidden: true,
    children: [
      {
        path: 'info/:id',
        component: () => import('@/views/info/requireInfo'),
        name: '需求详情',
        meta: { title: '需求详情', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'index',
    hidden: true,
    children: [
      {
        path: 'info/:id',
        component: () => import('@/views/info/orderInfo'),
        name: '工单详情',
        meta: { title: '工单详情', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/car',
    component: Layout,
    redirect: 'index',
    hidden: true,
    children: [
      {
        path: 'info/:id',
        component: () => import('@/views/info/carInfo'),
        name: '车辆详情',
        meta: { title: '车辆详情', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/warehourse1',
    component: Layout,
    redirect: 'index',
    hidden: true,
    children: [
      {
        path: 'toolInfo/:id',
        component: () => import('@/views/info/wareToolInfo'),
        name: '库房内工具详情',
        meta: { title: '库房内工具详情', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/warehourse2',
    component: Layout,
    redirect: 'index',
    hidden: true,
    children: [
      {
        path: 'carInfo/:id',
        component: () => import('@/views/info/wareCarInfo'),
        name: '库房内车辆详情',
        meta: { title: '库房内车辆详情', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/warehourse',
    component: Layout,
    redirect: 'index',
    hidden: true,
    children: [
      {
        path: 'info/:id',
        component: () => import('@/views/info/warehourseInfo'),
        name: '库房详情',
        meta: { title: '库房详情', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: () => import('@/views/user/index'),
        name: '个人中心',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
