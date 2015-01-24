function lab_SmokeModel(gameModel){
    
    lab_EntityModel.call(this,gameModel);

    this.type = 'smoke';

    this.hasAreaEvent = true;

    this.collidable = false;
}

// inherit from lab_EntityModel
lab_SmokeModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_SmokeModel
lab_SmokeModel.prototype.constructor = lab_SmokeModel;

lab_SmokeModel.prototype.areaEvent = function(){
	if (this.gameModel.player.passiveItem !== undefined) {
		if (this.gameModel.player.passiveItem.type == "gasMask") {
			return;
		}
	}
	this.gameModel.player.reduceHealth(5);	
}
