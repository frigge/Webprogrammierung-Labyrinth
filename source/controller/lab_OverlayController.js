lab_OverlayController = function(){ }

lab_OverlayController.prototype.update = function() {
    health = document.getElementById("health");
    health.innerHTML = gameController.gameModel.player.health + " %";
}
