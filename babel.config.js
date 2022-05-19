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
            "~/apollo": "./src/apollo",
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
      [
        "module:react-native-dotenv",
        {
          moduleName: "~/env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
