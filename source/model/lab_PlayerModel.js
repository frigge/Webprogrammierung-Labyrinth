function lab_PlayerModel(gameModel){
    
    lab_EntityModel.call(this, gameModel);
    
    this.health = 100;

    this.inventory = {};

    // the item currently chosen for use in the inventory
    this.activeItem;

    // the item which is currently in passive use
    this.passiveItem;

    this.isDead = false;
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
    console.log("New Item in Inventory");
	item.isCollected = true;
    this.gameModel.removeModelFromAreaEventList(item);
}

lab_PlayerModel.prototype.reduceHealth = function(minusHealthAmount) {
    this.health -= minusHealthAmount;
    if (this.health <= 0) {
        this.isDead = true;
        alert("Player is dead");
    }
}

lab_PlayerModel.prototype.addHealth = function(bonusHealthAmount) {
    if (this.health < (100 - bonusHealthAmount)) {
        this.health += bonusHealthAmount;
    } else {
        this.health = 100;
    }
}