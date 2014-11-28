function lab_GameModel(){
    
    this.level = {};
    
    this.player;
}

lab_GameModel.prototype.init = function(){
    this.player = new lab_PlayerModel();
};

lab_GameModel.prototype.update = function(){
    
};


// will provide a json encoded list of the level elements
lab_GameModel.prototype.getCurrentLevel = function(){
    return lab_ajaxGetJson('resources/level.json');
};