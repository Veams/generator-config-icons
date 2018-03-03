'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const config = require('./config');

module.exports = class extends Generator {
	initializing() {
		this.globalStore = this.options.__store;
	}

	prompting() {
		const prompts = [
			{
				type: 'checkbox',
				name: 'icons',
				message: 'Which icon workflow do you want to use?',
				choices: [
					{
						name: 'CSS Sprites',
						value: config.spriteId
					},
					{
						name: 'Webfont',
						value: config.webfontId
					},
					{
						name: 'Data-URI SVGs (Grunticon)',
						value: config.iconGrunticonId
					}
				],
				default: [ config.spriteId ]
			}
		];

		return this.prompt(prompts).then(props => {
			this.props = props;
		});
	}

	configuring() {
		if (this.globalStore) {
			this.globalStore.set('icons', this.props.icons);
		} else {
			this.config.set('icons', this.props.icons);
		}
	}
};
