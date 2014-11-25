/**
 * This renderer is responsible for the minimap.
 * It will set it up and render it to the screen 
 * while it is holding the state of the minimap
 * retrieving level data from the game model.
 * 
 * 
 * @param Integer width
 * @param Integer height
 */
function lab_MinimapRenderer(width, height){
    
    // calling parent "class"
    lab_AbstractRenderer.call(this, width, height);
    
    this.minimap;
    this.minimapHeight;
    this.minimapWidth;
    
}

// inherit from lab_AbstractRenderer
lab_MinimapRenderer.prototype = Object.create(lab_AbstractRenderer.prototype);

// Set the "constructor" property to refer to lab_MinimapRenderer
lab_MinimapRenderer.prototype.constructor = lab_MinimapRenderer;

lab_MinimapRenderer.prototype.init = function(){

    this.minimap = document.createElement('div');
    this.minimap.setAttribute('id', 'minimap');
    
};

lab_MinimapRenderer.prototype.render = function(level){
    this.minimap.childNodes[0].nodeValue = new Date().getTime();
};

lab_MinimapRenderer.prototype.getDomElement = function(){
    return this.minimap;
};

lab_MinimapRenderer.prototype.setSize = function(width, height){
    this.minimapHeight  = height;
    this.minimapWidth   = width;
    
    this.minimap.style.width    = this.minimapWidth + 'px';
    this.minimap.style.height   = this.minimapHeight + 'px';
    
    this.minimap.appendChild(document.createTextNode('')); 
};
