function Files() {
	this.files = {};

	this.total = 0;
	this.absent = 0;
}

Files.prototype.isReal = function() {
	return this.total > this.absent;
};

Files.prototype.addFile = function(file) {
	var old = this.files[file.path];

	old && !old.stat && this.absent--;

	this.files[file.path] = file;

	!file.stat && this.absent++;
};

Files.prototype.recount = function() {
	this.total = 0;
	this.absent = 0;
	for (var f in this.files) {
		this.total++;
		!this.files[f].stat && this.absent++;
	}
};

exports.create = function() {
    return new Files();
};