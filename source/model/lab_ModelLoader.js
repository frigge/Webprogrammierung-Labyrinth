/**
 * This "class" loads the informations about models.
 */
function lab_ModelLoader(gameModel){
    
    this.gameModel = gameModel;

    this.modelDescription = lab_ajaxGetJson('model/modelDescription.json');

}

lab_ModelLoader.prototype.createModelByName = function(name){
    var model = this.models[name];
    
    if(!name){
        return false;
    }
    
    // return new instance of the "class" of the specific model
    return new window[model.class]();
};

lab_ModelLoader.prototype.tokenExists = function(mapToken){
    for(var modelName in this.modelDescription){
        if (this.modelDescription[modelName].mapToken == mapToken) {
            return true;
        }
    }
    return false;
};  

lab_ModelLoader.prototype.createModelByToken = function(mapToken){
    for(var modelName in this.modelDescription){
        if (this.modelDescription[modelName].mapToken == mapToken) {
            // return new instance of the "class" of the specific model
            return new window[this.modelDescription[modelName].className](this.gameModel);
        }
    }
    return false;
};  