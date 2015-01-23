lab_OverlayController = function(){
}

lab_OverlayController.prototype.update = function() {

	// Load HUD elements from CSS to var
	debugHud = document.getElementById("debug-hud");
	hudAxe = document.getElementById("axe");
	hudExtinguisher = document.getElementById("extinguisher");
	hudGasmask = document.getElementById("gasmask");
	hudMedikit = document.getElementById("medikit");
	hudHealthOn = document.getElementById("healthon");
	hudHealthOff = document.getElementById("healthoff");
	hudResident = document.getElementById("resident");	
	
    player = gameController.gameModel.player;

	// Clear HUD items
	hudExtinguisher.innerHTML = '<img src="resources/images/extinguisher_off.png" width="70px" height="70px" />';
	hudAxe.innerHTML = '<img src="resources/images/axe_off.png" width="70px" height="70px" />';
	hudMedikit.innerHTML = '<img src="resources/images/medikit_off.png" width="70px" height="70px" />';
	hudGasmask.innerHTML = '<img src="resources/images/gasmask_off.png" width="70px" height="70px" />';
	hudResident.innerHTML = '<img src="resources/images/resident_off.png" width="70px" height="70px" />';
	
	// Show items in inventory on HUD	
    for (var  slot in player.inventory) {
		if (player.inventory[slot].type == 'axe') hudAxe.innerHTML = '<img src="resources/images/axe_on.png" width="70px" height="70px" />';
		if (player.inventory[slot].type == 'fireExtinguisher') {
			hudExtinguisher.innerHTML = '<img src="resources/images/extinguisher_on.png" width="70px" height="70px" />';
		}
		if (player.inventory[slot].type == 'mediKit') hudMedikit.innerHTML = '<img src="resources/images/medikit_on.png" width="70px" height="70px" />';
		if (player.inventory[slot].type == 'gasMask') hudGasmask.innerHTML = '<img src="resources/images/gasmask_on.png" width="70px" height="70px" />';
		if (player.inventory[slot].type == 'resident') hudResident.innerHTML = '<img src="resources/images/resident_on.png" width="70px" height="70px" />';
    }
	
	// Show active items
    if(player.activeItem !== undefined) {
		if (player.activeItem.type == 'axe') hudAxe.innerHTML = '<img src="resources/images/axe_active.png" width="70px" height="70px" />';
		if (player.activeItem.type == 'fireExtinguisher') {
			if (player.activeItem.amountUses == 3) hudExtinguisher.innerHTML = '<img src="resources/images/extinguisher_active.png" width="70px" height="70px" />';
			if (player.activeItem.amountUses == 2) hudExtinguisher.innerHTML = '<img src="resources/images/extinguisher_active_2-3.png" width="70px" height="70px" />';	
			if (player.activeItem.amountUses == 1) hudExtinguisher.innerHTML = '<img src="resources/images/extinguisher_active_1-3.png" width="70px" height="70px" />';			
		}
		if (player.activeItem.type == 'mediKit') hudMedikit.innerHTML = '<img src="resources/images/medikit_active.png" width="70px" height="70px" />';
		if (player.activeItem.type == 'gasMask') hudGasmask.innerHTML = '<img src="resources/images/gasmask_active.png" width="70px" height="70px" />';
	}

	// Show current health
	var healthNum = 70 - Math.round(70 * (player.health * 0.01));
	var healthStr = "rect(" + healthNum + "px, 70px, 70px, 0px)";
	document.getElementById("hud-health-on").style.clip = healthStr;
	hudHealthOn.innerHTML = '<img src="resources/images/health_on.png" width="70px" height="70px" />';
	hudHealthOff.innerHTML = '<img src="resources/images/health_off.png" width="70px" height="70px" />';
	
	// Show inventory and health as text - only for debugging
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

    debugHud.innerHTML = text;
}
