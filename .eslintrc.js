module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "rules": {
        "react/forbid-prop-types": 1,
        "react/jsx-filename-extension": 0,
        "react/react-in-jsx-scope": 0,
        "class-methods-use-this": 0,
        "no-unused-expressions": ["error", { "allowTaggedTemplates": true }],
        "react/no-unused-prop-types": 0,
        "consistent-return": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "import/no-extraneous-dependencies": 0,
        "react/destructuring-assignment": 0
    }
};