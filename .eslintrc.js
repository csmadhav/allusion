module.exports = {
    root: true,
    parser: "babel-eslint",
    extends: [
      "eslint:recommended",
    ],
    rules:  {
        semi: ["error", "always"],
        quotes: ["error", "double"]
    },
    env: {
      "browser": true,
      "node": true
    },
    overrides: [
      {
        files: ["*.ts"],
        env: {"browser": true},
        parser: "@typescript-eslint/parser",
        plugins: [
          "@typescript-eslint",
        ],
        extends: [
          "eslint:recommended",
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
        ]
      }
    ]
  };