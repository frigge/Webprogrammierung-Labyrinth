// abstract "class" for all items
function lab_ItemModel(){
    
    lab_EntityModel.call(this);

    // each item which can be collected has a fixed inventory position (1-9)
    this.inventoryPosition;
}

// inherit from lab_EntityModel
lab_ItemModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_ItemModel
lab_ItemModel.prototype.constructor = lab_ItemModel;


lab_ItemModel.prototype.removeFromWorld = function(){
	// TODO
}