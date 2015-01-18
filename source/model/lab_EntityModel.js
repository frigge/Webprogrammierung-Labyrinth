function lab_EntityModel(gameModel){
    
    this.gameModel = gameModel;

    // each entity will get an unique ID
    this.id;

    // each entity will get a type (e.g. wall)
    this.type = '';

    // each entity has a collision or not
    this.collidable = true;
    
    // Transformation of the Entity
    this.transformation = new THREE.Matrix4();

    // entities can be destroyed/deleted
    this.isDeleted = false;
}

// sets the position on x,y and z dimension
lab_EntityModel.prototype.setPosition = function(x,y,z){
    elem = this.transformation.elements;
    elem[12] = x;
    elem[13] = y;
    elem[14] = z;
};

lab_EntityModel.prototype.getPosition = function() {
    elem = this.transformation.elements;
    return {x : elem[12], y : elem[13], z : elem[14]};
}

lab_EntityModel.prototype.getAxisX = function() {
    elem = this.transformation.elements;
    return new THREE.Vector3(elem[0], elem[1], elem[2]);
}

lab_EntityModel.prototype.getAxisY = function() {
    elem = this.transformation.elements;
    return new THREE.Vector3(elem[4], elem[5], elem[6]);
}

lab_EntityModel.prototype.getAxisZ = function() {
    elem = this.transformation.elements;
    return new THREE.Vector3(elem[8], elem[9], elem[10]);
}
