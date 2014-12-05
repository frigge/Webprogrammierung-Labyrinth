function init() {
    initData();
    initInput();
    View.initRenderData();
}

function gameLoop(timestamp) {
    game.delta = timestamp - game.timestamp;
    game.timestamp = timestamp;
    requestAnimationFrame(gameLoop);

    updateLogic();
    View.render();
}

