export default () => ({
  setAll: (state, data) => {
    state.all = data
  },

  add: (state, item) => {
    state.all.push(item)
  },

  edit: (state, item) => {
    const index = state.all.findIndex((i) => i.id === item.id)
    state.all[index] = item
  },

  remove: (state, id) => {
    const index =  state.all.findIndex((i) => i.id === id)
    state.all.splice(index, 1)
  }
})
