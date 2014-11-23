function lab_AbstractRenderer(width, height){
    
    // make sure instance is created
    if (!(this instanceof lab_AbstractRenderer)){
        return new lab_AbstractRenderer();
    }  
    
    this.init();
    
    this.setSize(width, height);
    
}

lab_AbstractRenderer.prototype.setSize = function(width, height){
    this.renderer.setSize(width, height);
};

lab_AbstractRenderer.prototype.render = function(scene, camera){
    this.renderer.render(scene, camera);
};

lab_AbstractRenderer.prototype.setClearColor = function(color, alpha){
    
    if(!alpha){
        alpha = 1;
    }
    
    this.renderer.setClearColor(color, alpha);
};

lab_AbstractRenderer.prototype.getDomElement = function(){
    return this.renderer.domElement;
};