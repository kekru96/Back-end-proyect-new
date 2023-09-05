const { Command } = require('commander')

const program = new Command()

program
    .option('-d', 'Variable for debugging', false)
    .option('--mode <mode>', 'Working mode', 'development')
program.parse();

console.log("Runtime options: ", program.opts());

module.exports = program
