// parent object for all object views (wall, floor, etc.)
function GameObjectView(model) {
	this.model = model;
	this.draw = function(figure) {
		mainView.addToScene(figure);
	}
	// translates the position of the model to the position of the 3D figure
	this.translatePosition = function(model) {
		this.figure.position.x = this.model.posX;
		this.figure.position.y = this.model.posY;
		this.figure.position.z = this.model.posZ;
	}
}