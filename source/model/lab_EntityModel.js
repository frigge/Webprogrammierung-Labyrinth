function lab_EntityModel(gameModel){
    
    this.gameModel = gameModel;

    /* COLLISION DETECTION */
    this.raycaster       = new THREE.Raycaster();
    this.raycaster.near = .01;
    this.raycaster.far  = 1000;

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

//utillity method that checks for collisions with other objects
//given a position and a direction
lab_EntityModel.prototype.checkCollision = function(position, direction) {
    this.raycaster.set(position, direction);

    var collidables = gameController.levelController.collidables;
    var collisions = this.raycaster.intersectObjects( collidables );

    if(collisions.length == 0) 
        return false;

    collisions.sort(function(a,b){
        return a.distance-b.distance;
    });

    return collisions[0];
}
