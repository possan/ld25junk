(function(target) {

	var ExplosionController = function() {
	}

	ExplosionController.prototype.reset = function(state) {
		state.object.modelName = 'explosion-frame'+Math.floor(Math.random()*5);
		state.object.velocity.x = -3 + Math.random() * 6;
		state.object.velocity.y = -3 + Math.random() * 6;
		state.object.velocity.z = 0 + Math.random() * 15;
		state.object.scale = 0.5 + 2.0 * Math.random();
		state.object.angularVelocity = -50 + Math.random() * 100;
		state.object.bounce = 0.1;
		state.object.direction = Math.random() * 360;
		this.ttl = 0.5 + 1.5 * Math.random();
	}

	ExplosionController.prototype.start = function(state) {
		state.object.position.x = 0 + Math.random() * 256;
		state.object.position.y = 0 + Math.random() * 256;
	}

	ExplosionController.prototype.step = function(state) {
		state.object.modelName = 'explosion-frame'+Math.floor(state.object.timer * 5.0 / this.ttl);
		if (state.object.timer > this.ttl) {
			state.object.active = false;
		}
	}

	ExplosionController.prototype.hit = function(state) {}

	target.ExplosionController = ExplosionController;

})(typeof(exports) != 'undefined' ? exports : this);