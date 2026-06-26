<template>
  <div class="card">
    <div class="card__body">
      <h3 class="card__title">{{ product.title }}</h3>
      <p class="card__text">{{ truncatedBody }}</p>
    </div>
    <div class="card__actions">
      <router-link :to="`/products/${product.id}`" class="btn">View</router-link>
      <router-link :to="`/products/${product.id}/edit`" class="btn">Edit</router-link>
      <button class="btn btn--danger" @click="$emit('delete', product.id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  emits: ['delete'],
  computed: {
    truncatedBody() {
      if (!this.product.body) return ''
      return this.product.body.length > 120
        ? this.product.body.substring(0, 120) + '...'
        : this.product.body
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;

  &__body {
    padding: 1.25rem;
    flex: 1;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 0.5rem;
    line-height: 1.4;
  }

  &__text {
    font-size: 0.85rem;
    color: #777;
    line-height: 1.6;
    margin: 0;
  }

  &__actions {
    display: flex;
    border-top: 1px solid #e0e0e0;

    .btn {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 0;
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      color: #2c3e50;
      background: transparent;
      transition: background 0.15s;

      &:hover {
        background: #f5f5f5;
      }

      + .btn {
        border-left: 1px solid #e0e0e0;
      }

      &--danger {
        color: #e74c3c;

        &:hover {
          background: #fef3f2;
        }
      }
    }
  }
}
</style>
