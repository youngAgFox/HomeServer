const password = $("#password");
const confirmPassword = $("#confirm-password");
const minLength = 8;

password.on("input", validatePassword);
confirmPassword.on("input", validatePassword);

function toggleInvalidClass(invalid) {
    password.toggleClass("invalid", invalid);
    confirmPassword.toggleClass("invalid", invalid);
}

function validatePassword() {
    const matches = passwordMatches();
    const validateText = $("#validate-text")
    toggleInvalidClass(!matches);
    if (password.val().length < minLength) {
        validateText.text(`Passwords needs to be at least ${minLength} characters long!`);
    } else if (!matches) {
        validateText.text("Passwords do not match!");
    } else {
        validateText.text("");
    }
    toggleValidClass(matches && password.val().length >= minLength);
}

function passwordMatches() {
    const pass = password.val();
    const confPass = confirmPassword.val();
    return pass == confPass;
}

function toggleValidClass(valid) {
    console.log("valid: " + valid);
    password.toggleClass("valid", valid);
    confirmPassword.toggleClass("valid", valid);
    toggleAttr($("#register-btn"), "disabled", !valid);
}

function toggleAttr(jElem, attr, isSet) {
    const hasAttr = jElem.is(`:${attr}`);
    if (isSet !== undefined) {
        if (isSet && !hasAttr) {
            jElem.attr(attr, true);
        } else if (!isSet && hasAttr) {
            jElem.removeAttr(attr);
        }
        return;
    }
    if (hasAttr) {
        jElem.removeAttr(attr);
    } else {
        jElem.attr(attr, true);
    }
}