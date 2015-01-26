/**
 * Door model
 * Doors can be destroyed
 * @param  gameModel
 */
function lab_DoorModel(gameModel){
    // calls parent contructor
    lab_EntityModel.call(this,gameModel);

    this.type = 'door';

    // can be destroyed, this value defines how stable it is
    this.stability = 5;
}

// inherit from lab_EntityModel
lab_DoorModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to this object
lab_DoorModel.prototype.constructor = lab_DoorModel;
