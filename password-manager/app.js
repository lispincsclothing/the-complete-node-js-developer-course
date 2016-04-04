'use strict';

console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

// storage.setItemSync('name', 'Andrew');
var accounts = storage.getItemSync('accounts');
// var accounts = [];
accounts.push({username:'cookie', balance:0})
console.log('Saved accounts  are: ' + accounts);
storage.setItemSync('accounts', accounts );

console.log('Saved accounts  are: ' + accounts);
