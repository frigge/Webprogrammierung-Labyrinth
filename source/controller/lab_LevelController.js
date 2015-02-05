/**
 * The LevelController takes (1) a level file and (2) a description file for
 * model and view and translates them to populize the game world
 * @param gameModel the game model
 * @param scene3d the 3d render scene
 * @param scene2d the 2d render scene
 */
function lab_LevelController(gameModel,scene3d,scene2d){
    
    // the model which holds the game state
    this.gameModel 	= gameModel;

    // the 3d scene
    this.scene3d 	= scene3d;

    // the 2d (minimap) scene
    this.scene2d 	= scene2d;

    // this object can load models
    this.modelLoader 			= new lab_ModelLoader(this.gameModel);

    // this object can load views
    this.representationLoader 	= new lab_RepresentationLoader();

    // the 3D objects which have collision according to the model are collected here
    this.collidables = [];

    // the level is rectangular and its size is saved here
    this.levelSizeX;
	this.levelSizeY;
	// the side of the level which is the largest
    this.levelSize;
}

/**
 * The models, its views and a list with collision objects are initialized
 */
lab_LevelController.prototype.init = function(){
	this.initModels();
	this.initView(this.scene3d, 'View3D');
	this.initView(this.scene2d, 'View2D');

	// initialize collision detection (only relevant for 3D view)
	this.initCollidables(this.scene3d);
}

/**
 * loads the models depending on the level file
 */
lab_LevelController.prototype.initModels = function(){
	// load level data from JSON file
	try {
        var level = lab_ajaxGetJson('resources/level-02.json');
    }
    catch(e) {
        throw new Error("Level file could not be loaded! Reason: " + e.message);
    }

    // each model gets an unique id
    var id;

	/* set levelsize
	calculated by the size of the level file (number of lines)
	and the length of the line
	*/
	this.levelSizeX = level.levelData[0].line.length;
	this.levelSizeY = level.levelData.length;
	this.levelSize = Math.max(this.levelSizeX, this.levelSizeY);

	/*
	the default size for a representation of an entity is 1, so we set 0.5 as the
	default value for offset in all directions
	 */ 
	var defaultOffset = 0.5;

	// sets the range of the level for position the entities
	var rangeX = this.levelSizeX/2-defaultOffset;
	var rangeY = this.levelSizeY/2-defaultOffset;

	// floor is not defined in level file, set it here
	id = generateUUID();
	this.gameModel.models[id] = this.modelLoader.createModelByName('floor');
	this.gameModel.models[id].id = id;
	this.gameModel.models[id].setPosition(0,0,0);

	// ceiling is not defined in level file, set it here
	id = generateUUID();
	// the wall height is needed for setting the position of the ceiling
	var wallHeight = this.representationLoader.representations['wall'].View3D.height;
	this.gameModel.models[id] = this.modelLoader.createModelByName('ceiling');
	this.gameModel.models[id].id = id;
	this.gameModel.models[id].setPosition(0,wallHeight,0);

	/*
	translate every character of each line in the level file into an object
	specified by the character
	*/
	for (i=0; i<this.levelSizeY; i++) {
		var str = level.levelData[i].line;
		for (j=0; j<this.levelSizeX; j++) {
			if(this.modelLoader.tokenExists(str[j])) {
				// create a unique id for each object
				id = generateUUID();
				this.gameModel.models[id] = this.modelLoader.createModelByToken(str[j]);
				this.gameModel.models[id].id = id;
				
				// calculate the position of the object and give it to the model
				var posY = this.setObjectYPosition(this.gameModel.models[id].type,defaultOffset);
				this.gameModel.models[id].setPosition(j-rangeX,posY,i-rangeY);

				if (this.gameModel.models[id].type == "player") {
					// create reference for direct accessibility
					this.gameModel.player = this.gameModel.models[id];
					/* 
					the player is always in the update list, which means its position will be checked
					permanently in the gameloop
					*/
					this.gameModel.addModelToUpdateList(this.gameModel.models[id]);
				}
			}
		}
	}
}

/**
 * Loads the corresponding views and adds them to the given scene
 * @param scene the scene (3d or 2d) which will be populated
 * @param representationType the type (3d or 2d) as defined in the representation file
 */
lab_LevelController.prototype.initView = function(scene, representationType){
    // the view elements are collected before drawn in regard to performance
    var viewElements = [];
	var objectView;
	var model;

    for(var modelId in this.gameModel.models){
		model = this.gameModel.models[modelId];

		// if floor or ceiling set size dynamically from information about level size
		if (model.type == 'floor' || model.type == 'ceiling') {
			objectView 	= this.representationLoader.getRepresentation(representationType, model.type, this.levelSizeX, this.levelSizeY);
		} else {
			objectView 	= this.representationLoader.getRepresentation(representationType, model.type);
		}
		
		// only add an object to the scene when it is defined via the representationLoader
		if (objectView) {
			// set the id of the view to the same unique id of the model to glue them together
			objectView.id = modelId;

			// set the position of the view to the models position
			objectView.position.x = model.getPosition().x;
			objectView.position.y = model.getPosition().y;
			objectView.position.z = model.getPosition().z;

			viewElements.push(objectView);
		}
	}

	// now all entities are added to the given scene
	for(i=0;i<viewElements.length;i++) {
		scene.add(viewElements[i]);
	}
}

/**
 * Checks all models if they are collidable and if so puts them in the collidable list
 * @param scene the scene which gets collision detection
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
 * A update list is used to collect all changed models in one place
 */
lab_LevelController.prototype.update = function(){
	for(var modelId in this.gameModel.updateList){
        this.updateSceneObject(this.scene3d, modelId);
        this.updateSceneObject(this.scene2d, modelId);
        // after update remove the model from the update list, but NOT for player
        if (this.gameModel.updateList[modelId].type != 'player') {
        	this.gameModel.removeModelFromUpdateList(this.gameModel.updateList[modelId]);
        }
    }
}

/**
 * Updates an object in the view
 * @param scene the scene (3d or 2d) which will be updated
 * @param modelId the unique identifier of the model which needs an update
 */
lab_LevelController.prototype.updateSceneObject = function(scene, modelId){
	var model		= this.gameModel.updateList[modelId];
    var view 		= scene.getObjectById(modelId);
	// do nothing if object has no view for this scene
  	if(!view){
    	return false;
	}

	// update the position of the view to the position of the model
	view.position.x = model.getPosition().x;
    view.position.y = model.getPosition().y;
    view.position.z = model.getPosition().z;

    // if model is deleted or collected remove if from the scene
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

/**
 * Sets the Y position according to the height definition in the representation loader
 * The position will be set to middle of the height of an object to align to the floor level
 * @param type the type of the model (e.g. wall)
 * @param defaultHeight the default height which is used if no height is set
 * @return the y position of the object
 */
lab_LevelController.prototype.setObjectYPosition = function(type, defaultHeight){
	// height of a 3d object or scale of a sprite is relevant
	var objectHeight = this.representationLoader.representations[type].View3D.height;
	if (objectHeight == undefined) {
		objectHeight = this.representationLoader.representations[type].View3D.scaleY;
	}

	if (objectHeight != undefined) {
		// the position is half the height
		return objectHeight/2;
	} else {
		// fall back to default offset if no height or scale is specified
		return defaultHeight;
	}
}
