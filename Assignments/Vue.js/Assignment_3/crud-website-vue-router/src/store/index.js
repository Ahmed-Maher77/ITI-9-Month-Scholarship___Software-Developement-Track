import { createStore } from 'vuex'
import api from '../services/api'

export default createStore({
  state: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  getters: {
    allProducts(state) {
      return state.products
    },
    currentProduct(state) {
      return state.selectedProduct
    },
    isLoading(state) {
      return state.loading
    },
    hasError(state) {
      return state.error
    },
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_SELECTED_PRODUCT(state, product) {
      state.selectedProduct = product
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    ADD_PRODUCT(state, product) {
      state.products.unshift(product)
    },
    UPDATE_PRODUCT(state, updated) {
      const idx = state.products.findIndex((p) => p.id === updated.id)
      if (idx !== -1) {
        state.products[idx] = updated
      }
    },
    REMOVE_PRODUCT(state, id) {
      state.products = state.products.filter((p) => p.id !== id)
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await api.getPosts()
        commit('SET_PRODUCTS', response.data)
      } catch {
        commit('SET_ERROR', 'Failed to load.')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchProductById({ commit }, id) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      commit('SET_SELECTED_PRODUCT', null)
      try {
        const response = await api.getPost(id)
        commit('SET_SELECTED_PRODUCT', response.data)
      } catch {
        commit('SET_ERROR', 'Failed to load.')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async createProduct({ commit }, data) {
      try {
        const response = await api.createPost(data)
        commit('ADD_PRODUCT', response.data)
      } catch {
        throw new Error('Failed to create.')
      }
    },
    async updateProduct({ commit }, { id, data }) {
      try {
        const response = await api.updatePost(id, data)
        commit('UPDATE_PRODUCT', response.data)
      } catch {
        throw new Error('Failed to update.')
      }
    },
    async deleteProduct({ commit }, id) {
      try {
        await api.deletePost(id)
        commit('REMOVE_PRODUCT', id)
      } catch {
        throw new Error('Failed to delete.')
      }
    },
  },
})
