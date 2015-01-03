/**
 * This "class" loads the informations about models.
 */
function lab_ModelLoader(){
    
    this.models = lab_ajaxGetJson('model/modelDescription.json');

}

lab_ModelLoader.prototype.createModelByName = function(name){
    var model = this.models[name];
    
    if(!name){
        return false;
    }
    
    // return new instance of the "class" of the specific model
    return new window[model.class]();
};

lab_ModelLoader.prototype.createModelByToken = function(mapToken){
    for(var modelId in this.models){
        // console.log(modelId);
        if (this.models[modelId].mapToken == mapToken) {
            // return new instance of the "class" of the specific model
            return new window[this.models[modelId].class]();
        }
    }
    return false;
};  