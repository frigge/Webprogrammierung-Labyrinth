/**
 * Player model
 * The player has an inventory and can collect and use items
 * All health handling is done here as well
 * @param  gameModel
 */
function lab_PlayerModel(gameModel){
    // calls parent contructor
    lab_EntityModel.call(this, gameModel);
    
    this.type = "player";

    // the maximum and start health of the player
    this.maxHealth = 100;

    // the actual health of the player (counter)
    this.health = this.maxHealth;

    // the inventory of the player
    this.inventory = {};

    // the item currently chosen for use in the inventory
    this.activeItem;

    // the item which is currently in passive use
    this.passiveItem;

    // player is not collidable
    this.collidable = false;

    // player has not only a position but a velocity
    this.velocity = {x: 0.0, y: 0.0, z: 0.0};

    // the height of the player
    this.height = 1.8;
}

// inherit from lab_EntityModel
lab_PlayerModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to this object
lab_PlayerModel.prototype.constructor = lab_PlayerModel;

/**
 * adds item to inventory if not already in it
 * @param item the item model which goes into the inventory
 * @return {Boolean} true if item is put inventory, false when not
 */
lab_PlayerModel.prototype.addToInventory = function(item){
    // only add to inventory if item is not already in it
    if (this.inventory[item.inventoryPosition] == undefined) {
        this.inventory[item.inventoryPosition] = item;
        return true;
    }
    return false;
};

/**
 * removes item from inventory
 * @param key the inventory key which should be removed
 */
lab_PlayerModel.prototype.removeFromInventory = function(key){
    var item = this.inventory[key];
    if(this.activeItem === item)
        this.activeItem = undefined;

    if(this.passiveItem === item)
        this.passiveItem = undefined;

    delete this.inventory[key];
};

/**
 * uses item from inventory which is the active one
 */
lab_PlayerModel.prototype.useActiveItem = function(){
	if(this.activeItem !== undefined) 
        this.activeItem.use();
};

/**
 * sets the item to the active one
 * @param item the item which is should be selected
 */
lab_PlayerModel.prototype.setActiveItem = function(item){
    this.activeItem = this.inventory[item];
}

/**
 * collects item and puts it in inventory
 * the item is thereby removed from the area event list, as it 
 * cannot be collected anymore
 * @param item the item which should be collected
 */
lab_PlayerModel.prototype.collectItem = function(item) {
	// add to inventory
	if (this.addToInventory(item)) {
        item.isCollected = true;
        this.gameModel.removeModelFromAreaEventList(item);
    }
}

/**
 * checks if player has a specific item in his inventory
 * @param itemType the item which should be checked if in inventory
 * @return {Boolean} true if item in inventory, false if not
 */
lab_PlayerModel.prototype.hasItem = function(itemType) {
    for (var slot in this.inventory) {
        if (this.inventory[slot].type == itemType){
            return true;
        }
    }
    return false;
}

/**
 * player health is reduced
 * if health is 0 the game is lost
 * @param minusHealthAmount the amount of health to be reduced
 */
lab_PlayerModel.prototype.reduceHealth = function(minusHealthAmount) {
    this.health -= minusHealthAmount;
    if (this.health <= 0) {
        this.health=0;
        this.gameModel.lost = true;
    }
}

/**
 * player health is added
 * @param bonusHealthAmount the amount of health to be added
 */
lab_PlayerModel.prototype.addHealth = function(bonusHealthAmount) {
    if (this.health < (this.maxHealth - bonusHealthAmount)) {
        this.health += bonusHealthAmount;
    } else {
        this.health = this.maxHealth;
    }
}
