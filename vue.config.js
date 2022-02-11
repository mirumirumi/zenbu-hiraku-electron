module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/css.scss";`,
      },
    },
  },
  publicPath: process.env.NODE_ENV === "prd"
    ? "/"
    : "/",
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "ぜんぶひらく",
        appId: "com.mirumi.zenbu-hiraku",
        win: {
          icon: "build/icon.png",
          target: [{
            target: "portable",
            arch: ["x64"]
          }],
        }
      }
    }
  },
}
