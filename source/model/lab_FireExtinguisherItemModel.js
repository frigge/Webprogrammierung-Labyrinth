// axe item
function lab_FireExtinguisherItemModel(){
    
    lab_ItemModel.call(this);

    // set the fixed inventory position for the fire extinguisher
    this.inventoryPosition = 2;
    // the amount of uses for the item
    this.amountUses = 3;
}

// inherit from lab_EntityModel
lab_ItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to lab_ItemModel
lab_ItemModel.prototype.constructor = lab_ItemModel;

lab_FireExtinguisherItemModel.prototype.use = function(){
	// TODO: Feuerlöschungbenutzung

	// reduce amount of uses
	this.reduceUses();
}

