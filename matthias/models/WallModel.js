function WallModel(posX,posY,posZ) {
	// call parent constructor
	GameObjectModel.call(this,posX,posY,posZ);
	this.isPainted = false;
	this.width = 1;
	this.height = 2;
	this.depth = 1;

	this.paint = function() {
		this.isPainted = true;
	}
}

// inherits from parent GameObjectModel
WallModel.prototype = new GameObjectModel(null,null,null);