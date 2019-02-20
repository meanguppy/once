/**
Once Framework: The build once, use everywhere framework
./cli/init.js
*/

const 
	argv = require('minimist')(process.argv.slice(2)), 
	configstore = require('configstore'),
	chalk = require('chalk'),
	{ textSync } = require('figlet'),
	fs = require('fs'),
	clear = require('clear'),
	{ writeFile } = require('../../util/fsHelpers'),
	Config = require('./OnceConfig');


class InitHandler {

	constructor () {
		this.config = new Config();
		this.answers = {};
	}

	async _welcome () {

		clear();
		console.log(textSync('ONCE'));
		console.log(chalk.green('"The build once, use everywhere app framework"'));
		console.log(chalk.green('Brought to you by Mean Guppy 🐟'));
		if(this.config.exists) {
			console.log(chalk.magenta('Once configuration found! Applying that to structure your monorepo.'));
		} else {
			console.log(chalk.magenta('Once configuration not found. Starting from scratch!'));
		}
	}

	async _promptQuestions () {
		const welcomeText = 'Welcome to Once CLI! We\'re going to step through a couple of things to get you all set up.';
		console.log(chalk.magenta(welcomeText));
		this.config.promptForConfig();
	}

	async _run () {

		await this._welcome();

		if(!this.config.exists) { 
			await this._promptQuestions(); 
		} else { 
			await this.config.populateLocally(); 
		}

	}

}

module.exports = new InitHandler()._run();

