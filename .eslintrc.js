module.exports = {
    // // Specifies the ESLint parser
    // parser: '@typescript-eslint/parser',
    // extends: [
    //     // Uses the recommended rules from @eslint-plugin-react
    //     'plugin:react/recommended',
    //     // Uses the recommended rules from @typescript-eslint/eslint-plugin
    //     'plugin:@typescript-eslint/recommended',
    //     'plugin:prettier/recommended'
    // ],
    parserOptions: {
        // Allows for the parsing of modern ECMAScript features
        ecmaVersion: 2018,
        // Allows for the use of imports
        sourceType: 'module',
        ecmaFeatures: {
            // Allows for the parsing of JSX
            jsx: true
        }
    },
}