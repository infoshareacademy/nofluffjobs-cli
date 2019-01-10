#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const chalk = require('chalk');

const pkg = require(path.join(__dirname, '../package.json'));
const aboutCommand = require('./commands/about');
const rubyCommand = require('./commands/ruby');

program
    .version(pkg.version)
    .description(`no fluff ${chalk.blue('{jobs}')}`);

program
    .command('about')
    .alias('a')
    .description('Displays information about NoFluffJobs project')
    .action(() => aboutCommand());

program
    .command('ruby')
    .alias('r')
    .description('Lists current Ruby developer postings')
    .action(() => rubyCommand());

program.on('command:*', () => {
    console.error(chalk.red('Invalid command: ', program.args.join(' ')) + '\n');
    console.error(chalk.red('See --help for a list of available commands.') + '\n');

    process.exit(1);
});

if (!process.argv.slice(2).length) {
    console.warn(chalk.yellow('No command specified!' + '\n'));

    program.outputHelp(help => chalk.yellow(help));

    process.exit(1);
}

program.parse(process.argv);