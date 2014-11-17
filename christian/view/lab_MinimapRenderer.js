function lab_MinimapRenderer(){
    
    // make sure instance is created
    if (!(this instanceof lab_MinimapRenderer)){
        return new lab_MinimapRenderer();
    }
    
    var renderer;
    
    function init(){
        
    }
    
    init();
}

// inherit from lab_EntityModel
lab_MinimapRenderer.prototype = Object.create(lab_Renderer.prototype);

// Set the "constructor" property to refer to lab_MinimapRenderer
lab_MinimapRenderer.prototype.constructor = lab_MinimapRenderer;

