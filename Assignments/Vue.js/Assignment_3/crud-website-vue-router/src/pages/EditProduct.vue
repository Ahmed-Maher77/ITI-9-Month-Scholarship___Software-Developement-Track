<template>
  <div class="page">
    <router-link to="/products" class="back">&larr; Back</router-link>
    <h2 class="page__heading">{{ isEditing ? 'Edit' : 'Create' }}</h2>

    <div v-if="loading && isEditing" class="loading">
      <p>Loading&hellip;</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <ProductForm
      v-else
      :product="product"
      :loading="saving"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import ProductForm from '../components/ProductForm.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const saving = ref(false)

const isEditing = computed(() => !!route.params.id)
const product = computed(() => store.getters.currentProduct)
const loading = computed(() => store.getters.isLoading)
const error = computed(() => store.getters.hasError)

onMounted(() => {
  if (isEditing.value) {
    store.dispatch('fetchProductById', route.params.id)
  }
})

async function handleSubmit(formData) {
  saving.value = true
  try {
    if (isEditing.value) {
      await store.dispatch('updateProduct', { id: route.params.id, data: formData })
    } else {
      await store.dispatch('createProduct', formData)
    }
    router.push('/products')
  } catch {
    alert('Failed to save.')
  } finally {
    saving.value = false
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 1.5rem 0;

  &__heading {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
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
</style>
