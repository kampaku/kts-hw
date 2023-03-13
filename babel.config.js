const presets = [
  "@babel/preset-env",
  [
      "@babel/preset-react",
      {
          runtime: "automatic",
      },
  ],
  "@babel/preset-typescript",
];

const plugins = ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-optional-chaining"];
module.exports = { presets, plugins };
