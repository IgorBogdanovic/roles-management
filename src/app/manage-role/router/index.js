import ManageRole from '../ManageRole'

const routes = [
  {
    path: '/create-role',
    name: 'CreateRole',
    component: ManageRole
  },

  {
    path: '/edit-role/:id',
    name: 'EditRole',
    component: ManageRole
  }
]

export default routes
