function lab_LevelController(levelConfiguration){
    
    this.level = levelConfiguration;
    
    this.entities;
    this.worldElements;
    
    this.loader = new lab_RepresentationLoader();
    
}

lab_LevelController.prototype.createLevel = function(){};
lab_LevelController.prototype.loadLevel = function(){};

lab_LevelController.prototype.getEntities = function(){
    return new Array();
};

lab_LevelController.prototype.getWorldElements = function(){
    
    var worldElements = new Array();
    
    var floor   = this.loader.get('floor');
        floor.position.set(0,0,0);
        worldElements.push(floor);
    var ceiling = this.loader.get('ceiling');
        ceiling.position.set(0,3,0);
        worldElements.push(ceiling);
    
    var currentObject;
    for(var i=0;i<this.level.length;i++){
        for(var j=0;j<this.level[i].length;j++){
            if('' !== this.level[i][j]){
                currentObject = this.loader.get(this.level[i][j]);
                currentObject.position.set(i - 5,0.5,j - 5);
                worldElements.push(currentObject);
                currentObject = this.loader.get(this.level[i][j]);
                currentObject.position.set(i - 5,1.5,j - 5);
                worldElements.push(currentObject);
                currentObject = this.loader.get(this.level[i][j]);
                currentObject.position.set(i - 5,2.5,j - 5);
                worldElements.push(currentObject);
            }
        }
    }
    
    return worldElements;
    
};

lab_LevelController.prototype.getLevel = function(){
    
};

lab_LevelController.prototype.setLevel = function(){};
