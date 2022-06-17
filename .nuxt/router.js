import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _51fc58e4 = () => interopDefault(import('../pages/edit/index.vue' /* webpackChunkName: "pages/edit/index" */))
const _600c2dba = () => interopDefault(import('../pages/etape-1.vue' /* webpackChunkName: "pages/etape-1" */))
const _601a453b = () => interopDefault(import('../pages/etape-2.vue' /* webpackChunkName: "pages/etape-2" */))
const _60285cbc = () => interopDefault(import('../pages/etape-3.vue' /* webpackChunkName: "pages/etape-3" */))
const _6036743d = () => interopDefault(import('../pages/etape-4.vue' /* webpackChunkName: "pages/etape-4" */))
const _d69cf282 = () => interopDefault(import('../pages/edit/confirmRegister.vue' /* webpackChunkName: "pages/edit/confirmRegister" */))
const _19ae0809 = () => interopDefault(import('../pages/edit/interviews/index.vue' /* webpackChunkName: "pages/edit/interviews/index" */))
const _bead12b6 = () => interopDefault(import('../pages/edit/login.vue' /* webpackChunkName: "pages/edit/login" */))
const _26f6e417 = () => interopDefault(import('../pages/edit/register.vue' /* webpackChunkName: "pages/edit/register" */))
const _60bbe7c6 = () => interopDefault(import('../pages/edit/resetPassword.vue' /* webpackChunkName: "pages/edit/resetPassword" */))
const _70a92a4c = () => interopDefault(import('../pages/edit/settings/index.vue' /* webpackChunkName: "pages/edit/settings/index" */))
const _0a47d147 = () => interopDefault(import('../pages/edit/users/index.vue' /* webpackChunkName: "pages/edit/users/index" */))
const _47d727dd = () => interopDefault(import('../pages/edit/interviews/form.vue' /* webpackChunkName: "pages/edit/interviews/form" */))
const _68603edf = () => interopDefault(import('../pages/edit/users/form.vue' /* webpackChunkName: "pages/edit/users/form" */))
const _52799c3e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/edit",
    component: _51fc58e4,
    name: "edit"
  }, {
    path: "/etape-1",
    component: _600c2dba,
    name: "etape-1"
  }, {
    path: "/etape-2",
    component: _601a453b,
    name: "etape-2"
  }, {
    path: "/etape-3",
    component: _60285cbc,
    name: "etape-3"
  }, {
    path: "/etape-4",
    component: _6036743d,
    name: "etape-4"
  }, {
    path: "/edit/confirmRegister",
    component: _d69cf282,
    name: "edit-confirmRegister"
  }, {
    path: "/edit/interviews",
    component: _19ae0809,
    name: "edit-interviews"
  }, {
    path: "/edit/login",
    component: _bead12b6,
    name: "edit-login"
  }, {
    path: "/edit/register",
    component: _26f6e417,
    name: "edit-register"
  }, {
    path: "/edit/resetPassword",
    component: _60bbe7c6,
    name: "edit-resetPassword"
  }, {
    path: "/edit/settings",
    component: _70a92a4c,
    name: "edit-settings"
  }, {
    path: "/edit/users",
    component: _0a47d147,
    name: "edit-users"
  }, {
    path: "/edit/interviews/form",
    component: _47d727dd,
    name: "edit-interviews-form"
  }, {
    path: "/edit/users/form",
    component: _68603edf,
    name: "edit-users-form"
  }, {
    path: "/",
    component: _52799c3e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
