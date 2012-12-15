(function(target) {

	var SantaController = function() {
	}

	SantaController.prototype.reset = function(state) {
		state.object.modelName = 'santa';
		state.object.canBeHit = true;
		state.object.drag = 0;
		state.object.direction = Math.random() * 360;
	}

	SantaController.prototype.start = function(state) {
		state.object.position.x = 0 + Math.random() * 2560;
		state.object.position.y = 0 + Math.random() * 2560;
	}

	SantaController.prototype.step = function(state) {
	}

	SantaController.prototype.hit = function(state) {
		state.target.active = false;
		state.attacker.active = false;
		for (var i=0; i<20; i++) {
			var miss = state.engine.createObjectWithType('explosion', new ExplosionController());
			miss.position.x = state.object.position.x;
			miss.position.y = state.object.position.y;
			miss.position.z = state.object.position.z;
		}
		for (var i=0; i<30; i++) {
			var miss = engine.createObjectWithType('blood', new BloodController());
			miss.position.x = state.object.position.x;
			miss.position.y = state.object.position.y;
			miss.position.z = state.object.position.z;
		}
	}

	target.SantaController = SantaController;

})(typeof(exports) != 'undefined' ? exports : this);