function lab_LevelController(){
    
    this.entities;
    this.worldElements;
    
    this.loader = new lab_RepresentationLoader();
    
}

lab_LevelController.prototype.getEntities3D = function(){
    return new Array();
};

lab_LevelController.prototype.getWorldElements3D = function(){
    

    // build a example world with random walls
    var worldElements = new Array();
    
    var floor   = this.loader.get3D('floor');
        floor.position.set(0,0,0);
        worldElements.push(floor);
    var ceiling = this.loader.get3D('ceiling');
        ceiling.position.set(0,5,0);
        worldElements.push(ceiling);
    
    var element;
    var rangeX = 20;
    var rangeY = 5;
    
    for(var i = 0; i < 150; i++){
        var x = Math.max((randomInt(rangeX) - 0.5) , 0);
            x = rangeX - (2 * x) - 0.5;
        var z  = Math.max((randomInt(rangeX) - 0.5), 0);
            z = rangeX - (2 * z) - 0.5;
        var y = Math.min((randomInt(rangeY) + 0.51), 4.48);
        
        console.log(x);
        console.log(y);
        console.log(z);
        
        element = this.loader.get3D('wall');
        element.position.set(x, y, z);
        worldElements.push(element);
    }
    
    return worldElements;
};