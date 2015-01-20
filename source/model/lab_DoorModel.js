function lab_DoorModel(gameModel){
    
    lab_EntityModel.call(this,gameModel);

    this.type = 'door';
}

// inherit from lab_EntityModel
lab_DoorModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_DoorModel
lab_DoorModel.prototype.constructor = lab_DoorModel;