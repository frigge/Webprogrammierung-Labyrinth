/**
 * Gasmask item model
 * Gas masks can be used as a passive item and protects from smoke
 * @param  gameModel
 */
function lab_GasMaskItemModel(gameModel){
    // calls parent contructor
    lab_ItemModel.call(this,gameModel);

    this.type = 'gasMask';

    // set the fixed inventory position for the axe
    this.inventoryPosition = 4;

    // the amount of uses for the item
    this.amountUses = 'unlimited';

    // the passive use of the gas mask is smoke protection
    this.passiveUse = 'smokeProtection';
}

// inherit from lab_EntityModel
lab_GasMaskItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to this object
lab_GasMaskItemModel.prototype.constructor = lab_GasMaskItemModel;

/**
 * When used the gas mask is a passive item of the player until reuse
 */
lab_GasMaskItemModel.prototype.use = function(){
	// activate or deactivate the gasmask as passive Item
	if (this.gameModel.player.passiveItem) {
		this.gameModel.player.passiveItem = undefined;	
	} else {
		this.gameModel.player.passiveItem = this;
	}
}

