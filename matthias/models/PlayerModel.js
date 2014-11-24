function PlayerModel(posX,posY,posZ) {
	// call parent constructor
	GameObjectModel.call(this,posX,posY,posZ);

	// movement
	this.moveForward = function () {
		this.posZ -= MOVEMENT_SPEED;
	},
	this.moveBackward = function() {
		this.posZ += MOVEMENT_SPEED;
	},
	this.moveLeft = function() {
		this.posX -= MOVEMENT_SPEED;
	},
	this.moveRight = function() {
		this.posX += MOVEMENT_SPEED;
	}
}

PlayerModel.prototype = new GameObjectModel(null,null,null);