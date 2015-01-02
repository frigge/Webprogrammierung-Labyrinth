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
    var medikit = this.loader.get3D('medikit');
        medikit.position.set(0,1,1);
        worldElements.push(medikit);
 
	
	// load level data from Json file
	var level = lab_ajaxGetJson('view/level-01.json');
	console.log("Level loaded with ajaxGetJson");

    var element;

	// push elemnts from the level file to the world	
	for (i=0; i<40; i++) {
		var str = level.level01[i].line;
		console.log(str);
		for (j=0; j<40; j++) {
			// # = normal wall
			if (str[j] == "#") {
				// from floor to ceiling
				for (k=0; k<5; k++) {
					element = this.loader.get3D('wall');
					element.position.set(j-19.5, k+0.5, i-19.5);
					worldElements.push(element); 				
				}
			}
		}
	}


    
    return worldElements;
};