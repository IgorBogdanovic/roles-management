export default class MainApi {
  constructor (axios) {
    this._axios = axios
  }

  get ({ path, query }) {
    return this._axios.get(path, { params: query })
  }

  post ({ path, data, options }) {
    return this._axios.post(path, data, options)
  }

  put ({ path, id, data, options }) {
    return this._axios.put(`${path}/${id}`, data, options)
  }

  delete ({ path, id, query }) {
    return this._axios.delete(`${path}/${id}`, { params: query })
  }
}
