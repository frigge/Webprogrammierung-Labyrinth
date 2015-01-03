function lab_GameModel(){
    
    this.level = {};
    
    this.player;

    this.models = {};

    this.collidables = [];
}

lab_GameModel.prototype.init = function(){
    this.player = new lab_PlayerModel();
};

lab_GameModel.prototype.update = function(){
    
};