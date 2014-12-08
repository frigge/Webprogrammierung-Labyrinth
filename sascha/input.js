function initInput() {
    document.addEventListener("click", function (event) {
        lockMouse();
    });

    document.addEventListener("mousemove", function (event) { 
        if(!View.renderData.mouseLocked)
            return;

        rotatePlayer(event);
    });
    document.addEventListener("keydown", function (event) {
        if(!renderData.mouseLocked)
            return;

        //console.log(event.keyCode);
        var z = game.player.directionZ;
        var x = game.player.directionX;
        switch(event.keyCode) {
            case 87: // w
                z -= 1;
                break;
            case 83: //s
                z += 1;
                break;
            case 65: //a
                x -= 1;
                break;
            case 68: //d
                x += 1;
                break;
            case 32: //space
                game.player.jump = true;
                break;
            case 16: //shift
                game.player.speed = 1;
                break;
        }

        game.player.directionZ = clamp(-1, 1, z);
        game.player.directionX = clamp(-1, 1, x);
    });

    document.addEventListener("keyup", function (event) {
        if(!renderData.mouseLocked)
            return;

        var z = game.player.directionZ;
        var x = game.player.directionX;
        switch(event.keyCode) {
            case 87: // w
                z += 1;
                break;
            case 83: //s
                z -= 1;
                break;
            case 65: //a
                x += 1;
                break;
            case 68: //d
                x -= 1;
                break;
            case 32: //space
                game.player.jump = false;
                break;
            case 16: //shift
                game.player.speed = 2;
                break;
            case 82: //restart
                console.log("restart");
                initData();
                return;
        }
        game.player.directionZ = clamp(-1, 1, z);
        game.player.directionX = clamp(-1, 1, x);
    });
}

function lockMouse() {
    document.addEventListener("pointerlockchange", function (event) {
        if(document.pointerLockElement === document.body)
            renderData.mouseLocked = true;
        else
            renderData.mouseLocked = false;
    });
    document.addEventListener("pointerlockerror", function (event) {
        renderData.mouseLocked = false;
    });
    document.body.requestPointerLock();
}

