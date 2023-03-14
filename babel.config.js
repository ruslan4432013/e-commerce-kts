module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
    "mobx",
  ];

  const plugins = [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-optional-chaining",
    process.env.NODE_ENV === "development" && "react-refresh/babel",
  ].filter(Boolean);

  return {
    presets,
    plugins,
  };
};
