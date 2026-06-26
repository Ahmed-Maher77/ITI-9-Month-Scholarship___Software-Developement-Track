# Vue.js — Day 3 Lecture Notes

**Instructor:** Eng. Ryhab Farouq

---

## Table of Contents

1. [Reactivity in Depth](#reactivity-in-depth)
2. [Ref vs Reactive](#ref-vs-reactive)
3. [Computed Properties](#computed-properties)
4. [Watchers](#watchers)
5. [Components & Communication](#components--communication)
6. [Form Handling & Modifiers](#form-handling--modifiers)
7. [Methods](#methods)
8. [Composition API](#composition-api)
9. [Composables](#composables)
10. [Provide / Inject](#provide--inject)
11. [Custom Directives](#custom-directives)
12. [Vuex Integration](#vuex-integration)
13. [SCSS Setup](#scss-setup)

---

## Reactivity in Depth

One of Vue's most distinctive features is its unobtrusive reactivity system. Component state consists of reactive JavaScript objects; when you modify them, the view updates automatically.

Vue achieves this by wrapping component data with reactive proxies, intercepting property access and mutations to trigger re-renders.

---

## Ref vs Reactive

| Feature | `ref` | `reactive` |
|---------|-------|------------|
| **Use case** | Primitive data types (string, number, boolean) | Group of primitives (objects, arrays) |
| **Access** | `.value` | Direct property access |
| **Example** | `ref("hello")` | `reactive({ id: 1, name: "ali" })` |

```js
import { ref, reactive } from 'vue'

let trackName = ref("UI")           // primitive
let stuInf = reactive({             // object
  id: 1,
  name: "ali"
})

// Mutating
trackName.value = "SD"
stuInf.name = "omar"
```

---

## Computed Properties

Computed properties derive values reactively. They are cached and only re-evaluate when their dependencies change.

```js
import { computed, ref } from 'vue'

let fname = ref("")
let lname = ref("")

let fullName = computed(() => {
  return `The full name is ${fname.value} ${lname.value}`
})
```

---

## Watchers

Watchers allow you to perform side effects when a reactive value changes.

```js
import { watch, ref } from 'vue'

let num = ref(0)

watch(num, (newValue, oldValue) => {
  if (newValue === 10 && newValue > oldValue) {
    alert("Danger zone reached!")
  }
})
```

---

## Components & Communication

### Parent → Child (Props)

```vue
<!-- Parent passes data -->
<ChildComp :fname="fname" :lname="lname" />

<!-- Child receives via props -->
<script>
export default {
  props: ['fname', 'lname'],
  setup(props) {
    // use props.fname, props.lname
  }
}
</script>
```

### Child → Parent (Emits)

```js
// Child emits an event
function sendData() {
  context.emit('send', fullNameChild.value)
}

// Parent listens
<ChildComp @send="receiveData" />
```

---

## Form Handling & Modifiers

Vue provides the `v-model` directive for two-way data binding with form inputs.

```vue
<input type="text" v-model="fname" />
<input type="text" v-model="lname" />
```

**Common modifiers:**
- `.lazy` — sync after `change` event instead of `input`
- `.number` — cast value to number
- `.trim` — strip leading/trailing whitespace

---

## Methods

Methods are functions defined in the component that can be called from the template or programmatically.

```vue
<button @click="Increase()">Increment</button>

<script>
let num = ref(0)

const Increase = () => {
  return ++num.value
}
</script>
```

---

## Composition API

The Composition API allows you to encapsulate logic by feature instead of by option, making code more maintainable and reusable.

### Legacy (Options API)

```js
export default {
  data() { return { count: 0 } },
  methods: { inc() { this.count++ } }
}
```

### Composition API (`setup`)

```js
export default {
  setup() {
    let count = ref(0)
    const inc = () => count.value++
    return { count, inc }
  }
}
```

### Composition API (`<script setup>` — new syntax)

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const inc = () => count.value++
</script>
```

---

## Composables

A **composable** is a function that leverages the Composition API to encapsulate and reuse stateful logic across multiple components.

```js
// useCounter.js
import { ref } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  return { count, increment, decrement }
}
```

```vue
<script setup>
import { useCounter } from './useCounter'
const { count, increment } = useCounter(10)
</script>
```

---

## Provide / Inject

Avoid prop drilling by providing data at a parent level and injecting it in any descendant.

```js
// Ancestor (provider)
import { provide } from 'vue'
provide("address", "Cairo")

// Descendant (injector)
import { inject } from 'vue'
let addr = inject("address")
```

---

## Custom Directives

Custom directives allow you to reuse DOM manipulation logic. Example: `v-focus` that auto-focuses an input.

```js
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
```

**Directive lifecycle hooks:**
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeUnmount`
- `unmounted`

---

## Vuex Integration

State management with Vuex using the Composition API.

```js
// store.js
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      TODOS: [
        { title: "todo task1", completed: false },
        { title: "todo task2", completed: false }
      ],
      products: []
    }
  },
  getters: {
    countTodos(state) {
      return state.TODOS.length
    }
  },
  mutations: {
    DELETETODO(state, todoItem) {
      const index = state.TODOS.indexOf(todoItem)
      state.TODOS.splice(index, 1)
    },
    GETPRDS(state, prds) {
      state.products = prds
    }
  },
  actions: {
    deleteToDo({ commit }, todoItem) {
      commit('DELETETODO', todoItem)
    },
    getProducts({ commit }) {
      axios.get("https://dummyjson.com/products")
        .then(res => commit('GETPRDS', res.data.products))
        .catch(err => console.log(err))
    }
  }
})
```

### Using Vuex in Composition API

```js
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const todos = computed(() => store.state.TODOS)
```

### Using Vuex in Options API (with helpers)

```js
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({ todos: "TODOS" }),
    ...mapGetters({ countTodos: "countTodos" })
  },
  methods: {
    ...mapActions({ deleteToDo: "deleteToDo" })
  }
}
```

---

## SCSS Setup

Install Sass support in a Vue CLI project:

```bash
npm i -D sass-loader node-sass
```

Use SCSS in a component:

```vue
<style lang="scss" scoped>
// SCSS styles here
</style>
```

---

## Demo Project Structure

```
demo/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ChildComp.vue
│   │   ├── CompositionComp.vue
│   │   ├── CompositionNewV.vue
│   │   ├── Products/
│   │   │   └── ProductsComp.vue
│   │   └── TODOS/
│   │       └── ToDoList.vue
│   ├── assets/
│   ├── store.js
│   ├── main.js
│   └── App.vue
├── babel.config.js
├── jsconfig.json
├── vue.config.js
├── package.json
└── README.md
```

### Run the Demo

```bash
cd demo
npm install
npm run serve
```
