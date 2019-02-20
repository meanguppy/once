const 
	{ writeFile } = require('../../util/fsHelpers'),
	fs = require('fs'),
	inquirer = require('inquirer'),
	_ = require('lodash');

const PLATFORM_CHOICES = [
	{
		title: 'Angular (NativeScript)',
		platform: 'mobile',
		code: 'ANGULAR_NATIVESCRIPT'
	},
	{
		title: 'Angular (Web)',
		platform: 'web',
		code: 'ANGULAR'
	},
	{
		title: 'React (Web)',
		platform: 'web',
		code: 'REACT'
	},
	{
		title: 'React Native',
		platform: 'native',
		code: 'REACT_NATIVE'
	}
];

const CONFIG_QUESTIONS = [
	{
    name: 'USER_NAME',
    type: 'input',
    message: 'First, what\'s your name? This will be used as the author of the packages.'
  },
  {
    name: 'PLATFORM_SUPPORT',
    type: 'checkbox',
    message: 'Next, we have a bunch of types of monorepos we could write. Select any of the following (you can always add more platforms later):',
    choices: PLATFORM_CHOICES.map(c => c.title),
    default: ['Angular (NativeScript)', 'Angular (Web)']
  }
];

module.exports = class OnceConfig {

	constructor (config = {}) {
		this._configRoute = './once.config.json';
		let { platforms, author } = config;
		this.platforms = platforms;
		this.author = author;
	}

	get exists () {
		return fs.existsSync(this._configRoute);
	}

	get configObject () {
		return _.pick(this, ['author', 'platforms']);
	}

	async populateLocally () {
		if(!this.exists) throw 'Local config file doesnt exist';
		let { platforms, author } = JSON.parse(fs.readFileSync(this._configRoute));
		if(platforms) this.platforms = platforms;
		if(author) this.author = author;
	}

	async promptForConfig () {
	  setTimeout(async() => {
	  	let answers = await inquirer.prompt(CONFIG_QUESTIONS);
	  	this._parsePromptedAnswersAndCreate(answers);
	  }, 1000);
	}

	async _parsePromptedAnswersAndCreate (answers) {
		if(answers.PLATFORM_SUPPORT && 
			Array.isArray(answers.PLATFORM_SUPPORT) && 
			answers.PLATFORM_SUPPORT.length > 0) {
			console.log('platform support', answers);
			this.platforms = PLATFORM_CHOICES.filter(p => {
				return p && p.title && answers.PLATFORM_SUPPORT.indexOf(p.title) > -1;
			});
		}
		if(answers.USER_NAME) {
			this.author = answers.USER_NAME || '<Enter Author Here>';
		}
		await this.saveLocally();
	}

	async saveLocally () {
		try {
			let stringifiedConfig = JSON.stringify(this.configObject, null, 4);
			await writeFile(this._configRoute, stringifiedConfig);
		} catch(e) {
			throw e;
		}
		
	}

}