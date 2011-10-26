function Node(id, build) {
	this.id = id;

	this.inFiles = {};
	this.outFiles = {};

	this.pNodes = {};
	this.cNodes = {};
	this.build = build || null;

	this.valid = true;
}

Node.prototype.addPNode = function(pNode) {
	this.pNodes[pNode.id] = pNode;
};

Node.prototype.addCNode = function(cNode) {
	this.cNodes[cNode.id] = cNode;
};

Node.prototype.run = function() {
	//
};

Node.prototype.rebuildNeeded = function() {
	//
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

function findMaxMtime(files) {
	var l = -1;
	files.forEach(function(file) {
		if (file.stat.mtime > l) l = file.stat.mtime;
	});
	return l;
}

function findMinMtime(files) {
	var l = 9007199254740992; // JavaScript max int
	files.forEach(function(file) {
		if (file.stat.mtime < l) l = file.stat.mtime;
	});
	return l;
}