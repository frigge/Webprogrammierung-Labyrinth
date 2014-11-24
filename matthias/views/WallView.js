function WallView (model) {
	GameObjectView.call(this,model);
	this.geometry 	= new THREE.BoxGeometry(model.width,model.height,model.depth);
	this.material 	= new THREE.MeshLambertMaterial({color: 0x778899});
	this.figure		= new THREE.Mesh(this.geometry,this.material);

	// translate the position of the model to the position of the 3D figure
	this.translatePosition(model);

	this.draw(this.figure);
}

WallView.prototype = new GameObjectView(null);