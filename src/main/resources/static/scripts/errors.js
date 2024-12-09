const messages = [
    "Not this again...",
    "Lord Almighty",
    "Great Scott!",
    "For Pete's sake",
    "\"Im going to throat punch this monitor\"",
    "Hey, User! What did you do to my bug free program!",
    "Bug? Nah, simply a user skill issue.",
    "HMMMMMMM",
    "Did the developer even try?",
    "Your attempts to use this program are futile",
    "Another day, another failure",
    "That is not supposed to happen...",
    "Is this a pigeon?",
    "\"That's rough buddy\"",
    "Why have you done this.",
    "Are you trying to break the program?!",
    "Yea sorry... had better things to do than fix the bugs apparently",
    "Ope, Sorry 'bout that!",
    "Listen here pal, this is getting ridiculous."
];

const errorText = document.getElementById("error-exclamation");
errorText.innerText = messages[Math.round(Math.random() * (messages.length - 1))];