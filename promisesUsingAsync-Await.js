// Going to refactor the previous code by implementing Promises using async and await
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

// These promise functions remain the same, cut the way we are going to implement these will change
function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email !== "charmander@goomail.com") {
                reject(
                    new Error(
                        "Error: You cannot access the data of another user!"
                    )
                );
            } else if (password !== 12345678969) {
                reject(new Error("Error: Did you forget your password?"));
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
                resolve([
                    "Memes",
                    "Cooking Videos",
                    "Food Reviews",
                    "Cosplays",
                    "Coding Tutorials",
                ]);
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

/* 
    What if we do the exact same thing in a much much cleaner way
    Well we can use async, await here
    This is just some syntactical sugar which makes asynchronous code looks like synchronous code!
*/

//  This code doesnt look like its asynchronous, we are doing everything sychronously BY WAITING for the previous thing to complete!
// There's no better way than this to do it!

async function doEverything() {
    try {
        const resolvedUserDetails = await loginUser(USER_EMAIL, USER_PASSWORD);
    console.log(resolvedUserDetails);
    const videos = await getVideoDetails(resolvedUserDetails);
    let text = "";
    videos.forEach((video) => {
        text += `${video}, `;
    });
    console.log(`This guy watches ${text}.`);
    const favVideo = await getFavVideo(videos);
    console.log(
        `The favourite videos of ${resolvedUserDetails.email} are ${favVideo}!`
    );
    console.log(
        "This isn't really the last line of the code but well it gets executed in the End!"
    );
    }
    catch (error) {
        console.log(error.message)  //If we wanna do some wrror handling then we can use try catch
    }
}

doEverything();

// The reason why this line executes before the overall logic of the code is because the code isnt working synchronously
console.log(
    "This is the last line of my code, But this doesn't get executed in the end!"
);