function lab_FireModel(){
    
    lab_EntityModel.call(this);

    this.type = 'fire';

    this.hasAreaEvent = true;
}

// inherit from lab_EntityModel
lab_FireModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_FireModel
lab_FireModel.prototype.constructor = lab_FireModel;

lab_FireModel.prototype.areaEvent = function(){
	gameModel.player.health--;
}
