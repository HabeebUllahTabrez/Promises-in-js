console.log("The Code is starting!");

// A function which will help me get a random INTEGER number in a given range
function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Sone asynchronous functions, which means they have to wait until the response is received
// Since setTimeout is asynchronous, these funtions dont really get executed right away but gets handled by the browser
// The enent loop places them in the call stack after they have completed their waiting time which means they are partially skipped and the javascript engine proceeds executing other lines instead of waiting for these to complete

function getUserDetails(email, password, callback) {
    setTimeout(() => {
        console.log("The details of the user are:");
        callback({ email, data: "This user watches coding tutorials" });
    }, 3000);
}

function getVideoDetails(Userdetails, callback) {
    setTimeout(() => {
        if (Userdetails.email === "charmander@goomail.com") {
            callback(["video1", "video2", "video3", "video4"]);
        }
    }, 2000);
}

function getFavVideo(videos, callback) {
    setTimeout(() => {
        callback(videos[getRandomNumberBetween(0, videos.length - 1)]);
    }, 1000);
}

// This is something what we call a callback hell!
// Async codes usually work with callbacks to maintain their behaviour (our behavious)
// Sometimes this code gets difficult to read and manage, so we have to find a solution for it
// To explain everything in brief
// --> Every async function gets executed after a time period
// --> To have our own desired output, or sequence we need to write functions such that they take callback functions
// --> Callback functions get executed by the function for us
// --> To maintain the sequence, we must do this heavy nesting which is usually not readable
getUserDetails("charmander@goomail.com", 12345678969, (details) => {
    console.log(details);
    getVideoDetails(details, (videos) => {
        let text = "";
        videos.forEach((video) => {
            text += `${video} `;
        });
        console.log(`This guy watches ${text}.`);
        getFavVideo(videos, (favVideo) => {
            console.log(`The favourite video of ${details.email} is ${favVideo}!`);
            console.log("This isn't really the last line of the code but well it gets executed in the End!");
        });
    });
});

// The reason why this line executes before the overall logic of the code is because the code isnt working synchronously
console.log(
    "This is the last line of my code, But this doesn't get executed in the end!"
);
