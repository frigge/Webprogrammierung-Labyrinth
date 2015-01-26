/**
 * Floor model
 * Does nothing special, just a floor
 * @param  gameModel
 */
function lab_FloorModel(gameModel){
    // calls parent contructor
    lab_EntityModel.call(this,gameModel);

    this.type = 'floor';
}

// inherit from lab_EntityModel
lab_FloorModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to this object
lab_FloorModel.prototype.constructor = lab_FloorModel;