/**
 * This "class" is intended to be the game flow controler
 * and will guide the initialization process towards the 
 * game loop. Furthermore it will be responsible for the updating within the
 * model.
 * 
 * @param HTML tag - screenElement
 */
function lab_GameController(screenElement, minimapElement){
    
    // setting screen properties
    this.screen          = document.getElementById(screenElement);
    this.screenWidth     = screen.width;
    this.screenHeight    = screen.height;

    // setting minimap properties
    this.minimap          = document.getElementById(minimapElement);
    this.minimapWidth     = this.minimap.offsetWidth;
    this.minimapHeight    = this.minimap.offsetHeight;
    
    // defining stage properties
    this.labyrinthRenderer;
    this.minimapRenderer;
    this.scene3D;
    this.camera;
    this.ambientLights;
    this.controls;

    this.cameraMap;

    // level handler
    this.levelController;
       
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
    this.initLevel();
    this.initEvents();
    this.initCameras();
    this.initControls();
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
 * This method will initialize a basic view. It will set up the scene 
 * the renderers and everything else needed to draw the game and its
 * its components. Further drawing will be done in the levelController
 */
lab_GameController.prototype.initView = function(){
    // LABYRINTH RENDERER
    this.labyrinthRenderer = new lab_LabyrinthRenderer(this.screenWidth, this.screenHeight);
    this.screen.appendChild(this.labyrinthRenderer.getDomElement());

    // MINIMAP RENDERER
    this.minimapRenderer = new lab_MinimapRenderer(this.minimapWidth, this.minimapHeight);
    this.minimap.appendChild(this.minimapRenderer.getDomElement());
    
    // SCENE
    this.scene3D        = new THREE.Scene();
    this.sceneMinimap   = new THREE.Scene();

    // LIGHTS
    this.scene3D.add(new THREE.AmbientLight(0xffffff));
    this.sceneMinimap.add(new THREE.AmbientLight(0xffffff));
   
    this.overlayController = new lab_OverlayController();
};

/**
 * This method will initialize the cameras for the scenes.
 */
lab_GameController.prototype.initCameras = function(){
     // CAMERA
    var aspectRatioScreen = this.screenWidth / this.screenHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspectRatioScreen, 0.0001, 1000);

    // MINIMAP
    var aspectRatioMinimap = this.minimapWidth / this.minimapHeight;

    // the size of the level is used to determine the cameras position for the minimap
    var viewSize = this.levelController.levelSize;
    this.cameraMap  = new THREE.OrthographicCamera(
        -aspectRatioMinimap * viewSize / 2,  // Left
        aspectRatioMinimap * viewSize / 2,   // Right
        viewSize / 2,                        // Top
        -viewSize / 2,                       // Bottom
        -20,                                 // Near 
        20 );                                // Far 
    // set the camera to look top down
    this.cameraMap.up = new THREE.Vector3(0,0,-1);
    this.cameraMap.lookAt( new THREE.Vector3(0,-1,0) );
    this.sceneMinimap.add(this.cameraMap);
};

/**
 * This method will initialize the level (model and view)
 */
lab_GameController.prototype.initLevel = function(){
    
    this.levelController    = new lab_LevelController(this.gameModel,this.scene3D,this.sceneMinimap);
    
    // init level
    this.levelController.init();
};

/**
 * This method will initialize the events
 */
lab_GameController.prototype.initEvents = function(){
    
    this.eventController    = new lab_EventController(this.gameModel);
    
    // init events
    this.eventController.init();
};


/**
 * This method will initialize the controls. This will instantiate 
 * a new controls object and configure it with the apropriaet 
 * settings for this game.
 */
lab_GameController.prototype.initControls = function(){
    // CONTROLS
    this.controls = new InputController({
        camera: this.camera, // add the game camera
        debug: false, // setting debug mode
        fly: false, // enable flying (for debug)
        xCollisionHeights: [1.8, 1.3, 0.8, 0.5, 0.3], // setting vertical intervall for detection rays
        xCollisionCrouchHeights: [0.8, 0.4, 0.3], // setting vertical intervall for detection rays for crouching
        crouchHeight: 0.8,
        acceleration: 7,
        normalSpeed: 4,
        sprintSpeed: 10,
        cameraHeight: 1.8, // the player eyes height
        cameraStartPosition: {y: 1.8, x: this.gameModel.player.getPosition().x, z:this.gameModel.player.getPosition().z}
    });
    this.scene3D.add(this.controls.getObject());
};

// This method is getting called every frame, so within every 
// iteration of the game loop. Giving the controller the possibility 
// to update the modell and the controls
lab_GameController.prototype.update = function(){
    this.controls.update();
    this.levelController.update();
    this.overlayController.update();
    this.eventController.update();
};
