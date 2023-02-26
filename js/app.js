const video = document.getElementById("webcam");
const label = document.getElementById("label");
const labelThreeBtn = document.querySelector("#labelThree");
const infoBtn = document.querySelector("#Info")
let points = 0

//spraak dingen
let synth = window.speechSynthesis

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

speak("Goedemoergen welkom bij de mens detectie software, hier kan je kijken of je een mens bent");

labelThreeBtn.addEventListener("click", () => classifyImage());
infoBtn.addEventListener("click", () => speak("als je op de classify knop drukt dan bekijkt hij de camera feed of er een mens in zit."));

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}



// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
    featureExtractor.load("model/model.json")
    console.log('Model Loaded!');
}

//hier neemt vid
// Create a new classifier using those features and with a video element
    const classifier = featureExtractor.classification(video, videoReady);

// Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}

// Get a prediction for that image
function classifyImage() {
    classifier.classify(document.getElementById('webcam'), (err, result) => {
        console.log(result);
        label.innerText = result[0].label;
        if(result[0].label == "man") {
            speak("dat is een hele man")
            points += 1;
            document.getElementById("points").innerHTML = `aantal herkende mensen: ${points}`;
        } else {
            speak("Hier is geen mens")
        }
    });
}