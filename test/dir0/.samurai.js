exports.match = function(file) {
	if (file.self === 'dir0') return resolve;
};

function resolve(file, tree, fsCache) {
	console.log('resolved: dir0');
}