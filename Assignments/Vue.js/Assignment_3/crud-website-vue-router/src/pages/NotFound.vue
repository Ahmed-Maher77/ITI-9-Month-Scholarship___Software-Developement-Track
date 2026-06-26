<template>
  <div class="page page--center">
    <h1 class="code">404</h1>
    <h2 class="page__heading">Not found</h2>
    <p>This page does not exist.</p>
    <router-link to="/" class="btn">Go home &rarr;</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style lang="scss" scoped>
.page {
  padding: 4rem 0;
  text-align: center;

  &__heading {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.code {
  font-size: 4rem;
  font-weight: 200;
  color: #bbb;
  margin: 0 0 1rem;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
}

p {
  color: #777;
  margin: 0 0 2rem;
}

.btn {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  border: 1px solid #2c3e50;
  border-radius: 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.15s;

  &:hover {
    background: #2c3e50;
    color: #fff;
  }
}
</style>
