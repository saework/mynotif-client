module.exports = {
   extends: ['airbnb-typescript'],
   "env": {
    "browser": true
  },
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
    "@typescript-eslint/comma-dangle": 0,
    "implicit-arrow-linebreak": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "consistent-return": 0,
    "object-curly-newline": 0,
    "max-len": ["error", { "code": 200 }],
    "no-console": 0,
    "@typescript-eslint/no-unused-expressions": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  }
};