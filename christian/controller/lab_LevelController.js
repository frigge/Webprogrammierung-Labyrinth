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
        ceiling.position.set(0,5,0);
        worldElements.push(ceiling);
    
    var currentObject;
    for(var i=0;i<this.level.length;i++){
        for(var j=0;j<this.level[i].length;j++){
            if('' !== this.level[i][j]){
                currentObject = this.loader.get(this.level[i][j]);
                currentObject.position.set(i,0.5,j);
                worldElements.push(currentObject);
                currentObject = this.loader.get(this.level[i][j]);
                currentObject.position.set(i,1.5,j);
                worldElements.push(currentObject);
                currentObject = this.loader.get(this.level[i][j]);
                currentObject.position.set(i,2.5,j);
                worldElements.push(currentObject);
            }
        }
    }
    
    console.log(worldElements);
    
    
    return worldElements;
    
//    var worldElements = new Array();
//    
//    var floor   = this.loader.get('floor');
//        floor.position.set(0,0,0);
//        worldElements.push(floor);
//    var ceiling = this.loader.get('ceiling');
//        ceiling.position.set(0,5,0);
//        worldElements.push(ceiling);
//    
//    var element;
//    var rangeX = 20;
//    var rangeY = 5;
//    
//    for(var i = 0; i < 200; i++){
//        var x = Math.max((randomInt(rangeX) - 0.5) , 0);
//            x = rangeX - (2 * x) - 0.5;
//        var z  = Math.max((randomInt(rangeX) - 0.5), 0);
//            z = rangeX - (2 * z) - 0.5;
//        var y = Math.min((randomInt(rangeY) + 0.51), 4.48);
//        
//        element = this.loader.get('wall');
//        element.position.set(x, y, z);
//        worldElements.push(element);
//    }
//    
//    return worldElements;
};

lab_LevelController.prototype.getLevel = function(){
    
};

lab_LevelController.prototype.setLevel = function(){};
