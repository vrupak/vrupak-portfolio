const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Vercel dev server
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions = options.compilerOptions || {}
        options.compilerOptions.isCustomElement = tag => tag.startsWith('ion-')
        return options
      })
  }
})
