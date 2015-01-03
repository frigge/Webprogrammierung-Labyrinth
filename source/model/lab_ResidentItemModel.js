function lab_ResidentItemModel(){
    
    lab_ItemModel.call(this);

    this.type = 'resident';

    // set the fixed inventory position for the resident
    this.inventoryPosition = 5;
    // the amount of uses for the item
    this.amountUses = 1;
}

// inherit from lab_EntityModel
lab_ResidentItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to lab_ResidentItemModel
lab_ResidentItemModel.prototype.constructor = lab_ResidentItemModel;

lab_ResidentItemModel.prototype.use = function(){
	// TODO: Bewohner kann nur "benutzt" werden, wenn er im Zielbereich ist => Zielbereich definieren
	// Zielbereich = Startbereich des Spieler + Toleranz

	// reduce amount of uses
	this.reduceUses();
}

