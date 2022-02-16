import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    redirect: { name: 'ZenbuHiraku' },
  },
  {
    path: '/zenbu_hiraku',
    name: 'ZenbuHiraku',
    component: () => import("../views/ZenbuHirakuView.vue"),
  },
  {
    path: '/preferences',
    name: 'Preferences',
    component: () => import("../views/PreferencesView.vue"),
  },
  {
    path: '/version_information',
    name: 'VersionInformation',
    component: () => import("../views/VersionInformationView.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
