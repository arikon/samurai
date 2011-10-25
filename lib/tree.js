function Tree() {
	this.nodes = {};
}

Tree.prototype.addNode = function(node) {
	this.nodes[node.id] = node;
};

Tree.prototype.linkNodes = function(id, pId) {
	this.nodes[id].addPNode(this.nodes[pId]);
	this.nodes[pId].addCNode(this.nodes[id]);
};

exports.create = function() {
	return new Tree();
};