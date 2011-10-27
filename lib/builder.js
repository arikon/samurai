var fs = require('fs'),
	path = require('path'),
	util = require('./util.js');

var build = exports.build = function(node) {
	if (node.cNodes) {
		for (var id in node.cNodes) {
			build(node.cNodes[id]);
		}
	}
	if (node.build) {
		var inMaxTime = util.findMaxMtime(node.inFiles),
			outMinTime = util.findMinMtime(node.outFiles);

		if (inMaxTime < outMinTime || node.buildWanted()) {
			node.build(node);
			util.refreshStat(node.outFiles);
			util.refreshParents(node.pNodes);
		}
	}
}