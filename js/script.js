const msgEl = document.getElementById('msg')


const randomNum = getRandomNumber();

console.log('Number: ', randomNum)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();


//start recognition and game
recognition.start();


//capture user response
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);
}

//write what user speaks to the DOM
function writeMessage(msg){
    msgEl.innerHTML = `
        <div>You said: </div>
        <span class="box">${msg}</span>
    `
}

//generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

//check mess against randomNum
function checkNumber(msg) {
    const num = +msg;

    //check if valid number
    if(Number.isNaN(num)) {
        msgEl.innerHTML += '<div>This is not a valid nubmer</div>';
        return; 
    }

    //check in range
    if(num> 100 || num < 1){
        msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }


    //check number 
    if (num === randomNum) {
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the number! <br><br>
            It was ${num}</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if (num > randomNum) {
        msgEl.innerHTML += '<div>GO LOWER!</div>';
    } else {
        msgEl.innerHTML += '<div>GO HIGHER!</div>';
    }
}



//speak result
recognition.addEventListener('result', onSpeak);

//end sr service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
    if(e.target.id == 'play-again'){
        window.location.reload();
    }
})