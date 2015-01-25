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
	var debugHud = document.getElementById("debug-hud");
	var hudAxe = document.getElementById("axe");
	var hudExtinguisher = document.getElementById("extinguisher");
	var hudGasmask = document.getElementById("gasmask");
	var hudMedikit = document.getElementById("medikit");
	var hudHealthOn = document.getElementById("healthon");
	var hudHealthOff = document.getElementById("healthoff");
	var hudResident = document.getElementById("resident");	
	
    var player = gameController.gameModel.player;

	// Clear HUD items
	hudExtinguisher.innerHTML = '<img class="hudimage" src="resources/images/extinguisher_off.png" />';
	hudAxe.innerHTML = '<img class="hudimage" src="resources/images/axe_off.png" />';
	hudMedikit.innerHTML = '<img class="hudimage" src="resources/images/medikit_off.png" />';
	hudGasmask.innerHTML = '<img class="hudimage" src="resources/images/gasmask_off.png" />';
	hudResident.innerHTML = '<img class="hudimage" src="resources/images/resident_off.png" />';
	
	// Show items in inventory on HUD	
    for (var  slot in player.inventory) {
		if (player.inventory[slot].type == 'axe') hudAxe.innerHTML = '<img class="hudimage" src="resources/images/axe_on.png" />';
		if (player.inventory[slot].type == 'fireExtinguisher') {
			var extinguisherPos = 2;
			var fireExtinguisher = player.inventory[extinguisherPos];
			if(fireExtinguisher) {
  				var uses = fireExtinguisher.amountUses;
				if (uses > 4) hudExtinguisher.innerHTML = '<img class="hudimage" src="resources/images/extinguisher_on.png" />';
				if (uses > 2 && uses < 5) hudExtinguisher.innerHTML = '<img class="hudimage" src="resources/images/extinguisher_on_2-3.png" />';
				if (uses < 3) hudExtinguisher.innerHTML = '<img class="hudimage" src="resources/images/extinguisher_on_1-3.png" />';
			}
		}
		if (player.inventory[slot].type == 'mediKit') hudMedikit.innerHTML = '<img class="hudimage" src="resources/images/medikit_on.png" />';
		if (player.inventory[slot].type == 'gasMask') hudGasmask.innerHTML = '<img class="hudimage" src="resources/images/gasmask_on.png" />';
		if (player.inventory[slot].type == 'resident') hudResident.innerHTML = '<img class="hudimage" src="resources/images/resident_on.png" />';
    }

	// Show active items
    if(player.activeItem !== undefined) {
		if (player.activeItem.type == 'axe') hudAxe.innerHTML = '<img src="resources/images/axe_active.png" width="70px" height="70px" />';
		if (player.activeItem.type == 'fireExtinguisher') {
			if (player.activeItem.amountUses > 4) hudExtinguisher.innerHTML = '<img class="hudimage" src="resources/images/extinguisher_active.png" />';
			if (player.activeItem.amountUses > 2 && player.activeItem.amountUses < 5 ) hudExtinguisher.innerHTML = '<img class="hudimage" src="resources/images/extinguisher_active_2-3.png" />';	
			if (player.activeItem.amountUses < 3) hudExtinguisher.innerHTML = '<img class="hudimage" src="resources/images/extinguisher_active_1-3.png" />';			
		}
		if (player.activeItem.type == 'mediKit') hudMedikit.innerHTML = '<img class="hudimage" src="resources/images/medikit_active.png" />';
		if (player.activeItem.type == 'gasMask') hudGasmask.innerHTML = '<img class="hudimage" src="resources/images/gasmask_active.png" />';
	}

	// Show current health
	var healthNum = 70 - Math.round(70 * (player.health * 0.01));
	var healthStr = "rect(" + healthNum + "px, 70px, 70px, 0px)";
	document.getElementById("hud-health-on").style.clip = healthStr;
	hudHealthOn.innerHTML = '<img class="hudimage" src="resources/images/health_on.png" />';
	hudHealthOff.innerHTML = '<img class="hudimage" src="resources/images/health_off.png" />';
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