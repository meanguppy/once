const { Spinner } = require('clui')

module.exports = function createOnceSpinner (defaultMessage, { autoplay }) {
	let spinner = new Spinner(defaultMessage, ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);
	if(autoplay) { spinner.start(); }
	return spinner;
};