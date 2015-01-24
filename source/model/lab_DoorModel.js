function lab_DoorModel(gameModel){
    
    lab_EntityModel.call(this,gameModel);

    this.type = 'door';

    this.hasAreaEvent = true;
}

// inherit from lab_EntityModel
lab_DoorModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_DoorModel
lab_DoorModel.prototype.constructor = lab_DoorModel;

lab_DoorModel.prototype.areaEvent = function(){
	if (this.gameModel.player.hasItem("resident") && (lab_FireModel.countInstances <= 0)) {
		this.gameModel.won = true;
	}
}


