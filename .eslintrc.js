module.exports = {
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', "plugin:prettier/recommended"],
  rules: {
    "max-len": ["error", { "code": 100, "ignoreUrls": true, "ignoreComments": false }],
    "require-default-props": false
  }
};
