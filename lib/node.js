var createFiles = require('./files.js').create;

function Node(id, build) {
    this.id = id;

    this.inFiles = createFiles();
    this.outFiles = createFiles();

    this.pNodes = {};
    this.cNodes = {};
    this.build = build || null;

    this.valid = true;

    this.custom = {};
}

Node.prototype.addPNode = function(pNode) {
    this.pNodes[pNode.id] = pNode;
};

Node.prototype.addCNode = function(cNode) {
    this.cNodes[cNode.id] = cNode;
};

Node.prototype.addInFile = function(file) {
    this.inFiles.addFile(file);
};

Node.prototype.addOutFile = function(file) {
    this.outFiles.addFile(file);
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

Node.prototype.buildWanted = function() {
    return this.inFiles.total === 0 ||
           this.inFiles.absent > 0 ||
           this.outFiles.total === 0 ||
           this.outFiles.absent > 0;
};

Node.prototype.dump = function() {
    console.log('node[id]: ' + this.id);
    console.log('  pIds:');
    for (var id in this.pNodes) console.log('    ' + id);
    console.log('  cIds:');
    for (id in this.cNodes) console.log('    ' + id);
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
