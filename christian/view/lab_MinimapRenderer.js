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
    
    this.minimap.style.position         = "absolute";
    this.minimap.style.left             = 0;
    this.minimap.style.bottom           = 0;
    this.minimap.style.backgroundColor  = 'green';
//    this.minimap.style.overflow         = "hidden";
    
};

lab_MinimapRenderer.prototype.render = function(scene, clock){
    
    var elapsedTime = parseInt(clock.getElapsedTime() * 10);
    
    if(elapsedTime % 4562 === 0){
        this.minimap.appendChild(scene);
    }
};

lab_MinimapRenderer.prototype.getDomElement = function(){
    return this.minimap;
};

lab_MinimapRenderer.prototype.setSize = function(width, height){
    this.minimapHeight  = height;
    this.minimapWidth   = width;
    
    this.minimap.style.width    = this.minimapWidth + 'px';
    this.minimap.style.height   = this.minimapHeight + 'px';
    
};
