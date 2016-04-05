var argv = require('yargs').argv;
var command = argv._[0];

console.log(argv);

if (command === 'hello' && typeof argv.name !== 'undefined') {
  var lastname = argv.lastname ? ' ' + argv.lastname : '';
  console.log('Hello ' + argv.name + lastname + '!');
} else if (command === 'hello') {
  console.log('Hello world!')
}
