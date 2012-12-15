(function(target) {

	var DeerController = function() {
		this.direction = 0;
	}

	DeerController.prototype.reset = function(state) {
		state.object.modelName = 'reindeer';
		state.object.canBeHit = true;
		state.object.drag = 0;
	}

	DeerController.prototype.start = function(state) {
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
		// hit by missile
		state.target.active = false;
		state.attacker.active = false;
		for (var i=0; i<30; i++) {
			var miss = state.engine.createObjectWithType('blood', new BloodController());
			miss.position.x = state.object.position.x;
			miss.position.y = state.object.position.y;
			miss.position.z = state.object.position.z;
		}
	}

	target.DeerController = DeerController;

})(typeof(exports) != 'undefined' ? exports : this);