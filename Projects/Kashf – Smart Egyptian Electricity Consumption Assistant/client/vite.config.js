import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import fs from 'fs'


const esToolkitRoot = path.resolve('node_modules/es-toolkit')
const esToolkitEsm = {}
const shimNames = ['get', 'omit', 'range', 'maxBy', 'sumBy', 'minBy', 'sortBy', 'throttle', 'last', 'isPlainObject', 'uniqBy']
const shimDirs = { get: 'object', omit: 'object', range: 'math', maxBy: 'math', sumBy: 'math', minBy: 'math', sortBy: 'array', throttle: 'function', last: 'array', isPlainObject: 'predicate', uniqBy: 'array' }
for (const name of shimNames) {
  esToolkitEsm['es-toolkit/compat/' + name] = path.join(esToolkitRoot, 'dist/compat', shimDirs[name], name + '.mjs')
}


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'icons.svg'],
        manifest: {
            name: 'كشف — مراقبة استهلاك الكهرباء الذكية',
            short_name: 'كشف',
            description: 'مراقبة استهلاك الكهرباء الذكية مع توصيات مخصصة لتوفير الطاقة',
            theme_color: '#0f172a',
            background_color: '#0f172a',
            display: 'standalone',
            orientation: 'portrait-primary',
            scope: '/',
            start_url: '/',
            lang: 'ar',
            dir: 'rtl',
            icons: [
                { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
                { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
                { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
            ]
        },
        workbox: {
            globPatterns: ['**/*.{js,css,html,svg,png,woff2,jpg,jpeg,ico,webp}'],
            runtimeCaching: [
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'image-cache',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 60 * 60 * 24 * 30
                        }
                    }
                },
                {
                    urlPattern: /^https?:\/\/.*\/api\/.*/i,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'api-cache',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 60 * 60 * 24
                        },
                        networkTimeoutSeconds: 5,
                        backgroundSync: {
                            name: 'api-sync-queue'
                        }
                    }
                },
                {
                    urlPattern: /^https?:\/\/.*/i,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'navigation-cache',
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 60 * 60 * 24
                        }
                    }
                }
            ],
            navigateFallback: '/index.html',
            navigateFallbackAllowlist: [/^(?!\/api\/).*/]
        },
        selfDestroying: false
    }),
    {
      name: 'es-toolkit-default-export',
      transform(code, id) {
        if (id.endsWith('.mjs') && id.includes('es-toolkit/dist/compat/')) {
          const exportMatch = code.match(/export\s+\{\s*(\w[\w$]*)\s*\};?\s*$/)
          if (exportMatch) {
            const name = exportMatch[1]
            return code + `\nexport { ${name} as default };`
          }
        }
      }
    }
  ],
  optimizeDeps: {
    rolldownOptions: {
      plugins: [
        {
          name: 'es-toolkit-default-export-rolldown',
          transform(code, id) {
            if (id.endsWith('.mjs') && (id.includes('es-toolkit/dist/compat/') || id.includes('es-toolkit\\dist\\compat\\'))) {
              const exportMatch = code.match(/export\s+\{\s*(\w[\w$]*)\s*\};?\s*$/)
              if (exportMatch) {
                const name = exportMatch[1]
                return {
                  code: code + `\nexport { ${name} as default };`,
                  map: null
                }
              }
            }
          }
        }
      ]
    }
  },
  resolve: {
    alias: esToolkitEsm
  },
  server: {
    port: 5173
  }
})
