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
    this.ambientLights;
    this.controls;
    this.collidables = new Array();
    
}

lab_GameController.prototype.initGame = function(){
    this.initStage();
    this.initModel();
};

lab_GameController.prototype.initStage = function(){
    // RENDERER
    this.labyrinthRenderer = new lab_LabyrinthRenderer(this.screenWidth, this.screenHeight);

    this.screen.appendChild(this.labyrinthRenderer.getDomElement());

    // SCENE
    this.scene = new THREE.Scene();

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(45, this.screenWidth / this.screenHeight, 0.0001, 1000);
    
    // LIGHTS
    this.ambientLights = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.ambientLights);
    
    // CONTROLLS
    this.controls = new FpsControls({
        camera: this.camera,
        debug: false,
        collidables: this.collidables,
        fly: false,
        xCollisionHeights: [1.8, 1.3, 0.8, 0.5, 0.3],
        xCollisionCrouchHeights: [0.8, 0.4, 0.3],
        crouchHeight: 0.8,
        normalSpeed: 80,
        sprintSpeed: 150,
        cameraHeight: 1.8,
        cameraStartPosition: {y: 1.8, x: 0, z:6},
    });
    this.scene.add( this.controls.getObject() );
};

lab_GameController.prototype.initModel = function(){
    
    var game            = new lab_GameModel();
    var levelHandler    = new lab_LevelHandler(game.getCurrentLevel());
    
    
    var worldElements   = levelHandler.getWorldElements();
    
    for(var i = 0; i < worldElements.length; i++){
        this.scene.add(worldElements[i]);
        this.collidables.push(worldElements[i]);
    }
    
    var entities = levelHandler.getEntities();
    
    for(var i = 0; i < entities.length; i++){
        this.scene.add(entities[i]);
    }
    
};

lab_GameController.prototype.update = function(){
    this.controls.update();
};
