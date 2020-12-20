module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/-common-/assets/style/settings/_module-settings";`
      }
    }
  }
}
