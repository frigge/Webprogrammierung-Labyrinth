/**
 * The LevelController takes (1) a level file and (2) one description file for
 * each model and view and translates them to populize the game world
 */
function lab_LevelController(gameModel,scene){
    
    this.gameModel 	= gameModel;
    this.scene 		= scene;

    this.modelLoader 			= new lab_ModelLoader();
    this.representationLoader 	= new lab_RepresentationLoader();
}

lab_LevelController.prototype.init = function(){
    // the view elements are collected before drawn in regard to performance
    var viewElements = [];

   	// load level data from JSON file
    var level = lab_ajaxGetJson('resources/level-01.json');

   	// floor and ceiling have no influence in the game, only a visual representation is created
    var floor   = this.representationLoader.get3D('floor');
    floor.position.set(0,0,0);
    viewElements.push(floor);
    this.gameModel.collidables.push(floor); // floor has collision detection

    var ceiling = this.representationLoader.get3D('ceiling');
    ceiling.position.set(0,5,0);
    viewElements.push(ceiling);
    this.gameModel.collidables.push(ceiling); // ceiling has collision detection

    // the level file is translated
	for (i=0; i<40; i++) {
		var str = level.level01[i].line;
		for (j=0; j<40; j++) {
			// 5 times because one wall consists of 5 cubes stacked on top
			for (k=0; k<5; k++) {
				// create a unique id for every model and its view
				id = generateUUID();

				// create entity's model according to the token in the level file (e.g. #)
				if (this.gameModel.models[id] = this.modelLoader.createModelByToken(str[j])) {
					this.gameModel.models[id].id = id;
					this.gameModel.models[id].setPosition(j-19.5,k+0.5,i-19.5);

					// create entity's view and put it in the render-scene
					objectView = this.representationLoader.get3D(this.gameModel.models[id].type);
					objectView.position.x = this.gameModel.models[id].position.x;
    				objectView.position.y = this.gameModel.models[id].position.y;
    				objectView.position.z = this.gameModel.models[id].position.z;

					// set the id of the view to the same unique id of the model to glue them together
					objectView.id = id;
					
					// set if entity has collision detection
					if (this.gameModel.models[id].collidable) {
						this.gameModel.collidables.push(objectView);
					}
					this.gameModel.addModelToUpdateList(this.gameModel.models[id]);
					viewElements.push(objectView);
				}
				
				// do not keep on stacking models on one field if it's not a wall
				if (str[j] != "#") {
					break;
				}
				

			}
		}
	}
	// add to scene
	for(i=0;i<viewElements.length;i++) {
		this.scene.add(viewElements[i]);
	}
};

// is called each frame. Updates the model and view according to the updateList
lab_LevelController.prototype.update = function(){
	// console.log(this.gameModel.updateList);
    // all models in the updateList will be checked for their specific update status
    // and will be further processed
    for(var modelId in this.gameModel.updateList){
     	// the entity's model
        var model	= this.gameModel.updateList[modelId];
        // the entity's view
        var view 	= this.scene.getObjectById(modelId);

        // the model and view will be completely deleted
        if(model.isDeleted) {
	    	// delete entity's view
	    	this.scene.remove(view)
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

	    	// TODO: zu Inventar "view" hinzufügen
    	}
    }
};