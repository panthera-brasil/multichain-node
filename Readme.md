A native Javascript client built for Multichain
---------------------------------------------------

Note: The current version is compatible with Multichain 2.0.x. Previous versions of Multichain may be incompatible.

All methods from the [Multichain API spec](http://www.multichain.com/developers/json-rpc-api/) are available. This library does not currently contain all bitcoind commands that are not part of the Multichain API spec, and as such is not really suitable for use with bitcoind. If you would like to add these commands, please submit a pull request with tests.

See [commands.js](https://github.com/sdec-brasil/multinodejs/blob/development/lib/commands.js) for all methods and their required / optional parameters. 

### Parser

The library includes a parser so you can pass an unordered object containing the parameters and omit any optional parameters you want, as seen in the examples below. 

You may also pass an ordered array of commands like you would for any JSON RPC client that will not be parsed.

### Promises

All commands can be supplied a callback. If a callback is not supplied, a native Promise will be returned.

### SSL

SSL is supported. Pass your connection parameters as you would to the [core HTTPS library](https://nodejs.org/api/https.html#https_https_globalagent).

### Usage

To use in your project:

```
npm install multinodejs --save
```

To run the tests:

Make sure you have multichain installed, so that `multichaind` and `multichain-util` are on your path.

```
git clone <the repo>
npm install
npm test
```

### Examples:

Many more examples in `test.js`, but here's some basics:
       
```javascript 
let multichain = require("multichain-node")({
    port: 6282,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "somepass"
});

multichain.getInfo((err, info) => {
    if(err){
        throw err;
    }
    console.log(info);
})

multichain.issue({address: someAddress, asset: "zcoin", qty: 50000, units: 0.01, details: {hello: "world"}}, (err, res) => {
    console.log(res)
})

```
### Tests

**Important**: A few commands are tested right now, but the majority aren't. We hope to deploy a test suite that has 100% coverage within a few weeks. Feel free to open any issues as they might appear.
