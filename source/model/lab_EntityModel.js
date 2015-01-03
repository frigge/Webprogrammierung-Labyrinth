function lab_EntityModel(){
    
    // each entity will get an unique ID
    this.id;

    // each entity will get a type (e.g. wall)
    this.type = '';

    // each entity has a collision or not
    this.collidable = true;
    
    // each entity has a position in the game world
    this.position = {x: 0, y: 0, z: 0};

    // entities can be destroyed/deleted
    this.isDeleted = false;
}

// sets the position on x,y and z dimension
lab_EntityModel.prototype.setPosition = function(x,y,z){
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
};