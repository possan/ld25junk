(function(target) {

	var Keyboard = function() {
		this.down = [];
		this.lastdown = [];
		this.newdown = [];
		this.onchange = null;
	}

	Keyboard.prototype.start = function() {
		var self = this;

		window.addEventListener('keydown', function(e) {
			// console.log('key down', e);
			if (self.down.indexOf(e.keyCode) == -1) {
				self.down.push(e.keyCode);
				if (self.onchange) self.onchange(self);
 			}
 			if (!e.ctrlKey && !e.metaKey) {
 				e.preventDefault();
 				return false;
	 		}
		});

		window.addEventListener('keyup', function(e) {
			// console.log('key up', e);
			var idx = self.down.indexOf(e.keyCode);
			if (idx != -1) {
				self.down.splice(idx, 1);
				if (self.onchange) self.onchange(self);
 			}
		});
	}

	Keyboard.prototype.step = function() {
		this.newdown = [];
		for (var i=0; i<this.down.length; i++) {
			// if in down list...
			if (this.lastdown.indexOf(this.down[i]) == -1) {
				// and not in lastdown list
				this.newdown.push(this.down[i]);
			}
		}
		// console.log('keyboard step', this.down, this.lastdown, this.newdown);
		this.lastdown = [];
		for (var i=0; i<this.down.length; i++)
			this.lastdown.push(this.down[i]);
	}

	Keyboard.prototype.isDown = function(key) {
		var idx = this.down.indexOf(key);
		return (idx != -1);
	}

	Keyboard.prototype.wasPressed = function(key) {
		var idx = this.newdown.indexOf(key);
		return (idx != -1);
	}

	target.Keyboard = Keyboard;

})(typeof(exports) != 'undefined' ? exports : this);