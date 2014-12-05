var CONST = {
    PLAYERHEIGHT : 1.8,
    SPEED : 20.0,
    FRICTION : 0.1,
    JUMP : 2.0,
    MASS : 80
};

function Player() {
    this.speed = 2;
    this.jump = false;
    this.velocity = new THREE.Vector3();
    this.mass = CONST.MASS;

    this.directionZ = 0;
    this.directionX = 0;
    this.height = CONST.PLAYERHEIGHT;

    this.transformation = new THREE.Matrix4();
    this.transformation.makeTranslation(0, this.height + 1.0, 5);

    var pos = new THREE.Vector3();
    var dir = new THREE.Vector3(0, 0, -1);

    this.rayCaster = new THREE.Raycaster(pos, dir, 0.1, 100);
    this.health = 100;

    this.tool = null;
}

function Game() {
    this.player = new Player();
    this.delta = 0;
    this.timestamp = 0;
}

var game;

function start() {
    if(!View.renderData)
        init();
    
    gameLoop(0);
}

function initData() {
    game = new Game();
}

function updatePlayer() {
    movePlayer();
    updateHealth();
}

function updateHealth() {
}

function checkCollision(vec) {
    var dir = vec.clone();
    dir.normalize();
    var len = vec.length();

    var mat = game.player.transformation;
    var pos = new THREE.Vector3();
    pos.applyMatrix4(mat);

    game.player.rayCaster.set(pos, dir);
    var hitPos = game.player.rayCaster.intersectObjects(View.renderData.scene.children);
    var distance = 99999999.9;
    var hit = null;
    for(var i = 0; i < hitPos.length; ++i) {
        if (hitPos[i].distance < distance) {
            hit = hitPos[i];
            distance = hit.distance;
        }
    }
    if(hit !== null && hit.distance < Math.max(len, 0.001)) {
        return {collision : true, hit : hit};
    }
    return {collision : false, hit : null};
}

function updateLogic() {
    updatePlayer();
}

function rotatePlayer(event) {
    var sensitivity = 2;
    var dx = event.movementX;
    var dy = event.movementY;

    var matX = new THREE.Matrix4();
    var matY = new THREE.Matrix4();
    var mat = new THREE.Matrix4();

    var oldMat = game.player.transformation;
    var oldRot = new THREE.Matrix4();
    var oldTrans = new THREE.Matrix4();
    oldRot.extractRotation(oldMat);
    oldTrans.copyPosition(oldMat);

    //get axis
    var yaxis = new THREE.Vector3(0, 1, 0);
    var xaxis = new THREE.Vector3(1, 0, 0);
    xaxis.applyMatrix4(oldRot);

    matX.makeRotationAxis(yaxis, sensitivity * -dx / window.innerWidth);
    matY.makeRotationAxis(xaxis, sensitivity * -dy / window.innerWidth);

    mat.multiplyMatrices(matX, matY);
    mat.multiplyMatrices(mat, oldRot);
    mat.multiplyMatrices(oldTrans, mat);

    game.player.transformation = mat;
}

function movePlayer() {
    var dT = game.delta / 1000;
    var speed = CONST.SPEED * game.player.speed;
    var oldMat = game.player.transformation;
    var oldPos = new THREE.Vector3();
    oldPos.applyMatrix4(oldMat);
    var oldRot = new THREE.Matrix4();

    oldRot.extractRotation(oldMat);
    var zaxis = new THREE.Vector3();
    var xaxis = new THREE.Vector3(1, 0, 0);
    var trans = new THREE.Vector3();
    xaxis.applyMatrix4(oldRot);

    xaxis.normalize();
    zaxis.crossVectors(xaxis, new THREE.Vector3(0, 1, 0));
    zaxis.normalize();

    xaxis.multiplyScalar(game.player.directionX);
    zaxis.multiplyScalar(game.player.directionZ);
    trans.addVectors(xaxis, zaxis);
    trans.multiplyScalar(speed * dT);

    var vel = game.player.velocity;

    var horVel = new THREE.Vector2(vel.x, vel.z);
    horVel.add(new THREE.Vector2(trans.x, trans.z));
    var spdT = speed * dT;
    if(horVel.length() > spdT) {
        horVel.setLength(spdT);
    }
    vel.set(horVel.x, vel.y, horVel.y);

    var gdT = -9.81 * dT;
    var gravity = new THREE.Vector3(0, gdT, 0);

    vel.add(gravity);
    var col = checkCollision(vel);

    if(col.collision) {
        var Fa = vel.clone();
        var len = vel.length();
        var cf = CONST.FRICTION;
        var nv = vel.clone();
        nv.normalize();
        var normal = col.hit.face.normal;
        normal.applyMatrix4(col.hit.object.matrix);
        normal.normalize();
        var dot = Math.abs(nv.dot(normal));
        var Ff = dot * len;
        var Fn = normal.clone().multiplyScalar(Ff);

        var frict = Fn.clone().add(Fa);
        frict.multiplyScalar(cf * -1);

        //vel.add(frict);
        console.log("Normal Force:", Fn);
        vel.add(Fn);

        if (game.player.jump) {
            vel.y += CONST.JUMP;
        }
    }

    var newMat = new THREE.Matrix4();
    
    var mat = new THREE.Matrix4();
    mat.makeTranslation(vel.x, vel.y, vel.z);

    newMat.multiplyMatrices(mat, newMat);

    newMat = mat.multiplyMatrices(newMat, oldMat);

    var pos = new THREE.Vector3();
    pos.applyMatrix4(newMat);

    //if(pos.y > 0 && pos.y < game.player.height)
    //    pos.y = game.player.height;
    //newMat.setPosition(pos);

    game.player.transformation = newMat;
    game.player.velocity = vel;
}
