function Node(id) {
	this.id = id;

	this.pNodes = [];
	this.cNodes = [];
	this.build = null;

	this.valid = true;
}

Node.prototype.addPNode = function(pNode) {
	this.pNodes.push(pNode);
};

Node.prototype.addCNode = function(cNode) {
	this.cNodes.push(cNode);
};

Node.prototype.setBuild = function(build) {
	this.build = build;
};

Node.prototype.getBuild = function() {
	return this.build;
};

Node.prototype.invalidate = function() {
	this.valid = false;
};

Node.prototype.invalidateUp = function() {
	this.invalidate();
	for (var k in this.pNodes) {
		this.pNodes[k].invalidateUp();
	}
};

Node.prototype.dump = function() {
	console.log('node[id]: ' + this.id);
};

exports.create = function(id, build) {
    return new Node(id, build);
};