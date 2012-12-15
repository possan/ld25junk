all: unittests

unittests:
	nodeunit --reporter eclipse voxels/voxel-tests.js
