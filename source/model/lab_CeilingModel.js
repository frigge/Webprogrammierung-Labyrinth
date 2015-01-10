function lab_CeilingModel(gameModel){
    
    lab_EntityModel.call(this,gameModel);

    this.type = 'ceiling';
}

// inherit from lab_EntityModel
lab_CeilingModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_FloorModel
lab_CeilingModel.prototype.constructor = lab_CeilingModel;