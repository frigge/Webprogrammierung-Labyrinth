function lab_RepresentationLoader(){
    
    // make sure instance is created
    if (!(this instanceof lab_RepresentationLoader)){
        return new lab_RepresentationLoader();
    }
    
    this.representations = {
        floor: {
            name:       'Floor',
            category:   'plane',
            width:      40,
            height:     40,
            rotation:   {x: Math.PI / 2, y: 0.0, z: 0.0},
            textureUrl: 'view/images/floor.jpg'
        },
        ceiling: {
            name:       'Ceiling',
            category:   'plane',
            width:      40,
            height:     40,
            rotation:   {x: Math.PI / 2, y: 0.0, z: 0.0},
            textureUrl: 'view/images/floor.jpg'
        },
        wall: {
            name:       'Wall Element',
            category:   'cube',
            width:      1.0,
            height:     1.0,
            depth:      1.0,
            textureUrl: 'view/images/crate.jpg'
        }
    };
    
}

lab_RepresentationLoader.prototype.get = function(representationId){
    var representation = this.representations[representationId];
    
    if(!representation){
        return false;
    }
    
    switch(representation.category){
        case 'plane': 
            var plane = this.getPlane(representation.width, representation.height, representation.textureUrl);
                plane.rotation.set(representation.rotation.x,representation.rotation.y,representation.rotation.z);
                return plane;
        case 'cube': 
            var cube = this.getCube(representation.textureUrl, representation.width, representation.height, representation.depth);
                return cube;
    }
    
};

lab_RepresentationLoader.prototype.getPlane = function(width, height, textureUrl){

    var geometry    = new THREE.PlaneGeometry(width, height); 
    var texture     = new THREE.ImageUtils.loadTexture(textureUrl);
    
    texture.wrapS   = THREE.RepeatWrapping;
    texture.wrapT   = THREE.RepeatWrapping; 
    
    texture.repeat.set(width, height);

    var material = new THREE.MeshLambertMaterial( {
        map:  texture, 
        side: THREE.DoubleSide
    }); 

    return new THREE.Mesh( geometry, material ); 
    
};

lab_RepresentationLoader.prototype.getCube = function(textureUrl, width, height, depth){
    
    var geometry     = new THREE.BoxGeometry(width, height, depth);
    var texture      = new THREE.ImageUtils.loadTexture(textureUrl);
    var material     = new THREE.MeshLambertMaterial({ map: texture });
            
    var mesh = new THREE.Mesh(geometry, material);
        mesh.doubleSided = true;
    
    return mesh;
};






