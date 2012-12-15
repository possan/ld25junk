(function(target) {

	var VoxelRenderer = function() {}

	VoxelRenderer.prototype.colorFromHex = function(hex) {
		if (hex[0] == '#')
			hex = hex.substring(1);
		var ret = {r:0, g:0, b:0, a:255};
		switch (hex.length) {
			case 1:
				ret.r = parseInt(hex[0]+hex[0], 16);
				ret.g = ret.r;
				ret.b = ret.r;
				break;
			case 3:
				ret.r = parseInt(hex[0]+hex[0], 16);
				ret.g = parseInt(hex[1]+hex[1], 16);
				ret.b = parseInt(hex[2]+hex[2], 16);
				break;
			case 6:
				ret.r = parseInt(hex.substring(0,2), 16);
				ret.g = parseInt(hex.substring(2,4), 16);
				ret.b = parseInt(hex.substring(4,6), 16);
				break;
		}
		return ret;
	}

	var hextable = '0123456789abcdef';

	VoxelRenderer.prototype.colorToHex = function(color) {
		var r = Math.floor(Math.min(255, Math.max(color.r, 0)));
		var g = Math.floor(Math.min(255, Math.max(color.g, 0)));
		var b = Math.floor(Math.min(255, Math.max(color.b, 0)));
		var rh = hextable[r>>4] + hextable[r&15];
		var gh = hextable[g>>4] +hextable[g&15];
		var bh = hextable[b>>4] + hextable[b&15];
		if (rh[0] == rh[1] && gh[0] == gh[1] && bh[0] == bh[1]) {
			rh = rh[0];
			gh = gh[0];
			bh = bh[0];
		}
		return '#'+rh+gh+bh;
	}

	var _colorscalecache = {};

	VoxelRenderer.prototype.colorscale = function(hex) {

		if (typeof(_colorscalecache[hex]) !== 'undefined')
			return _colorscalecache[hex];

		var base = this.colorFromHex(hex);
		var brighter = {
			r: base.r + 0x33,
			g: base.g + 0x33,
			b: base.b + 0x33
		};
		var darker = {
			r: base.r - 0x33,
			g: base.g - 0x33,
			b: base.b - 0x33
		};

		var ret = [
			this.colorToHex(brighter),
			this.colorToHex(base),
			this.colorToHex(darker),
		];

		_colorscalecache[hex] = ret;

		return ret;
	}

	VoxelRenderer.prototype._boxcoords = function(rot) {
		// console.log('rot='+rot);
		var ret = [];
		var lefts = [];
		var radii = 100.0 * 1.0 / 0.707106;
		for (var i=0; i<4; i++) {
			var a = (i * 90 + -rot - 45) % 360;
			var x = radii * Math.sin(a * Math.PI / 180.0);
			// console.log('a=' + a+', x='+x);
			lefts.push(Math.round(x));
		}
		// console.log(lefts);
		for (var s=0; s<4; s++) {
			var sideobj = {
				left: lefts[s],
				right: lefts[(s+1)%4],
				side: s,
			};
			if (sideobj.left < sideobj.right)
				ret.push(sideobj);
		}
		return ret;
	}

	VoxelRenderer.prototype._boxsides = function(x, y, radii, coords, colorscale) {
		var ret = [];
		var sidecolors = [1,2,1,0];
		for (var i=0; i<coords.length; i++) {
			var c = coords[i];
			ret.push({
				x0: x + (radii * c.left / 100),
				y0: y - radii,
				x1: x + (radii * c.right / 100),
				y1: y + radii,
				w: radii * (c.right-c.left) / 100,
				h: radii * 2,
				side: c.side,
				color: colorscale[sidecolors[c.side]]
			})
		}
		return ret;
	}

	VoxelRenderer.prototype.box = function(ctx, x, y, r, rot, colors) {
		var coords = this._boxcoords(rot);
		var sides = this._boxsides(x, y, r, coords, colors);
		for (var i=0; i<sides.length; i++) {
			var s = sides[i];
			ctx.fillStyle = s.color;
			ctx.fillRect(s.x0, s.y0, s.w, s.h);
		}
	}

	VoxelRenderer.prototype.loadModel = function(imagefile, width, height, depth, base) {
		var model = {
			width: width,
			height: height,
			depth: depth,
			base: base,
			colors: []
		};
		for (var i=0; i<width*height*depth; i++)
			model.colors.push('');

		// load async..
		var self = this;
		console.log('loading', imagefile);
		var img = new Image();
		img.setAttribute('src', imagefile);
		img.addEventListener('load', function() {
			console.log('image loaded...', this);
			var can = document.createElement('canvas');
			can.width = width;
			can.height = height * depth;
			// document.body.appendChild(can);
			var ctx = can.getContext('2d');
			ctx.drawImage(img, 0, 0);
			var data = ctx.getImageData(0, 0, width, height*depth);
			console.log(data);
			for (var z=0; z<depth; z++) {
				for (var y=0; y<height; y++) {
					for (var x=0; x<width; x++) {
						var datao = (x + y*width + z*height*width) * 4;
						var incolor = { r: data.data[datao+0], g: data.data[datao+1], b: data.data[datao+2] };
						var coloro = x + y*width + z * width*height;
						var outcolor = self.colorToHex(incolor);
						if (outcolor != '#f0f')
							model.colors[coloro] = outcolor;
					}
				}
			}
		});

		return model;
	}

	VoxelRenderer.prototype._depthSort = function(items, camera) {
	}

	VoxelRenderer.prototype._sortModel = function(model, rot) {
	}

	VoxelRenderer.prototype._newX = function(x, r, rot, widthlayer, width, depthlayer, depth) {
		var a = rot;
		var x2 = x;
		x2 += r * 2 * (depthlayer - (depth-1)/2) * Math.sin(a * Math.PI / 180.0);
		x2 += r * 2 * (widthlayer - (width-1)/2) * Math.sin((a+90) * Math.PI / 180.0);
		return x2;
	}

	VoxelRenderer.prototype._innerModelRow = function(ctx, x, y, r, rot, model, row, column, depth) {
		var o = (column) + (row * model.width) + (depth * model.width * model.height);
		if (o < 0 || o >= model.colors.length || model.colors[o] == '')
			return;
		var a = rot;
		var a2 = rot + 90;
		var x2 = this._newX(x, r, rot, column, model.width, depth, model.depth);
		this.box(ctx, x2, y, r * 1, rot, this.colorscale(model.colors[o]));
	}

	VoxelRenderer.prototype.modelRow = function(ctx, x, y, r, rot, model, row) {

		rot %= 360;

		var xorder = (rot >= 180) ? -1 : 1;
		var zorder = (rot < 90 ||  rot >= 270) ? -1 : 1;

		if (xorder > 0) {
			for (var nx=0; nx<model.width; nx++) {
				if (zorder > 0) {
					for (var nz=0; nz<model.depth; nz++)
						this._innerModelRow(ctx, x, y, r, rot, model, row, nx, nz);
				}
				else {
					for (var nz=model.depth-1; nz>=0; nz--)
						this._innerModelRow(ctx, x, y, r, rot, model, row, nx, nz);
				}
			}
		}
		else {
			for (var nx=model.width-1; nx>=0; nx--) {
				if (zorder > 0) {
					for (var nz=0; nz<model.depth; nz++)
						this._innerModelRow(ctx, x, y, r, rot, model, row, nx, nz);
				}
				else {
					for (var nz=model.depth-1; nz>=0; nz--)
						this._innerModelRow(ctx, x, y, r, rot, model, row, nx, nz);
				}
			}
		}
	}

	VoxelRenderer.prototype.model = function(ctx, x, y, r, rot, model) {
		for (var row=0; row<model.height; row++) {
			this.modelRow(ctx, x, y + r * 2 * (row - model.height/2), r, rot, model, row);
		}
	}

	target.VoxelRenderer = VoxelRenderer;

})(typeof(exports) != 'undefined' ? exports : this);