function lab_GameModel(){
    
    this.level = {};
    
    this.player;

    this.models = {};

    // if a state of a model changes, it will be added here which
    // is then processed in the gameController to update the 
    // view accordingly
    this.updateList = {};

    this.areaEventList = {};
}

lab_GameModel.prototype.init = function(){
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
