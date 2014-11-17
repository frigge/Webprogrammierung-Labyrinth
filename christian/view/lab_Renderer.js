function lab_Renderer(){
    
    // make sure instance is created
    if (!(this instanceof lab_Renderer)){
        return new lab_Renderer();
    }  
    
    this.renderer = new THREE.WebGLRenderer();
    
}

lab_Renderer.prototype.setSize = function(width, height){
    this.renderer.setSize(width, height);
};

lab_Renderer.prototype.render = function(scene, camera){
    this.renderer.render(scene, camera);
};

lab_Renderer.prototype.getDomElement = function(){
    return this.renderer.domElement;
};