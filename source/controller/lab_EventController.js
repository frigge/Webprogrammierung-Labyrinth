function lab_EventController(gameModel){
	// all objects for which area events are relevant

	this.gameModel = gameModel;
}

// initialize all event types
lab_EventController.prototype.init = function(){
	this.initAreaEvents();
}

// initialize all event types
lab_EventController.prototype.update = function(){
	this.checkForAreaEvent();
}

// initialize area events
lab_EventController.prototype.initAreaEvents = function(){
	// area events
	for(var modelId in this.gameModel.models){		
		if (this.gameModel.models[modelId].hasAreaEvent) {
			this.gameModel.addModelToAreaEventList(this.gameModel.models[modelId]);
		}
	}
	console.log(this.gameModel.areaEventList);
}

// if player is in area of entity the corresponding area event is fired
lab_EventController.prototype.checkForAreaEvent = function(){
    position = this.gameModel.player.getPosition();

    for(var modelId in this.gameModel.areaEventList){
        model = this.gameModel.areaEventList[modelId];
        if (model.isDeleted) {
        	this.gameModel.removeModelFromAreaEventList(model);
        } else {
        	modelposition = model.getPosition();
	    	if ((position.x >= modelposition.x - 1) &&
		    	(position.x <= modelposition.x + 1) &&
				(position.z >= modelposition.z - 1) &&
				(position.z <= modelposition.z + 1)) {
		    	this.gameModel.addModelToUpdateList(model);
		    	model.areaEvent();
		    }
        }

    }
};
