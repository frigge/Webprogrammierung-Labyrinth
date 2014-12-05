var View = {
    renderData : null,
    createCube : function () {
        var cubeGeo = new THREE.BoxGeometry(2, 2, 2);
        var cubeMat = new THREE.MeshPhongMaterial( { 
            color : 0xaaaaaa,
            specular : 0xaaaaaa
        } );
        var cube = new THREE.Mesh(cubeGeo, cubeMat);

        cube.position.set(Math.random() * 50, 1.0, Math.random() * 50);
        return cube;
    },

    RenderData : function () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        var planeGeo = new THREE.PlaneGeometry(100, 100);
        var planeMat = new THREE.MeshPhongMaterial ({
            color : 0x303030,
            specular : 0x333333
        });

        //create a bunsh of cubes
        for(var i = 0; i < 10; ++i) {
            this.scene.add(View.createCube());
        }
        var groundPlane = new THREE.Mesh(planeGeo, planeMat);
        groundPlane.matrixAutoUpdate = false;
        var mat = new THREE.Matrix4();
        mat.makeRotationX(-0.5 * 3.1415);
        groundPlane.matrix = mat;
        groundPlane.updateMatrixWorld();

        this.scene.add(groundPlane);
        this.hemiLight = new THREE.HemisphereLight(0x88ff88, 0xff0000, 1.0);
        this.sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
        this.sunLight.position.set(-10, 20, 0);
        this.scene.add(this.hemiLight);
        this.scene.add(this.sunLight);
        this.camera.matrixAutoUpdate = false;

        this.mouseLocked = false;
    },

    updateCamera : function () {
        var mat = game.player.transformation;
        var inv = new THREE.Matrix4();
        inv.getInverse(mat);
        View.renderData.camera.matrix = mat;
        View.renderData.camera.matrixWorldInverse = inv;
        View.renderData.camera.updateMatrixWorld(true);
    },

    render : function () {
        View.updateCamera();
        //renderData.shadowMapRenderer.render(renderData.scene, renderData.camera);
        View.renderData.renderer.render(View.renderData.scene, View.renderData.camera);

        View.updateOverlay();
    },

    updateOverlay : function () {
        health = document.getElementById("health");
        health.innerHTML = game.player.health + " %";
    },

    initRenderData : function () {
        View.renderData = new View.RenderData();
        document.getElementById("main").appendChild(View.renderData.renderer.domElement);
    }
}
