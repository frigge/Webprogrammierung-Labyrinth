/**
 * Axe item model
 * Axes can be used to destroy things
 * @param  gameModel
 */
function lab_AxeItemModel(gameModel){
    // calls parent contructor
    lab_ItemModel.call(this,gameModel);

    this.type = 'axe';

    // set the fixed inventory position for the axe
    this.inventoryPosition = 1;

    // the amount of uses for the item
    this.amountUses = 'unlimited';

    // the range of the axe when used
    this.range = 2;
}

// inherit from lab_ItemModel
lab_AxeItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to this object
lab_AxeItemModel.prototype.constructor = lab_AxeItemModel;

/**
 * When axe is used it can destroy doors if nearby
 */
lab_AxeItemModel.prototype.use = function(){
    var player = this.gameModel.player;
    var pos = player.getPosition();
    var tjspos = new THREE.Vector3(pos.x, pos.y + player.height, pos.z);

    var direction = player.getAxisZ();
    direction.multiplyScalar(-1);
    direction.normalize();
    collisionObject = this.checkCollision(ttrollerjspos, direction);

    if(collisionObject) {
        var model = this.gameModel.models[collisionObject.object.id];

        if(!model) {
            console.error("missing model for object id: " + collisionObject.object.id);
        }

        if(model.type == "door" && collisionObject.distance < this.range) {
            //hack the door incredibly boringly
            model.stability -= 1;

            if(model.stability == 0) {
                model.isDeleted = true;
                this.gameModel.addModelToUpdateList(model);
            }
        }
    }
}
