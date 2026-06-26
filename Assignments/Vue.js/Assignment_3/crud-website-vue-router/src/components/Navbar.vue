<template>
  <nav class="navbar">
    <div class="navbar__logo">
      <router-link to="/">myapp</router-link>
    </div>
    <button class="navbar__toggle" @click="menuOpen = !menuOpen">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="navbar__links" :class="{ 'navbar__links--open': menuOpen }">
      <li>
        <router-link to="/" exact-active-class="active">Home</router-link>
      </li>
      <li>
        <router-link to="/products" active-class="active">Products</router-link>
      </li>
      <li>
        <router-link to="/about" active-class="active">About</router-link>
      </li>
      <li>
        <router-link to="/contact" active-class="active">Contact</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      menuOpen: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  max-width: 680px;
  margin: 0 auto;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;

  &__logo a {
    font-size: 1.25rem;
    font-weight: 200;
    color: #2c3e50;
    text-decoration: none;
    letter-spacing: 1px;
  }

  &__toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;

    span {
      display: block;
      width: 22px;
      height: 2px;
      background: #2c3e50;
      transition: 0.3s;
    }
  }

  &__links {
    display: flex;
    list-style: none;
    gap: 1.25rem;
    margin: 0;
    padding: 0;

    li a {
      color: #999;
      text-decoration: none;
      font-size: 0.9rem;
      padding: 0.25rem 0;
      transition: color 0.2s;

      &:hover {
        color: #2c3e50;
      }

      &.active {
        color: #2c3e50;
        text-decoration: underline;
        text-underline-offset: 4px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;

    &__toggle {
      display: flex;
    }

    &__links {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      background: #fff;
      padding: 0.75rem 1rem;
      gap: 0.25rem;
      border-bottom: 1px solid #e0e0e0;

      &--open {
        display: flex;
      }

      li a {
        display: block;
        padding: 0.5rem 0;
      }
    }
  }
}
</style>
