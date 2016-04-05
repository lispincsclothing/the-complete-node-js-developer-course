'use strict';

console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

// storage.setItemSync('name', 'Andrew');
// var accounts = storage.getItemSync('accounts');
var accounts = [{username:'cookie', balance:0}];
var accounts = [ { username: 'Andrew', balance: 0 },
  { username: 'Jen', balance: 75 } ];
console.log('Saved accounts  are: ' + accounts);
// accounts.push({username:'cookie', balance:0})
// storage.setItemSync('accounts', accounts );

console.log(accounts);
