function lab_GameController(screenElement){
    
    // make sure instance is created
    if (!(this instanceof lab_GameController)){
        return new lab_GameController();
    }
    
    this.screen          = document.getElementById(screenElement);
    this.screenWidth     = screen.width - 10; // do substract 10 pixel to make FF not scrolling
    this.screenHeight    = screen.height - 20; // do substract 20 pixel to make FF not scrolling
    
    this.labyrinthRenderer;
    this.scene;
    this.camera;
    
}

lab_GameController.prototype.initGame = function(){
    this.initStage();
    this.initModel();
};

lab_GameController.prototype.initStage = function(){
    // RENDERER
    this.labyrinthRenderer = new lab_LabyrinthRenderer();
    this.labyrinthRenderer.setSize(this.screenWidth, this.screenHeight);

    this.screen.appendChild(this.labyrinthRenderer.getDomElement());

    // SCENE
    this.scene = new THREE.Scene();

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(45, this.screenWidth / this.screenHeight, 0.01, 1000);
    
    this.camera.position.set( 0, 2, 6 );
};

lab_GameController.prototype.initModel = function(){
//    player = new lab_PlayerModel();
//    player.position.x = this.camera.position.x;
//    player.position.x = this.camera.position.y;
//    player.position.z = this.camera.position.z;

    // floor
    var geometry    = new THREE.PlaneGeometry( 40, 40 ); 
    var texture     = new THREE.ImageUtils.loadTexture("view/images/floor.jpg");
    texture.wrapS   = THREE.RepeatWrapping;
    texture.wrapT   = THREE.RepeatWrapping; 
    texture.repeat.set( 40, 40 );

    var material = new THREE.MeshLambertMaterial( {
        map:  texture, 
        side: THREE.DoubleSide
    }); 

    var floor = new THREE.Mesh( geometry, material ); 
    floor.rotation.set(Math.PI / 2, 0.0, 0.0);
    floor.position.set(0.0, 0.0, 0.0);
    this.scene.add( floor );

    // lights
    this.scene.add(new THREE.AmbientLight(0xffffff));
};

lab_GameController.prototype.run = function(){
    this.render();
//    requestAnimationFrame(this.run(this));
};

lab_GameController.prototype.render = function(){
    this.labyrinthRenderer.render(this.scene, this.camera);
};
