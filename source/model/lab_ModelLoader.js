/**
 * This "class" loads the informations about models.
 * @param  gameModel
 */
function lab_ModelLoader(gameModel){
    
    this.gameModel = gameModel;
    try {
        this.modelDescription = lab_ajaxGetJson('model/modelDescription.json');
    }
    catch(e) {
        throw new Error("Model file could not be loaded! Reason: " + e.message);
    }
}

/**
 * creates a model from a token
 * @param token the token which defines a model
 * @return the model instance
 */
lab_ModelLoader.prototype.createModelByToken = function(mapToken){
    for(var modelName in this.modelDescription){
        if (this.modelDescription[modelName].mapToken == mapToken) {
            var model = this.createModelByName(modelName);
        }
    }
    return model;
};  

/**
 * creates a model from a name
 * @param name the name/type of the model
 * @return the model instance
 */
lab_ModelLoader.prototype.createModelByName = function(name){
    var className = this.modelDescription[name].className;
    if (className == undefined) {
        throw new error("Model not existing");
    } else {
        // return new instance of the "class" of the specific model
        return new window[className](this.gameModel);
    }
};

/**
 * checks if token exists
 * @param mapToken 
 * @return {boolean} true if token exists, false if not
 */
lab_ModelLoader.prototype.tokenExists = function(mapToken){
    for(var modelName in this.modelDescription){
        if (this.modelDescription[modelName].mapToken == mapToken) {
            return true;
        }
    }
    return false;
};  