(function(target) {

	var Game = function(engine) {
		this.engine = engine;
	}

	Game.prototype.reset = function() {
		this.engine.reset();
		this.player = this.engine.createObjectWithType('player', new PlayerController());
		this.santa = this.engine.createObjectWithType('santa', new SantaController());
		this.deers = [
			/*
			this.engine.createObjectWithType('deer', new DeerController()),
			this.engine.createObjectWithType('deer', new DeerController()),
			this.engine.createObjectWithType('deer', new DeerController()),
			this.engine.createObjectWithType('deer', new DeerController()),
			this.engine.createObjectWithType('deer', new DeerController()),
			this.engine.createObjectWithType('deer', new DeerController()),
			*/
			this.engine.createObjectWithType('deer', new DeerController()),
			this.engine.createObjectWithType('deer', new DeerController()),
			this.engine.createObjectWithType('deer', new DeerController())
		];
	}

	Game.prototype.start = function() {
		this.engine.start();
	}

	Game.prototype.step = function(time) {
		// prepare object animations

		// check collisions etc...

		this.engine.step(time);

		// update camera
		this.engine.floor.player = this.engine.camera;
	}

	target.Game = Game;

})(typeof(exports) != 'undefined' ? exports : this);