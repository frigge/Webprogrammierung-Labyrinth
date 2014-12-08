function lab_FloorModel(){
    
    lab_EntityModel.call(this);
    
    this.id = 'floor';
    
}

// inherit from lab_EntityModel
lab_FloorModel.prototype = Object.create(lab_FloorModel.prototype);

// Set the "constructor" property to refer to lab_FloorModel
lab_FloorModel.prototype.constructor = lab_FloorModel;