lab_OverlayController = function(){ }

lab_OverlayController.prototype.update = function() {
    health = document.getElementById("health");
    activeitem = document.getElementById("activeitem");
    inventory = document.getElementById("inventory");
    passiveitem = document.getElementById("passiveitem");

    player = gameController.gameModel.player;
    var text = "";
    text += "Health: " + player.health + " %<br>";
    text += "Active Item: " + player.activeItem + "<br>";
    text += "Passive Item: " + player.passiveItem + "<br>";
    text += "Inventory: " + (player.inventory.length > 0 ? player.inventory : "Empty") + "<br>";

    health.innerHTML = text;
}
