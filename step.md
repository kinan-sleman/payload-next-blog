### payload is more need to prettier because it is not formatting the code properly

### I make sure that tabWidth is 4 in .prettierrc.json:

```json
{
    "tabWidth": 4
}
```

### for this reasone i have added prettier in my project and new script in package.json file:

```json
{
    "scripts": {
        "format": "prettier --write ."
    }
}
```

### now i need to run the prettier command to format the code

### the command is :

```bash
npm run format
```

### I need to make sure that I ignored important files, for this reasons I write .prettierignore for payload cms projects