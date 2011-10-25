exports.match = function(file) {
	if (file.self === 'dir0') return resolve;
};

function resolve(file, tree, fsCache) {
	var id = 'unit:' + file.self,
		node = tree.add(id, function() { console.log('building: ' + id) });
	console.log('resolved: dir0');
}