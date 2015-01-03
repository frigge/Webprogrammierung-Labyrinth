function lab_FireExtinguisherItemModel(){
    
    lab_ItemModel.call(this);

    this.type = 'fireExtinguisher';

    // set the fixed inventory position for the fire extinguisher
    this.inventoryPosition = 2;
    // the amount of uses for the item
    this.amountUses = 3;
}

// inherit from lab_EntityModel
lab_FireExtinguisherItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to lab_FireExtinguisherItemModel
lab_FireExtinguisherItemModel.prototype.constructor = lab_FireExtinguisherItemModel;

lab_FireExtinguisherItemModel.prototype.use = function(){
	// TODO: Feuerlöschungbenutzung

	// reduce amount of uses
	this.reduceUses();
}