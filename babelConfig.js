module.exports = {
  babelrc: false,
  plugins: [
    "transform-class-properties",
    "transform-export-extensions"
  ],
  presets: [
    "es2015",
    "es2016",
    "es2017",
    "react",
    "stage-1"
  ],
  "env": {
    "production": {
      "plugins": [
        "transform-react-remove-prop-types"
      ],
      "presets": []
    },
    "development": {
      "presets": [],
      "plugins": [
        "react-hot-loader/babel"
      ]
    },
    "test": {
      "presets": [],
      "plugins": []
    }
  }
}
