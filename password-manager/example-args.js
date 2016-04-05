var argv = require('yargs').command('hello', 'Greets the user', function(yargs) {
    yargs.options({
      name: {
        demand: true,
        alias: 'n',
        description: 'Your first name goes here'
      },
      lastname: {
        demand: true,
        alias: 'l',
        description: 'Your last name goes here'
      },
    }).help('small help');
  })
  .help('help')
  .argv;
var command = argv._[0];

console.log(argv);

if (command === 'hello' && typeof argv.name !== 'undefined') {
  var lastname = argv.lastname ? ' ' + argv.lastname : '';
  console.log('Hello ' + argv.name + lastname + '!');
} else if (command === 'hello') {
  console.log('Hello world!')
}
