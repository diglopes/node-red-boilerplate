module.exports = {
    "rules": {
        "align-to-grid": true,
        "max-flow-size": true,
        "no-duplicate-http-in-urls": true,
        "no-loops": true,
        "no-overlapping-nodes": true,
        "no-unconnected-http-nodes": true,
        "no-unnamed-functions": true,
        "no-unnamed-links": true,
        "function-eslint": {
            "config": {
                "env": {
                    "es2021": true
                },
                "extends": "eslint:recommended",
                "parserOptions": {
                    "ecmaVersion": 12
                },
                "rules": {}
            }
        }
    }
}
