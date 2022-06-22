import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _951851ac = () => interopDefault(import('../pages/end.vue' /* webpackChunkName: "pages/end" */))
const _600c2dba = () => interopDefault(import('../pages/etape-1.vue' /* webpackChunkName: "pages/etape-1" */))
const _601a453b = () => interopDefault(import('../pages/etape-2.vue' /* webpackChunkName: "pages/etape-2" */))
const _60285cbc = () => interopDefault(import('../pages/etape-3.vue' /* webpackChunkName: "pages/etape-3" */))
const _6036743d = () => interopDefault(import('../pages/etape-4.vue' /* webpackChunkName: "pages/etape-4" */))
const _bf2a5610 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
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
    path: "/end",
    component: _951851ac,
    name: "end"
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
    path: "/login",
    component: _bf2a5610,
    name: "login"
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
