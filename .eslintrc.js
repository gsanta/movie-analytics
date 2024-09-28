module.exports = {
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:prettier/recommended",
  ],
  rules: {
    "max-len": [
      "error",
      { code: 100, ignoreUrls: true, ignoreComments: false },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "no-unused-vars": [
      "error",
      {
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        ignoreRestSiblings: true,
      },
    ],
  },
};
