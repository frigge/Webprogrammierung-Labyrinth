function lab_PlayerModel(){
    
    // make sure instance is created
    if (!(this instanceof lab_PlayerModel)){
        return new lab_PlayerModel();
    }
    
    /**
     * @type int
     */
    this.health = 100;
    
    /**
     * @type object
     */
    this.inventory = {};
    
    lab_EntityModel.call(this);
    
}

// inherit from lab_EntityModel
lab_PlayerModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_PlayerModel
lab_PlayerModel.prototype.constructor = lab_PlayerModel;


lab_PlayerModel.prototype.setHealth = function(playerHealth){
    this.health = playerHealth;
};

lab_PlayerModel.prototype.getHealth = function(){
    return this.health;
};

lab_PlayerModel.prototype.setInventory = function(playerInventory){
    this.inventory = playerInventory;
};

lab_PlayerModel.prototype.getInventory = function(){
    return this.inventory;
};

lab_PlayerModel.prototype.addToInventory = function(key, value){
    this.inventory[key] = value;
};

lab_PlayerModel.prototype.removeFromInventory = function(key){
    delete this.inventory[key];
};

