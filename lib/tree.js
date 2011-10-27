var createNode = require('./node.js').create;

function Tree() {
    this.nodes = {};
    this.actions = [];
}

Tree.prototype.add = function(id, build) {    
    var node = createNode(id, build);
    this.nodes[id] = node;
    this.applyActions(id);
    return node;
};

Tree.prototype.addNode = function(node) {
    this.nodes[node.id] = node;
    this.applyActions(node.id);
};

Tree.prototype.addAction = function(action, re, id) {
    this.actions.push({ action: action, re: re, id: id });
};

Tree.prototype.applyActions = function(id) {
    for (var i in this.actions) {
        var a = this.actions[i];
        if (a.re.test(id)) this[a.action](a.id, id);
    }
};

Tree.prototype.link = function(id, pId) {
    this.nodes[id].addPNode(this.nodes[pId]);
    this.nodes[pId].addCNode(this.nodes[id]);
};

Tree.prototype.dump = function() {
    for (var k in this.nodes) {
        this.nodes[k].dump();
    }
};

Tree.prototype.linkToParent = function(id, pId) {
    this.link(id, pId);
};

Tree.prototype.linkToChild = function(id, cId) {
    this.link(cId, id);
};

exports.create = function() {
    return new Tree();
};
