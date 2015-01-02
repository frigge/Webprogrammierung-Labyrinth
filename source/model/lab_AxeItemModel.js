// axe item
function lab_AxeItemModel(){
    
    lab_ItemModel.call(this);

    // set the fixed inventory position for the axe
    this.inventoryPosition = 1;
    // the amount of uses for the item
    this.amountUses = 'unlimited';
}

// inherit from lab_EntityModel
lab_ItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to lab_ItemModel
lab_ItemModel.prototype.constructor = lab_ItemModel;

lab_AxeItemModel.prototype.use = function(){
	// TODO: Axtbenutzung
}

