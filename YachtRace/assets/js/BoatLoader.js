/**
 * Created by Mike on 11/15/2015.
 */



// Load boat and place it at center of map.
function loadBoat() {
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    }
    var loader = new THREE.OBJLoader(manager);
    loader.load('assets/models/Catamaran.obj', function(object) {
        //object.traverse(function(child){
        //    if (child instanceof THREE.Mesh) {
        //        child.material.map = new THREE.MeshPhongMaterial({color:'white'});
        //    }
        //})
        object.scale.set(0.008, 0.008, 0.008);
        object.position.x = 200;
        object.position.z = 1000;
        object.position.y = 10;
        //var texture = THREE.ImageUtils.loadTexture("../assets/img/baot.png");

        //object.children[0].material.map = texture;
        DEMO.ms_Scene.add(object);
        console.log('Sailboat', object);
    });
}