// import { GLS } from "../services/gl.service";
// import { interval } from "rxjs";

// var startTime = new Date().getTime();
// var timeElapsed = 0;
// var timer;

// export function myTimer(){
    
//     interval(1000).subscribe(()=>{
            
//         var timeNow = new Date().getTime()
    
//         timeElapsed += Math.floor((timeNow - startTime)/1000);
//         document.getElementById("time").innerHTML = pad(timeElapsed);
    
//         startTime = timeNow;
        
//     });
// }


// export function resetTimer() {
// 	startTime = new Date().getTime();
// 	timeElapsed = 0;
// }

// export function pad ( num ) {
// 	if (num < 10)
// 		return "0000" + num;
// 	else if (num < 100)
// 		return "000" + num;
// 	else if (num < 1000)
// 		return "00" + num;
// 	else if (num < 10000)
// 		return "0" + num;
// 	else
// 		return num;
// };

