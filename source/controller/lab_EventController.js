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
    for(var modelId in this.gameModel.areaEventList){
    	if ((this.gameModel.player.position.x >= this.gameModel.areaEventList[modelId].position.x - 1) &&
	    	(this.gameModel.player.position.x <= this.gameModel.areaEventList[modelId].position.x + 1) &&
			(this.gameModel.player.position.z >= this.gameModel.areaEventList[modelId].position.z - 1) &&
			(this.gameModel.player.position.z <= this.gameModel.areaEventList[modelId].position.z + 1)) {
	    	console.log("Area event is fired");
	    	this.gameModel.addModelToUpdateList(this.gameModel.areaEventList[modelId]);
	    	this.gameModel.areaEventList[modelId].areaEvent();
	    }
    }
};