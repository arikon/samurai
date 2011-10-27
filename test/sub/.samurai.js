var fs = require('fs');

exports.match = function(file) {
    if (file.self === 'trigger.txt') return resolve;
};

function resolve(file, tree, fsCache) {
    var id = 'sample.title',
        node = tree.add(id, build);

    node.custom['trigger'] = file.path;
}

function build(node) {
    var trigger = fs.readFileSync(node.custom['trigger']).toString();
    console.log(trigger);
}
