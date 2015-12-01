/**
 * Builds the first level of the game.
 * <p>
 *     Level one consists of the standard down and back race.
 *     In order to compete the race, the player must go down and back one time.
 * </p>
 * Created by Mike on 11/11/2015.
 */

function buildLevelOne(scene) {
    // Add rings along path of race.
    var startPoint =  new THREE.Vector3(-1000, 20, -1000);

    var endPoint = new THREE.Vector3(1000, 20, 1000);

    var midPoint = new THREE.Vector3(500, 20, 500);

    var midPoint2 = new THREE.Vector3(-500, 20, 500);

    // Place rings at all of these places.
    var r1 = buildRaceRing();
    r1.material.color.setHex(0x33cc33);
    r1.position.set(startPoint.x, startPoint.y, startPoint.z);
    scene.add(r1);
    checkPoints.push(r1);
    var r2 = buildRaceRing();
    r2.material.color.setHex(0xffff00);
    r2.position.set(midPoint.x, midPoint.y, midPoint.z);
    scene.add(r2);
    checkPoints.push(r2);
    var r3 = buildRaceRing();
    r3.position.set(endPoint.x, endPoint.y, endPoint.z);
    scene.add(r3);
    checkPoints.push(r3);

    var checks = [r1, r2, r3];
    // Try adding random objects that can be run into.
    var obsGeo = new THREE.CubeGeometry(20, 20, 20);
    var obsMat = new THREE.MeshLambertMaterial({color:'purple'});
    for (var i = 0, j = Math.round(Math.random() * 10); i < j; ++i) {
        // Random cubes that are purple
        var tempObj = new THREE.Mesh(obsGeo, obsMat);
        DEMO.ms_Scene.add(tempObj);
        var neg = (Math.random() * 10) % 2 == 0 ? 1 : -1;
        var closeCheck = checks[Math.round(Math.random() * 10) % 3]
        tempObj.position.x = closeCheck.position.x + Math.round(Math.random() * 300) * neg;
        tempObj.position.z = closeCheck.position.z + Math.round(Math.random() * 300) * neg;
        tempObj.position.y = 0;
        obstacles.push(tempObj);
    }

    var startToMid1 = new THREE.Vector3(midPoint.x - startPoint.x, midPoint.y - startPoint.y, midPoint.z - startPoint.z);
    var midToEnd = new THREE.Vector3(endPoint.x - midPoint.x, endPoint.y - midPoint.y, endPoint.z - midPoint.z);

    console.log(startToMid1);
    console.log(midToEnd);
}