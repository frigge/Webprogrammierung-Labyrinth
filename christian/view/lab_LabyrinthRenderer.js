/**
 * This renderer is responsible for the 3D content.
 * It will be initialized by the gamecontroller and
 * its render method will be clled by the game loop.
 * 
 * @param Integer width
 * @param Integer height
 */
function lab_LabyrinthRenderer(width, height){
    
    // calling parent "class"
    lab_AbstractRenderer.call(this, width, height);
    
}

// inherit from lab_AbstractRenderer
lab_LabyrinthRenderer.prototype = Object.create(lab_AbstractRenderer.prototype);

// Set the "constructor" property to refer to lab_LabyrinthRenderer
lab_LabyrinthRenderer.prototype.constructor = lab_LabyrinthRenderer;

lab_LabyrinthRenderer.prototype.init = function(){
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.setClearColor(0xDDCDD0);
};

lab_LabyrinthRenderer.prototype.setSize = function(width, height){
    this.renderer.setSize(width, height);
};

lab_LabyrinthRenderer.prototype.render = function(scene, camera){
    this.renderer.render(scene, camera);
};

lab_LabyrinthRenderer.prototype.setClearColor = function(color, alpha){
    if(!alpha){
        alpha = 1;
    }
    this.renderer.setClearColor(color, alpha);
};

lab_LabyrinthRenderer.prototype.getDomElement = function(){
    return this.renderer.domElement;
};
