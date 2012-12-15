(function(target) {

	var PlayerController = function() {
		this.direction = 0;
		this.dirvel = 0;
	}

	PlayerController.prototype.reset = function(state) {
	}

	PlayerController.prototype.start = function(state) {
		state.object.modelName = 'missile';
		state.object.position.x = 0 + Math.random() * 800;
		state.object.position.y = 0 + Math.random() * 600;
	}

	PlayerController.prototype.step = function(state) {
		var engine = state.engine;
		var obj = state.object;
		var kb = engine.keyboard;
		// check keyboard

		if (kb.isDown(37)) this.dirvel -= 2.0;
		if (kb.isDown(39)) this.dirvel += 2.0;

		this.direction += this.dirvel;
		this.dirvel *= 0.7;

		var dx = Math.cos(this.direction * Math.PI / 180.0);
		var dy = Math.sin(this.direction * Math.PI / 180.0);

		if (kb.isDown(38)) {
			obj.velocity.x += 1.0 * dx;
			obj.velocity.y += 1.0 * dy;
		}

		if (kb.isDown(40)) {
			obj.velocity.x -= 0.5 * dx;
			obj.velocity.y -= 0.5 * dy;
		}

		if (kb.wasPressed(32)) {
			// create missile and throw it away
			console.log('fire!');
			var miss = engine.createObjectWithType('missile', new MissileController());
			miss.position.x = state.object.position.x;
			miss.position.y = state.object.position.y;
			miss.position.z = 30;
			miss.controller.direction = this.direction;
			miss.drag = 0;
			miss.velocity.x = dx * 18;
			miss.velocity.y = dy * 18;
		}

		engine.camera.direction = -this.direction + 90;
		engine.camera.x = state.object.position.x;
		engine.camera.y = state.object.position.y;
		engine.camera.z = 40;// 45 + 35 * Math.sin(time);
	}

	PlayerController.prototype.hit = function(state) {
	}

	target.PlayerController = PlayerController;

})(typeof(exports) != 'undefined' ? exports : this);