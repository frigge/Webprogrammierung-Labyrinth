function lab_LabyrinthRenderer(){
    
    // make sure instance is created
    if (!(this instanceof lab_LabyrinthRenderer)){
        return new lab_LabyrinthRenderer();
    }  
    
    lab_Renderer.call(this);
    
}

// inherit from lab_EntityModel
lab_LabyrinthRenderer.prototype = Object.create(lab_Renderer.prototype);

// Set the "constructor" property to refer to lab_LabyrinthRenderer
lab_LabyrinthRenderer.prototype.constructor = lab_LabyrinthRenderer;

lab_LabyrinthRenderer.prototype.init = function(){
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setClearColor(0xFFFFFF, 1);
};

