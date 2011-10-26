var fs = require('fs');

var build = exports.build = function(node) {
	console.log('build call: ' + node.build);
	if (node.cNodes) {
		for (var id in node.cNodes) {
			build(node.cNodes[id]);
		}
	}
	if (node.build) {
		var inMaxTime = findMaxMtime(node.inFiles),
			outMinTime = findMinMtime(node.outFiles);
		if (!node.inFiles || !node.outFiles || !(inMaxTime > outMinTime)) {
			console.log('will build');
			node.build();
			refreshStat(node.outFiles);
			refreshParents(node.pNodes);
		}
	}
}

function findMaxMtime(files) {
	var l = -1;
	if (files) {
		for (var f in files) {
			if (files[f].stat.mtime > l) l = files[f].stat.mtime;
		}
	}
	return l;
}

function findMinMtime(files) {
	var l = 9007199254740992; // max int
	if (files) {
		for (var f in files) {
			if (files[f].stat.mtime < l) l = files[f].stat.mtime;
		}
	}
	return l;
}

function refreshStat(files) {
	if (files) {
		for (var f in files) {
			files[f].stat = fs.lstatSync(f);
		}
	}
}

function refreshParents(nodes) {
	if (nodes) {
		for (var id in nodes) {
			refreshStat(nodes[id].inFiles);
		}
	}
}