const video = document.getElementById("webcam");
const label = document.getElementById("label");

const labelOneBtn = document.querySelector("#labelOne");
const labelTwoBtn = document.querySelector("#labelTwo");
const labelThreeBtn = document.querySelector("#labelThree");
const trainbtn = document.querySelector("#train");
const savebtn = document.querySelector("#save");

labelOneBtn.addEventListener("click", () => addImage('man'));
labelTwoBtn.addEventListener("click", () => addImage('noMan'));
labelThreeBtn.addEventListener("click", () => classifyImage());
savebtn.addEventListener("click", () => saveModel());
trainbtn.addEventListener("click", () => trainModel());

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

label.innerText = "Ready when you are!";

// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
}

//hier neemt vid
// Create a new classifier using those features and with a video element
    const classifier = featureExtractor.classification(video, videoReady);

// Add a new image with a label
//train met labe; butteon
function addImage(X) {
    classifier.addImage(document.getElementById('webcam'), X);
    console.log(X)
}

// Triggers when the video is ready
function videoReady() {
    console.log('The video is ready!');
}

// Retrain the network
//dit moet met train knop
function trainModel() {
    classifier.train((lossValue) => {
        console.log('Loss is', lossValue);
    });
}

// Get a prediction for that image
function classifyImage() {
    classifier.classify(document.getElementById('webcam'), (err, result) => {
        console.log(result); // Should output 'dog'
    });
}

function saveModel() {
    featureExtractor.save();
}