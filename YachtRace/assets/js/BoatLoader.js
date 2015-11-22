/**
 * Created by Mike on 11/15/2015.
 */

var boatObj;

// Load boat and place it at center of map.
function loadBoat() {
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    }

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };

    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    var loader = new THREE.OBJMTLLoader();
    loader.load('assets/models/Catamaran.obj', 'assets/models/pirateMTL.mtl', function(object) {
        object.scale.set(0.008, 0.008, 0.008);
        //DEMO.ms_Camera.add(object);
        //object.position.set(-45, -30, -150);
        DEMO.ms_Scene.add(object);
        object.position.set(0, 9, 0);
        object.rotateY(Math.PI);
        object.name = 'boatObj';
        console.log('Sailboat', object);
        setBoatVar();
    }, onProgress, onError);
}

function setBoatVar() {
    console.log('Set boar var');
    boatObj = DEMO.ms_Scene.getObjectByName('boatObj');
}