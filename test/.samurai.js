exports.match = function(file) {
	if (file.self === 'file1.txt') return resolve;
};

function resolve(file, tree, fsCache) {
	var id = 'unit:' + file.self,
		node = tree.add(id, function() { console.log('building: ' + id) });
	console.log('resolved: file1.txt');
}