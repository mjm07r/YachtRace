/**
 * Builds the rings that the boat must go through
 * Created by Mike on 11/11/2015.
 */

/**
 * Builds a ring to be used to guide the race.
 * @return {THREE.Mesh}
 */
function buildRaceRing() {
    var innerRad = 30;
    var outerRad = 40;
    var ringMaterial = new THREE.MeshPhongMaterial({color:0xff0000});
    var ringGeometry = new THREE.SphereGeometry(innerRad, outerRad, 32);
    return new THREE.Mesh(ringGeometry, ringMaterial);
}