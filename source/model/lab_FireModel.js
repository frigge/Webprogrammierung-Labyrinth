/**
 * Fire model
 * Fire damages the player when nearby
 * @param  gameModel
 */
function lab_FireModel(gameModel){
    // calls parent contructor
    lab_EntityModel.call(this,gameModel);

    this.type = 'fire';

    // has an area event (damage)
    this.hasAreaEvent = true;
    
    // can be extinguised, this value defines how stable it is
    this.stability = 2;

    // keep track of the fireModel instances (relevent for game goal)
    if (lab_FireModel.countInstances == undefined) {
    	lab_FireModel.countInstances = 1;
    } else {
    	lab_FireModel.countInstances++;
    }

}

// inherit from lab_EntityModel
lab_FireModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to this object
lab_FireModel.prototype.constructor = lab_FireModel;

/**
 * Player takes damage when nearby
 */
lab_FireModel.prototype.areaEvent = function(){
	this.gameModel.player.reduceHealth(1);
}

/**
 * Reduces the instances of a fire, should be called when fire is
 * extinguished
 */
lab_FireModel.prototype.dispose = function(){
   	lab_FireModel.countInstances--;
}

// counting number of instances in a static variable
lab_FireModel.countInstances;