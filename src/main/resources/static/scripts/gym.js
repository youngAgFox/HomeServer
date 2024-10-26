import * as dt from "/static/scripts/date.js"

function switchTab(source) {
    if (source === currentTab) {
        return;
    }
    currentTab.btn.classList.remove("active");
    currentTab.root.classList.remove("active");
    
    source.btn.classList.add("active");
    source.root.classList.add("active");
    
    source.init();
    currentTab = source;
}

function statsInit() {
    if (null === tabMap.stats.calendar) {
        tabMap.stats.calendar = buildStatsCalendar(today);
        setCalendar(tabMap.stats.calendar);
    }
}

function setCalendar(calendar) {
    while (gymCalendar.hasChildNodes()) {
        gymCalendar.removeChild(gymCalendar.firstElementChild);
    }
    calendar.forEach(elem => gymCalendar.appendChild(elem));
}

function workoutInit() {

}

function buildStatsCalendar(date) {
    const today = dt.getCurrentDate();
    let gridCol = dt.getFirstDayOfMonth(date).getDay() + 1;
    const cal = [];
    // WeekDay labels
    for (let i = 0; i < 7; i++) {
        const elem = document.createElement("div");
        elem.innerText = dt.getDayName(i).substring(0, 3).toUpperCase();
        elem.classList.add("calendar-day-name");
        elem.style = "text-align: center; padding: 5px 0; margin: 5px 0; border-bottom: solid 1px white;"
        cal[i] = elem;
    }

    // Days
    for (let i = 0; i < dt.getDaysInMonth(date); i++, gridCol = ((gridCol + 1) % 7)) {
        const elem = document.createElement("div");
        // highlight today's day
        let outlineColor = "white";
        const gridDate = new Date(date.getFullYear(), date.getMonth(), i + 1);
        if (dt.dateEquals(gridDate, today)) {
            outlineColor = "var(--color-l-orange); z-index: 2";
        }
        elem.classList.add("calendar-day", "rel");
        elem.style += `grid-column: ${gridCol}; min-height: 30px; outline: solid 1px ${outlineColor}; padding: 2px 5px;`;
        elem.innerText = i + 1;
        cal[i + 7] = elem;
    }

    // ask server for which days the user worked out / get from attributes?
    const workouts = mockGetDaysWorkedOut(date);
    for (const workout of workouts.work) {
        const img = document.createElement("img");
        img.src = "/static/images/green-circle-checkmark-48.png";
        img.classList.add("abs");
        img.style = "width: 50%; aspect-ratio: 1 / 1; top: 10%; left: 30%;";
        img.title = "Worked Out!"
        img.alt = "Workout"
        cal[(Number(workout) + 7)].appendChild(img);
    }
    for (const pr of workouts.pr) {
        const img = document.createElement("img");
        img.src = "/static/images/gold-crown-48.png";
        img.classList.add("abs");
        img.style = "width: 50%; aspect-ratio: 1 / 1; top: 10%; left: 30%;";
        img.title = "Personal Record!"
        img.alt = "PR"
        cal[(Number(pr) + 7)].appendChild(img);
    }
    return cal;
}

function mockGetDaysWorkedOut(date) {
    // would get the days worked out in the passed month
    // constraint: work and pr are mutually exclusive
    if (date.getMonth() == 9) {
        return {work: [1, 4, 5, 17], pr: [6, 8]};
    } else if (date.getMonth() == 8) {
        return {work: [2, 4, 7, 17], pr: [10, 8]};
    } else if (date.getMonth() == 7) {
        return {work: [1, 4, 9, 11, 13, 17], pr: [6, 22]};
    }
    return {work: [], pr: []};
}

function switchCal(monthMod) {
    if (!isNaN(monthMod)) {
        calDate.setMonth(calDate.getMonth() + monthMod);
        setCalDateLabel(calDate);
        console.log(calDate, today);
        if (dt.dateLessThan(dt.getFirstDayOfMonth(calDate), dt.getFirstDayOfMonth(today))) {
            nextCalBtn.removeAttribute("disabled");
        } else {
            nextCalBtn.setAttribute("disabled", "disabled");
        }
        tabMap.stats.calendar = buildStatsCalendar(calDate);
        setCalendar(tabMap.stats.calendar);
    } else {
        throw new Error(`Unrecognized direction: ${direction}`);
    }
}

function setCalDateLabel(date) {
    const monthName = dt.getMonthName(date.getMonth());
    calDateLabel.innerText = `${monthName} ${date.getFullYear()}`;
}

const statsTabBtn = document.getElementById("gym-tab-stats");
const workoutTabBtn = document.getElementById("gym-tab-workout");

const statsRoot = document.getElementById("stats-tab-root");
const workoutRoot = document.getElementById("workout-tab-root");
const gymCalendar = document.getElementById("gym-calendar");
const prevCalBtn = document.getElementById("cal-prev");
const nextCalBtn = document.getElementById("cal-next");
const calDateLabel = document.getElementById("cal-date");

const today = dt.getCurrentDate();
let calDate = new Date(today);

const tabMap = {
    "stats": {
        "btn": statsTabBtn,
        "root": statsRoot,
        "init": statsInit,
        "calendar": null
    },
    "workout": {
        "btn": workoutTabBtn,
        "root": workoutRoot,
        "init": workoutInit
    }
};
let currentTab = tabMap.stats;

statsTabBtn.addEventListener("click", () => switchTab(tabMap.stats));
workoutTabBtn.addEventListener("click", () => switchTab(tabMap.workout));
statsInit();

prevCalBtn.addEventListener("click", () => switchCal(-1));
nextCalBtn.addEventListener("click", () => switchCal(1));
setCalDateLabel(calDate);