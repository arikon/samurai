var createNode = require('./node.js').create;

function Tree() {
	this.nodes = {};
}

Tree.prototype.add = function(id, build) {
	var node = createNode(id, build);
	this.nodes[id] = node;
	return node;
};

Tree.prototype.addNode = function(node) {
	this.nodes[node.id] = node;
};

Tree.prototype.linkNodes = function(id, pId) {
	this.nodes[id].addPNode(this.nodes[pId]);
	this.nodes[pId].addCNode(this.nodes[id]);
};

Tree.prototype.dump = function() {
	for (var k in this.nodes) {
		this.nodes[k].dump();
	}
};

exports.create = function() {
	return new Tree();
};