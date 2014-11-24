// parent object
function GameObjectModel(posX,posY,posZ) {
	this.setPosition(posX,posY,posZ);
}

GameObjectModel.prototype.setPosition = function(posX,posY,posZ) {
	this.posX = posX;
	this.posY = posY;
	this.posZ = posZ;
}