<template>
  <div class="page">
    <div class="page__header">
      <h2 class="page__heading">Products</h2>
      <router-link to="/products/create" class="btn">+ New</router-link>
    </div>

    <div v-if="loading" class="loading">
      <p>Loading&hellip;</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button class="btn" @click="fetchPosts">Retry</button>
    </div>

    <div v-else-if="items.length === 0" class="empty">
      <p>No products yet.</p>
    </div>

    <div v-else class="grid">
      <ProductCard
        v-for="item in items"
        :key="item.id"
        :product="item"
        @delete="confirmDelete"
      />
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="cancelDelete">
      <div class="modal">
        <p>Delete this product?</p>
        <div class="modal__actions">
          <button class="btn btn--danger" @click="deleteItem">Delete</button>
          <button class="btn btn--outline" @click="cancelDelete">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ProductCard from '../components/ProductCard.vue'

const store = useStore()

const showModal = ref(false)
const selectedId = ref(null)

const items = computed(() => store.getters.allProducts)
const loading = computed(() => store.getters.isLoading)
const error = computed(() => store.getters.hasError)

onMounted(() => {
  store.dispatch('fetchProducts')
})

function confirmDelete(id) {
  selectedId.value = id
  showModal.value = true
}

function cancelDelete() {
  showModal.value = false
  selectedId.value = null
}

async function deleteItem() {
  try {
    await store.dispatch('deleteProduct', selectedId.value)
    cancelDelete()
  } catch {
    alert('Failed to delete.')
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 1.5rem 0;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  &__heading {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  border: 1px solid #e0e0e0;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 3rem 0;
  color: #888;
  font-size: 0.9rem;
}

.error p {
  color: #e74c3c;
  margin: 0 0 1rem;
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

  &--danger {
    color: #e74c3c;
    border-color: #e74c3c;

    &:hover {
      background: #e74c3c;
      color: #fff;
    }
  }

  &--outline {
    border-color: #ccc;
    color: #999;

    &:hover {
      border-color: #999;
      color: #555;
      background: transparent;
    }
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.modal {
  background: #fff;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  max-width: 340px;
  width: 90%;

  p {
    margin: 0 0 1.25rem;
    color: #2c3e50;
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .page {
    &__header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
  }
}
</style>
