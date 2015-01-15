var FpsControls = FpsControls || {};

function FpsControls(configurationObject){

    if (!(this instanceof FpsControls)){
        return new FpsControls(configurationObject);
    }

    /* GENERAL VARIABLES */
    var activated       = false;


    /* MOVEMENT */
    var moveX = 0;
    var moveY = 0;
    var moveZ = 0;

    var sprint              = false;
    var crouch              = false;
    var jump                = false;

    /* VIEW */
    var yawObject   = new THREE.Object3D();
    var pitchObject = new THREE.Object3D();
    var groundPosObject = new THREE.Object3D();
    var PI_2        = Math.PI / 2;

    /* COLLISION DETECTION */
    var raycaster       = new THREE.Raycaster();

    var directionDown   = new THREE.Vector3(0, -1, 0);
    var directionUp     = new THREE.Vector3(0, 1, 0);

    var leftDirection   = new THREE.Vector3();
    var rightDirection  = new THREE.Vector3();


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
        inventorySelection: {
            axe : 49, // 1
            extinguisher : 50, // 2
            medikit : 51, //3
            gasmask : 52, //4
            resident : 53 //4
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
        initInteraction();
        initPointerLock();
    };

    var initInteraction = function(){
        console.log("init interactions");
        document.addEventListener("mouseup", function(event) {
            player = gameController.gameModel.player;
            player.useActiveItem();
        }, false);
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

        pitchObject.add(configuration.camera);
        yawObject.add(pitchObject);
        yawObject.position.set(0, gameController.gameModel.player.height, 0);
        groundPosObject.add(yawObject);
    };

    var initMovement = function (){

        debug('Initializing movement ...');

        document.addEventListener( 'mousemove', onMouseMove);
        document.addEventListener( 'keydown',   onKeyDown);
        document.addEventListener( 'keyup',     onKeyUp);
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

        transform = gameController.gameModel.player.transformation;
        rot =  new THREE.Matrix4();

        //rot order x -> y -> z
        rot.makeRotationX(pitchObject.rotation.x);
        transform.multiplyMatrices(transform, rot);
        rot.makeRotationY(pitchObject.rotation.y);
        transform.multiplyMatrices(transform, rot);
        rot.makeRotationZ(pitchObject.rotation.z);
        transform.multiplyMatrices(transform, rot);
    };

    var onKeyDown = function ( event ) {

        var movement = configuration.movement;

        switch ( event.keyCode ) {
            case movement.jump:
               jump = true;
               break;

            case movement.sprint:
               sprint = true;
               break;
            case movement.crouch:
               crouch = true;
               break;

            case movement.up:
               moveY += 1;
               break;
            case movement.down:
               moveY -= 1;
               break;
            case movement.forward:
               moveZ += 1;
               break;
            case movement.left:
               moveX += 1;
               break;
            case movement.backward:
               moveZ -= 1;
               break;
            case movement.right:
               moveX -= 1;
               break;

            clamp = function(down, up, val) {
                return Math.max(down, Math.min(up, val));
            }
            
            moveX = clamp(-1, 1, moveX);
            moveY = clamp(-1, 1, moveY);
            moveZ = clamp(-1, 1, moveZ);
        }

        debug('Key down: '+event.key+' ('+event.keyCode+')');

        if(sprint || crouch) {
            event.preventDefault();
        }

    };

    var onKeyUp = function ( event ) {

        var movement = configuration.movement;
        var inventorySelection = configuration.inventorySelection;
        var player = gameController.gameModel.player;

        switch( event.keyCode ) {
            case movement.jump:
               jump = false;
               break;

            case movement.up:
               up = false;
               break;
            case movement.down:
               down = false;
               break;
            case movement.sprint:
               sprint = false;
               break;
            case movement.crouch:
               crouch = false;
               break;
            case movement.forward:
               moveZ -= 1;
               break;
            case movement.left:
               moveX -= 1;
               break;
            case movement.backward:
               moveZ += 1;
               break;
            case movement.right:
               moveX += 1;
               break;

            case inventorySelection.axe:
               player.setActiveItem(1);
               break;
            case inventorySelection.extinguisher:
               player.setActiveItem(2);
               break;
            case inventorySelection.medikit:
               player.setActiveItem(3);
               break;
            case inventorySelection.gasmask:
               player.setActiveItem(4);
               break;
            case inventorySelection.resident:
               player.setActiveItem(5);
               break;
        }

        debug('Key up: '+event.key+' ('+event.keyCode+')');

    };

    var detectXCollisions = function( delta ){

        var direction = getDirection();
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

        player = gameController.gameModel.player;
        pos = player.getPosition();
        position = new THREE.Vector3(pos.x, pos.y, pos.z);
        var collisionObject = false;

        velocity = player.velocity;
        ypart = new THREE.Vector3(0, velocity.y, 0);

        //test 2 times at ground level and at head level
        groundCollision = getNearestCollisionObject(pos, ypart);
        head = position.clone();
        head = head.addVectors(head, ypart);

        headCollision = getNearestCollisionObject(head, velocity.y);

        test = function(collisionObject, limitDistance) {
            return collisionObject && collisionObject.distance < limitDistance
        };

        //if ground level slips but head level doesnt
        //(while falling downwards => velocity.y < 0), it means
        //we are already inside the floor
        groundTest = test(groundCollision, .1);
        headTest = test(headCollision, player.height);
        if(groundTest || (headTest && velocity.y < 0)) {
            player.setPosition(pos.x, 0, pos.z);
            velocity.y = 0;
            return true;
        }

        velocity.y -= 0.5;
        return false;
    };

    var getDirection = function() {
        return gameController.gameModel.player.getAxisZ();
    }

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

        currentHeight = gameController.gameModel.player.height;

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
            player.height = configuration.crouchHeight;
        } else if( sprint && moveForward && !configuration.fly ){
            speed = configuration.sprintSpeed;
        }

        vel = gameController.gameModel.player.velocity;
        velocity = new THREE.Vector3(vel.x, vel.y, vel.z);

        accel = velocity.clone();
        accel.multiplyScalar(-10 * delta);

        if( !configuration.fly ){
            accel.setY(0);
        }

        velocity.addVectors(velocity, accel);

        movement = new THREE.Vector3(moveX, configuration.fly ? moveY : 0, moveZ);
        movement.multiplyScalar(speed * delta);

        velocity.addVectors(velocity, movement);

        if( jump && crouching === false && !configuration.fly ){
            jumping = true;
            velocity.y = configuration.jumpHeight;
            if(sprint && moveForward){
                velocity.y += ( configuration.jumpHeight / 100 ) * 10;
            }
            debug('Jumping ...');
        }

        if(!configuration.fly){
            detectYCollisions();
        }

        if(!detectXCollisions( delta ) || configuration.fly){
            position.addVectors(position, velocity);
        }

        groundPosObject.position = position;

        gameController.gameModel.player.setPosition(position.x, position.y, position.z);
        gameController.gameModel.player.velocity = {x : velocity.x, y : velocity.y, z : velocity.z};
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

            document.getElementById("instructions").addEventListener( 'click', function ( event ) {
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


