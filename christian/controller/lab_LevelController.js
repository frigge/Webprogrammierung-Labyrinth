function lab_LevelController(levelConfiguration){
    
    this.level = levelConfiguration;
    
    this.entities;
    this.worldElements;
    
    this.loader = new lab_RepresentationLoader();
    
}

lab_LevelController.prototype.setLevel = function(currentLevel){
    this.level = currentLevel;
};

lab_LevelController.prototype.getEntities3D = function(){
    return new Array();
};

lab_LevelController.prototype.getEntities2D = function(){
    return new Array();
};

// glue together the model data of world objects an the 
// representation of those objects
lab_LevelController.prototype.getWorldElements3D = function(){
    
    var worldElements = new Array(),
        worldElement;

    for(var elementType in this.level){
        elementGroup = this.level[elementType];
        for(var i = 0; i < elementGroup.length; i++){
            worldElement = this.loader.get3D(elementType);
            worldElement.position.set(elementGroup[i].x,elementGroup[i].y,elementGroup[i].z);
            worldElements.push(worldElement);
        }
    }
    
    return worldElements;
    
};

// glue together the model data of world objects an the 
// representation of those objects
lab_LevelController.prototype.getWorldElements2D = function(){
    
    var worldElements = new Array(),
        worldElement;

    for(var elementType in this.level){
//        if('ceiling' === elementType || 'floor' === elementType){
//            continue;
//        }
        elementGroup = this.level[elementType];
        for(var i = 0; i < elementGroup.length; i++){
            if(1.5 < elementGroup[i].y){
                continue;
            }
            worldElement = this.loader.get2D(elementType);
            worldElement.style.position = "absolute";
            worldElement.style.left     = (elementGroup[i].z * 15) + 170 + 'px';
            worldElement.style.top      = (elementGroup[i].x * 15) + 110 + 'px';
            worldElement.style.zIndex   = elementGroup[i].y * 10;
            worldElements.push(worldElement);
        }
    }
    
    return worldElements;
    
};