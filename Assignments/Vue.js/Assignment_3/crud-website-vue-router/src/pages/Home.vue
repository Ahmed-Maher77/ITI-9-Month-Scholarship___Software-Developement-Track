<template>
  <div class="home">
    <div class="hero">
      <div class="hero__inner">
        <p class="hero__eyebrow">v3.0.0</p>
        <h1 class="hero__title">myapp</h1>
        <p class="hero__subtitle">A Vue 3 CRUD demo that actually lets you<br>create, edit, and delete posts.</p>
        <router-link to="/products" class="btn">See the posts &rarr;</router-link>
      </div>
    </div>

    <div class="divider"></div>

    <section class="section intro">
      <h2>What this is</h2>
      <p>Four routes, one API, zero page reloads. JSONPlaceholder on the back, Vue Router up front. <router-link to="/about">Read more &rarr;</router-link></p>
    </section>

    <div class="divider"></div>

    <section class="section routes">
      <h2>Pages</h2>
      <div class="routes__list">
        <div class="route-item">
          <span class="route-item__path">/</span>
          <span class="route-item__label">Home</span>
        </div>
        <div class="route-item">
          <span class="route-item__path">/products</span>
          <span class="route-item__label">All posts</span>
        </div>
        <div class="route-item">
          <span class="route-item__path">/products/:id</span>
          <span class="route-item__label">Single post</span>
        </div>
        <div class="route-item">
          <span class="route-item__path">/products/create</span>
          <span class="route-item__label">New post</span>
        </div>
        <div class="route-item">
          <span class="route-item__path">/products/:id/edit</span>
          <span class="route-item__label">Edit post</span>
        </div>
        <div class="route-item">
          <span class="route-item__path">/about</span>
          <span class="route-item__label">About</span>
        </div>
        <div class="route-item">
          <span class="route-item__path">/contact</span>
          <span class="route-item__label">Contact</span>
        </div>
        <div class="route-item route-item--404">
          <span class="route-item__path">/*</span>
          <span class="route-item__label">404 (nested)</span>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="section stack">
      <h2>Stack</h2>
      <div class="stack__grid">
        <div class="stack-item">
          <div class="stack-item__dot" style="background:#42b883"></div>
          <div>
            <strong>Vue 3</strong>
            <span>Composition-ready, options-style here</span>
          </div>
        </div>
        <div class="stack-item">
          <div class="stack-item__dot" style="background:#3498db"></div>
          <div>
            <strong>Vue Router</strong>
            <span>Nested routes, history mode</span>
          </div>
        </div>
        <div class="stack-item">
          <div class="stack-item__dot" style="background:#e74c3c"></div>
          <div>
            <strong>Axios</strong>
            <span>GET, POST, PUT, DELETE</span>
          </div>
        </div>
        <div class="stack-item">
          <div class="stack-item__dot" style="background:#f39c12"></div>
          <div>
            <strong>SCSS</strong>
            <span>BEM, nested, variables</span>
          </div>
        </div>
        <div class="stack-item">
          <div class="stack-item__dot" style="background:#9b59b6"></div>
          <div>
            <strong>Vuex</strong>
            <span>State management, actions, getters</span>
          </div>
        </div>
        <div class="stack-item">
          <div class="stack-item__dot" style="background:#1abc9c"></div>
          <div>
            <strong>Composition API</strong>
            <span>script setup, ref, reactive, computed</span>
          </div>
        </div>
      </div>
    </section>

    <div class="divider"></div>

    <footer class="home-footer">
      <router-link to="/products" class="btn btn--big">Browse products &rarr;</router-link>
      <p class="home-footer__note">Built for a session &middot; Vue 3 &middot; 2026</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="scss" scoped>
.home {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 0 3rem;
}

.hero {
  padding: 4rem 0 3rem;

  &__inner {
    text-align: center;
  }

  &__eyebrow {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #999;
    margin: 0 0 0.75rem;
  }

  &__title {
    font-size: 4rem;
    font-weight: 200;
    letter-spacing: -1px;
    color: #2c3e50;
    margin: 0 0 1rem;
    line-height: 1;
  }

  &__subtitle {
    font-size: 1rem;
    color: #777;
    line-height: 1.6;
    margin: 0 0 2rem;
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
  text-decoration: none;
  transition: all 0.15s;

  &:hover {
    background: #2c3e50;
    color: #fff;
  }

  &--big {
    padding: 0.75rem 2rem;
    font-size: 1rem;
  }
}

.divider {
  height: 1px;
  background: #e0e0e0;
  margin: 0;
}

.section {
  padding: 2.5rem 0;

  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

.intro {
  p {
    color: #555;
    line-height: 1.7;
    margin: 0;
    font-size: 1rem;
  }

  a {
    color: #2c3e50;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}

.routes__list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.route-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;

  &__path {
    color: #42b883;
    min-width: 180px;
  }

  &__label {
    color: #888;
  }

  &--404 {
    background: #fef3f2;
    border-radius: 4px;

    .route-item__path {
      color: #e74c3c;
    }
  }
}

.stack__grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stack-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  strong {
    display: block;
    font-size: 0.9rem;
    color: #2c3e50;
  }

  span {
    font-size: 0.85rem;
    color: #999;
  }
}

.home-footer {
  text-align: center;
  padding: 3rem 0;

  &__note {
    font-size: 0.8rem;
    color: #aaa;
    margin: 1.5rem 0 0;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 2.5rem 0;

    &__title {
      font-size: 2.5rem;
    }
  }

  .route-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;

    &__path {
      min-width: auto;
    }
  }
}
</style>
