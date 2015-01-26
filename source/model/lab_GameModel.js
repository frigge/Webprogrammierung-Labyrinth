/**
 * Game model
 * Holds information about the game state
 */
function lab_GameModel(){
    
    // the player model
    this.player;

    // all other models
    this.models = {};

    // if a state of a model changes, it will be added here which
    // is then processed in the gameController to update the 
    // view accordingly
    this.updateList = {};

    // all objects which have area events are collected here
    this.areaEventList = {};

    // the game is won
    this.won = false;

    // the game is lost
    this.lost = false;
}

/**
 * adds model to the update list, which saves all entities which have been modified
 */
lab_GameModel.prototype.addModelToUpdateList = function(model){
    this.updateList[model.id] = model;
};

/**
 * removes model from the update list, which saves all entities which have been modified
 */
lab_GameModel.prototype.removeModelFromUpdateList = function(model){
    delete this.updateList[model.id];
};

/**
 * adds model to the area event list, which saves all entities which have area events
 */
lab_GameModel.prototype.addModelToAreaEventList = function(model){
    this.areaEventList[model.id] = model;
};

/**
 * adds model to the area event list, which saves all entities which have area events
 */
lab_GameModel.prototype.removeModelFromAreaEventList = function(model){
    delete this.areaEventList[model.id];
};
