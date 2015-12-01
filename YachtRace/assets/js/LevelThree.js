/**
 * Created by Mike on 11/22/2015.
 */

function buildLevelThree() {
    var aCubeMap = THREE.ImageUtils.loadTextureCube([
        'demo/assets/img/brightsky.jpg',
        'demo/assets/img/brightsky.jpg',
        'demo/assets/img/brightsky.jpg',
        'demo/assets/img/brightsky.jpg',
        'demo/assets/img/brightsky.jpg',
        'demo/assets/img/brightsky.jpg'
    ]);
    DEMO.replaceSkyBox(aCubeMap);

<<<<<<< HEAD
=======
    // Load volcano
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
    loader.load('assets/models/volcano.obj', 'assets/models/volcano.mtl', function(object) {
        object.scale.set(0.008, 0.008, 0.008);
        //DEMO.ms_Camera.add(object);
        //object.position.set(-45, -30, -150);
        DEMO.ms_Scene.add(object);
        object.position.set(5000, -120, 2000);
        object.rotateY(Math.PI);
        object.name = 'boatObj';
        console.log('Volcano', object);
        object.children[0].material.color.setHex(0x295E06);
        setBoatVar();
    }, onProgress, onError);

>>>>>>> gh-pages
    var j = 0, k = 0;
    for (var i = 0; i < 7; ++i) {
        if (i % 2 == 0) {
            j = i * 500;
        } else {
            k = i * 500;
        }
        var temp = buildRaceRing();
        if (i == 0) {
            temp.material.color.setHex(0x33cc33);
        } else if (i == 1) {
            temp.material.color.setHex(0xffff00);
        }

        temp.position.set(j, 25, k);
        checkPoints.push(temp);
        DEMO.ms_Scene.add(temp);
    }

    winUp = false;
}