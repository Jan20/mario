import { GLS } from "../services/gl.service";
import { interval } from "rxjs";

var startTime = new Date().getTime();
var timeElapsed = 0;
var timer;

export function myTimer(){
    
    interval(1000).subscribe(()=>{
            
        var timeNow = new Date().getTime()
    
        timeElapsed += Math.floor((timeNow - startTime)/1000);
        document.getElementById("time").innerHTML = pad(timeElapsed);
    
        startTime = timeNow;
        
    });
}


export function resetTimer() {
	startTime = new Date().getTime();
	timeElapsed = 0;
}

export function pad ( num ) {
	if (num < 10)
		return "0000" + num;
	else if (num < 100)
		return "000" + num;
	else if (num < 1000)
		return "00" + num;
	else if (num < 10000)
		return "0" + num;
	else
		return num;
};

export function pauseGame() {
    var pauseMenu = document.getElementById("pause");
    pauseMenu.style.display = "block";
    clearTimeout(timer);
};

export function continueGame() {
	var pauseMenu = document.getElementById("pause");
	pauseMenu.style.display = "none";
	startTime = new Date().getTime();
	myTimer();
	GLS.I().pauseMode = 0;
};

export function gameOver() {
    var gg = document.getElementById("gg");
    gg.style.display = "block";
    GLS.I().gameOver = 1;
    document.addEventListener('keydown', function(evt) {
        if ((evt.keyCode == 13 || evt.keyCode == 32) && gameOver) {
            location.reload();
        }
    }, false);
}

export function finishLevel() {
    
    const done = document.getElementById("done");
    done.style.display = "block";
    GLS.I().gameOver = 1;
    
    document.addEventListener('keydown', function(evt) {
        if ((evt.keyCode == 13 || evt.keyCode == 32) && gameOver) {
            location.reload();
        }
    }, false);
}