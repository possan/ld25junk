var vr = require('./voxel.js');
var assert = require('assert');
var v = new vr.VoxelRenderer();

exports['colorToHex color test 0'] = function(test) {
	assert.deepEqual({r:0, g:0, b:0, a:255}, v.colorFromHex('#000'));
	test.done();
}

exports['colorToHex color test 1'] = function(test) {
	assert.deepEqual({r:255, g:0, b:255, a:255}, v.colorFromHex('#f0f'));
	test.done();
}

exports['colorToHex color test 2'] = function(test) {
	assert.deepEqual({r:0, g:255, b:255, a:255}, v.colorFromHex('0ff'));
	test.done();
}

exports['colorToHex color test 3'] = function(test) {
	assert.deepEqual({r:0x88, g:0x88, b:0x88, a:255}, v.colorFromHex('#888'));
	test.done();
}

exports['colorToHex color test 4'] = function(test) {
	assert.deepEqual({r:0x44, g:0x22, b:0x11, a:255}, v.colorFromHex('442211'));
	test.done();
}

exports['colorToHex color test 5'] = function(test) {
	assert.deepEqual({r:0xCC, g:0xCC, b:0xCC, a:255}, v.colorFromHex('#c'));
	test.done();
}

exports['colorToHex color test 6'] = function(test) {
	assert.deepEqual('#fff', v.colorToHex({r:255, g:255, b:255, a:255}));
	test.done();
}

exports['colorToHex color test 7'] = function(test) {
	assert.deepEqual('#fefefe', v.colorToHex({r:254, g:254, b:254, a:255}));
	test.done();
}

exports['colorToHex color test 8'] = function(test) {
	assert.deepEqual('#ccc', v.colorToHex({r:0xCC, g:0xCC, b:0xCC, a:255}));
	test.done();
}

exports['colorToHex color test 9'] = function(test) {
	assert.deepEqual('#123456', v.colorToHex({r:0x12, g:0x34, b:0x56, a:255}));
	test.done();
}

exports['colorToHex color test 10'] = function(test) {
	assert.deepEqual('#fad', v.colorToHex({r:0xFF, g:0xAA, b:0xDD, a:255}));
	test.done();
}

exports['colorToHex clamps colors'] = function(test) {
	assert.deepEqual('#f00', v.colorToHex({r:123254, g:-40, b:-24, a:255}));
	test.done();
}



exports['colorscale1'] = function(test) {
	assert.deepEqual(['#f33', '#f00', '#c00'], v.colorscale('#f00'));
	test.done();
}

exports['colorscale2'] = function(test) {
	assert.deepEqual(['#f33', '#f00', '#c00'], v.colorscale('#f00'));
	test.done();
}


exports['rotation 0'] = function(test) {
	assert.deepEqual([
		{left: -100, right: 100, side: 0}
	], v._boxcoords(0));
	test.done();
}

exports['rotation 1'] = function(test) {
	assert.deepEqual([
		{left: -141, right: 0, side: 0},
		{left: 0, right: 141, side: 1}
	], v._boxcoords(45));
	test.done();
}

exports['rotation 2'] = function(test) {
	assert.deepEqual([
		{left: -141, right: 0, side: 1},
		{left: 0, right: 141, side: 2}
	], v._boxcoords(45+90));
	test.done();
}

exports['rotation 3'] = function(test) {
	assert.deepEqual([
		{left: 0, right: 141, side: 0},
		{left: -141, right: 0, side: 3}
	], v._boxcoords(360-45));
	test.done();
}

exports['rotation 4'] = function(test) {
	assert.deepEqual([
		{left: -100, right: 100, side: 3}
	], v._boxcoords(270));
	test.done();
}