/**
 * Levelend model
 * This marks the end of the level to win the game if goals are achieved
 * @param  gameModel
 */
function lab_LevelendModel(gameModel){
   	// calls parent contructor
    lab_EntityModel.call(this,gameModel);

    this.type = 'levelend';

    this.hasAreaEvent = true;
}

// inherit from lab_EntityModel
lab_LevelendModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to this object
lab_LevelendModel.prototype.constructor = lab_LevelendModel;

/**
 * Player wins when goals are achieved and nearby
 */
lab_LevelendModel.prototype.areaEvent = function(){
	if (this.gameModel.player.hasItem("resident") && (lab_FireModel.countInstances <= 0)) {
		this.gameModel.won = true;
	}
}