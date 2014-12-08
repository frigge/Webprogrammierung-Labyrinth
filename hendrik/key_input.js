// Key-Handler von Matthias

		// define constants for better readability and possible reuse
		const KEY_FORWARD 	= 87; // forward key: w
		const KEY_BACKWARD 	= 83; // backwards key: s
		const KEY_LEFT 		= 65; // left key: a
		const KEY_RIGHT 	= 68; // right key: d
		const KEY_MENU		= 27; // menu key: esc

		/* eventhandler for keyboard input */
		function keyInput (e) {
			switch(e.keyCode) {
				case KEY_FORWARD:
					cameraZ -= 0.05;
					break;
				case KEY_BACKWARD:
					cameraZ += 0.05;
					break;
				case KEY_LEFT:
					cameraX -= 0.05;
					break;
				case KEY_RIGHT:
					cameraX += 0.05;
					break;
				default:
					break;
			}
		}
