 function PlayerView(model) {
	this.cam = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	this.updatePosition = function() {
		this.cam.position.x = model.posX;
		this.cam.position.y = model.posY;
		this.cam.position.z = model.posZ;
	}
	this.updatePosition();
}