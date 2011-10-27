var FS = require('fs'),
    PATH = require('path'),
    normalizePath = require('./util.js').normalizePath;

function FSTree() {
    this.tree = { files: {} };
}

FSTree.prototype.build = function(root) {
    root = normalizePath(root);
    this.fill(this.tree, root, PATH.basename(root));
};

FSTree.prototype.fill = function(parent, dir, self) {
    var path = rpath = dir,
        stat = FS.lstatSync(path);

    try {
        if (stat.isSymbolicLink()) {
            rpath = FS.realpathSync(path);
            stat = FS.statSync(rpath);
        }
    } catch (e) {
        console.log('Симлинк с ошибкой: ' + path);
        rpath = '';
    }

    if (rpath) {
        var f = {
            path: path,
            rpath: rpath,
            stat: stat,
            parent: parent,
            self: self
        };

        if (self === '.samurai.js') parent.match = require(path).match;
 
        if (stat.isDirectory()) {
            f.files = {};
            parent.files[path] = f;
            var content = FS.readdirSync(path);
            for (var i = 0; i < content.length; i++) {
                this.fill(f, path + '/' + content[i], content[i]);
            }
        } else if (stat.isFile()) {
            f.files = null;
            parent.files[path] = f;
        }
    }
};

FSTree.prototype.dump = function() {
    var s = '';
    function _dump(files) {
        for (var k in files) {
            var f = files[k];
            s += f.self + ' | ' + f.path + ' | ' + !!f.match;
            if (f.files) {
                s += '\nfiles:\n';
                _dump(f.files);
            } else s += '\n';
        }
    }
    _dump(this.tree.files);
    console.log(s);
};

exports.create = function() {
    return new FSTree();
};
