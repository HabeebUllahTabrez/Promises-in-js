// Going to refactor the previous code by implementing Promises
console.log("The Code is starting!");

// Change these values to see different results

const USER_EMAIL = "charmander@goomail.com";
const USER_PASSWORD = 12345678969;
// const USER_EMAIL = "charmander12@goomail.com";
// const USER_PASSWORD = 1234569;

// A function which will help me get a random INTEGER number in a given range
function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// These are functions which uses promises and returns the result of a promise
// Every promise can either be resolved or can be rejected so two cases arise in every promise we create
function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email !== "charmander@goomail.com") {
                reject(
                    new Error("Error: The email address you entered is already in use!")
                );
            } else if (password !== 12345678969) {
                //Throwing an error stating that password is wrong is never recommended to avoid any hacker from knowing that the email he has is correct.
                reject(new Error("Error: Looks like either the email address or the password you entered is wrong. Please try again"));
            } else {
                console.log("The details of the user are:");
                resolve({ email, data: "This user watches coding tutorials" });
            }
        }, 3000);
    });
}

function getVideoDetails(Userdetails) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Userdetails.email === "charmander@goomail.com") {
                resolve(["Memes", "Cooking Videos", "Food Reviews", "Cosplays", "Coding Tutorials"]);
            } else {
                reject(
                    new Error("You cannot access the data of another user!")
                );
            }
        }, 2000);
    });
}

function getFavVideo(videos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(videos[getRandomNumberBetween(0, videos.length - 1)]);
        }, 1000);
    });
}

// ------------------------------------------------------------------------------------------------

let resolvedUserDetails;
loginUser(USER_EMAIL, USER_PASSWORD)
    .then((details) => {
        console.log(details);
        resolvedUserDetails = details;
        return getVideoDetails(details);
    })
    .then((videos) => {
        let text = "";
        videos.forEach((video) => {
            text += `${video}, `;
        });
        console.log(`This guy watches ${text}.`);
        return getFavVideo(videos);
    })
    .then((favVideo) => {
        console.log(
            `The favourite videos of ${resolvedUserDetails.email} are ${favVideo}!`
        );
        console.log(
            "This isn't really the last line of the code but well it gets executed in the End!"
        );
    })
    .catch((err) => console.log(err.message));

// ------------------------------------------------------------------------------------------------
// Do you not think this a cleaner way of doing it?

// The reason why this line executes before the overall logic of the code is because the code is being executed synchronously by the event loop.
console.log(
    "This is the last line of my code, But this doesn't get executed in the end!"
);
