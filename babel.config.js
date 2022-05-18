module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "~/assets": "./src/assets",
            "~/components": "./src/common/components",
            "~/constants": "./src/common/constants",
            "~/hooks": "./src/common/hooks",
            "~/navigation": "./src/navigation",
            "~/screens": "./src/screens",
            "~/themes": "./src/common/themes",
            "~/types": "./src/common/types",
            "~/utils": "./src/common/utils",
          },
        },
      ],
    ],
  };
};
