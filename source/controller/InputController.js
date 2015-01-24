var InputController = InputController || {};

function InputController(configurationObject){

    if (!(this instanceof InputController)){
        return new InputController(configurationObject);
    }
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

    var directionDown   = new THREE.Vector3(0, -1, 0);
    var directionUp     = new THREE.Vector3(0, 1, 0);

    var leftDirection   = new THREE.Vector3();
    var rightDirection  = new THREE.Vector3();


    /* CONFIGURATION */
    var configuration = {
        acceleration:   7,
        normalSpeed:    2,
        sprintSpeed:    5,
        crouchSpeed:    1,
        jumpAcceleration:     10,
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

    this.getObject = function() { return groundPosObject; };

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

        var player = gameController.gameModel.player;
        var pos = player.getPosition();
        pitchObject.add(configuration.camera);
        yawObject.add(pitchObject);
        yawObject.position.set(0, player.height, 0);
        groundPosObject.add(yawObject);
        groundPosObject.position.set(pos.x, pos.y, pos.z);
    };

    var initMovement = function (){

        debug('Initializing movement ...');

        document.addEventListener( 'mousemove', onMouseMove);
        document.addEventListener( 'keydown',   onKeyDown);
        document.addEventListener( 'keyup',     onKeyUp);
    };

    /* #################### */

    var onMouseMove = function ( event ) {
        if(gameController.pause) return;

        var invertFactor = configuration.invertMouse ? -1 : 1 ;

        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;

        yawObject.rotateY(movementX * -0.002);

        pitchObject.rotateX(invertFactor * movementY * -0.002);
        pitchObject.rotation.x  = Math.max( -1 * (PI_2 - 0.5), Math.min( PI_2, pitchObject.rotation.x ) );

        var player = gameController.gameModel.player;

        var pos = player.getPosition();

        pitchObject.updateMatrix();
        yawObject.updateMatrix();
        var rot =  pitchObject.matrixWorld.clone();

        player.transformation = rot;
        player.setPosition(pos.x, pos.y, pos.z);
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
        }

        var clamp = function(down, up, val) {
            return Math.max(down, Math.min(up, val));
        }

        moveX = clamp(-1, 1, moveX);
        moveY = clamp(-1, 1, moveY);
        moveZ = clamp(-1, 1, moveZ);

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
        var clamp = function(down, up, val) {
            return Math.max(down, Math.min(up, val));
        }

        moveX = clamp(-1, 1, moveX);
        moveY = clamp(-1, 1, moveY);
        moveZ = clamp(-1, 1, moveZ);

        debug('Key up: '+event.key+' ('+event.keyCode+')');

    };

    var detectXCollisions = function(){
        var direction = getDirection();
        var positions = getPositions( direction );

        var player = gameController.gameModel.player;
        var vel = player.velocity;
        var velocity = new THREE.Vector3(vel.x, vel.y, vel.z);

        var collisionObjects = [];
        for(var i = 0 ; i < positions.length; i++){
            collisionObject = player.checkCollision(positions[i], velocity);
            if(collisionObject){
                collisionObjects.push(collisionObject);
            }
        }

        if(collisionObjects.length == 0){
            return false;
        }

        collisionObjects.sort(function(a,b){
            return a.distance-b.distance;
        });

        if(collisionObjects[0].distance < velocity.length()){
            return true;
        }

        return false;

    };

    var detectYCollisions = function() {
        var player = gameController.gameModel.player;
        var pos = player.getPosition();
        var position = new THREE.Vector3(pos.x, pos.y, pos.z);
        var collisionObject = false;

        var vel = player.velocity;
        var ypart = new THREE.Vector3(0, vel.y, 0);
        ypart.normalize();

        var offset = .1;
        ypartoffset = ypart.clone();

        position.addVectors(position, ypartoffset);
        //test 2 times at ground level and at head level
        var groundCollision = player.checkCollision(position, ypart);
        var head = position.clone();
        head.y = head.y + player.height;

        var headCollision = player.checkCollision(head, ypart);

        var test = function(collisionObject, limitDistance) {
            return collisionObject && collisionObject.distance < limitDistance;
        };

        //if ground level slips but head level doesnt
        //(while falling downwards => velocity.y < 0), it means
        //we are already inside the floor
        var groundTest = test(groundCollision, offset);
        var headTest = test(headCollision, player.height);
        if(groundTest || (headTest && vel.y < 0))
            return true;

        return false;
    };

    var getDirection = function() {
        return gameController.gameModel.player.getAxisZ();
    }

    var getPositions = function( direction ){

        var centerPosition  = groundPosObject.position.clone();

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

        for(var i = 0; i < positionTypes.length; i++){
            for(var heightIndex = 0; heightIndex < heights.length; heightIndex++){
                var x = positionTypes[i].x;
                var y = (positionTypes[i].y) + heights[heightIndex];
                var z = positionTypes[i].z;
                positions.push(new THREE.Vector3(x, y, z));
            }
        }

        return positions;

    };

    /* ########################## */

    this.update = function(){
        var delta   = configuration.clock.getDelta(),
            speed   = configuration.normalSpeed;
            accel   = configuration.acceleration;

        if( crouch && !configuration.fly ){
            speed = configuration.crouchSpeed;
            player.height = configuration.crouchHeight;
        } else if( sprint && !configuration.fly ){
            speed = configuration.sprintSpeed;
        }

        var player = gameController.gameModel.player;
        var vel = player.velocity;
        var pos = player.getPosition();
        position = new THREE.Vector3(pos.x, pos.y, pos.z);
        var velocity = new THREE.Vector3(vel.x, vel.y, vel.z);

        var slowdown = velocity.clone();
        slowdown.multiplyScalar(-5 * delta);

        if( !configuration.fly ){
            slowdown.setY(0);
        }

        velocity.addVectors(velocity, slowdown);

        var xAxis = player.getAxisX();
        var yAxis = new THREE.Vector3(0, 1, 0);
        var zAxis = new THREE.Vector3(0, 0, 0);
        xAxis.normalize();
        zAxis.crossVectors(xAxis, yAxis);
        zAxis.normalize();
        xAxis.multiplyScalar(moveX);
        yAxis.multiplyScalar(configuration.fly ? moveY : 0);
        zAxis.multiplyScalar(moveZ);
        var movement = xAxis.clone();
        movement.addVectors(movement, yAxis);
        movement.addVectors(movement, zAxis);
        movement.normalize();

        var deltaAccel = accel * delta;
        movement.multiplyScalar(deltaAccel);

        velocity.addVectors(velocity, movement);
        var groundVelocity = velocity.clone();
        groundVelocity.y = 0;
        if(groundVelocity.length() > speed * delta) {
            groundVelocity.normalize();
            groundVelocity.multiplyScalar(speed * delta);
        }
        velocity.x = groundVelocity.x;
        velocity.z = groundVelocity.z;

        //gravity
        var gravity = new THREE.Vector3(0, -9.81 * delta, 0);
        velocity.addVectors(velocity, gravity);

        player.velocity = {x : velocity.x, y : velocity.y, z : velocity.z};

        var floor_collision = detectYCollisions();
        if(!configuration.fly && floor_collision && velocity.y < 0) {
                player.velocity.y = 0;
                velocity.y = 0;
                position.y = 0;
        }

        if( jump && !configuration.fly  && floor_collision){
            velocity.y = configuration.jumpAcceleration * (sprint ? 2 : 1) * delta;
        }

        if(!detectXCollisions() || configuration.fly){
            position.addVectors(position, velocity);
        }
        groundPosObject.position.set(position.x, position.y, position.z);

        player.setPosition(position.x, position.y, position.z);
        player.velocity = {x : velocity.x, y : velocity.y, z : velocity.z};
    };

    function initPointerLock(){

        var hasPointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        if ( hasPointerLock ) {
            var element = document.body;

            var pointerlockchange = function ( event ) {
                if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
                    gameController.pause = false;
                    instructions.style.display = 'none';
                } else {
                    gameController.pause = true;
                    instructions.style.display = 'inline';
                    instructions.innerHTML = "Click here to continue";
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
                // Ask the browser to lock the pointer
                element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

			    // Start Timer
				gameController.clock.start();
				
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


