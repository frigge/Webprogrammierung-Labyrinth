function lab_MediKitItemModel(gameModel){
    
    lab_ItemModel.call(this,gameModel);

    this.type = 'mediKit';

    // set the fixed inventory position for the medikit
    this.inventoryPosition = 3;
    // the amount of uses for the item
    this.amountUses = 1;
    // the amount of health which is returned after use
    this.healthBonus = 50;
}

// inherit from lab_EntityModel
lab_MediKitItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to lab_MediKitItemModel
lab_MediKitItemModel.prototype.constructor = lab_MediKitItemModel;

lab_MediKitItemModel.prototype.use = function(){
	this.gameModel.player.addHealth(this.healthBonus);

	// reduce amount of uses
	this.reduceUses();
}

