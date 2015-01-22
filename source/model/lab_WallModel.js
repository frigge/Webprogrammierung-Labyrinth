function lab_WallModel(gameModel){
    
    lab_EntityModel.call(this,gameModel);

    this.type = 'wall';
    this.stability = 5;
}

// inherit from lab_EntityModel
lab_WallModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_WallModel
lab_WallModel.prototype.constructor = lab_WallModel;
