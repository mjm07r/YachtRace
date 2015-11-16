/**
 * Created by Mike on 11/15/2015.
 */

function addText() {
// Generate wind and place wind arrow.
    var arrowDir = new THREE.Vector3(1, 0, 0);
//var arrowOrigin = new THREE.Vector3(DEMO.ms_Camera.position.x, DEMO.ms_Camera.position.y, DEMO.ms_Camera.position.z);
    var arrowOrigin = new THREE.Vector3(0, 45, 0);
    var arrowLength = 5;
    var hex = 0xff0000;
    var arrowHelper = new THREE.ArrowHelper(arrowDir, arrowOrigin, arrowLength, hex);
    DEMO.ms_Scene.add(DEMO.ms_Camera);
    DEMO.ms_Camera.add(arrowHelper);
    arrowHelper.position.set(15, 10, -20);
// Add 3d text showing wind speed and angle
    var windSpeedText = new THREEx.Text("12kn");
    var windDirectionText = new THREEx.Text("NW");
    DEMO.ms_Camera.add(windSpeedText);
    DEMO.ms_Camera.add(windDirectionText);
    windDirectionText.position.set(20, 10, -30);
    windSpeedText.position.set(25, 10, -30);
}