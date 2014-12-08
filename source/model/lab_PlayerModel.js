function lab_PlayerModel(){
    
    lab_EntityModel.call(this);
    
    this.health = 100;

    this.inventory = {};

    this.activeItem;
}

// inherit from lab_EntityModel
lab_PlayerModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_PlayerModel
lab_PlayerModel.prototype.constructor = lab_PlayerModel;


lab_PlayerModel.prototype.addToInventory = function(item){
    this.inventory[item.inventoryPosition] = item;
};

lab_PlayerModel.prototype.removeFromInventory = function(key){
    delete this.inventory[key];
};

lab_PlayerModel.prototype.useActiveItem = function(){
	this.activeItem.use();
};

lab_PlayerModel.prototype.collectItem = function(item) {
	// add to inventory
	this.addToInventory(item);
	// remove the item from the game world
	item.removeFromWorld();
}