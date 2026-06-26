const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('copy').tap((args) => {
      args[0].patterns = args[0].patterns.map((pattern) => {
        if (pattern.globOptions && pattern.globOptions.ignore) {
          pattern.globOptions.ignore = pattern.globOptions.ignore.filter(
            (i) => !i.endsWith('index.html')
          )
          pattern.globOptions.ignore.push('**/index.html')
        }
        return pattern
      })
      return args
    })
  },
})
