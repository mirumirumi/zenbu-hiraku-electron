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
        extraResources: ["*/*.vbs"],
        win: {
          target: [{
            target: "nsis",
            arch: ["x64", "ia32"],
          }, {
            target: "portable",
            arch: ["x64", "ia32"],
          }],
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          artifactName: "zenbu-hiraku_setup.${ext}",
          publish: {
            provider: "github",
            releaseType: "release",
          },
        },
        portable: {
          "artifactName": "zenbu-hiraku_${arch}.${ext}",
          publish: {
            provider: "github",
            releaseType: "release",
          },
        },
      }
    }
  },
}
