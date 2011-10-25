var args = process.argv.slice(2);

if (args.length) {
	console.log('samurai started');
	run(args[0]);
}

function run(root) {
	var fsTree = require('./fstree.js').create(),
		fsCache = require('./fscache.js').create(),
		tree = require('./tree.js').create();

	// 1. Init FSTree
	fsTree.build(root);
	// 2. Init Tree and FSCache by resolvers.
	buildTree(tree, fsTree, fsCache);
	// 3. Run node build chain.
}

function buildTree(tree, fsTree, fsCache) {
	for (var f in fsTree.tree.files) {
		walkTree(fsTree.tree.files[f], [], tree, fsCache);
	}
}

function walkTree(file, rStack, tree, fsCache) {
	if (file.match) rStack.unshift(file.match);
	resolve(file, rStack, tree, fsCache);
	if (file.files) { // dir
		for (var f in file.files) {
			walkTree(file.files[f], rStack, tree, fsCache);
		}
	}
	if (file.match) rStack.shift();
}

function resolve(file, rStack, tree, fsCache) {
	var r;
	for (var i = 0; i < rStack.length; i++) {
		if (r = rStack[i](file)) {
			r(file, tree, fsCache);
		}
	}
}