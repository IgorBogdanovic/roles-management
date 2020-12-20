import { createRouter, createWebHistory } from 'vue-router'

import dashboardRoutes from '../app/dashboard/router'
import manageRoleRoutes from '../app/manage-role/router'

const routes = [
  ...dashboardRoutes,
  ...manageRoleRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
