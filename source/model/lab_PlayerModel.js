function lab_PlayerModel(gameModel){
    
    lab_EntityModel.call(this, gameModel);
    
    this.type = "player";
    this.health = 100;
    this.inventory = {};

    // the item currently chosen for use in the inventory
    this.activeItem;

    // the item which is currently in passive use
    this.passiveItem;
    this.isDead = false;
    this.collidable = false;
    this.velocity = {x: 0.0, y: 0.0, z: 0.0};
    this.height = 1.8;
}

// inherit from lab_EntityModel
lab_PlayerModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_PlayerModel
lab_PlayerModel.prototype.constructor = lab_PlayerModel;


lab_PlayerModel.prototype.addToInventory = function(item){
    // only add to inventory if item is not already in it
    if (this.inventory[item.inventoryPosition] == undefined) {
        this.inventory[item.inventoryPosition] = item;
        return true;
    }
    return false;
};

lab_PlayerModel.prototype.removeFromInventory = function(key){
    item = this.inventory[key];
    if(this.activeItem === item)
        this.activeItem = undefined;

    if(this.passiveItem === item)
        this.passiveItem = undefined;

    delete this.inventory[key];
};

lab_PlayerModel.prototype.useActiveItem = function(){
	if(this.activeItem !== undefined) 
        this.activeItem.use();
};

lab_PlayerModel.prototype.setActiveItem = function(item){
    this.activeItem = this.inventory[item];
}

lab_PlayerModel.prototype.collectItem = function(item) {
	// add to inventory
	if (this.addToInventory(item)) {
        console.log("New Item in Inventory");
        item.isCollected = true;
        this.gameModel.removeModelFromAreaEventList(item);
    }
}

lab_PlayerModel.prototype.reduceHealth = function(minusHealthAmount) {
    this.health -= minusHealthAmount;
    if (this.health <= 0) {
        this.isDead = true;
    }
}

lab_PlayerModel.prototype.addHealth = function(bonusHealthAmount) {
    if (this.health < (100 - bonusHealthAmount)) {
        this.health += bonusHealthAmount;
    } else {
        this.health = 100;
    }
}
