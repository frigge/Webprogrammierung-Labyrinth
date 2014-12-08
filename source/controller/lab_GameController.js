/**
 * This "class" is intendet to be the game flow controler
 * and will guide the initialization process towards the 
 * game loop. Furthermore it will be responsible for the updating within the
 * model.
 * 
 * @param HTML tag - screenElement
 */
function lab_GameController(screenElement){
    
    // setting screen properties
    this.screen          = document.getElementById(screenElement);
    this.screenWidth     = screen.width;
    this.screenHeight    = screen.height;
    
    // defining stage properties
    this.labyrinthRenderer;
    this.scene3D;
    this.camera;
    this.ambientLights;
    this.controls;
    
    
    // level handler
    this.levelController;
    
    // object collection for collision detection
    // all objects within this list will be checked for collision
    this.collidables = new Array();
    
    // the game model holding the entire model
    this.gameModel;
       
}

/**
 * This method will initialize the game. Tha will include 
 * initilaizing the stage and the model.
 */
lab_GameController.prototype.initGame = function(){
    this.initModel();
    this.initView();
    this.initControlls();
};


/**
 * This method will initialize the model. It will start the
 * model and will retrieve tgether with the level controller 
 */
lab_GameController.prototype.initModel = function(){
    
    this.gameModel = new lab_GameModel();
    this.gameModel.init();
    
};

/**
 * This method will initialize the view. It will set up the camera, 
 * the scene, the renderers and everything else needed to draw the game 
 * and its components. The controls will be started and attached as well
 * to the game.
 */
lab_GameController.prototype.initView = function(){
    // 3D RENDERER
    this.labyrinthRenderer = new lab_LabyrinthRenderer(this.screenWidth, this.screenHeight);
    this.screen.appendChild(this.labyrinthRenderer.getDomElement());
    
    // SCENE
    this.scene3D = new THREE.Scene();

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(45, this.screenWidth / this.screenHeight, 0.0001, 1000);
    
    // LIGHTS
    this.ambientLights = new THREE.AmbientLight(0xffffff);
    this.scene3D.add(this.ambientLights);
    
    // ADDING LEVEL OBJECTS TO THE WORLD
    this.levelController    = new lab_LevelController();
    
    // init 3D World
    var worldElements3D       = this.levelController.getWorldElements3D();
    
    for(var i = 0; i < worldElements3D.length; i++){
        this.scene3D.add(worldElements3D[i]);
        //TODO: Führt zu Kollision ja/nein in den einzelnen Models festlegen
        this.collidables.push(worldElements3D[i]);
    }
    
    var entities3D = this.levelController.getEntities3D();
    
    for(var i = 0; i < entities3D.length; i++){
        this.scene3D.add(entities3D[i]);
    }
    
};

/**
 * This method wll initialize the controls. This will instantiate 
 * a new controls object and configure it with the apropriaet 
 * settings for this game.
 */
lab_GameController.prototype.initControlls = function(){
        
    // CONTROLLS
    this.controls = new FpsControls({
        camera: this.camera, // add the game camera
        debug: false, // setting debug mode
        collidables: this.collidables, // setting the list ob objects for collision detection
        fly: false, // enable flying (for debug)
        xCollisionHeights: [1.8, 1.3, 0.8, 0.5, 0.3], // setting vertical intervall for detection rays
        xCollisionCrouchHeights: [0.8, 0.4, 0.3], // setting vertical intervall for detection rays for crouching
        crouchHeight: 0.8,
        normalSpeed: 80,
        sprintSpeed: 150,
        cameraHeight: 1.8, // the player eyes height
        cameraStartPosition: {y: 1.8, x: 0, z:0}
    });
    this.scene3D.add( this.controls.getObject() );

};

// This method is getting called every frame, so within every 
// iteration of the game loop. Giving the controller the possibility 
// to update the modell and the controls
lab_GameController.prototype.update = function(){
    this.controls.update();
    this.gameModel.update();
};
