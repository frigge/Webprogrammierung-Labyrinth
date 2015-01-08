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

// Provides the THREE 3D objects for rendering. This objects 
// are created and enriched by model data
lab_RepresentationLoader.prototype.get3D = function(representationId){
    var representation = this.representations[representationId];    
    if(!representation){
        return false;
    }

    // objects might have no view defined for 3D
    if(!representation.View3D){
        return false;
    }
    
    switch(representation.View3D.category){
        case 'plane': 
            var plane = this.getPlane3D(representation.View3D.width, representation.View3D.height, representation.View3D.scale, representation.View3D.textureUrl);
                // we got the rotaion in degree so we have to convert to rad
                rotationX = ((Math.PI * 2) / 360 ) * representation.View3D.rotation.x;
                rotationY = ((Math.PI * 2) / 360 ) * representation.View3D.rotation.y;
                rotationZ = ((Math.PI * 2) / 360 ) * representation.View3D.rotation.z;
                plane.rotation.set(rotationX, rotationY, rotationZ);
                return plane;
        case 'cube': 
            var cube = this.getCube3D(representation.View3D.textureUrl, representation.View3D.width, representation.View3D.height, representation.View3D.depth);
                return cube;
    }
    
};

// Provides the THREE 2D objects for rendering. This objects 
// are created and enriched by model data
lab_RepresentationLoader.prototype.get2D = function(representationId){
    var representation = this.representations[representationId];
    
    if(!representation){
        return false;
    }

    // objects might have no view defined for 2D
    if(!representation.View2D){
        return false;
    }
    
    var sprite = this.getSprite(representation.View2D.textureUrl, "0xffffff", representation.View2D.scaleX, representation.View2D.scaleY);
        return sprite;    
};

// dynamically setting up a THREE 3D primitive 
// with given data and texture
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

// dynamically setting up a THREE 3D primitive 
// with given data and texture
lab_RepresentationLoader.prototype.getCube3D = function(textureUrl, width, height, depth){
    
    var geometry     = new THREE.BoxGeometry(width, height, depth);
    var texture      = new THREE.ImageUtils.loadTexture(textureUrl);
    var material     = new THREE.MeshLambertMaterial({ map: texture });
            
    return new THREE.Mesh(geometry, material);
    
};

// dynamically setting up a THREE Sprite 
// with given data and texture
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