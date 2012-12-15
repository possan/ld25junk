(function(target) {

	var SantaController = function() {
	}

	SantaController.prototype.reset = function(state) {
	}

	SantaController.prototype.start = function(state) {
		state.object.modelName = 'santa';
		state.object.position.x = 0 + Math.random() * 256;
		state.object.position.y = 0 + Math.random() * 256;
		state.object.direction = Math.random() * 360;
	}

	SantaController.prototype.step = function(state) {
		state.object.modelRotation = this.direction;
	}

	SantaController.prototype.hit = function(state) {
	}

	target.SantaController = SantaController;

})(typeof(exports) != 'undefined' ? exports : this);