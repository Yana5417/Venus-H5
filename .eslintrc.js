module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "globals": {
    "wx": true,
    "WeixinJSBridge": true
  },
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended", "plugin:react/recommended"
  ],
  "plugins": ["react"],
  "parserOptions": {
    "ecmaVersion": 2019,
    "ecmaFeatures": {
      "jsx": true,
      "legacyDecorators": true,
      "experimentalDecorators": true
    },
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": [1],
    "no-console": [1],
    "indent": [
      2,
      2, {
        "SwitchCase": 1,
        "MemberExpression": 1
      }
    ],
    "linebreak-style": [
      2, "unix"
    ],
    "quotes": [
      1, "single"
    ],
    "semi": [2, "always"]
  }
};
