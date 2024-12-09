function retrieveExercises() {
    // temporarily just return a mock-up
    return {
        "Hip Abduction Machine": {
            url: "https://www.muscleandstrength.com/exercises/hip-abduction-machine.html",
            target_muscle_group: "Abductors",
            exercise_type: "Strength",
            equipment: "Machine",
            mechanics: "Isolation",
            force_type: "Push (Bilateral)",
            experience_level: "Beginner",
            void: false
        },
        "Sit Up": {
            url: "https://www.muscleandstrength.com/exercises/sit-up.html",
            target_muscle_group: "Abs",
            exercise_type: "Strength",
            equipment: "Bodyweight",
            mechanics: "Isolation",
            force_type: "Pull (Bilateral)",
            experience_level: "Beginner",
            void: false
        },
        "EZ Bar Curl": {
            url: "https://www.muscleandstrength.com/exercises/ez-bar-curl.html",
            target_muscle_group: "Biceps",
            exercise_type: "Strength",
            equipment: "Barbell",
            mechanics: "Isolation",
            force_type: "Pull",
            experience_level: "Beginner",
            void: false
        }
    };
}

function addExercise() {
    // insert a new Exercise element and focus it
    const exercise = document.createElement("li");
    exercise.classList.add("exercise");

    const nameInput = document.createElement("select");
    nameInput.placeholder = "Exercise";
    const deleteBtn = document.createElement("input");
    deleteBtn.classList.add("exercise-delete-btn");
    deleteBtn.type = "image";
    deleteBtn.src = "/static/images/delete.png";
    deleteBtn.title = "Delete";
    deleteBtn.addEventListener("click", () => {
        exerciseContainer.removeChild(exercise);
    });

    exercise.append(nameInput, deleteBtn);
    exerciseContainer.appendChild(exercise);
    exercise.scrollIntoView();
}

const exerciseContainer = document.getElementById("exercise-container");
const addExerciseBtn = document.getElementById("add-exercise-btn");

addExerciseBtn.addEventListener("click", () => addExercise());