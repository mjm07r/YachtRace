/**
 * Created by Mike on 11/19/2015.
 */

var start = new Date;
var i = 0;
function timer() {
    setInterval(placeTimer, 1000);
}

var curTime;
function placeTimer() {
    var seconds = i++;
    if (seconds % 60 == 0) {
        if (gullSound == null ) return;
        gullSound.play();
    }
    // Remove old timer if it exists
    var oldTimer = DEMO.ms_Camera.getObjectByName('timer');
    DEMO.ms_Camera.remove(oldTimer);

    // Make some threex text and place on screen.
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) {minutes = '0'+minutes}
    var seconds = seconds % 60;
    if (seconds < 10) {seconds = '0'+seconds}
    var timeString = minutes+':'+seconds;
    curTime = timeString;
    var time = new THREEx.Text(timeString);
    time.name = 'timer';
    // Place the text on the upper left part of the screen
    DEMO.ms_Camera.add(time);
    time.position.set(-20, 10, -25);
}