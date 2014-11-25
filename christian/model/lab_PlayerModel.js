function lab_PlayerModel(){
    
    lab_EntityModel.call(this);
    
    /**
     * @type int
     */
    this.health = 100;
    
    /**
     * @type object
     */
    this.inventory = {};
    
    
}

// inherit from lab_EntityModel
lab_PlayerModel.prototype = Object.create(lab_EntityModel.prototype);

// Set the "constructor" property to refer to lab_PlayerModel
lab_PlayerModel.prototype.constructor = lab_PlayerModel;


lab_PlayerModel.prototype.addToInventory = function(key, value){
    this.inventory[key] = value;
};

lab_PlayerModel.prototype.removeFromInventory = function(key){
    delete this.inventory[key];
};

