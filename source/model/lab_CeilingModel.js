/**
 * Ceiling model
 * Does nothing special, just a ceiling
 * @param  gameModel
 */
function lab_CeilingModel(gameModel){
    // calls parent contructor

    lab_EntityModel.call(this,gameModel);

    this.type = 'ceiling';
}

// inherit from lab_EntityModel
lab_CeilingModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to this object
lab_CeilingModel.prototype.constructor = lab_CeilingModel;