function lab_GameModel(){
    
    this.level = {};
    
    this.player;

    this.models = {};

    this.collidables = [];

    // if a state of a model changes, it will be added here which
    // is then processed in the gameController to update the 
    // view accordingly
    this.updateList = {};

    this.areaEventList = {};
}

lab_GameModel.prototype.init = function(){
    this.player = new lab_PlayerModel(this);
};

lab_GameModel.prototype.update = function(){
    
};

lab_GameModel.prototype.addModelToUpdateList = function(model){
    this.updateList[model.id] = model;
};

lab_GameModel.prototype.removeModelFromUpdateList = function(model){
    delete this.updateList[model.id];
};

lab_GameModel.prototype.addModelToAreaEventList = function(model){
    this.areaEventList[model.id] = model;
};

lab_GameModel.prototype.removeModelFromAreaEventList = function(model){
    delete this.areaEventList[model.id];
};