function lab_AxeItemModel(gameModel){
    
    lab_ItemModel.call(this,gameModel);

    this.type = 'axe';

    // set the fixed inventory position for the axe
    this.inventoryPosition = 1;

    // the amount of uses for the item
    this.amountUses = 'unlimited';
    this.range = 2;
}

// inherit from lab_EntityModel
lab_AxeItemModel.prototype = Object.create(lab_ItemModel.prototype);

// Set the "constructor" property to refer to lab_AxeItemModel
lab_AxeItemModel.prototype.constructor = lab_AxeItemModel;

lab_AxeItemModel.prototype.use = function(){
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

        if(model.type == "wall" && collisionObject.distance < this.range) {
            //hack the wall incredibly boringly
            model.stability -= 1;
            gameController.overlayController.debugoutput = model.stability;

            if(model.stability == 0) {
                model.isDeleted = true;
                this.gameModel.addModelToUpdateList(model);
            }
        }
    }
}
