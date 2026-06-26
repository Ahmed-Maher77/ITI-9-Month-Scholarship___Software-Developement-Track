<template>
  <div class="page">
    <h2 class="page__heading">Contact</h2>
    <p>Send a message and we will get back to you.</p>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form__group">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" placeholder="Your name" />
      </div>
      <div class="form__group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" placeholder="Your email" />
      </div>
      <div class="form__group">
        <label for="message">Message</label>
        <textarea id="message" v-model="form.message" rows="5" placeholder="Your message"></textarea>
      </div>
      <button type="submit" class="btn">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      alert('Sent.')
      this.form = { name: '', email: '', message: '' }
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding: 2rem 0;

  &__heading {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  > p {
    color: #777;
    margin: 0 0 2rem;
  }
}

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
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }
  }
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
  transition: all 0.15s;

  &:hover {
    background: #2c3e50;
    color: #fff;
  }
}
</style>
