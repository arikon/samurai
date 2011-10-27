var fs = require('fs'),
    path = require('path');

exports.match = function(file) {
    if (file.self === 'trigger.txt') return resolve;
};

function resolve(file, tree, fsCache) {
    var id = 'sample.title',
        node = tree.add(id, build);

    node.custom['trigger'] = file.path;
    node.custom['triggerOut'] = path.dirname(file.path) + '/sample.title.txt';
}

function build(node) {
    var trigger = fs.readFileSync(node.custom['trigger']).toString().trim(),
        triggerOut = node.custom['triggerOut'],
        old = path.existsSync(triggerOut) ? fs.readFileSync(triggerOut).toString().trim() : '',
        title = old;

    switch (trigger) {
        case '1': title = 'Aleph'; break;
        case '2': title = 'Beth'; break;
        case '3': title = 'Gimel'; break;
    }

    if (title !== old) {
        fs.writeFile(triggerOut, title + '\n');
    }
}
