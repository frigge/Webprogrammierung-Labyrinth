/**
 * This renderer is responsible for the 3D content.
 * It will be initialized by the gamecontroller and
 * its render method will be called by the game loop.
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

// Set the "constructor" property to refer to this object
lab_LabyrinthRenderer.prototype.constructor = lab_LabyrinthRenderer;

/**
 * initializes the WebGLRenderer
 */
lab_LabyrinthRenderer.prototype.init = function(){
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    // set color of the background/sky
    this.setClearColor(0x00AADD);
};

/**
 * sets the size of the rendere
 * @param width the width of the renderer
 * @param height the height of the renderer
 */
lab_LabyrinthRenderer.prototype.setSize = function(width, height){
    this.renderer.setSize(width, height);
};

/**
 * calls the three.js render function 
 * @param scene a three.js scene
 * @param camera a camera
 */
lab_LabyrinthRenderer.prototype.render = function(scene, camera){
    this.renderer.render(scene, camera);
};

/**
 * sets the background image
 * @param color the background color
 * @param alpha the opacity
 */
lab_LabyrinthRenderer.prototype.setClearColor = function(color, alpha){
    if(!alpha){
        alpha = 1;
    }
    this.renderer.setClearColor(color, alpha);
};

/**
 * returns the dom element where the render works on
 * @return the dom element
 */
lab_LabyrinthRenderer.prototype.getDomElement = function(){
    return this.renderer.domElement;
};
