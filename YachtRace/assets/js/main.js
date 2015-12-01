function mainLoop() {
    requestAnimationFrame(mainLoop);
    setWindSpeed();
    //calculateBoatVelocity();
    DEMO.update();
    updateBoat();
    checkForCheckpointCollision();
    checkForObstacleCollision();
}

$(function() {
	WINDOW.initialize();
	
	DEMO.initialize('canvas-3d');
	
	WINDOW.resizeCallback = function(inWidth, inHeight) { DEMO.resize(inWidth, inHeight); };
	DEMO.resize(WINDOW.ms_Width, WINDOW.ms_Height);

	// Load Sailboat here.

    // Place island in the middle of the scene.

    buildLevelOne(DEMO.ms_Scene);
    DEMO.ms_Scene.add(DEMO.ms_meshMirror);
    console.log("meshMirror position: ",DEMO.ms_meshMirror.position);
    console.log("Mesh mirror object: ", DEMO.ms_meshMirror);

    // Load boat and place it at center of map.
    loadBoat();

    // Add info text
    addText();

    // Add timer
    placeTimer();
    timer();

    // Load sounds
    loadSounds();

    // Test boat velo
    //calculateBoatVelocity();
    setInitialWind();

    mainLoop();
});


var ding;
var waterSound;
var gullSound;
var buzzer;
function loadSounds() {
    var windSound = new Audio("assets/sounds/wind.mp3");
    windSound.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    windSound.play();

    ding = new Audio("assets/sounds/Ding-small-bell.mp3");
    buzzer = new Audio("assets/sounds/buzzer.mp3");
    waterSound = new Audio("assets/sounds/water.mp3");
    waterSound.volume = 0.1;
    waterSound.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    waterSound.play();

    gullSound = new Audio("assets/sounds/gull.mp3");
}