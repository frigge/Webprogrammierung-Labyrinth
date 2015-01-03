function lab_WallModel(){
    
    lab_EntityModel.call(this);

    this.type = 'wall';
}

// inherit from lab_EntityModel
lab_WallModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_WallModel
lab_WallModel.prototype.constructor = lab_WallModel;