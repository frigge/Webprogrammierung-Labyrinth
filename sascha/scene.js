function init() {
    initData();
    initInput();
    initRenderData();
}

function gameLoop(timestamp) {
    game.delta = timestamp - game.timestamp;
    game.timestamp = timestamp;
    requestAnimationFrame(gameLoop);

    updateLogic();
    render();
}

