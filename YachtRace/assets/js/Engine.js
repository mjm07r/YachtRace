/**
 * Main game engine that sets wind speed and calculates yacht movement based off
 * of sail orientation.
 * Created by Mike on 11/15/2015.
 */

/**
 * The vector representing the wind direction and velocity
 * @type {THREE.Vector3}
 */
var wind = new THREE.Vector3(0, 0, 0);

/**
 * The direction the wind is blowing in.
 * N, S, E, W, NE, NW, SE, SW
 */
var windDirectionText;

/**
 * The vector representing the sail orientation.
 * Needs to be a Vector3 in order to use beneficial methods.
 * @type {THREE.Vector3}
 */
var sailOrientation = new THREE.Vector3(0, 0, 0);


/**
 * The velocity vector of the boat.
 * @type {THREE.Vector3}
 */
var boatVelocity = new THREE.Vector3(1, 1, 1);


/**
 * The position vector of the boat.
 * @type {THREE.Vector3}
 */
var boatNormal = new THREE.Vector3(1, 0, 1);

/**
 * Flag that allows execution of setWindSpeed()
 * @type {number}
 */
var windFlag= 1;


var checkPoints = [];

function setInitialWind() {
    wind = new THREE.Vector3(Math.round(Math.random() * 10), Math.round(Math.random() * 10), Math.round(Math.random() *10));
    setWindDirection();
}

/**
 *
 */
function setWindSpeed() {
    if (windFlag % (60 * 60) == 0) {
        randomWind();
    } else {
        windFlag++;
    }
}

/**
 * Randomly moves the direction and magnitude of the wind
 */
function randomWind() {
    windFlag++;
    wind.setX(wind.x + Math.round(Math.random() * 20 -10) % 180);
    wind.setY(wind.y + Math.round(Math.random() * 20 -10) % 180);
    wind.setZ(wind.z + Math.round(Math.random() * 20 -10) % 180);

    // set direction
    setWindDirection();
}


/**
 * Calculated the wind direction based off of the normalized wind vector.
 */
function setWindDirection() {
    var headings = ["E", "NE", "N", "NW", "W", "SW", "S", "SE"];
    // Get unit vector of wind.
    var tempVec = wind.clone();
    tempVec.normalize();
    var atan = Math.atan2(tempVec.z, tempVec.x);
    var directionNumber = Math.round(8 * atan/ (2 * Math.PI) + 8) % 8;
    windDirectionText = headings[directionNumber];
    //console.log('Wind direction: ', tempVec, directionNumber, windDirectionText);

    updateText();
}


/**
 * Calculates the resultant velocity of the boat due to wind
 * **********************************************************************
 * Using formula from https://sites.google.com/site/yoavraz2/sailingboatspeedvs.windspeed
 * VB = VW*(sin(a0 - a) / sin (a))                                      *
 * a0 – real wind direction relatively to boat (0 when wind from front) *
 * a – apparent wind direction relatively to boat                       *
 * VW – real wind velocity   (VW > 1)                                 *
 * **********************************************************************
 *
 */
function calculateBoatVelocity() {
    console.log('Entered caclc');
    if (boatNormal == null ) {
        boatNormal = new THREE.Vector3(1, 0, 1);
    }
    //console.log('Current wind is: ', wind);
    //console.log('Current sail orientation is:', sailOrientation);
    //console.log('Boat velo: ', boatVelocity);
    var windVelocityActual = wind.clone();
    var boatVector = boatNormal.clone();
    console.log('boat vector', boatVector);
    console.log('wind', windVelocityActual);
    var sailVector = sailOrientation.clone();
    //var a0 = Math.acos((dot(windVelocityActual, boatVector) / ( norm(windVelocityActual) * norm(boatVector) )));
    ////console.log('a0', a0);
    //var a = Math.acos((dot(windVelocityActual, sailVector) / ( norm(windVelocityActual) * norm(sailVector) )));
    var a0 = Math.atan2(norm(cross(windVelocityActual, boatVector)), dot(windVelocityActual, boatVector));
    var a = Math.atan2(norm(cross(windVelocityActual, sailVector)), dot(windVelocityActual, sailVector));
    console.log('a, a0', a, a0);
    if (isNaN(a0) || isNaN(a) || a == 0) return;
    var windForce = wind.clone().multiplyScalar(Math.sin(a0 - a) / Math.sin(a));
    var dragCoefficient = .56;
    var areaOfBoat = 100;
    var density = .05;
    var boatMass = 100;//kg
    //console.log('Boat velocity', boatVelocity);
    // Assuming 1/60th of a second of applied force.
    var veloPlus = new THREE.Vector3(windForce.x/boatMass * (1/60), 0, windForce.z/boatMass * (1/60));
    var temp = veloPlus.clone();
    var drag = new THREE.Vector3( (dragCoefficient * density * Math.pow(temp.x, 2) * areaOfBoat) / 2, 0,
        (dragCoefficient * density * Math.pow(temp.y, 2) * areaOfBoat) / 2);
    boatVelocity.add(veloPlus.sub(drag));
    var min = new THREE.Vector3(-5, 0, -5);
    var max = new THREE.Vector3(5, 0, 5);
    boatVelocity.clamp(min, max);
}



/**
 * Computes the functional dot product between vectors
 * @param v1
 * @param v2
 * @return {number}
 */
function dot(v1, v2) {
    //console.log('v1, v2', v1, v2);
    return (v1.x *v2.x) + (v1.y * v2.y) + (v1.z * v2.z);
}


/**
 * Calculates functional norm of vector v
 * @param v
 * @return {number}
 */
function norm(v) {
    //console.log('v', v);
    return Math.sqrt( (v.x* v.x)+(v.y* v.y)+(v.z* v.z) );
}


/**
 * Computes the cross product of two vectors.
 * @param v1
 * @param v2
 * @return {*}
 */
function cross(v1, v2) {
    return v1.clone().cross(v2.clone());
}


/**
 * Rotates the sail clockwise by a small margin
 * called from keypress, so potential to happen ever 1/60th of a second.
 */
function rotateSailClockwise() {
    var orx = sailOrientation.x;
    if (Math.abs(orx) > 180) {
        return;
    }

    sailOrientation.setX(orx +1);
    //sailOrientation.setZ(sailOrientation.z - 0.01);
    //sailOrientation.setY(sailOrientation.y + 0.1);
    //console.log('Sail orientation', sailOrientation);
}



function rotateSailCounterClockwise() {
    var orx =  sailOrientation.x;
    if (Math.abs(orx) > 180) {
        return;
    }

    sailOrientation.setX(orx -1);
   // sailOrientation.setZ(sailOrientation.z + 0.01);
    //console.log('Sail orientation', sailOrientation);
}

function turnKeel(dir) {
    //DEMO.ms_Camera.rotateX(Math.PI / 60 * 10 * dir);
    DEMO.ms_Camera.position.x += dir * 0.1;
    DEMO.ms_Camera.rotateY(Math.PI /(60 * 30) * -dir);
}

var isHelpLoaded = false;
function loadHelp() {
    if (!isHelpLoaded){
        isHelpLoaded = true;
        window.alert("Use 'W''A''S''D' to move the boat. \n Hit the green spheres");
    } else {
        isHelpLoaded = false;
    }
}



function moveCamera() {
    // Move the camera according to the BoatVeloctiy but not in the y direction. (Don't want to go into water)
    var bvx = boatVelocity.x;
    var bvz = boatVelocity.z;
    DEMO.ms_Camera.position.x = DEMO.ms_Camera.position.x + bvx / 10;
    DEMO.ms_Camera.position.z = DEMO.ms_Camera.position.z + bvz / 10;
    console.log('Sail orientation', sailOrientation);
    console.log('Boat velocity', boatVelocity);
    console.log('Camera position', DEMO.ms_Camera.position);
}


/**********************************************************************************************************************
 * Motor style movement.
 *
 **********************************************************************************************************************/

function updateBoat() {
    if (boatObj == null) {
        return;
    }

    //console.log('Entered updateBoat');

    var delta = DEMO.ms_Clock.getDelta(); // seconds.
    var moveDistance = 200 * delta; // 200 pixels per second
    var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second

    // local transformations

    // move forwards/backwards/left/right
    if ( DEMO.ms_Keyboard.pressed("W") )
        boatObj.translateX( -moveDistance );
    if ( DEMO.ms_Keyboard.pressed("S") )
        boatObj.translateX(  moveDistance );

    // rotate left/right/up/down
    var rotation_matrix = new THREE.Matrix4().identity();
    if ( DEMO.ms_Keyboard.pressed("A") )
        boatObj.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
    if ( DEMO.ms_Keyboard.pressed("D") )
        boatObj.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);

    //if (DEMO.ms_Keyboard.pressed('h')){
    //    loadHelp();
    //}

    var relativeCameraOffset = new THREE.Vector3(30000,6000,1000);

    var cameraOffset = relativeCameraOffset.applyMatrix4( boatObj.matrixWorld );

    DEMO.ms_Camera.position.x = cameraOffset.x;
    DEMO.ms_Camera.position.y = cameraOffset.y;
    DEMO.ms_Camera.position.z = cameraOffset.z;
    DEMO.ms_Camera.lookAt( boatObj.position );
    //DEMO.ms_Camera.lookAt(camLook);
    //DEMO.ms_Camera.rotateY(Math.PI);

    //camera.updateMatrix();
    //camera.updateProjectionMatrix();
}


function checkForCheckpointCollision() {
    if (boatObj == null) {
        return;
    }
    if (checkPoints.length == 0 && !winUp) {
        win();
        return;
    }
    var currentCheckpoint = checkPoints[0];

    // Check for collision
    var checkPointBox = new THREE.Box3().setFromObject(currentCheckpoint);
    var boatBox = new THREE.Box3().setFromObject(boatObj);
    if (boatBox.isIntersectionBox(checkPointBox)) {
        ding.play();
        checkPoints = checkPoints.slice(1);
        DEMO.ms_Scene.remove(currentCheckpoint);
        if (checkPoints[0] != null) {
            checkPoints[0].material.color.setHex(0x33cc33);
        }
        if (checkPoints[1] != null) {
            checkPoints[1].material.color.setHex(0xffff00);
        }
    }
}

var winUp = false;
function win(){
    var next = window.confirm("Congratulations!!\n You completed level "+level+" in "+curTime+"\n"+
        "Go to next level?");
    buildNextLevel();
}

var level = 1;
function buildNextLevel() {
    switch (level) {
        case 1:
            level++;
            buildLevelTwo();
            break;
        case 2:
            level++;
            buildLevelThree();
            break;
        case 3:
            gameOver();
            break;
    }

}


function gameOver() {
    var again = window.confirm("Congratulations!!\n You completed all of the levels in "+curTime+"\n Try again?");
    if (again) {
        location.reload();
    } else{
        window.open('/Final/thanks.html', '_self', false);
    }
}