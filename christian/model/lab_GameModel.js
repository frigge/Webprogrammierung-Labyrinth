function lab_GameModel(){
    
    // make sure instance is created
    if (!(this instanceof lab_GameModel)){
        return new lab_GameModel();
    }
    
    this.level = {};
    
}

lab_GameModel.prototype.getCurrentLevel = function(){
    return this.level;
};