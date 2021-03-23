module.exports = {
    "root": true,
    "ignorePatterns": [
        "projects/**/*"
    ],
    "overrides": [{
            "files": [
                "*.ts"
            ],
            "parserOptions": {
                "project": [
                    "tsconfig.json",
                    "e2e/tsconfig.json"
                ],
                "tsconfigRootDir": __dirname,
                "createDefaultProgram": true
            },
            "extends": [
                "plugin:@angular-eslint/ng-cli-compat",
                "plugin:@angular-eslint/ng-cli-compat--formatting-add-on",
                "plugin:@angular-eslint/template/process-inline-templates"
            ],
            rules: {
                'import/no-unresolved': 'off',
                'import/prefer-default-export': 'off',
                'class-methods-use-this': 'off',
                'lines-between-class-members': 'off',
                '@typescript-eslint/unbound-method': [
                    'error',
                    {
                        ignoreStatic: true,
                    },
                ],
            },
        },
        {
            "files": [
                "*.html"
            ],
            "extends": [
                "plugin:@angular-eslint/template/recommended"
            ],
            "rules": {}
        },
        {
            files: ['*.component.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            plugins: ['@angular-eslint/template'],
            processor: '@angular-eslint/template/extract-inline-html',
        }
    ]
}