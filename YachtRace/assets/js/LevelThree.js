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

    var checks = [];
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
        checks.push(temp);
        checkPoints.push(temp);
        DEMO.ms_Scene.add(temp);
    }

    var obsGeo = new THREE.CubeGeometry(20, 20, 20);
    var obsMat = new THREE.MeshLambertMaterial({color:'purple'});
    for (var i = 0, j = Math.round(Math.random() * 10); i < j; ++i) {
        // Random cubes that are purple
        var tempObj = new THREE.Mesh(obsGeo, obsMat);
        DEMO.ms_Scene.add(tempObj);
        var neg = (Math.random() * 10) % 2 == 0 ? 1 : -1;
        var closeCheck = checks[Math.round(Math.random() * 10) % 7]
        tempObj.position.x = closeCheck.position.x + Math.round(Math.random() * 300) * neg;
        tempObj.position.z = closeCheck.position.z + Math.round(Math.random() * 300) * neg;
        tempObj.position.y = 0;
        obstacles.push(tempObj);
    }

    winUp = false;
}