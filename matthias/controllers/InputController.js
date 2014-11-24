function InputController() {
	this.handleInput = function(e) {
		switch(e.type) {
			case 'keydown':
				switch(e.keyCode) {
					case KEY_FORWARD:
						player.moveForward();
						playerView.updatePosition();
						break;
					case KEY_BACKWARD:
						player.moveBackward();
						playerView.updatePosition();
						break;
					case KEY_LEFT:
						player.moveLeft();
						playerView.updatePosition();
						break;
					case KEY_RIGHT:
						player.moveRight();
						playerView.updatePosition();
						break;
					case KEY_ACTION:
						// TODO: do something
					case KEY_MENU:
						// TODO implement menu
						break;
					default:
						break;
				}
				break;
			default:
				break;
		}
	}
}