lab_OverlayController = function(){ }

lab_OverlayController.prototype.update = function() {
    health = document.getElementById("health");
    activeitem = document.getElementById("activeitem");
    inventory = document.getElementById("inventory");
    passiveitem = document.getElementById("passiveitem");

    player = gameController.gameModel.player;
    var text = "";
    text += "Health: " + player.health + " %<br>";
    if(player.activeItem !== undefined)
        text += "Active Item: " + player.activeItem.type + " (" + player.activeItem.amountUses + ")<br>";
    else
        text += "Active Item: None<br>";
    if(player.passiveItem !== undefined)
        text += "Passive Item: " + player.passiveItem.type + " (" + player.passiveItem.amountUses + ")<br>";
    else
        text += "Passive Item: None<br>";
    text += "Inventory: [";
    for (var  slot in player.inventory) {
        text += slot + ": " + player.inventory[slot].type;
        text += ", ";
    }
    text += "]<br>";

    health.innerHTML = text;
}
