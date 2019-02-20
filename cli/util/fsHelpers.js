const fs = require('fs');

module.exports = {
	writeFile
};

async function writeFile (filePath, fileString, { force } = {}) {
	if(fs.existsSync(filePath)) {
		if(!force) 
			throw `File already exists at path ${filePath} and you haven't passed through the 'force' flag.`
		else
			fs.unlinkSync(filePath);
	}
	fs.writeFileSync(filePath, fileString);
}