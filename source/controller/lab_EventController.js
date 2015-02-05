/**
 * The event controller handles events (at the moment only area events)
 * @param gameModel the game model holding the game state
 */
function lab_EventController(gameModel){

	this.gameModel = gameModel;
}

/**
 * initialize all event types
 */
lab_EventController.prototype.init = function(){
	this.initAreaEvents();
}

/**
 * update all event types
 */
lab_EventController.prototype.update = function(){
	this.checkForAreaEvent();
}

/**
 * inizialize area events
 * adds all models which have an area event to a list
 */
lab_EventController.prototype.initAreaEvents = function(){
	for(var modelId in this.gameModel.models){		
		if (this.gameModel.models[modelId].hasAreaEvent) {
			this.gameModel.addModelToAreaEventList(this.gameModel.models[modelId]);
		}
	}
}

/**
 * if player is in area of entity the corresponding area event is fired
 */
lab_EventController.prototype.checkForAreaEvent = function(){
    var playerPosition = this.gameModel.player.getPosition();
    var eventRadius = 1;

    for(var modelId in this.gameModel.areaEventList){
        model = this.gameModel.areaEventList[modelId];
        // checks if model is deleted or collected in the meantime
        if (model.isDeleted || model.isCollected) {
        	this.gameModel.removeModelFromAreaEventList(model);
        } else {
        	var modelPosition = model.getPosition();
        	/* 
	   		  check if player position lies in radius of model and call
	   		  the area event
        	*/
	    	if ((playerPosition.x >= modelPosition.x - eventRadius) &&
		    	(playerPosition.x <= modelPosition.x + eventRadius) &&
				(playerPosition.z >= modelPosition.z - eventRadius) &&
				(playerPosition.z <= modelPosition.z + eventRadius)) {
					// something happens, put the model in the updatelist
					this.gameModel.addModelToUpdateList(model);
					model.areaEvent();
					// play sound when a model is collected
					switch(model.areaEventType) {
						case 'collect':
							if (model.isCollected) {
								document.getElementById('collect').play();
							}
							break;
						case 'damage': 
							// only play damage sound when user has damage
							if (this.gameModel.player.passiveItem != undefined) {
								if (this.gameModel.player.passiveItem.type == 'gasMask') {
									break;
								}
							}
							document.getElementById('damage').play();	
							break;
						default:
							break;	
					}
		    }
        }
    }
};
