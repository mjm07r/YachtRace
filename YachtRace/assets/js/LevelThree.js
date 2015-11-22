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