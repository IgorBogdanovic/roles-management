import createState from './createState'
import createGetters from './createGetters'
import createActions from './createActions'
import createMutations from './createMutations'

export default (api, routePath) => {
  const state = createState()
  const getters = createGetters()
  const actions = createActions(api, routePath)
  const mutations = createMutations()

  return {
    state,
    getters,
    actions,
    mutations
  }
}
