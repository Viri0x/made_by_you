import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c883a44a = () => interopDefault(import('../pages/end.vue' /* webpackChunkName: "pages/end" */))
const _520c782a = () => interopDefault(import('../pages/etape-1.vue' /* webpackChunkName: "pages/etape-1" */))
const _51f04928 = () => interopDefault(import('../pages/etape-2.vue' /* webpackChunkName: "pages/etape-2" */))
const _51d41a26 = () => interopDefault(import('../pages/etape-3.vue' /* webpackChunkName: "pages/etape-3" */))
const _51b7eb24 = () => interopDefault(import('../pages/etape-4.vue' /* webpackChunkName: "pages/etape-4" */))
const _1d7a4369 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _53d2a052 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _c883a44a,
    name: "end"
  }, {
    path: "/etape-1",
    component: _520c782a,
    name: "etape-1"
  }, {
    path: "/etape-2",
    component: _51f04928,
    name: "etape-2"
  }, {
    path: "/etape-3",
    component: _51d41a26,
    name: "etape-3"
  }, {
    path: "/etape-4",
    component: _51b7eb24,
    name: "etape-4"
  }, {
    path: "/login",
    component: _1d7a4369,
    name: "login"
  }, {
    path: "/",
    component: _53d2a052,
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
