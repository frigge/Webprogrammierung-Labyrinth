// medikit item
function lab_MediKitItemModel(){
    
    lab_ItemModel.call(this);

    // set the fixed inventory position for the medikit
    this.inventoryPosition = 3;
    // the amount of uses for the item
    this.amountUses = 1;
    // the amount of health which is returned after use
    this.healthBonus = 50;
}

// inherit from lab_EntityModel
lab_ItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to lab_ItemModel
lab_ItemModel.prototype.constructor = lab_ItemModel;

lab_MediKitItemModel.prototype.use = function(){
	// heal player health with healthBonus amount
	if (gameModel.player.health < (100 - this.healthBonus)) {
		gameModel.player.health += this.healthBonus;
	} else {
		gameModel.player.health = 100;
	}
	// reduce amount of uses
	this.reduceUses();

	// DEBUG
	console.log("Player Health after use of MediKit: " + gameModel.player.health);
}

