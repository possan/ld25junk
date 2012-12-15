(function(target) {

	var BloodController = function() {
	}

	BloodController.prototype.reset = function(state) {
		state.object.modelName = 'blood'+Math.floor(1+Math.random()*4);
		state.object.velocity.x = -5 + Math.random() * 10;
		state.object.velocity.y = -5 + Math.random() * 10;
		state.object.velocity.z = 0 + Math.random() * 6;
		state.object.scale = 0.4 + Math.random() * 0.4;
		state.object.bounce = 0.4 + Math.random() * 0.2;
		state.object.modelRotation = Math.random() * 360;
		this.ttl = 0.5 + 1.0 * Math.random();
	}

	BloodController.prototype.start = function(state) {
		state.object.position.x = 0 + Math.random() * 256;
		state.object.position.y = 0 + Math.random() * 256;
	}

	BloodController.prototype.step = function(state) {
		if (state.object.timer > this.ttl) {
			state.object.active = false;
		}
	}

	BloodController.prototype.hit = function(state) {
	}

	target.BloodController = BloodController;

})(typeof(exports) != 'undefined' ? exports : this);