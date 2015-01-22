function lab_FireExtinguisherItemModel(gameModel){
    
    lab_ItemModel.call(this,gameModel);

    this.type = 'fireExtinguisher';

    // set the fixed inventory position for the fire extinguisher
    this.inventoryPosition = 2;
    // the amount of uses for the item
    this.amountUses = 3;
    this.range = 2;
}

// inherit from lab_EntityModel
lab_FireExtinguisherItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to lab_FireExtinguisherItemModel
lab_FireExtinguisherItemModel.prototype.constructor = lab_FireExtinguisherItemModel;

lab_FireExtinguisherItemModel.prototype.use = function(){
    var player = gameController.gameModel.player;
    var pos = player.getPosition();
    var tjspos = new THREE.Vector3(pos.x, pos.y + player.height, pos.z);

    var direction = player.getAxisZ();
    direction.multiplyScalar(-1);
    direction.normalize();
    collisionObject = this.checkCollision(tjspos, direction);

    if(collisionObject) {
        var model = gameController.gameModel.models[collisionObject.object.id];

        if(!model) {
            console.error("missing model for object id: " + collisionObject.object.id);
        }

        if(model.type == "fire" && collisionObject.distance < this.range) {
            //hack the wall incredibly boringly
            model.heat -= 1;
            gameController.overlayController.debugoutput = model.stability;

            if(model.heat == 0) {
                model.isDeleted = true;
                this.gameModel.addModelToUpdateList(model);
            }
        }
    }
	// reduce amount of uses
	this.reduceUses();
}
