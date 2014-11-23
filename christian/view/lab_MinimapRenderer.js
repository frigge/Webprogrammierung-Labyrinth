function lab_MinimapRenderer(width, height){
    
    // make sure instance is created
    if (!(this instanceof lab_MinimapRenderer)){
        return new lab_MinimapRenderer();
    }
    
    lab_AbstractRenderer.call(this, width, height);
    
}

// inherit from lab_AbstractRenderer
lab_MinimapRenderer.prototype = Object.create(lab_AbstractRenderer.prototype);

// Set the "constructor" property to refer to lab_MinimapRenderer
lab_MinimapRenderer.prototype.constructor = lab_MinimapRenderer;

lab_MinimapRenderer.prototype.init = function(){
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.setClearColor(0xFFFFFF);
};
