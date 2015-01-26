/**
 * Fire Extinguisher item model
 * Fire Extinguishers can be used to put fires out
 * @param  gameModel
 */
function lab_FireExtinguisherItemModel(gameModel){  
    // calls parent contructor
    lab_ItemModel.call(this,gameModel);

    this.type = 'fireExtinguisher';

    // set the fixed inventory position for the fire extinguisher
    this.inventoryPosition = 2;

	// the amount of uses for the item
	this.possibleAmountUses = 9;

    // the amount of uses for the item (counter)
    this.amountUses = this.possibleAmountUses;

    // the range of the extinguisher when used
	this.range = 3;
}

// inherit from lab_EntityModel
lab_FireExtinguisherItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to this object
lab_FireExtinguisherItemModel.prototype.constructor = lab_FireExtinguisherItemModel;

/**
 * When fire extinguisher is used it can put out fires if nearby
 */
lab_FireExtinguisherItemModel.prototype.use = function(){
    var player = this.gameModel.player;
    var pos = player.getPosition();
    var tjspos = new THREE.Vector3(pos.x, pos.y + player.height, pos.z);

    var direction = player.getAxisZ();
    direction.multiplyScalar(-1);
    direction.normalize();
    collisionObject = this.checkCollision(tjspos, direction);

    if(collisionObject) {
        var model = this.gameModel.models[collisionObject.object.id];

        if(!model) {
            console.error("missing model for object id: " + collisionObject.object.id);
        }

        if(model.type == "fire" && collisionObject.distance < this.range) {
            //extinguish the fire incredibly boringly
            model.stability -= 1;

            if(model.stability == 0) {
                model.isDeleted = true;
                model.dispose();
                this.gameModel.addModelToUpdateList(model);
            }
        }
    }
	// reduce amount of uses
	this.reduceUses();
}
