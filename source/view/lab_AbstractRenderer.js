/**
 * Abstract "class" for different renderer
 * @param width 
 * @param height 
 * @abstract
 */
function lab_AbstractRenderer(width, height){
    // calls init function of the renderer
    this.init();
    
    // set size
    this.setSize(width, height);
}