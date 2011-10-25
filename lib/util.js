exports.normalizePath = function(path) {
	return (path.charAt(path.length - 1) === '/') ? path.substr(0, path.length - 1) : path;
};

exports.getFileSelf = function(path) {
	var i;
	return ((i = path.lastIndexOf('/')) === -1) ? path : path.substr(i + 1);
};