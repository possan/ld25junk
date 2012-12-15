(function(target) {

	var Engine = function() {
		this.floor = null;
		this.objects = [];
		this.camera = { x: 0, y: 0, z: 0, direction: 0 }
		this.modelCache = {};
		this.voxelRenderer = null;
		this.time = 0;
		this.keyboard = null;
	};

	Engine.prototype.registerModel = function(modelname, model) {
		this.modelCache[modelname] = model;
	};

	Engine.prototype.createObjectWithId = function(id, type) {
		var o;
		for (var i=0; i<this.objects.length; i++) {
			o = this.objects[i];
			if (o.id == id && o.type == type && !o.active) {
				o.active = true;
				o.reset(this);
				return o;
			}
		}
		o = new EngineObject();
		o.type = type;
		o.active = true;
		o.reset(this);
		o.id = id;
		this.objects.push(o);
		return o;
	};

	Engine.prototype.createObjectWithType = function(type, controller) {
		var o;
		for (var i=0; i<this.objects.length; i++) {
			o = this.objects[i];
			if (o.type == type && !o.active) {
				if (controller) {
					o.controller = controller;
					o.active = true;
				}
				o.reset(this);
				console.log('created', o);
				return o;
			}
		}
		o = new EngineObject();
		o.type = type;
		o.id = '_'+Math.round(Math.random() * 10000000);
		if (controller)
			o.controller = controller;
		o.active = true;
		o.reset(this);
		this.objects.push(o);
		console.log('created', o);
		return o;
	};

	Engine.prototype.getObject = function(id) {
		for (var i=0; i<this.objects.length; i++) {
			var o = this.objects[i];
			if (o.id == id)
				return o;
		}
		return null;
	};

	Engine.prototype.getObjectsByType = function(type) {
		var ret = [];
		for (var i=0; i<this.objects.length; i++) {
			o = this.objects[i];
			if (o.type == type)
				ret.push(o);
		}
		return ret;
	};

	Engine.prototype.reset = function() {
		this.time = 0;
		for (var i=0; i<this.objects.length; i++) {
			var o = this.objects[i];
			o.reset(this);
		}
	};

	Engine.prototype.start = function() {
		for (var i=0; i<this.objects.length; i++) {
			var o = this.objects[i];
			o.start(this);
		}
	};

	Engine.prototype.step = function(deltatime) {
		this.time += deltatime;
		this.keyboard.step();
		for (var i=0; i<this.objects.length; i++) {
			var o = this.objects[i];
			if (!o.active)
				continue;
			o.step(this, deltatime);
		}
	};

	Engine.prototype.render = function(context) {
		for (var i=0; i<this.objects.length; i++) {
			var o = this.objects[i];
			if (!o.active)
				continue;

			// project!
			if (this.floor) {
				var sp = this.floor.project(o.position.x, 0, o.position.y);
				if (sp.visible)
					this.voxelRenderer.model(
						context,
						sp.x,
						sp.y,
						4 * sp.scale,
						(o.modelRotation || 0)- -this.floor.player.direction,
						this.modelCache[o.modelName]
					);
			} else {
				/*
				this.voxelRenderer.model(
					context,
					o.position.x,
					o.position.y,
					6 * o.scale,
					o.modelRotation,
					this.modelCache[o.modelName]
				);
				*/
			}
		}
	};

	target.Engine = Engine;

	var EngineObject = function() {
		this.id = '';
		this.type = '';
		this.active = false;
		this.controller = null;
		this.modelName = '';
		this.modelFrame = 0;
		this.modelRotation = 0;
		this.position = { x: 0, y: 0, z: 0 };
		this.velocity = { x: 0, y: 0, z: 0 };
		this.mass = 1;
		this.drag = 0.1;
		this.scale = 1.0;
		this._renderindex = -1;
		this.direction = 0;
	}

	EngineObject.prototype.reset = function(engine) {
		if (this.controller) this.controller.reset({
			engine: engine,
			object: this
		});
	}

	EngineObject.prototype.step = function(engine, dt) {
		if (this.controller) this.controller.step({
			engine: engine,
			object: this,
			time: engine.time,
			delta: dt
		});
		// simple physics
		this.position.x += this.velocity.x / this.mass;
		this.position.y += this.velocity.y / this.mass;
		this.position.z += this.velocity.z / this.mass;
		this.velocity.x *= 1 - this.drag;
		this.velocity.y *= 1 - this.drag;
		this.velocity.z *= 1 - this.drag;
	}

	EngineObject.prototype.start = function(engine) {
		if (this.controller) this.controller.start({
			engine: engine,
			object: this
		});
	}

	EngineObject.prototype.hit = function(engine, other) {
		if (this.controller) this.controller.hit({
			engine: engine,
			attacker: other,
			attackee: this,
			object: this
		});
	}

	target.EngineObject = EngineObject;

})(typeof(exports) != 'undefined' ? exports : this);