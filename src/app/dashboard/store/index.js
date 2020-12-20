import mainApi from '@/apis/mainApi'
import factory from '@/store/factory'

const rolesStore = factory(mainApi, 'roles')
const { state, getters, actions, mutations } = rolesStore

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
