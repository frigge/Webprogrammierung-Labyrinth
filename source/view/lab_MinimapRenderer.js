/**
 * This renderer is responsible for the minimap.
 * It will set it up and render it to the screen 
 * while it is holding the state of the minimap
 * retrieving level data from the game model.
 * 
 * @param Integer width
 * @param Integer height
 */
function lab_MinimapRenderer(width, height){
    
    // calling parent "class"
    lab_AbstractRenderer.call(this, width, height);
    
}

// inherit from lab_AbstractRenderer
lab_MinimapRenderer.prototype = Object.create(lab_AbstractRenderer.prototype);

// Set the "constructor" property to refer to this object
lab_MinimapRenderer.prototype.constructor = lab_MinimapRenderer;

/**
 * initializes the WebGLRenderer
 */
lab_MinimapRenderer.prototype.init = function(){
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    // set color of the background/sky
    this.setClearColor(0xCCCCCC);
};

/**
 * sets the size of the rendere
 * @param width the width of the renderer
 * @param height the height of the renderer
 */
lab_MinimapRenderer.prototype.setSize = function(width, height){
    this.renderer.setSize(width, height);
};

/**
 * calls the three.js render function 
 * @param scene a three.js scene
 * @param camera a camera
 */
lab_MinimapRenderer.prototype.render = function(scene, camera){
    this.renderer.render(scene, camera);
};

/**
 * sets the background image
 * @param color the background color
 * @param alpha the opacity
 */
lab_MinimapRenderer.prototype.setClearColor = function(color, alpha){
    if(!alpha){
        alpha = 1;
    }
    this.renderer.setClearColor(color, alpha);
};

/**
 * returns the dom element where the render works on
 * @return the dom element
 */
lab_MinimapRenderer.prototype.getDomElement = function(){
    return this.renderer.domElement;
};
