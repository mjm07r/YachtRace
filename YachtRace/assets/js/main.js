function mainLoop() {
    requestAnimationFrame(mainLoop);
    DEMO.update();
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

    // Load sounds
    loadSounds();

    mainLoop();
});



function loadSounds() {
    var windSound = new Audio("assets/sounds/wind.mp3");
    windSound.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    windSound.play();
}