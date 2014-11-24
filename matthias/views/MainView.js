function MainView() {
	// add game objects to the scene
	this.addToScene = function(gameObjectRepresentation) {
		this.scene.add(gameObjectRepresentation);
	}

	// a basic light to illuminate the scene
	this.setMainLight = function(posX,posY,posZ) {
		var pointLight = new THREE.PointLight(0xFFFFFF);
		pointLight.position.x = posX;
		pointLight.position.y = posY;
		pointLight.position.z = posZ;
		this.addToScene(pointLight);
	}

	// animate! call the render function multiple times
	this.renderLoop = function() {
		// we need to use a binding to use this function as callback
		requestAnimationFrame(this.renderLoop.bind(this));
		// render the scene from the given position of the player
		this.renderer.render(this.scene,playerView.cam);
	}

	this.listenToInput = function(bool) {
		if (bool) {
			document.addEventListener('keydown', inputController.handleInput);
		} else {
			document.removeEventListener('keydown', inputController.handleInput);
		}
	}

	// create a Three.js scene
	this.scene = new THREE.Scene();

	// create a WebGlRenderer for Three.js with full size of canvas
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.renderer.domElement);

	// illuminate the scene
	this.setMainLight(40,80,100);
}	