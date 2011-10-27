var createNode = require('./node.js').create;

function Tree() {
	this.nodes = {};
	this.actions = [];
}

Tree.prototype.add = function(id, build) {	
	var node = createNode(id, build);
	this.nodes[id] = node;
	return node;
};

Tree.prototype.addNode = function(node) {
	this.nodes[node.id] = node;
};

Tree.prototype.addAction = function(action, re, id) {
	actions.push({ action: action, re: re, id: id });
};

Tree.prototype.applyActions = function(id) {
	var node = this.nodes[id];
	this.actions.forEach(function(a) {
		if (a.re.test(id)) this[a.action](a.id, id);
	});
};

Tree.prototype.link = function(id, pId) {
	this.linkToParent(id, pId);
	this.linkToChild(pId, id);
};

Tree.prototype.dump = function() {
	for (var k in this.nodes) {
		this.nodes[k].dump();
	}
};

Tree.prototype.linkToParent = function(id, pId) {
	nodes[id].addPNode(this.nodes[pId]);
};

Tree.prototype.linkToChild = function(id, cId) {
	this.nodes[id].addCNode(this.nodes[cId]);
};

exports.create = function() {
	return new Tree();
};