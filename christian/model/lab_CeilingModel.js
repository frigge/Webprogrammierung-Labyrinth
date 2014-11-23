function lab_CeilingModel(){
    
    // make sure instance is created
    if (!(this instanceof lab_CeilingModel)){
        return new lab_CeilingModel();
    }
    
    lab_EntityModel.call(this);
    
    this.id = 'ceiling';
    
}

// inherit from lab_EntityModel
lab_CeilingModel.prototype = Object.create(lab_CeilingModel.prototype);

// Set the "constructor" property to refer to lab_CeilingModel
lab_CeilingModel.prototype.constructor = lab_CeilingModel;