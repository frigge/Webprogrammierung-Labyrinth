function FloorModel(posX,posY,posZ) {
	// call parent constructor
	GameObjectModel.call(this,posX,posY,posZ);
	this.width = 1000;
	this.depth = 1000;
}

// inherits from parent GameObjectModel
FloorModel.prototype = new GameObjectModel(null,null,null);

