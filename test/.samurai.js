exports.match = function(file) {
	if (file.self === 'file1.txt') return resolve;
};

function resolve(file, tree, fsCache) {
	console.log('resolved: file1.txt');
}