/**
 * Resident item model
 * Can be collected and must be to win the game
 * @param  gameModel
 */
function lab_ResidentItemModel(gameModel){
    // calls parent contructor
    lab_ItemModel.call(this,gameModel);

    this.type = 'resident';

    // set the fixed inventory position for the resident
    this.inventoryPosition = 5;
}

// inherit from lab_EntityModel
lab_ResidentItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to this object
lab_ResidentItemModel.prototype.constructor = lab_ResidentItemModel;
