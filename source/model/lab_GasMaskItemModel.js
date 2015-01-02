// gas mask item
function lab_GasMaskItemModel(){
    
    lab_ItemModel.call(this);

    // set the fixed inventory position for the axe
    this.inventoryPosition = 4;

    // the amount of uses for the item
    this.amountUses = 'unlimited';

    // the passive use of the gas mask is smoke protection
    this.passiveUse = 'smokeProtection';
}

// inherit from lab_EntityModel
lab_ItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to lab_ItemModel
lab_ItemModel.prototype.constructor = lab_ItemModel;

lab_GasMaskItemModel.prototype.use = function(){
	// activate or deactivate the gasmask as passive Item
	if (gameModel.player.passiveItem) {
		gameModel.player.passiveItem = null;	
	} else {
		gameModel.player.passiveItem = this;
	}
}

