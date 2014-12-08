function lab_EntityModel(){
    
    this.id;
    
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