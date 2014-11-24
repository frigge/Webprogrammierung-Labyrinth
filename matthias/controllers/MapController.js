// build a 3D world, TODO: use/translate multi-dimensional array
function MapController() {
	// set floor
	this.floor = new FloorModel(0,0,0);
	
	// set the wallModels
	this.walls = new Array();
	this.walls.push(new WallModel(1,1,1));
	this.walls.push(new WallModel(2,1,1));
	this.walls.push(new WallModel(3,1,1));
	this.walls.push(new WallModel(5,1,1));

	// set the views
	this.floor.view = new FloorView(this.floor);
	this.walls.forEach(function(wall) {
		wall.view = new WallView(wall);
	});
}