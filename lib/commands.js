const startDefault = args => { return args.count * -1; }

module.exports = {
    // General
    getBlockchainParams: [{"display-names": true}, {"with-upgrades": true}],
    getRuntimeParams: [],
    setRuntimeParam: ["param", "value"],
    getInfo: [],
    help: [],
    stop: [],
    
    // Managing wallet addresses
    addMultiSigAddress: ["nrequired", "keys"],
    getAddresses: [{"verbose": false}],
    getNewAddress: [],
    importAddress: ["address(es)", {"label": ""}, {"rescan": true}],
    listAddresses: [{"addresses": "*"}, {"verbose": false}, {"count": "MAX"}, {"start": null}],
    
    // Working with non-wallet addresses
    createKeyPairs: [{"count": 1}],
    createMultiSig: ["nrequired", "keys"],
    validateAddress: ["address|privkey|pubkey"],
    
    // Permissions management
    grant: ["addresses", "permissions", {"native-amount":0}, {"start-block": null}, {"end-block": null}, {"comment": null}, {"comment-to": null}],
    grantFrom: ["from-address", "to-address", "permissions", {"native-amount":null}, {"start-block": null}, {"end-block": null}, {"comment": null}, {"comment-to": null}],
    grantWithData: ["addresses", "permissions", "metadata", {"native-amount":null}, {"start-block": null}, {"end-block": null}],
    grantWithDatafrom:["from-address", "to-address", "permissions", "metadata", {"native-amount":null}, {"start-block": null}, {"end-block": null}],
    listPermissions: [{"permissions": "*"}, {"addresses": "*"}, {"verbose": false}],
    revoke: ["addresses", "permissions", {"native-amount":0}, {"comment": null}, {"comment-to": null}],
    revokeFrom: ["from-address", "to-address", "permissions", {"native-amount":0}, {"comment": null}, {"comment-to": null}],
    verifyPermission: ["address", "permission"],
    
    // Asset management
    getAssetInfo: ["asset", {"verbose": false}],
    issue: ["address", "name|params", "qty", {"units": 1}, {"native-amount":0}, {"custom-fields": {}}],
    issueFrom: ["from-address", "to-address", "asset|params", "qty", {"units": 1}, {"native-amount": 0}, {"custom-fields": {}}],
    issueMore: ["address", "asset", "qty", {"native-amount":0}, {"custom-fields": {}}],
    issueMoreFrom: ["from", "to", "asset", "qty", {"native-amount":0}, {"custom-fields": {}}],
    listAssets: [{"assets": "*"}, {"verbose": false}, {"count": 10}, {"start": startDefault}],
    
    // Querying wallet balances and transactions
    getAddressBalances: ["address", {"minconf": 1}, {"includeLocked": false}],
    getAddressTransaction: ["address", "txid", {"verbose": false}],
    getMultiBalances: [{"addresses": "*"}, {"assets": "*"}, {"minconf":1}, {"includeWatchOnly": false}, {"includeLocked": false}],
    getTotalBalances: [{"minconf": 1}, {"includeWatchOnly": false}, {"includeLocked": false}],
    getWalletTransaction: ["txid", {"includeWatchOnly": false}, {"verbose": false}],
    listAddressTransactions: ["address", {"count": 10}, {"skip": 0}, {"verbose": false}],
    listWalletTransactions: [{"count": 10}, {"skip": 0}, {"includeWatchOnly": false}, {"verbose": false}],
    
    // Sending one-way payments
    send: ["address", "amount", {"comment": ""}, {"comment-to": ""}],
    sendAsset: ["address", "asset", "qty", {"native-amount": 0}, {"comment": null}, {"comment-to": null}],
    sendAssetFrom: ["from-address", "to-address", "asset", "qty", {"native-amount":0}, {"comment": null}, {"comment-to": null}],
    sendFrom: ["from-address", "to-address", "amount", {"comment": null}, {"comment-to": null}],
    sendwithData: ["address", "amount", "metadata"], 
    sendwithDataFrom: ["from-address", "to-address", "amount", "metadata"],
    
    // Atomic exchange transactions
    appendRawExchange: ["tx-hex", "txid", "vout", "asset"],
    completeRawExchange: ["tx-hex", "txid", "vout", "asset", {"metadata": null}],
    createRawExchange: ["txid", "vout", "asset"],
    decodeRawExchange: ["tx-hex", {"verbose": false}],
    disableRawTransaction: ["tx-hex"],
    prepareLockUnspent: ["asset", {"lock": true}],
    prepareLockUnspentFrom: ["from-address", "asset", {"lock": true}],
    
    // Stream management

    // create is also part of Smart Filter & upgrade functionality
    // use the first parameters of each field for Streams
    // use the second parameters of each field for Streamfilters
    // use the third parameters of each field for Txfilter
    // use the fourth parameters of each field for Upgrade
    create: ["stream|streamfilter|txfilter|upgrade", "name", "open|restrictions|restrictions|false", {"custom-fields|js-code|js-code|params": {}}],
    
    // createFrom is also used on Filters & Upgrade,
    // use the second parameters for that
    createFrom: ["from-address", "type=stream|type=filter/upgrade", "name", "open/params|open=false", {"custom-fields|protocol-version": {}}],
    getStreamInfo: ["stream", {"verbose": false}],
    listStreams: [{"stream": "*"}, {"verbose": false}, {"count": 10}, {"start": -10}],
    
    // Publishing stream items
    publish: ["stream", "key", "data", {"options": null}],
    publishFrom: ["from-address", "stream", "key(s)", "data", {"options": null}],
    
    // Managing stream and asset subscriptions
    subscribe: ["stream(s)|asset(s)", {"rescan": true}],
    unsubscribe: ["stream(s)|asset(s)"],
    
    // Querying subscribed assets
    getAssetTransaction: ["asset", "txid", {"verbose": false}],
    listAssetTransactions: ["asset", {"verbose": false}, {"count": 10}, {"start": startDefault}, {"local-ordering": false}],
    
    // Querying subscribed streams
    getStreamItem: ["stream", "txid", {verbose: false}],
    getStreamKeySummary: ["stream", "key", "mode"],
    getStreamPublisherSummary: ["stream", "address", "mode"],
    getTxOutData: ["txid", "vout", {"count-bytes": 1000}, {"start-byte": 0}],
    listStreamBlockItems: ["stream", "blocks", {"verbose": false}, {"count": "MAX"}, {"start": null}],
    listStreamKeyItems: ["stream", "key", {"verbose": false}, {"count": 10}, {"start": startDefault}, {"local-ordering": false}],
    listStreamKeys: ["stream", {"key": "*"}, {"verbose": false}, {"count": 10}, {"start": startDefault}, {"local-ordering": false}],
    listStreamItems: ["stream", {"verbose": false}, {"count": 10}, {"start": startDefault}, {"local-ordering": false}],
    listStreamPublisherItems: ["stream", "address", {"verbose": false}, {"count": 10}, {"start": startDefault}, {"local-ordering": false}],
    listStreamPublishers: ["stream", {"address": "*"}, {"verbose": false}, {"count": 10}, {"start": startDefault}, {"local-ordering": false}],
    listStreamQueryItems: ["stream", "query", {"verbose": false}],
    listStreamTxiTEMS: ["stream", "txid", {"verbose": false}],
    
    // Managing wallet unspent outputs
    combineUnspent: [{"addresses": "*"}, {"minconf": 1}, {"maxcombines": 100}, {"mininputs": 2}, {"maxinputs": 100}, {"maxtime": 15}],
    listLockUnspent: [],
    listUnspent: [{"minconf": 1}, {"maxconf": 999999}, {"receivers": []}],
    lockUnspent: ["unlock", {"outputs": []}],
    
    // Working with raw transactions
    appendRawChange: ["tx-hex", "address", {"native-fee": undefined}],
    appendRawData: ["tx-hex", "metada|object"],
    appendRawTransaction: ["tx-hex", "inputs", {"amounts": []}, {"data": []}, {"action": ""}],
    createRawTransaction: ["inputs", "amounts", {"data": []}, {"action": ""}],
    createRawSendFrom: ["from-address", "amounts", {"data": []}, {"action": ""}],
    decodeRawTransaction: ["tx-hex"],
    sendRawTransaction: ["tx-hex"],
    signRawTransaction: ["tx-hex", {"parents": []}, {"privatekeys": []}, {"sighashtype": "ALL"}],
    
    // Peer-to-peer connections
    addNode: ["ip", "command"],
    getAddedNodeinfo: ["verbose", {"ip(:port)": null}],
    getNetworkInfo: [],
    getPeerInfo: [],
    ping: [],
    
    // Messaging signing and verification
    signMessage: ["address|privkey", "message"],
    verifyMessage: ["address", "signature", "message"],
    
    // Querying the blockchain
    getBlock: ["hash|height", {"verbose": 1}],
    getBlockchainInfo: [],
    getBlockHash: ["height"],
    getLastBlockInfo: [{"skip": 0}],
    getMempoolInfo: [],
    getRawMempool: [],
    getRawTransaction: ["txid", {"verbose": 0}],
    getTxOut: ["txid", "vout", {"unconfirmed": false}],
    listBlocks: ["blocks", {"verbose": false}],

    // Binary cache
    createbinarycache: [],
    appendbinarycache: ["identifier", "data-hex"],
    deletebinarycache: ["identifier"],
    txouttobinarycache: ["identifier", "txid", "vout", {"count-bytes": 1000}, {"start-byte": 0}],
    
    // Advanced wallet control
    backupWallet: ["filename"],
    dumpPrivKey: ["address"],
    dumpWallet: ["filename"],
    encryptWallet: ["passphrase"],
    getWalletInfo: [],
    importPrivKey: ["privkey(s)", {"label": ""}, {"rescan": true}],
    importWallet: ["filename", {"rescan": 0}],
    walletLock: [],
    walletPassphrase: ["passphrase", "timeout"],
    walletPassphraseChange: ["old-passphrase", "new-passphrase"],

    // Smart filters and upgrades
    approveFrom: ["from-address", "entity", "approve"],
    /*  Read lines 77-81 for create and 85-86 for createFrom
        create: ["type=streamfilter", "name", "restrictions", "js-code"],
        create: ["type=txfilter", "name", "restrictions", "js-code"],
        create: ["type=upgrade", "name", "open=false", "js-code"],
        createfrom: ["from-address", "type", "name", "open=false", "protocol-version"]
    */
   getFilterCode: ["filter"],
   listStreamFilters: [{"filters": "*"}, {"verbose": false}],
   listTxFilters: [{"filters": "*"}, {"verbose": false}],
   listUpgrades: [{"upgrades": "*"}],
   runStreamFilter: ["filter", {"tx-hex|txid": null}, {"vout": null}],
   runTxFilter: ["filter",  {"tx-hex|txid": null}],
   testStreamFilter: ["restrictions", "js-code", {"tx-hex|txid": null}, {"vout": null}],
   testTxFilter: ["restrictions", "js-code", {"tx-hex|txid": null}],

   // Advanced Node Control
    clearMempool: [],
    getChunkQueueInfo: [],
    getChunkQueueTotals: [],
    pause: ["tasks"],
    resume: ["tasks"],
    setLastBlock: ["hash|height"],
}
