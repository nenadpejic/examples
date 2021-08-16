# Jest

Testing package jest.

## Instructions

1. Initialize npm

```bash
$ npm init -y
```

2. Install jest as a devDependencie

```bash
$ npm i -D jest
```

3. Write tests

- Create `*.test.js` files
- Use `test()`
- NOTE: jest requires module.exports to run via scripts

4. Run tests

- With scripts

```bash
# package.json
"scripts": {
  "test": "jest",
},

$ npm run test
```

```bash
# flags
--watchAll
--coverage
```
