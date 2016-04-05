'use strict';

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
      }
    }).help('help');
  })
  .command('get', 'Gets user', function(yargs) {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Account name (e.g. Twitter, Facebook)'
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

// create
// --name
// --username
// --password
// get
// --name

function createAccount(account) {
  var accounts = storage.getItemSync('accounts');

  if (typeof accounts === 'undefined') {
    accounts = [];
  }
  accounts.push(account);
  storage.setItemSync('accounts', accounts);
  return account;
}

function getAccount(accountName) {
  var accounts = storage.getItemSync('accounts');
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
    var createdAccount = createAccount({
      name: argv.name,
      username: argv.username,
      password: argv.password
    });
    console.log('Account created');
    console.log(createdAccount);
    break;
  case 'get':
    var fetchedAccount = getAccount(argv.name);
    if (typeof fetchedAccount === 'undefined') {
      console.log('Account not found');
    } else {
      console.log('Account found');
      console.log(fetchedAccount);
    }
    break;
  default:
}
