function findIndentationLevel(rawValue) {
	let newLinePosition = rawValue.lastIndexOf('\n');
	//check if new line character is \r
	newLinePosition = (newLinePosition === -1) ? rawValue.lastIndexOf('\r') : newLinePosition;
	if (newLinePosition !== -1) {
		const whiteSpaces = rawValue.substring(newLinePosition + 1);
		//find the number of tabs
		return whiteSpaces.split('\t').length - 1;
	}
	return 0;
}

function findNewLineLevel(rawValue) {
	return rawValue.split(/\r\n|\r|\n/).length - 1;
}

module.exports = {
	findNewLineLevel, findIndentationLevel,
};