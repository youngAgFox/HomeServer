const messages = [
    "Not this S*IT again...",
    "F*CK!",
    "Lord Almighty",
    "For Pete's sake",
    "'Im going to throat punch this monitor'",
    "Hey, User! What did you do to my bug free program!",
    "User skill issue.",
    "HMMMMMMM",
    "Did the developer even try?",
    "We tried",
    "Another day, another failure",
    "Crunchy!",
    "Is this a pigeon?",
    "That's rough buddy"
];

const errorText = document.getElementById("error-exclamation");
errorText.innerText = messages[Math.round(Math.random() * (messages.length - 1))];