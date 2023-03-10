//tested using Firefox v110.01, on Windows 10, 
let start = document.querySelector('.start');                   //retrieves all necessary elements
let led = document.querySelector('.led');
let gcirc = document.querySelector('.circle.green');
let rcirc = document.querySelector('.circle.red');
let ycirc = document.querySelector('.circle.yellow');
let bcirc = document.querySelector('.circle.blue');
let hiscore = document.querySelector('.hiscore');
let mute = document.querySelector('.mute');
let acc = document.querySelector('.accessibility');
let info = document.querySelector('.info');
let hi = parseInt(hiscore.textContent);                         //converts hiscore object to int
let arr = [];                                                   //array to keep track of button presses
let level = 0;                                                  //tracks current level
let time = 500;                                                //time between signals
let count = 0;                                                  //tracks number of user button presses per sequence
let check = false;                                              //checks to keep processes in time
let play = false;                                               //similar to previous check, disables start button when game in play
let currentbutton = 5;                                          //keeps track of the last button the user pressed
let soundCheck = true;
let blindCheck = false;
var greenbeep = new Audio('beep.mp3');
var redbeep = new Audio('redbeep.mp3');
var yellowbeep = new Audio('yellowbeep.mp3');
var bluebeep = new Audio('bluebeep.mp3');
var ding = new Audio('ding.mp3');
var buzzer = new Audio('buzzer.mp3');
var success = new Audio('success.mp3');

start.addEventListener('click', () => {                         //starts game on start button click
    if (!play) {                                                 //makes sure there isn't already a game in progress
        play = true;
        go();                                                   //most code is kept in recursive functions to keep everything in time
    }
})

gcirc.addEventListener('click', () => {                         //if green circle clicked
    gfunc();
})

rcirc.addEventListener('click', () => {                        //red circle
    rfunc();
})

ycirc.addEventListener('click', () => {                       //yellow circle
    yfunc();
})

bcirc.addEventListener('click', () => {                      //blue circle
    bfunc();
})

mute.addEventListener('click', () => {
    soundCheck = !soundCheck;
   if(!soundCheck) mute.textContent = "Sound: Off";
   else mute.textContent = "Sound: On";
})

acc.addEventListener('click', () =>{
    blindCheck = !blindCheck;
    if(!blindCheck){
        acc.textContent = "Accessibility: Off";
        info.textContent = "";
    }
    else {
        acc.textContent = "Accessibility: On";
        info.textContent  = "Turns off button flash, allows keypress 1,2,3,4 for button input";
    }
})

document.addEventListener('keydown', (event) => {
    if(blindCheck){
        switch(event.key){
            case "1":
                gfunc();
                break;
            case "2":
                rfunc();
                break;
            case "3":
                yfunc();
                break;
            case "4":
                bfunc();
                break;
            case "Enter":
                if (!play) {                                                 //makes sure there isn't already a game in progress
                    play = true;
                    go();                                                   //most code is kept in recursive functions to keep everything in time
                }
                break;
            default:
                break;
        }
    }
})

function gfunc() {
    if (check) {                                                //makes sure its the right time for user input
        gcirc.style.backgroundColor = '#90EE90';                //button flash
        currentbutton = 0;                                      //buttons are labeled 0 through 3 from top to bottom, right to left
        buttonPress();                                          //the only thing that this event actually does is cause button flash the rest is handled by buttonPress()
        setTimeout(() => {
            gcirc.style.backgroundColor = 'limegreen';          //stop flash after 0.1s
        }, 100)
    }
}

function rfunc() {
    if (check) {
        rcirc.style.backgroundColor = '#FFCCCB';
        currentbutton = 1;
        buttonPress();
        setTimeout(() => {
            rcirc.style.backgroundColor = 'red';
        }, 100)
    }
}

function yfunc(){
    if (check) {
        ycirc.style.backgroundColor = '#FFFFE0';
        currentbutton = 2;
        buttonPress();
        setTimeout(() => {
            ycirc.style.backgroundColor = 'yellow';
        }, 100)
    }
}

function bfunc(){
    if (check) {
        bcirc.style.backgroundColor = '#ADD8E6';
        currentbutton = 3;
        buttonPress();
        setTimeout(() => {
            bcirc.style.backgroundColor = 'blue';
        }, 100)
    }
}

function rand() {
    return Math.floor(Math.random() * 4);                   //generates a random int from 0 to 3 inclusive
}

function go() {
    if (level == 4 || level == 8 || level == 12) time / 2;                          //increases the speed at given levels
    led.style.backgroundColor = 'limegreen';                                        //changes 'LED' to green
    if (level >= 10) document.querySelector('.level').textContent = level + 1;      //changes level text
    else document.querySelector('.level').textContent = "0" + (level + 1);          //^
    if (hi < level) {                                                               //sets high score if necessary
        hi = level;
        hiscore.textContent = "0" + hi;
    }
    setTimeout(() => {                                                      //3 second delay between levels
        arr.push(rand());                                                   //picks a random button to add to the sequence
        check = false;                                                      //disallows user input
        sequence(0);
    }, 3000)
}

function timeLimit(n, l) {                                                     //checks if user has run out of time between inputs
    setTimeout(() => {
        if ((level == l) && (count == n) && (arr[count] != currentbutton)) quit();              //if the correct button hasn't been clicked in time, end game
    }, 5000)
}

function sequence(ind) {
    if (ind < arr.length) {                                             //recursively iterates through array of buttons to flash them in sequence
        switch (arr[ind]) {
            case 0:
                if(soundCheck){
                    greenbeep.pause();
                    redbeep.pause();
                    yellowbeep.pause();
                    bluebeep.pause();
                    greenbeep.currentTime = 0;
                    greenbeep.play();
                }
                if(!blindCheck) gcirc.style.backgroundColor = '#90EE90';
                break;
            case 1:
                if(soundCheck){
                    greenbeep.pause();
                    redbeep.pause();
                    yellowbeep.pause();
                    bluebeep.pause();
                    redbeep.currentTime = 0;
                    redbeep.play();
                }
                if(!blindCheck) rcirc.style.backgroundColor = '#FFCCCB';
                break;
            case 2:
                if(soundCheck){
                    greenbeep.pause();
                    redbeep.pause();
                    yellowbeep.pause();
                    bluebeep.pause();
                    yellowbeep.currentTime = 0;
                    yellowbeep.play();
                }
                if(!blindCheck) ycirc.style.backgroundColor = '#FFFFE0';
                break;
            default:
                if(soundCheck){
                    greenbeep.pause();
                    redbeep.pause();
                    bluebeep.pause();
                    yellowbeep.pause();
                    bluebeep.currentTime = 0;
                    bluebeep.play();
                }
                if(!blindCheck) bcirc.style.backgroundColor = '#ADD8E6';
                break;
        }
        setTimeout(() => {
            gcirc.style.backgroundColor = 'limegreen';
            rcirc.style.backgroundColor = 'red';
            ycirc.style.backgroundColor = 'yellow';
            bcirc.style.backgroundColor = 'blue';
            setTimeout(() => {
                sequence(ind + 1);
            }, time)
        }, 250)
    }
    else {
        check = true;                               //allows user input
        timeLimit(count, level);                           //starts time countdown for user input
    }
}

function buttonPress() {
    if (count == arr.length - 1 && arr[count] == currentbutton) {                          //if this is the last button in sequence correctly pressed
        if(soundCheck) success.play();
        level = level + 1;                                                                 //increases level
        if (level >= 10) document.querySelector('.level').textContent = level + 1;         //updates display
        else document.querySelector('.level').textContent = "0" + (level + 1);
        count = 0;
        go();                                                                              //starts next level
    }
    else if (arr[count] == currentbutton) {                            //if correct button pressed
        if(soundCheck){
            greenbeep.pause();
            redbeep.pause();
            yellowbeep.pause();
            bluebeep.pause();
            ding.pause();
            ding.currentTime=0;
            ding.play();
        }
        count++;
        timeLimit(count, level);
    }
    else {                                                           //if incorrect button pressed
        quit();
    }
}

function quit() {
    if(soundCheck) buzzer.play();
    level = 0;                              //level reset
    arr = [];                               //clear button history
    time = 1000;                            //reset time between signals
    count = 0;                              //resets user input count
    currentbutton = 5;                      //resets last input
    led.style.backgroundColor = 'red';      //turns 'LED' red
    document.querySelector('.level').textContent = '01';    //reset level display
    play = false;                           //re enables start button use
    if(blindCheck) flash(4)                                //4 time flash to indicate loss
}

function flash(n) {                                      //recursive function that flashes buttons n times
    if (n > 0) {
        gcirc.style.backgroundColor = '#90EE90';
        rcirc.style.backgroundColor = '#FFCCCB';
        ycirc.style.backgroundColor = '#FFFFE0';
        bcirc.style.backgroundColor = '#ADD8E6';
        setTimeout(() => {
            gcirc.style.backgroundColor = 'limegreen';
            rcirc.style.backgroundColor = 'red';
            ycirc.style.backgroundColor = 'yellow';
            bcirc.style.backgroundColor = 'blue';

            setTimeout(() => { flash(n - 1) }, 250);
        }, 250)
    }
}
