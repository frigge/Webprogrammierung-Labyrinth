/**
 * Abstract item model
 * All item entities inherit from this class
 * Items can be collected and used
 * @param  gameModel
 * @abstract
 */
function lab_ItemModel(gameModel){
    // calls parent contructor
    lab_EntityModel.call(this, gameModel);

    // each item which can be collected has a fixed inventory position (1-9)
    this.inventoryPosition;
    
    // the amount of uses for the item
    this.amountUses;

    // items can by collected
    this.isCollected = false;

    // has an area event (player can collect items)
    this.hasAreaEvent = true;

    // the area event of items is collect
    this.areaEventType = 'collect';

    // items do not have a collision
    this.collidable = false;
}

// inherit from lab_EntityModel
lab_ItemModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to this object
lab_ItemModel.prototype.constructor = lab_ItemModel;


// should be implemented in every child class
lab_ItemModel.prototype.use = function(){

}

/**
 * reduces the amount of uses left for the specific item
 * if item is "empty" remove from inventory
 */
lab_ItemModel.prototype.reduceUses = function(){
    this.amountUses--;
	if (this.amountUses == 0) {
		this.gameModel.player.removeFromInventory(this.inventoryPosition);
		// the item is not further used and therefore marked as deleted
		this.isDeleted = true;
	}
}

/**
 * Items are collected when player is nearby
 */
lab_ItemModel.prototype.areaEvent = function(){
	this.gameModel.player.collectItem(this);
}
