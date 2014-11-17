function lab_EntityModel(){
    
    // make sure instance is created
    if (!(this instanceof lab_EntityModel)){
        return new lab_EntityModel();
    }
    
    /**
     * @type object
     */
    this.position = {x: 0, y: 0, z: 0};
    
}

lab_EntityModel.prototype.setPosition = function(entityPosition){
    this.position = entityPosition;
};

lab_EntityModel.prototype.getPosition = function(){
    return this.position;
};