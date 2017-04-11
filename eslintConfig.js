module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "standard",
    "standard-react"
  ],
  "env": {
    "browser": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "semi": [2, "never"],
    "comma-dangle": [2, "always-multiline"],
    "space-infix-ops": 0,
    "max-len": [1, 120, 2],
    "react/jsx-no-bind": [1, {
      "allowArrowFunctions": true
    }]
  }
}