function FloorView(model) {
	GameObjectView.call(this,model);
	this.geometry 	= new THREE.PlaneGeometry(this.model.width,this.model.depth);
	this.material 	= new THREE.MeshBasicMaterial({color: 0xFFD39B});
	this.figure 	= new THREE.Mesh(this.geometry,this.material);
	
	// turn figure from vertical to horizontal
	this.figure.rotation.x = -Math.PI / 2;

	// translate the position of the model to the position of the 3D figure
	this.translatePosition(this.model);

	this.draw(this.figure);
}

FloorView.prototype = new GameObjectView(null);
