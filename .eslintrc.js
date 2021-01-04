module.exports = {
    extends: ['airbnb-typescript'],
   parserOptions: {
     project: './tsconfig.json',
  },
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ],
    "@typescript-eslint/no-unused-vars": "warn",   
  }
};