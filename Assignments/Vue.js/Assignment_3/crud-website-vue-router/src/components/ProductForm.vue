<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form__group">
      <label for="title">Title <span class="required">*</span></label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        :class="{ 'has-error': errors.title }"
        placeholder="Enter title"
      />
      <span v-if="errors.title" class="form__error">{{ errors.title }}</span>
    </div>
    <div class="form__group">
      <label for="body">Content <span class="required">*</span></label>
      <textarea
        id="body"
        v-model="form.body"
        :class="{ 'has-error': errors.body }"
        placeholder="Enter content"
        rows="5"
      ></textarea>
      <span v-if="errors.body" class="form__error">{{ errors.body }}</span>
    </div>
    <div class="form__actions">
      <button type="submit" class="btn" :disabled="loading">
        {{ loading ? 'Saving...' : submitLabel }}
      </button>
      <router-link to="/products" class="btn btn--outline">Cancel</router-link>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit'])

const form = reactive({
  title: props.product?.title || '',
  body: props.product?.body || '',
})

const errors = reactive({})

const submitLabel = computed(() => {
  return props.product ? 'Update' : 'Create'
})

function validate() {
  errors.title = ''
  errors.body = ''
  if (!form.title.trim()) {
    errors.title = 'Title is required.'
  }
  if (!form.body.trim()) {
    errors.body = 'Content is required.'
  }
  return !errors.title && !errors.body
}

function handleSubmit() {
  if (validate()) {
    emit('submit', { ...form })
  }
}
</script>

<style lang="scss" scoped>
.form {
  max-width: 480px;

  &__group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 0.4rem;
      color: #2c3e50;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.6rem 0;
      border: none;
      border-bottom: 1px solid #ddd;
      font-size: 0.95rem;
      font-family: inherit;
      background: transparent;
      transition: border-color 0.2s;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-bottom-color: #2c3e50;
      }

      &.has-error {
        border-bottom-color: #e74c3c;
      }
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }
  }

  &__error {
    display: block;
    color: #e74c3c;
    font-size: 0.8rem;
    margin-top: 0.3rem;
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 2rem;
  }
}

.required {
  color: #e74c3c;
}

.btn {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  border: 1px solid #2c3e50;
  border-radius: 0;
  font-size: 0.9rem;
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

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;

    &:hover {
      background: transparent;
      color: #2c3e50;
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
</style>
