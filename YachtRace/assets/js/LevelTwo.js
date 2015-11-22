/**
 * Created by Mike on 11/22/2015.
 */

function buildLevelTwo() {
    // Need to change background to the night time back ground.
    var aCubeMap = THREE.ImageUtils.loadTextureCube([
        'demo/assets/img/Starry_Night_Sky.jpg',
        'demo/assets/img/Starry_Night_Sky.jpg',
        'demo/assets/img/Starry_Night_Sky.jpg',
        'demo/assets/img/Starry_Night_Sky.jpg',
        'demo/assets/img/Starry_Night_Sky.jpg',
        'demo/assets/img/Starry_Night_Sky.jpg'
    ]);
    DEMO.replaceSkyBox(aCubeMap);

    // Place boat at 0, 0, 0
    boatObj.position.set(0, 9, 0);

    // Load volcano.

    // Place markers.
    var r1 = buildRaceRing();
    r1.material.color.setHex(0x33cc33);
    r1.position.set(1000, 25, 10);
    checkPoints.push(r1);
    DEMO.ms_Scene.add(r1);

    var r2 = buildRaceRing();
    r2.material.color.setHex(0xffff00);
    r2.position.set(2000, 25, 200);
    checkPoints.push(r2);
    DEMO.ms_Scene.add(r2);

    var r3 = buildRaceRing();
    r3.position.set(3000, 25, 300);
    checkPoints.push(r3);
    DEMO.ms_Scene.add(r3);

    var r4 = buildRaceRing();
    r4.position.set(3000, 25, 500);
    checkPoints.push(r4);
    DEMO.ms_Scene.add(r4);

    var r5 = buildRaceRing();
    r5.position.set(2000, 25, 700);
    checkPoints.push(r5);
    DEMO.ms_Scene.add(r5);

    var r6 = buildRaceRing();
    r6.position.set(1000,25,900);
    checkPoints.push(r6);
    DEMO.ms_Scene.add(r6);

    var r7 = buildRaceRing();
    r7.position.set(0,25,1000);
    checkPoints.push(r7);
    DEMO.ms_Scene.add(r7);

    var r8 = buildRaceRing();
    r8.position.set(-1000,25,2000);
    checkPoints.push(r8);
    DEMO.ms_Scene.add(r8);

    winUp = false;
}