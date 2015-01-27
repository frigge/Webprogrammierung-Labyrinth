/**
 * This "class" loads the representation of objects.
 * It will tarnslate a object type id into a
 * valid THREE 3D object which will be rendered to
 * our scene
 */
function lab_RepresentationLoader(){
    
    // retrieving the description of how to set up
    // the different world objects
    this.representations = lab_ajaxGetJson('view/objectsDescription.json');
    
}

/**
 * returns a view object depending on the representation type/category
 * @param representationType the type of the representation (e.g. wall)
 * @param representationId the identifier of the representation as used in the objectDescription (e.g. wall)
 * @param width the width of the object (optional)              
 * @param height the height of the object (optional)               
 * @param depth the depth of the object (optional)               
 * @param scaleX the scaleX of the object (optional)              
 * @param scaleY the scaleY of the object (optional)           
 * @return a view object      
 */
lab_RepresentationLoader.prototype.getRepresentation = function(representationType, representationId, width, height, depth, scaleX, scaleY){
    var representation = this.representations[representationId];  
    if(!representation){
        return false;
    }

    // objects might have no view defined
    if(!representation[representationType]){
        return false;
    }

    // returns a object with the given type
    switch(representation[representationType].category){
        case 'plane': 
            var plane = this.getPlane3D(
                    width ? width : representation[representationType].width, 
                    height ? height : representation[representationType].height, 
                    representation[representationType].scale, 
                    representation[representationType].textureUrl
                    );
                // we got the rotaion in degree so we have to convert to rad
                rotationX = ((Math.PI * 2) / 360 ) * representation.View3D.rotation.x;
                rotationY = ((Math.PI * 2) / 360 ) * representation.View3D.rotation.y;
                rotationZ = ((Math.PI * 2) / 360 ) * representation.View3D.rotation.z;
                plane.rotation.set(rotationX, rotationY, rotationZ);
                return plane;
        case 'cube': 
            var cube = this.getCube3D(
                    representation[representationType].textureUrl, 
                    width ? width : representation.View3D.width, 
                    height ? height : representation.View3D.height,
                    depth ? depth : representation.View3D.depth);
                return cube;
        case 'sprite':
            var sprite = this.getSprite(
                    representation[representationType].textureUrl, 
                    0xffffff, 
                    scaleX ? scaleX : representation[representationType].scaleX, 
                    scaleY ? scaleY :  representation[representationType].scaleY);
                return sprite;   
        default:
            break;
    }
}


/**
 * return a plane 3d object
 * @param width the width of the object
 * @param height the height of the object
 * @param scale the scale of the object
 * @param textureUrl the textureUrl of the object
 * @return a plane 3d object
 */
lab_RepresentationLoader.prototype.getPlane3D = function(width, height, scale, textureUrl){

    var geometry    = new THREE.PlaneGeometry(width, height); 
    var texture     = new THREE.ImageUtils.loadTexture(textureUrl);
    
    texture.wrapS   = THREE.RepeatWrapping;
    texture.wrapT   = THREE.RepeatWrapping; 
    
    texture.repeat.set(width * scale, height * scale);

    var material = new THREE.MeshLambertMaterial( {
        map:  texture, 
        side: THREE.DoubleSide
    }); 

    return new THREE.Mesh( geometry, material ); 
    
};


/**
 * return a cube 3d object
 * @param textureUrl the textureUrl of the object
 * @param width the width of the object
 * @param height the height of the object
 * @param depth the depth of the object
 * @return a cube 3d object
 */
lab_RepresentationLoader.prototype.getCube3D = function(textureUrl, width, height, depth){
    
    var geometry     = new THREE.BoxGeometry(width, height, depth);
    var texture      = new THREE.ImageUtils.loadTexture(textureUrl);
    var material     = new THREE.MeshLambertMaterial({ map: texture });
            
    return new THREE.Mesh(geometry, material);
    
};


/**
 * return a sprite object
 * @param textureUrl the textureUrl of the object
 * @param textureColor the textureColor
 * @param scaleX the x scale of the object
 * @param scaleY the y scale of the object
 * @return a sprite object
 */
lab_RepresentationLoader.prototype.getSprite = function(textureUrl, textureColor, scaleX, scaleY){
    
    if(!textureColor){
        textureColor = 0xffffff;
    }
    
    var texture  = THREE.ImageUtils.loadTexture(textureUrl);
    var material = new THREE.SpriteMaterial({ map: texture, color: textureColor});
    var sprite   = new THREE.Sprite(material);
    sprite.scale.set(scaleX, scaleY, 1);
    return sprite;
};