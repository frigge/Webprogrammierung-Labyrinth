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
}

lab_LevelController.prototype.init = function(){
	this.initModels();
	this.init3DView();
	this.init2DView();
}

/**
 * loads the models depending on the level file
 */
lab_LevelController.prototype.initModels = function(){
	// load level data from JSON file

	var level = lab_ajaxGetJson('resources/level-01.json');
	var levelSizeX = level.levelData.length;
	var levelSizeY = level.levelData[0].line.length;
	var rangeX = levelSizeX/2-0.5;
	var rangeY = levelSizeY/2-0.5;

	// the level file is translated
	for (i=0; i<levelSizeY; i++) {
		var str = level.levelData[i].line;
		for (j=0; j<levelSizeX; j++) {
			if(this.modelLoader.tokenExists(str[j])) {
				id = generateUUID();
				this.gameModel.models[id] = this.modelLoader.createModelByToken(str[j])
				this.gameModel.models[id].id = id;
				this.gameModel.models[id].setPosition(j-rangeX,0.5,i-rangeY);

			}
		}
	}
}

/**
 * loads the corresponding 3D views from the models
 */
lab_LevelController.prototype.init3DView = function(){
    // the view elements are collected before drawn in regard to performance
    var viewElements = [];

    // floor has no influence in the game, only a visual representation is created
    var floor   = this.representationLoader.get3D('floor');
    floor.position.set(0,0,0);
    viewElements.push(floor);
    this.gameModel.collidables.push(floor); // floor has collision detection

    for(var modelId in this.gameModel.models){
		var model = this.gameModel.models[modelId];

		objectView = this.representationLoader.get3D(model.type);
		
		// set the id of the view to the same unique id of the model to glue them together
		objectView.id = modelId;

		objectView.position.x = model.position.x;
		objectView.position.y = model.position.y;
		objectView.position.z = model.position.z;

		// set if entity has collision detection
		if (model.collidable) {
			this.gameModel.collidables.push(objectView);
		}

		viewElements.push(objectView);
	}

	// add to 3D scene
	for(i=0;i<viewElements.length;i++) {
		this.scene.add(viewElements[i]);
	}
}

/**
 * loads the corresponding 2D views from the models
 */
lab_LevelController.prototype.init2DView = function(){
    // the view elements are collected before drawn in regard to performance
    var viewElements = [];

    // a player representation is only needed in 2D
	var player   = this.representationLoader.get2D('player');
    id = generateUUID();
    player.id = id;
    this.gameModel.player.id = id; // TODO verschieben in initModel
    viewElements.push(player);
    this.gameModel.addModelToUpdateList(this.gameModel.player); // TODO verschieben in initModel

    for(var modelId in this.gameModel.models){
		var model = this.gameModel.models[modelId];

		objectView = this.representationLoader.get2D(model.type);

		// set the id of the view to the same unique id of the model to glue them together
		objectView.id = modelId;

		objectView.position.x = model.position.x;
		objectView.position.y = model.position.y;
		objectView.position.z = model.position.z;

		viewElements.push(objectView);
	}

	// add to 2D scene
	for(i=0;i<viewElements.length;i++) {
		this.minimap.add(viewElements[i]);
	}
}

// TODO: code optimieren!!

// is called each frame. Updates the model and view according to the updateList
lab_LevelController.prototype.update = function(){
	// console.log(this.gameModel.updateList);
    // all models in the updateList will be checked for their specific update status
    // and will be further processed

    for(var modelId in this.gameModel.updateList){
     	// the entity's model
        var model	= this.gameModel.updateList[modelId];
        // the entity's view
        var view 			= this.scene.getObjectById(modelId);
        var viewMinimap 	= this.minimap.getObjectById(modelId);

       	if (model.positionUpdate){
       		viewMinimap.position.x = model.position.x;
       		viewMinimap.position.y = model.position.y;
       		viewMinimap.position.z = model.position.z;
       	}
       	
	       // the model and view will be completely deleted
        if(model.isDeleted) {
	    	// delete entity's view
	    	this.scene.remove(view);
	    	this.minimap.remove(viewMinimap);
	    	// delete entity from collision detection list if necessary
    		for(var i = 0; i < this.gameModel.collidables.length; i++){
	            if(this.gameModel.collidables[i].id == model.id){
	                this.gameModel.collidables.splice( i, 1 );
	                break;
	            }
	        }
	    	// delete entity's model
	    	delete this.gameModel.models[model.id];
    	}

    	// only the object from the scene will be deleted
    	if(model.isCollected) {
	    	// delete entity's view
	    	this.scene.remove(view);
	    	this.minimap.remove(viewMinimap);
    	}
    }
};