exports.getFileSelf = function(path) {
	var i;
	if (path.charAt(path.length - 1) === '/') path = path.substr(0, path.length - 1);
	return ((i = path.lastIndexOf('/')) === -1) ? path : path.substr(i + 1);
};