// TODO: Minimap
function lab_MinimapRenderer(width, height){
    
    // calling parent "class"
    lab_AbstractRenderer.call(this, width, height);

    
}

// inherit from lab_AbstractRenderer
lab_MinimapRenderer.prototype = Object.create(lab_AbstractRenderer.prototype);

// Set the "constructor" property to refer to lab_MinimapRenderer
lab_MinimapRenderer.prototype.constructor = lab_MinimapRenderer;