const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? 'https://ahmedbilal1999.github.io/IndividualCourseWork3/' : '/',
})
