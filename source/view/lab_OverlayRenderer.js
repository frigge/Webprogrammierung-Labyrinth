function lab_OverlayRenderer(gameController){
	this.gameController = gameController;
}

lab_OverlayRenderer.prototype.render = function() {
	this.renderHud();
	this.renderDebugHud();
	this.renderClock();
	this.renderGasMask();
}

lab_OverlayRenderer.prototype.renderGasMask = function() {
    var gasmaskOverlay = document.getElementById('gasmaskoverlay');

    if(this.gameController.gameModel.player.passiveItem == undefined) {
    	if (gasmaskOverlay.style.display != 'none') {
    		gasmaskOverlay.style.display = 'none';
    	}
    } else {
    	if(this.gameController.gameModel.player.passiveItem.type == 'gasMask'){
	    	if (gasmaskOverlay.style.display != 'block') {
	    		gasmaskOverlay.style.display = 'block';
	    	}
    	}
    }
}

lab_OverlayRenderer.prototype.renderClock = function () {

    var clockElement = document.getElementById("clock");
    var timeLeft = this.gameController.timeLeft;

    document.getElementById("clock").innerHTML  = parseInt(timeLeft);

    clockElement.textContent = parseInt(timeLeft);

    if(timeLeft < 1){
        clockElement.style.color = "blue";
    }
    else if(timeLeft < 10)
    {
        clockElement.style.color = "red";
        if(parseInt(timeLeft * 2) % 2 === 0)
        {
            clockElement.style.fontSize = "350%";
        }
        else
        {
            clockElement.style.fontSize = "200%";
        }
    }
    else if(timeLeft < 20)
    {
        clockElement.style.color = "orange";
        if(parseInt(timeLeft) % 2 === 0)
        {
            clockElement.style.fontSize = "280%";
        }
        else
        {
            clockElement.style.fontSize = "200%";
        }
    }
}

lab_OverlayRenderer.prototype.renderHud = function() {
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
			var extinguisherPos = 2;
			var fireExtinguisher = player.inventory[extinguisherPos];
			if(fireExtinguisher) {
  				var uses = fireExtinguisher.amountUses;
				if (uses > 4) hudExtinguisher.innerHTML = '<img src="resources/images/extinguisher_on.png" width="70px" height="70px" />';
				if (uses > 2 && uses < 5) hudExtinguisher.innerHTML = '<img src="resources/images/extinguisher_on_2-3.png" width="70px" height="70px" />';
				if (uses < 3) hudExtinguisher.innerHTML = '<img src="resources/images/extinguisher_on_1-3.png" width="70px" height="70px" />';
			}
		}
		if (player.inventory[slot].type == 'mediKit') hudMedikit.innerHTML = '<img src="resources/images/medikit_on.png" width="70px" height="70px" />';
		if (player.inventory[slot].type == 'gasMask') hudGasmask.innerHTML = '<img src="resources/images/gasmask_on.png" width="70px" height="70px" />';
		if (player.inventory[slot].type == 'resident') hudResident.innerHTML = '<img src="resources/images/resident_on.png" width="70px" height="70px" />';
    }

	// Show active items
    if(player.activeItem !== undefined) {
		if (player.activeItem.type == 'axe') hudAxe.innerHTML = '<img src="resources/images/axe_active.png" width="70px" height="70px" />';
		if (player.activeItem.type == 'fireExtinguisher') {
			if (player.activeItem.amountUses > 4) hudExtinguisher.innerHTML = '<img src="resources/images/extinguisher_active.png" width="70px" height="70px" />';
			if (player.activeItem.amountUses > 2 && player.activeItem.amountUses < 5 ) hudExtinguisher.innerHTML = '<img src="resources/images/extinguisher_active_2-3.png" width="70px" height="70px" />';	
			if (player.activeItem.amountUses < 3) hudExtinguisher.innerHTML = '<img src="resources/images/extinguisher_active_1-3.png" width="70px" height="70px" />';			
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
}

// Show inventory and health as text - only for debugging
lab_OverlayRenderer.prototype.renderDebugHud = function () {
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

     //debugHud.innerHTML = text;
}