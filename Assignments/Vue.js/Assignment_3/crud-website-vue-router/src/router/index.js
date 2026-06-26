import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../pages/MainLayout.vue'
import Home from '../pages/Home.vue'
import Products from '../pages/Products.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import EditProduct from '../pages/EditProduct.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'products',
        name: 'Products',
        component: Products,
      },
      {
        path: 'products/create',
        name: 'CreateProduct',
        component: EditProduct,
      },
      {
        path: 'products/:id',
        name: 'ProductDetails',
        component: ProductDetails,
      },
      {
        path: 'products/:id/edit',
        name: 'EditProduct',
        component: EditProduct,
      },
      {
        path: 'about',
        name: 'About',
        component: About,
      },
      {
        path: 'contact',
        name: 'Contact',
        component: Contact,
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
