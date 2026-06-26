<template>
  <div class="page">
    <router-link to="/products" class="back">&larr; Back</router-link>

    <div v-if="loading" class="loading">
      <p>Loading&hellip;</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button class="btn" @click="loadProduct">Retry</button>
    </div>

    <div v-else-if="product" class="detail">
      <h1 class="detail__title">{{ product.title }}</h1>
      <p class="detail__body">{{ product.body }}</p>
      <p class="detail__meta">ID: {{ product.id }}</p>
      <div class="detail__actions">
        <router-link :to="`/products/${product.id}/edit`" class="btn">Edit</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const product = computed(() => store.getters.currentProduct)
const loading = computed(() => store.getters.isLoading)
const error = computed(() => store.getters.hasError)

function loadProduct() {
  store.dispatch('fetchProductById', route.params.id)
}

onMounted(loadProduct)

watch(() => route.params.id, loadProduct)
</script>

<style lang="scss" scoped>
.page {
  padding: 1.5rem 0;
}

.back {
  display: inline-block;
  color: #999;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: color 0.2s;

  &:hover {
    color: #2c3e50;
  }
}

.loading,
.error {
  text-align: center;
  padding: 3rem 0;
  color: #888;
  font-size: 0.9rem;
}

.error p {
  color: #e74c3c;
  margin: 0 0 1rem;
}

.detail {
  border: 1px solid #e0e0e0;
  padding: 1.5rem;

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 1rem;
  }

  &__body {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #555;
    margin: 0 0 1rem;
  }

  &__meta {
    color: #bbb;
    font-size: 0.8rem;
    margin: 0 0 1.25rem;
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
  }
}

.btn {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border: 1px solid #2c3e50;
  border-radius: 0;
  font-size: 0.85rem;
  font-weight: 500;
  color: #2c3e50;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s;

  &:hover {
    background: #2c3e50;
    color: #fff;
  }
}
</style>
