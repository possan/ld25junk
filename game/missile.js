(function(target) {

	var MissileController = function() {
	}

	MissileController.prototype.reset = function(state) {
		state.object.modelName = 'missile';
		state.object.drag = 0;
		state.object.canHitOther = true;
		state.object.direction = 0;
	}

	MissileController.prototype.start = function(state) {
		state.object.position.x = 0 + Math.random() * 256;
		state.object.position.y = 0 + Math.random() * 256;
		state.object.direction = Math.random() * 360;
	}

	MissileController.prototype.step = function(state) {
		if (state.object.timer > 5) {
			state.object.active = false;
		}
	}

	MissileController.prototype.hit = function(state) {
	}

	target.MissileController = MissileController;

})(typeof(exports) != 'undefined' ? exports : this);