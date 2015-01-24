function lab_LevelendModel(gameModel){
    
    lab_EntityModel.call(this,gameModel);

    this.type = 'levelend';

    this.hasAreaEvent = true;
}

// inherit from lab_EntityModel
lab_LevelendModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_LevelendModel
lab_LevelendModel.prototype.constructor = lab_LevelendModel;

lab_LevelendModel.prototype.areaEvent = function(){
	if (this.gameModel.player.hasItem("resident") && (lab_FireModel.countInstances <= 0)) {
		this.gameModel.won = true;
	}
}