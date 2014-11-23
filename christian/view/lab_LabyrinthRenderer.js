function lab_LabyrinthRenderer(width, height){
    
    // make sure instance is created
    if (!(this instanceof lab_LabyrinthRenderer)){
        return new lab_LabyrinthRenderer();
    }  
    
    lab_AbstractRenderer.call(this, width, height);
    
}

// inherit from lab_AbstractRenderer
lab_LabyrinthRenderer.prototype = Object.create(lab_AbstractRenderer.prototype);

// Set the "constructor" property to refer to lab_LabyrinthRenderer
lab_LabyrinthRenderer.prototype.constructor = lab_LabyrinthRenderer;

lab_LabyrinthRenderer.prototype.init = function(){
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.setClearColor(0xDDDDD0);
};

