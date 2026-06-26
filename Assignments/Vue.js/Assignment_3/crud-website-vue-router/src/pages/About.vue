<template>
  <div class="page">
    <h2 class="page__heading">About</h2>
    <p>This app demonstrates Vue 3 with Vue Router, Axios CRUD, reusable mixins, and responsive design — all in 680 px of centered content.</p>
    <p>Data comes from <a href="https://jsonplaceholder.typicode.com" target="_blank">JSONPlaceholder</a>. No backend required.</p>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style lang="scss" scoped>
.page {
  padding: 2rem 0;

  &__heading {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    color: #555;
    line-height: 1.7;
    margin: 0 0 1rem;
  }

  a {
    color: #2c3e50;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
</style>
