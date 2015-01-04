function lab_AxeItemModel(gameModel){
    
    lab_ItemModel.call(this,gameModel);

    this.type = 'axe';

    // set the fixed inventory position for the axe
    this.inventoryPosition = 1;

    // the amount of uses for the item
    this.amountUses = 'unlimited';
}

// inherit from lab_EntityModel
lab_AxeItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to lab_AxeItemModel
lab_AxeItemModel.prototype.constructor = lab_AxeItemModel;

lab_AxeItemModel.prototype.use = function(){
	// TODO: Axtbenutzung
}