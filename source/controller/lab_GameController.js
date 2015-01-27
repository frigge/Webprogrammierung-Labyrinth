/**
 * This "class" is intended to be the game flow controler
 * and will guide the initialization process towards the
 * game loop. Furthermore it will be responsible for the updating within the
 * model.
 *
 * @param screenElement the html element where the 3d view goes
 * @param minimapElement the html element where the 2d view/minimap goes
 * @param soundsElement the html element where the audio goes
 */
function lab_GameController(screenElement, minimapElement, soundsElement){

    // setting screen properties
    this.screen          = document.getElementById(screenElement);
    this.screenWidth     = screen.width;
    this.screenHeight    = screen.height;

    // setting minimap properties
    this.minimap          = document.getElementById(minimapElement);
    this.minimapWidth     = this.minimap.offsetWidth;
    this.minimapHeight    = this.minimap.offsetHeight;
	
	// setting sounds properties
    this.sounds           = document.getElementById(soundsElement);	

    // defining stage properties
    this.labyrinthRenderer;
    this.minimapRenderer;
    this.scene3d;
    this.scene2d;
    this.camera;
    this.cameraMap;
    this.controls;

    // level controller
    this.levelController;

    // event controller
    this.eventController;

    // sound system controller
    this.soundController;

    // the game model holding the entire game state
    this.gameModel;

    // the game can be paused
    this.pause = true;

    // the clock uses the threeJS clock as a base
    this.clock = new THREE.Clock(false);

    // game duration for completing the level
    this.gameDuration = 600;

    // game duration which is left
    this.timeLeft = this.gameDuration;
}

/**
 * This method will initialize all parts of the game.
 * The Methods will invoke the different controllers for further processing
 */
lab_GameController.prototype.initGame = function(){
    this.initSounds();
	this.initModel();
    this.initView();
    this.initLevel();
    this.initEvents();
    this.initCameras();
    this.initControls();
};


/**
 * This method will initialize the model.
 */
lab_GameController.prototype.initModel = function(){
    this.gameModel = new lab_GameModel();
};


/**
 * This method will initialize the sound controller.
 */
lab_GameController.prototype.initSounds = function(){
    this.soundController = new lab_SoundController();
  
    this.sounds.appendChild(this.soundController.getDomElement());
};

/**
 * This method will handle resizing of the window if necessary
 */
lab_GameController.prototype.resize = function() {
    this.screenWidth = this.screen.width;
    this.screenWidth = this.screen.height;
    this.labyrinthRenderer.setSize(this.screenWidth, this.screenHeight);
    var aspectRatio = this.screen.width / this.screen.height;
    this.camera.aspect = aspectRatio;
}

/**
 * This method will initialize a basic view. It will set up the scene
 * the renderers and everything else needed to draw the game and its
 * its components. Further drawing will be done in the levelController
 */
lab_GameController.prototype.initView = function(){
    // LABYRINTH RENDERER
    this.labyrinthRenderer = new lab_LabyrinthRenderer(this.screenWidth, this.screenHeight);
    this.screen.appendChild(this.labyrinthRenderer.getDomElement());

    // adds an event listener/handler for resizing of the browser window
    this.screen.addEventListener("resize", this.resize, false);

    // MINIMAP RENDERER
    this.minimapRenderer = new lab_MinimapRenderer(this.minimapWidth, this.minimapHeight);
    this.minimap.appendChild(this.minimapRenderer.getDomElement());

    // CREATE THREEJS SCENES
    this.scene3d = new THREE.Scene();
    this.scene2d = new THREE.Scene();

    // LIGHTS
    this.scene3d.add(new THREE.AmbientLight(0xffffff));
    this.scene2d.add(new THREE.AmbientLight(0xffffff));

    // OVERLAY
    this.overlayRenderer = new lab_OverlayRenderer(this);
};

/**
 * This method will initialize the cameras for the scenes.
 */
lab_GameController.prototype.initCameras = function(){
     // CAMERA
    var aspectRatioScreen = this.screenWidth / this.screenHeight;
    // the 3d camera and its properties: (a) field of view (b) aspect ratio (c) near (d) far
    this.camera = new THREE.PerspectiveCamera(70, aspectRatioScreen, 0.0001, 1000);

    // MINIMAP
    var aspectRatioMinimap = this.minimapWidth / this.minimapHeight;

    // the size of the level is used to determine the cameras position for the minimap
    var viewSize = this.levelController.levelSize;
    // the 2d camera is a orthographic camera (view from above)
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

    // add the map camera to the 2d scene (3d camera is added in initControls)
    this.scene2d.add(this.cameraMap);
};

/**
 * This method will initialize the level (model and views)
 */
lab_GameController.prototype.initLevel = function(){
    this.levelController    = new lab_LevelController(this.gameModel,this.scene3d,this.scene2d);

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
 * a new controls object and configure it with the appropriate
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
    this.scene3d.add(this.controls.getObject());
};

// This method is called every frame, so within every
// iteration of the game loop. Giving the controller the possibility
// to update the model and the controls
// 
/**
 * This method is called every frame, so within every
 * iteration of the game loop. Giving the controller the possibility
 * to update the model and the controls
 */
lab_GameController.prototype.update = function(){
    if(!this.pause) {
        // handle a lost game
        if(this.gameModel.lost) {
            this.clock.stop();
            this.gameLost();
        }

        // handle a won game
        if(this.gameModel.won) {
            this.clock.stop();
            this.gameWon();
        }
        // all controllers are updated
        this.updateClock();
        this.controls.update();
        this.levelController.update();
        this.eventController.update();
    }

};

/**
 * Updates the clock and checks if time is over
 */
lab_GameController.prototype.updateClock = function(){
    this.timeLeft = this.gameDuration - this.clock.getElapsedTime();
    if (this.timeLeft <= 0) {
        this.gameModel.lost = true;
    }
}


/**
 * Notifies that the game is lost and restarts if wanted
 */
lab_GameController.prototype.gameLost = function(){
    this.pause = true;
    instructions.style.display = 'inline';
    instructions.innerHTML = "You lost! Any key to restart!";
    document.addEventListener( 'keydown', function() {window.location.reload();});
}

/**
 * Notifies that the game is won and restarts if wanted
 */
lab_GameController.prototype.gameWon = function(){
    this.pause = true;
    instructions.style.display = 'inline';
    instructions.innerHTML = "You won!!! Any key to restart!";
    document.addEventListener( 'keydown', function() {window.location.reload();});
}
