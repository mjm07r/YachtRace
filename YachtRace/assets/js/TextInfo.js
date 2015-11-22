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
    arrowHelper.name = 'arrow';
    DEMO.ms_Scene.add(DEMO.ms_Camera);
    DEMO.ms_Camera.add(arrowHelper);
    arrowHelper.position.set(25, 10, -35);
// Add 3d text showing wind speed and angle
    var windSpeedText = new THREEx.Text("12kn");
    windSpeedText.name = 'windSpeedText';
    var windDirectionText = new THREEx.Text("NW");
    windDirectionText.name = 'windDirText';
    DEMO.ms_Camera.add(windSpeedText);
    DEMO.ms_Camera.add(windDirectionText);
    windDirectionText.position.set(15, 10, -25);
    windSpeedText.position.set(20, 10, -25);
}

/**
 * Updates the text representing the wind speed and direction.
 */
function updateText() {
    // You must remove and add new three .text.
    var oldSpeedText = DEMO.ms_Camera.getObjectByName('windSpeedText');
    DEMO.ms_Camera.remove(oldSpeedText);
    var oldDirText = DEMO.ms_Camera.getObjectByName('windDirText');
    DEMO.ms_Camera.remove(oldDirText);

    var newSpeedText = (Math.round(wind.length())).toString()+'kn';
    console.log('wind length', wind.length());
    var newWindSpeedObj = new THREEx.Text(newSpeedText);
    console.log('Speed text: ', newSpeedText);
    DEMO.ms_Camera.add(newWindSpeedObj);
    newWindSpeedObj.position.set(oldSpeedText.position.x, oldSpeedText.position.y, oldSpeedText.position.z);
    newWindSpeedObj.name = 'windSpeedText';
    console.log(newWindSpeedObj);

    var newWindDirObj = new THREEx.Text(windDirectionText);
    console.log('Dir text: ', windDirectionText);
    DEMO.ms_Camera.add(newWindDirObj);
    newWindDirObj.position.set(oldDirText.position.x, oldDirText.position.y, oldDirText.position.z);
    newWindDirObj.name = 'windDirText';
    console.log(newWindDirObj);

    updateArrow();
}


/**
 * Updates the way the arrow faces.
 */
function updateArrow() {
    var arrow = DEMO.ms_Camera.getObjectByName('arrow');
    var tempVec = wind.clone();
    tempVec.normalize();
    arrow.setDirection(tempVec);
}