const presets = [
  // `@babel/preset-env` detects the local .env and .browserslistrc and sets
  // its compilation targets accordingly
  ["@babel/preset-env", { targets: { esmodules: true } }],
  "@babel/preset-typescript"
];

const plugins = [
  [
    // `module-resolver` allows us to reference files from the root of the project
    "module-resolver",
    {
      extensions: [".ts", ".tsx", ".vue"],
      root: "."
    }
  ],

  // the `convert-to-json` preset converts all found yaml to json
  "convert-to-json"
];

module.exports = { presets, plugins };
