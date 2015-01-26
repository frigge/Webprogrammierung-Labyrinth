/**
 * Wall model
 * Does nothing special, just a part of a wall
 * @param  gameModel
 */
function lab_WallModel(gameModel){
    // calls parent contructor
    lab_EntityModel.call(this,gameModel);

    this.type = 'wall';
}

// inherit from lab_EntityModel
lab_WallModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to this object
lab_WallModel.prototype.constructor = lab_WallModel;
