'use strict';
var crypto = require('crypto-js');
var argv = require('yargs')
  .command('create', 'Creates user', function(yargs) {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Account name (e.g. Twitter, Facebook)',
        type: 'string'
      },
      username: {
        demand: true,
        alias: 'u',
        description: 'Account username or email',
        type: 'string'
      },
      password: {
        demand: true,
        alias: 'p',
        description: 'Your password goes here',
        type: 'string'
      },
      masterPassword: {
        demand: true,
        alias: 'm',
        description: 'Master Password',
        type: 'string'
      }
    }).help('help');
  })
  .command('get', 'Gets user', function(yargs) {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Account name (e.g. Twitter, Facebook)'
      },
      masterPassword: {
        demand: true,
        alias: 'm',
        description: 'Master Password',
        type: 'string'
      }
    }).help('help');
  })
  .help('help')
  .argv;

var command = argv._[0];

console.log(argv);

console.log('starting password manager');

var storage = require('node-persist');
storage.initSync();

function getAccounts(masterPassword) {
  // use getitemsync to get accounts
  var encryptedAccounts = storage.getItemSync('accounts');
  var accounts = [];

  // decrypt
  if (typeof encryptedAccounts !== 'undefined') {
    var bytes = crypto.AES.decrypt(encryptedAccounts, masterPassword);
    accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
  }

  //return accounts array
  return accounts;
}

function saveAccounts(accounts, masterPassword) {
  // encrypt accounts
  var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);

  // setItemSync
  storage.setItemSync('accounts', encryptedAccounts.toString());

  // return accounts array
  return accounts;
}

function createAccount(account, masterPassword) {
  var accounts = getAccounts(masterPassword);

  accounts.push(account);

  saveAccounts(accounts, masterPassword);

  return account;
}

function getAccount(accountName, masterPassword) {
  var accounts = getAccounts(masterPassword);
  var matchedAccount;

  accounts.forEach(function(account) {
    if (account.name === accountName) {
      matchedAccount = account;
    }
  });
  return matchedAccount;
}

switch (command) {
  case 'create':
    try {
      var createdAccount = createAccount({
        name: argv.name,
        username: argv.username,
        password: argv.password
      }, argv.masterPassword);
      console.log('Account created');
      console.log(createdAccount);
    } catch (e) {
      console.log('Account not created, error: ' + e);
    }
    break;
  case 'get':
    try {
      var fetchedAccount = getAccount(argv.name, argv.masterPassword);
      if (typeof fetchedAccount === 'undefined') {
        console.log('Account not found');
      } else {
        console.log('Account found');
        console.log(fetchedAccount);
      }
    } catch (e) {
      console.log('Unable to fetch account, error: ' + e);
    }
    break;
  default:
}
