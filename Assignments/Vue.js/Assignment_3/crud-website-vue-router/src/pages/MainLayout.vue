<template>
  <div class="app-layout">
    <Navbar v-if="$route.name !== 'NotFound'" />
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer" v-if="$route.name !== 'NotFound'">
      <p>&copy; 2026 MyApp &middot; Vue 3</p>
    </footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'MainLayout',
  components: { Navbar },
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  background: #fff;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
}

.footer {
  text-align: center;
  padding: 1.5rem;
  font-size: 0.8rem;
  color: #bbb;

  p {
    margin: 0;
  }
}
</style>
