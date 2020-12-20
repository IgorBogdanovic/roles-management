export default (api, routePath) => ({
  load: async (ctx) => {
    const { data } = await api.get({ path: routePath })
    ctx.commit('setAll', data)
  },

  create: async (ctx, { payload }) => {
    const { data } = await api.post({ path: routePath, data: payload })
    ctx.commit('add', data)
  },

  update: async (ctx, { id, payload }) => {
    const { data } = await api.put({ path: routePath, id, data: payload })
    ctx.commit('edit', data)
  },

  delete: async (ctx, { id }) => {
    await api.delete({ path: routePath, id })
    ctx.commit('remove', id)
  }
})
