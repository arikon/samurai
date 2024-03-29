var fs = require('fs');

exports.normalizePath = function(path) {
    return (path.charAt(path.length - 1) === '/') ? path.substr(0, path.length - 1) : path;
};

exports.findMaxMtime = function(files) {
    var x,
        l = -1;
    if (files) {
        for (var f in files) {
            if ((x = files[f]).stat && x.stat.mtime > l) l = x.stat.mtime;
        }
    }
    return l;
};

exports.findMinMtime = function(files) {
    var x,
        l = 9007199254740992; // max int
    if (files) {
        for (var f in files) {
            if ((x = files[f]).stat && x.stat.mtime < l) l = x.stat.mtime;
        }
    }
    return l;
};

exports.refreshStat = function(files) {
    if (files.files) {
        for (var f in files.files) {
            files.files[f].stat = getStat(f);
        }
    }
    files.recount();
};

exports.recountParents = function(nodes) {
    if (nodes) {
        for (var id in nodes) {
            nodes[id].inFiles.recount();
        }
    }
};

var getStat = exports.getStat = function(path) {
    try {
        return fs.lstatSync(path);
    } catch (e) {
        return null;
    }
};
