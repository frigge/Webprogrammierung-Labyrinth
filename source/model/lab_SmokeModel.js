/**
 * Smoke model
 * Smoke damages the player when nearby when no gasmask is used
 * @param  gameModel
 */
function lab_SmokeModel(gameModel){
    // calls parent contructor

    lab_EntityModel.call(this,gameModel);

    this.type = 'smoke';

    // has an area event (damage)
    this.hasAreaEvent = true;

    // the area event of fire is damage
    this.areaEventType = 'damage';

    // smoke is not collidable
    this.collidable = false;
}

// inherit from lab_EntityModel
lab_SmokeModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to this object
lab_SmokeModel.prototype.constructor = lab_SmokeModel;

/**
 * Player takes damage when nearby and no gas mask is in passive use
 */
lab_SmokeModel.prototype.areaEvent = function(){
	if (this.gameModel.player.passiveItem !== undefined) {
		if (this.gameModel.player.passiveItem.type == "gasMask") {
			return;
		}
	}
	this.gameModel.player.reduceHealth(5);	
}
