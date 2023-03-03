# json-calc

Program that calculates with numbers of given JSON objects either from command line of in the source of your project. It can summarize all fields of all objects. Currently, only addition is supported but some more calculation will follow. Shouldn't be too complicated.

## Installation
For usage on command line:
```bash
npm i -g json-calc
```

For usage in your project:
```bash
npm i json-calc
```

## Usage
Command line:
```bash
cat foo.json | json-calc
```
Source code:
```javascript
const JSONCalc = require("../src/json-calc")

// will return: { sum: { a: 8 } }
new JSONCalc().calc( [ { a: 3 }, { a: 5 } ] )
```




