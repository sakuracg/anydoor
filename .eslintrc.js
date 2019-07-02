module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "script"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console": ["error", {
            "allow": ["warn", "error", "info"]
        }]
    }
};