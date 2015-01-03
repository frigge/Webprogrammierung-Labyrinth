function lab_SmokeModel(){
    
    lab_EntityModel.call(this);

    this.type = 'smoke';

    this.hasAreaEvent = true;
}

// inherit from lab_EntityModel
lab_SmokeModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_SmokeModel
lab_SmokeModel.prototype.constructor = lab_SmokeModel;

lab_SmokeModel.prototype.areaEvent = function(){
	gameModel.player.health--;
}
