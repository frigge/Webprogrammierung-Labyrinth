function lab_LevelHandler(levelConfiguration){
    
    // make sure instance is created
    if (!(this instanceof lab_LevelHandler)){
        return new lab_LevelHandler();
    }
    
    this.entities;
    this.worldElements;
    
    this.loader = new lab_RepresentationLoader();
    
}

lab_LevelHandler.prototype.createLevel = function(){};
lab_LevelHandler.prototype.loadLevel = function(){};

lab_LevelHandler.prototype.getEntities = function(){
    return new Array();
};

lab_LevelHandler.prototype.getWorldElements = function(){
    
    var worldElements = new Array();
    
    var floor   = this.loader.get('floor');
        floor.position.set(0,0,0);
        worldElements.push(floor);
    var ceiling = this.loader.get('ceiling');
        ceiling.position.set(0,5,0);
        worldElements.push(ceiling);
    
    var element;
    var rangeX = 20;
    var rangeY = 5;
    
    for(var i = 0; i < 200; i++){
        var x = Math.max((randomInt(rangeX) - 0.5) , 0);
            x = rangeX - (2 * x) - 0.5;
        var z  = Math.max((randomInt(rangeX) - 0.5), 0);
            z = rangeX - (2 * z) - 0.5;
        var y = Math.min((randomInt(rangeY) + 0.51), 4.48);
        
        console.log(x);
        console.log(y);
        console.log(z);
        
        element = this.loader.get('wall');
        element.position.set(x, y, z);
        worldElements.push(element);
    }
    
    return worldElements;
};

lab_LevelHandler.prototype.getLevel = function(){
};

lab_LevelHandler.prototype.setLevel = function(){};
