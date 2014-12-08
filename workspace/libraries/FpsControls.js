var FpsControls = FpsControls || {};

function FpsControls(configurationObject){
    
    if (!(this instanceof FpsControls)){
        return new FpsControls(configurationObject);
    }
    
    /* GENERAL VARIABLES */
    var activated       = false;
    
    
    /* MOVEMENT */
    var moveForward         = false;
    var moveBackward        = false;
    var moveLeft            = false;
    var moveRight           = false;

    var sprint              = false;
    var crouch              = false;
    var crouching           = false;
    var jump                = false;
    var jumping             = false;
    var up                  = false;
    var down                = false;
    
    var currentHeight       = 0;
    
    var velocity        = new THREE.Vector3();
    
    /* VIEW */
    var yawObject   = new THREE.Object3D();
    var pitchObject = new THREE.Object3D();
    var PI_2        = Math.PI / 2;
    
    /* COLLISION DETECTION */
    var raycaster       = new THREE.Raycaster();
    
    var directionDown   = new THREE.Vector3(0, -1, 0);
    var directionUp     = new THREE.Vector3(0, 1, 0);
    
    var leftDirection   = new THREE.Vector3();
    var rightDirection  = new THREE.Vector3();
    
    var upDetection     = false;
    
    
    /* CONFIGURATION */
    var configuration = {
        normalSpeed:    40,
        sprintSpeed:    80,
        crouchSpeed:    10,
        jumpHeight:     8,
        crouchHeight:   0.9,
        debug:          false,
        camera:         {},
        cameraHeight:   1.8,
        cameraStartPosition: {
            x: 0,
            y: 1.8,
            z: 6
        },
        clock: new THREE.Clock(true),
        movement:       {
            forward:        87, // w
            left:           65, // a
            backward:       83, // s
            right:          68, // d
            up:             69, // e
            down:           81, // q
            jump:           32, // SPACE
            sprint:         16, // SHIFT
            crouch:         17  // CONTROL
        },
        invertMouse:                false,
        fly:                        false,
        collidables:                [],
        xCollisionHeights:          [1.8, 1.5, 1.2, 0.9, 0.6, 0.3, 0.1],
        xCollisionCrouchHeights:    [0.9, 0.6, 0.3, 0.1]
    };
    
    var debug = function(message){
        if(configuration.debug){
            console.debug(message);
        }
    };
    
    var warn = function(message){
        console.warn(message);
    };
    
    var error = function(message){
        console.error(message);
    };
    
    
    var init = function(){
        initConfiguration();
        initCamera();
        initMovement();
        initPointerLock();
    };
    
    var initConfiguration = function(){
        
        for (var property in configurationObject){
            if(typeof configuration[property] === 'undefined'){
                warn('Invalid configuration property given: '+property+'. Skipping that property.');
            } else {
                configuration[property] = configurationObject[property];
            }
        }
        
        if(!(configuration.camera instanceof THREE.Camera)){
            error('Camera must be set and must be an instance of THREE.Camera');
        }
        
        debug('Initializing configuration done.');
        debug('Configuration:');
        debug(configuration);
        
    };
    
    var initCamera = function(){
        
        debug('Initializing camera ...');
        
        configuration.camera.position.set( 0, 0, 0 );

        debug('Initializing camera with x=0 y=0 z=0');
        
        configuration.camera.rotation.set( 0, 0, 0 );
        
        debug('Camera rotation set to x=0 y=0 z=0');
        
        pitchObject.add(configuration.camera);
        yawObject.add(pitchObject);
        
        var x = configuration.cameraStartPosition.x,
            y = configuration.cameraStartPosition.y,
            z = configuration.cameraStartPosition.z;
    
        yawObject.position.set(x, y, z);

        debug('Initial view point set to x='+x+' y='+y+' z='+z);
        
    };
    
    var initMovement = function (){
        
        debug('Initializing movement ...');
        
        document.addEventListener( 'mousemove', onMouseMove);
        document.addEventListener( 'keydown',   onKeyDown);
        document.addEventListener( 'keyup',     onKeyUp);
        
        currentHeight = configuration.cameraHeight;
        
    };
    
    /* #################### */
    
    var onMouseMove = function ( event ) {
        
        if(!activated) return;

        var invertFactor = configuration.invertMouse ? -1 : 1 ;

        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        
        yawObject.rotateY(movementX * -0.002);
        
        pitchObject.rotateX(invertFactor * movementY * -0.002);
        pitchObject.rotation.x  = Math.max( -1 * (PI_2 - 0.5), Math.min( PI_2, pitchObject.rotation.x ) );
        
        
    };

    var onKeyDown = function ( event ) {
        
        var movement = configuration.movement;
        
        switch ( event.keyCode ) {
            case movement.jump:     jump            = true; break;
            case movement.up:       up              = true; break;
            case movement.down:     down            = true; break;
            case movement.sprint:   sprint          = true; break;
            case movement.crouch:   crouch          = true; break;
            
            case movement.forward:  moveForward     = true; break;
            case movement.left:     moveLeft        = true; break;
            case movement.backward: moveBackward    = true; break;
            case movement.right:    moveRight       = true; break;
        }
        
        debug('Key down: '+event.key+' ('+event.keyCode+')');
        
        if(sprint || crouch) {
            event.preventDefault();
        }

    };

    var onKeyUp = function ( event ) {

        var movement = configuration.movement;

        switch( event.keyCode ) {
            case movement.jump:     jump            = false; break;
            case movement.up:       up              = false; break;
            case movement.down:     down            = false; break;
            case movement.sprint:   sprint          = false; break;
            case movement.crouch:   crouch          = false; break;
            
            case movement.forward:  moveForward     = false; break;
            case movement.left:     moveLeft        = false; break;
            case movement.backward: moveBackward    = false; break;
            case movement.right:    moveRight       = false; break;
        }
        
        debug('Key up: '+event.key+' ('+event.keyCode+')');
        
    };
    
    var detectXCollisions = function( delta ){
        
        var direction = getDirection( delta );
        var positions = getPositions( direction );
        
        var collisionObjects = [];
        for(var i = 0 ; i < positions.length; i++){
            collisionObject = getNearestCollisionObject(positions[i], direction);
            if(collisionObject){
                collisionObjects.push(collisionObject);
            }
        }
        
        if(collisionObjects.length === 0){
            return false;
        }
        
        collisionObjects.sort(function(a,b){
            return a.distance-b.distance;
        });
        
        if(collisionObjects[0].distance < 0.3){
            return true;
        }
        
        return false;
        
    };
    
    var detectYCollisions = function() {
        
        if(configuration.collidables.length === 0){
            return;
        }
        
        var position        = yawObject.position.clone();
        var collisionObject = false;
        
        /* PROCESSING COLLISION DETECTION: DOWN */
        collisionObject = getNearestCollisionObject(position, directionDown);
        if(collisionObject){
            if(collisionObject.distance < currentHeight){
                velocity.y = 0;
                yawObject.position.y += currentHeight - collisionObject.distance;
                jumping = false;
                debug('Y collision detected (DOWN).');
            } else if(collisionObject.distance > currentHeight){
                velocity.y -= 0.5;
            }
        } else {
            velocity.y -= 0.5;
        }
        
        /* PROCESSING COLLISION DETECTION: UP */
        collisionObject = getNearestCollisionObject( position, directionUp );
        if(collisionObject){
            //ToDo: CROUCH CONTROL if gap to big
            if(collisionObject.distance < 0.3){
                upDetection = true;
                if(velocity.y > collisionObject.distance){
                    velocity.y = collisionObject.distance - 0.05;
                    debug('Y collision detected (UP).');
                }
            } else {
                upDetection = false;
            }
        } else {
            upDetection = false;
        }
        
        
    };
    
    var getDirection = function( delta ){
        
        var tmp = yawObject.clone();
        tmp.translateX( velocity.x * delta );
        tmp.translateY( velocity.y * delta ); 
        tmp.translateZ( velocity.z * delta );
        
        var currentPosition = yawObject.position.clone();
        currentPosition.y   = 0;
        tmp.position.y      = 0;
        
        var direction = new THREE.Vector3();
        direction.subVectors(tmp.position, currentPosition);
        direction.normalize();
        
        return direction;
        
    };
    
    var getPositions = function( direction ){
        
        var centerPosition  = yawObject.position.clone();
        
        leftDirection.z = -1 * direction.x,
        leftDirection.x = direction.z;
        leftDirection.y = 0;
        
        var distanceLeft = leftDirection.multiplyScalar(0.2);
        var leftPosition = centerPosition.clone().add(distanceLeft); 
        
        rightDirection.x = -1 * direction.z,
        rightDirection.z = direction.x;
        rightDirection.y = 0;
        
        var distanceRight = rightDirection.multiplyScalar(0.2);
        var rightPosition = centerPosition.clone().add(distanceRight); 
        
        var positionTypes   = [leftPosition, centerPosition, rightPosition];
        var positions       = [];
        var heights         = configuration.xCollisionHeights;
        var crouchHeights   = configuration.xCollisionCrouchHeights;
        
        if(crouch){
            heights = crouchHeights;
        }
        
        for(var typeIndex = 0; typeIndex < positionTypes.length; typeIndex++){
            for(var heightIndex = 0; heightIndex < heights.length; heightIndex++){
                var x = positionTypes[typeIndex].x;
                var y = (positionTypes[typeIndex].y - currentHeight) + heights[heightIndex];
                var z = positionTypes[typeIndex].z;
                positions.push(new THREE.Vector3(x, y, z));
            }
        }
        
        return positions;
        
    };
    
    var getNearestCollisionObject = function( position, direction ){
        
        var intersectionObjects = [];
        
        raycaster.near = 0;
        raycaster.far  = configuration.cameraHeight + 2;
        raycaster.set(position, direction);
        
        var collisions = raycaster.intersectObjects( configuration.collidables );

        if(collisions.length > 0){
            intersectionObjects.push(collisions[0]);
        } else {
            return false;
        }
        
        intersectionObjects.sort(function(a,b){
            return a.distance-b.distance;
        });
        
        return intersectionObjects[0];
        
    };

    
    /* ########################## */
    
    this.update = function(){
        
        if( !activated ) return;
        
        var delta   = configuration.clock.getDelta(),
            speed   = configuration.normalSpeed;
    
        if( crouch && !configuration.fly ){
            speed = configuration.crouchSpeed;
        } else if( sprint && moveForward && !configuration.fly ){
            speed = configuration.sprintSpeed;
        } 
    
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        if( configuration.fly ){
            velocity.y -= velocity.y * 10.0 * delta;
        }   
                
        if ( moveForward ) {
            velocity.z -= speed * delta;
            debug('Moving forward ...');
        }
        
        if ( moveBackward ) {
            velocity.z += speed * delta;
            debug('Moving backward ...');
        }
                
        if ( moveLeft ) {
            velocity.x -= speed * delta;
            debug('Moving left ...');
        }
        
        if ( moveRight ) {
            velocity.x += speed * delta;
            debug('Moving right ...');
        }
        
        if( jump && jumping === false && crouching === false && !configuration.fly ){
            jumping = true;
            velocity.y = configuration.jumpHeight;
            if(sprint && moveForward){
                velocity.y += ( configuration.jumpHeight / 100 ) * 10;
            }
            debug('Jumping ...');
        }
        
        if( up && configuration.fly ){
            velocity.y += speed * delta;
            debug('Flying up ...');
        }
        
        if( down && configuration.fly ){
            velocity.y -= speed * delta;
            debug('Flying down ...');
        }
        
        if(crouch && !crouching && !configuration.fly){
            yawObject.position.y    = yawObject.position.y - currentHeight + configuration.crouchHeight;
            currentHeight           = configuration.crouchHeight;
            crouching               = true;
        } else if(!crouch && crouching && !upDetection){
            yawObject.position.y    = yawObject.position.y - currentHeight + configuration.cameraHeight;
            currentHeight           = configuration.cameraHeight;
            crouching               = false;
        }
        
        if(!detectXCollisions( delta ) || configuration.fly){
            yawObject.translateX( velocity.x * delta );
            yawObject.translateY( velocity.y * delta ); 
            yawObject.translateZ( velocity.z * delta );
        } else {
            yawObject.translateX( 0 );
            yawObject.translateY( velocity.y * delta ); 
            yawObject.translateZ( 0 );
            debug('X collision detected.');
        }
        
        if(!configuration.fly){
            detectYCollisions();
        }
        
    };
    
    this.activateControls = function(){
        activated = true;
    };
    
    this.deactivateControls = function(){
        activated = false;
    };
    
    this.moveForward = function(){
        return moveForward;
    };
    
    this.moveBackward = function(){
        return moveBackward;
    };
    
    this.moveLeft = function(){
        return moveLeft;
    };
    
    this.moveRight = function(){
        return moveRight;
    };
    
    this.getObject = function () {
        return yawObject;
    };
    
    
    function initPointerLock(){

        var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        if ( havePointerLock ) {
            var element = document.body;
            
            var pointerlockchange = function ( event ) {
                if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
                    activated = true;
                } else {
                    activated = false;
                }
            };

            var pointerlockerror = function ( event ) {};

            // Hook pointer lock state change events
            document.addEventListener( 'pointerlockchange', pointerlockchange, false );
            document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
            document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

            document.addEventListener( 'pointerlockerror', pointerlockerror, false );
            document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
            document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

            wrapper.addEventListener( 'click', function ( event ) {

                instructions.style.display = 'none';

                // Ask the browser to lock the pointer
                element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

                if ( /Firefox/i.test( navigator.userAgent ) ) {

                    var fullscreenchange = function ( event ) {
                        if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
                            document.removeEventListener( 'fullscreenchange', fullscreenchange );
                            document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
                            element.requestPointerLock();
                        }
                    }

                    document.addEventListener( 'fullscreenchange', fullscreenchange, false );
                    document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

                    element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
                    element.requestFullscreen();

                } 
                else {
                    element.requestPointerLock();
                }
            }, false );
        } else {
            instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API<br /><br />PLAYING NOT POSSIBLE!';
        }

    }
    
    /* ########################## */
    
    init();
   
};


