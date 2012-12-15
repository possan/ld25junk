(function(target) {

	var DeerController = function() {
		this.direction = 0;
	}

	DeerController.prototype.reset = function(state) {
	}

	DeerController.prototype.start = function(state) {
		state.object.modelName = 'reindeer';
		state.object.position.x = 0 + Math.random() * 256;
		state.object.position.y = 0 + Math.random() * 256;
		this.direction = Math.random() * 360;
	}

	DeerController.prototype.step = function(state) {
		state.object.modelRotation = this.direction;
		state.object.velocity.x = 0.5 * Math.cos(this.direction * Math.PI / 180.0);
		state.object.velocity.y = 0.5 * Math.sin(this.direction * Math.PI / 180.0);
	}

	DeerController.prototype.hit = function(state) {
	}

	target.DeerController = DeerController;

})(typeof(exports) != 'undefined' ? exports : this);