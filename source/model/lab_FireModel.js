function lab_FireModel(gameModel){
    
    lab_EntityModel.call(this,gameModel);

    this.type = 'fire';

    this.hasAreaEvent = true;

    this.collidable = false;
    this.heat = 2;
}

// inherit from lab_EntityModel
lab_FireModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_FireModel
lab_FireModel.prototype.constructor = lab_FireModel;

lab_FireModel.prototype.areaEvent = function(){
	this.gameModel.player.reduceHealth(1);
}
