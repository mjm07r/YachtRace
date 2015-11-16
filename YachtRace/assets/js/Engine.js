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
 * The vector representing the sail orientation.
 * Needs to be a Vector3 in order to use beneficial methods.
 * @type {THREE.Vector3}
 */
var sailOrientation = new THREE.Vector3(0, 0, 0);

/**
 * Flag that allows execution of setWindSpeed()
 * @type {number}
 */
var windFlag= 1;

/**
 *
 */
function setWindSpeed() {
    if (windFlag == 1) {
        window.setTimeout(randomWind(), 1000 * 60);
    }
}

/**
 * Randomly moves the direction and magnitude of the wind
 */
function randomWind() {
    windFlag = -windFlag;
    wind.setX(wind.x + Math.round(Math.random() * 10) % 180);
    wind.setY(wind.x + Math.round(Math.random() * 10) % 180);
    wind.setZ(wind.x + Math.round(Math.random() * 10) % 180);
}