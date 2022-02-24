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
      preload: "src/preload.ts",
      builderOptions: {
        productName: "ぜんぶひらく",
        appId: "com.mirumi.zenbu-hiraku",
        icon: "build/icon.png",
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          artifactName: "${productName}_Setup.${ext}"
        },
        win: {
          target: [{
            target: "nsis",
            arch: ["x64", "ia32"],
          }],
        }
      }
    }
  },
}
