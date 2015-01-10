/**
 * The LevelController takes (1) a level file and (2) one description file for
 * each model and view and translates them to populize the game world
 */
function lab_LevelController(gameModel,scene,minimap){
    
    this.gameModel 	= gameModel;
    this.scene 		= scene;
    this.minimap 	= minimap;

    this.modelLoader 			= new lab_ModelLoader(this.gameModel);
    this.representationLoader 	= new lab_RepresentationLoader();

    // the 3D objects which have collision according to the model are collected here
    this.collidables = [];

    // the side of the level which is the largest, can be used to define the image section
    // of the minimap (done in GameController)
    this.levelSize;
}

/**
 * The models, its views and a list with collision objects are initialized
 */
lab_LevelController.prototype.init = function(){
	this.initModels();
	this.initView(this.scene, 'View3D');
	this.initView(this.minimap, 'View2D');
	// initialize collision detection (only relevant for 3D view)
	this.initCollidables(this.scene);
}

/**
 * loads the models depending on the level file
 */
lab_LevelController.prototype.initModels = function(){
	// load level data from JSON file

	var level = lab_ajaxGetJson('resources/level-01.json');
	var levelSizeX = level.levelData[0].line.length;
	var levelSizeY = level.levelData.length;
	
	this.levelSize = Math.max(levelSizeX, levelSizeY);

	var rangeX = levelSizeX/2-0.5;
	var rangeY = levelSizeY/2-0.5;

	// floor is not defined in level file, set it here
	id = generateUUID();
	this.gameModel.models[id] = this.modelLoader.createModelByName('floor');
	this.gameModel.models[id].id = id;
	this.gameModel.models[id].setPosition(0,0,0);

	// the level file is translated
	for (i=0; i<levelSizeY; i++) {
		var str = level.levelData[i].line;
		for (j=0; j<levelSizeX; j++) {
			if(this.modelLoader.tokenExists(str[j])) {
				id = generateUUID();
				this.gameModel.models[id] = this.modelLoader.createModelByToken(str[j]);
				this.gameModel.models[id].id = id;
				this.gameModel.models[id].setPosition(j-rangeX,0.5,i-rangeY);
				if (this.gameModel.models[id].type == "player") {
					// create reference for better accessibility
					this.gameModel.player = this.gameModel.models[id];
					this.gameModel.addModelToUpdateList(this.gameModel.models[id]);
				}
			}
		}
	}
}

/**
 * Loads the corresponding views and adds them to the scene
 */
lab_LevelController.prototype.initView = function(scene, representationType){
    // the view elements are collected before drawn in regard to performance
    var viewElements = [];

    for(var modelId in this.gameModel.models){
		var model 		= this.gameModel.models[modelId];
		var objectView 	= this.representationLoader.getRepresentation(representationType, model.type);
		// only add an object in the scene when it is defined via the representationLoader
		if (objectView) {
			// set the id of the view to the same unique id of the model to glue them together
			objectView.id = modelId;

			objectView.position.x = model.position.x;
			objectView.position.y = model.position.y;
			objectView.position.z = model.position.z;

			viewElements.push(objectView);
		}
	}

	// add to scene
	for(i=0;i<viewElements.length;i++) {
		scene.add(viewElements[i]);
	}
}

/**
 * Creates a list with scene objects for collision detection
 */
lab_LevelController.prototype.initCollidables = function(scene){
	for (var modelId in this.gameModel.models) {
		if (this.gameModel.models[modelId].collidable) {
			this.collidables.push(scene.getObjectById(modelId));
		}
	}
}

/**
 * Updates all views if there are any changes in the model
 */
lab_LevelController.prototype.update = function(){
	for(var modelId in this.gameModel.updateList){
        this.updateSceneObject(this.scene, modelId);
        this.updateSceneObject(this.minimap, modelId);
        if (this.gameModel.updateList[modelId].type != 'player') {
        	this.gameModel.removeModelFromUpdateList(this.gameModel.updateList[modelId]);
        }
    }
}

/**
 * Updates an object in the view
 */
lab_LevelController.prototype.updateSceneObject = function(scene, modelId){
	var model		= this.gameModel.updateList[modelId];
    var view 		= scene.getObjectById(modelId);
	// do nothing if object has no view for this scene
  	if(!view){
    	return false;
	}
	view.position.x = model.position.x;
    view.position.y = model.position.y;
    view.position.z = model.position.z;

    if (this.gameModel.updateList[modelId].isDeleted || this.gameModel.updateList[modelId].isCollected) {
		scene.remove(view);
		// delete entity from collision detection list if necessary
		for(var i = 0; i < this.collidables.length; i++){
	        if(this.collidables[i].id == model.id){
	            this.collidables.splice( i, 1 );
	            break;
	      	}
		}
    }
}