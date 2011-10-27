function FSCache() {
    this.files = {};
    this.aliases = {};
    this.listeners = {};
}

FSCache.prototype.addListener = function(aliases, cb) {
    if (typeof aliases === "string") aliases = [aliases];
    for (var a in aliases) {
        var l = this.listeners[aliases[a]] || [];
        l.push(cb);
        this.listeners[aliases[a]] = l;
    }
};

FSCache.prototype.fireUpListeners = function(alias) {
    for (var k in this.listeners[alias]) {
        this.listeners[alias][k]();
    }
};

FSCache.prototype.addAlias = function(filePath, alias) {
    this.aliases[alias] = filePath;
    var a = this.files[filePath] || [];
    a.push(alias);
    this.files[filePath] = a;
};

FSCache.prototype.addAliases = function(filePath, aliases) {
    for (var i in aliases) {
        this.addAlias(filePath, aliases[i]);
    }
};

FSCache.prototype.getFilePath = function(alias) {
    return this.aliases[alias];
};

FSCache.prototype.getAliases = function(filePath) {
    return this.files[filePath];
};

FSCache.prototype.dump = function() {
    console.log("===\nFSCache:");
    for (var k in this.files) {
        console.log(k + ": " + this.files[k]);
    }
    console.log("===\nAliases:");
    for (var k in this.aliases) {
        console.log(k + ": " + this.aliases[k]);
    }
    console.log("===\nListeners:");
    for (var k in this.listeners) {
        console.log(k + ": " + this.listeners[k]);
    }
    console.log("===");
};

exports.create = function() {
    return new FSCache();
};
