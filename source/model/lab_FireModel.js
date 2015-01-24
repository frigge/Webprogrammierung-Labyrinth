function lab_FireModel(gameModel){
    
    lab_EntityModel.call(this,gameModel);

    this.type = 'fire';

    this.hasAreaEvent = true;

    this.collidable = true;
    this.heat = 2;

    // keep track of the fireModel instances
    if (lab_FireModel.countInstances == undefined) {
    	lab_FireModel.countInstances = 1;
    } else {
    	lab_FireModel.countInstances++;
    }

}

// inherit from lab_EntityModel
lab_FireModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_FireModel
lab_FireModel.prototype.constructor = lab_FireModel;

lab_FireModel.prototype.areaEvent = function(){
	this.gameModel.player.reduceHealth(1);
}

lab_FireModel.prototype.dispose = function(){
   	lab_FireModel.countInstances--;
   	console.log(lab_FireModel.countInstances);
}


lab_FireModel.countInstances;