// abstract "class" for all items
function lab_ItemModel(gameModel){
    
    lab_EntityModel.call(this, gameModel);

    // each item which can be collected has a fixed inventory position (1-9)
    this.inventoryPosition;
    
    // the amount of uses for the item
    this.amountUses;

    // items can by collected
    this.isCollected = false;

    this.hasAreaEvent = true;

    this.collidable = false;
}

// inherit from lab_EntityModel
lab_ItemModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_ItemModel
lab_ItemModel.prototype.constructor = lab_ItemModel;


// should be implemented in every child class
lab_ItemModel.prototype.use = function(){

}

// reduces the amount of uses left for the specific item
// if item is "empty" remove from repository
lab_ItemModel.prototype.reduceUses = function(){
    this.amountUses--;
	if (this.amountUses == 0) {
		this.gameModel.player.removeFromInventory(this.inventoryPosition);
		// the item is not further used and therefore marked as deleted
		this.isDeleted = true;
	}
}

lab_ItemModel.prototype.areaEvent = function(){
	this.gameModel.player.collectItem(this);
}
