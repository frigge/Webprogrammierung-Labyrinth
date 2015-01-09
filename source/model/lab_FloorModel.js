function lab_FloorModel(gameModel){
    
    lab_EntityModel.call(this,gameModel);

    this.type = 'floor';
}

// inherit from lab_EntityModel
lab_FloorModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_FloorModel
lab_FloorModel.prototype.constructor = lab_FloorModel;