import * as dt from "/static/scripts/date.js"
import * as ag from "/static/scripts/ag-util.js"

function statsOpen(tab) {
    if (null === tab.calendar) {
        tab.calendar = buildStatsCalendar(today);
        setCalendar(tab.calendar);
    }
}

function setCalendar(calendar) {
    while (gymCalendar.hasChildNodes()) {
        gymCalendar.removeChild(gymCalendar.firstElementChild);
    }
    calendar.forEach(elem => gymCalendar.appendChild(elem));
}

function selectOpen() {

}

function recentsOpen() {

}

function favoritesOpen() {

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
        elem.style = `grid-column: ${gridCol}; min-height: 25px; outline: solid 1px ${outlineColor}; padding: 2px 5px;`;
        elem.innerText = i + 1;
        cal[i + 7] = elem;
    }

    // ask server for which days the user worked out / get from attributes?
    const workouts = mockGetDaysWorkedOut(date);
    const imgStyle = "width: 50%; aspect-ratio: 1 / 1; top: 10%; left: max(30%, 16px);";
    for (const workout of workouts.work) {
        const img = document.createElement("img");
        img.src = "/static/images/green-circle-checkmark-48.png";
        img.classList.add("abs");
        img.style = imgStyle;
        img.title = "Worked Out!"
        img.alt = "Workout"
        cal[(Number(workout) + 7)].appendChild(img);
    }
    for (const pr of workouts.pr) {
        const img = document.createElement("img");
        img.src = "/static/images/gold-crown-48.png";
        img.classList.add("abs");
        img.style = imgStyle;
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

function switchCal(tab, monthMod) {
    if (!isNaN(monthMod)) {
        tab.calDate.setMonth(tab.calDate.getMonth() + monthMod);
        setCalDateLabel(tab.calDate);
        if (dt.dateLessThan(dt.getFirstDayOfMonth(tab.calDate), dt.getFirstDayOfMonth(today))) {
            nextCalBtn.removeAttribute("disabled");
        } else {
            nextCalBtn.setAttribute("disabled", "disabled");
        }
        tab.calendar = buildStatsCalendar(tab.calDate);
        setCalendar(tab.calendar);
    } else {
        throw new Error(`Unrecognized direction: ${direction}`);
    }
}

function setCalDateLabel(date) {
    const monthName = dt.getMonthName(date.getMonth());
    calDateLabel.innerText = `${monthName} ${date.getFullYear()}`;
}

function toggleGenerateRadios(src, dest) {
    if (src === dest) {
        return src;
    }
    if (src === generateWorkoutBtn) {
        generateWorkoutInputs.classList.remove("active");
    } else if (dest === generateWorkoutBtn) {
        generateWorkoutInputs.classList.add("active");
    }
    return dest;
}

const statsTabBtn = document.getElementById("gym-tab-stats");
const selectTabBtn = document.getElementById("gym-tab-select");

const gymCalendar = document.getElementById("gym-calendar");
const prevCalBtn = document.getElementById("cal-prev");
const nextCalBtn = document.getElementById("cal-next");
const calDateLabel = document.getElementById("cal-date");

const favoritesTabBtn = document.getElementById("sub-tab-favorites");
const recentTabBtn = document.getElementById("sub-tab-recent");
const generateWorkoutInputs = document.getElementById("generate-workout-inputs");
const generateWorkoutBtn = document.getElementById("generate-workout-btn");

const today = dt.getCurrentDate();
const statsTab = {
    "btn": statsTabBtn,
    "root": document.getElementById("stats-tab-root"),
    "open": statsOpen,
    "close": null,
    "calendar": null,
    "calDateLabel": document.getElementById("cal-date"),
    "calDate": new Date(today)
};
const selectTab = {
    "btn": selectTabBtn,
    "root": document.getElementById("select-tab-root"),
    "open": selectOpen,
    "close": null
};
const favoritesTab = {
    "btn": favoritesTabBtn,
    "root": document.getElementById("favorites-root"),
    "open": favoritesOpen,
    "close": null
};
const recentsTab = {
    "btn": recentTabBtn,
    "root": document.getElementById("recents-root"),
    "open": recentsOpen,
    "close": null
}
let currentTab = statsTab;
let currentSubTab = favoritesTab;
let currentGenerateRadio = null;

// main tab logic
statsTabBtn.addEventListener("click", () => {currentTab = ag.switchTab(currentTab, statsTab)});
selectTabBtn.addEventListener("click", () => {currentTab = ag.switchTab(currentTab, selectTab)});
statsOpen(statsTab);

// sub tab logic
favoritesTabBtn.addEventListener("click", () => {currentSubTab = ag.switchTab(currentSubTab, favoritesTab)});
recentTabBtn.addEventListener("click", () => {currentSubTab = ag.switchTab(currentSubTab, recentsTab)});

// calendar logic
prevCalBtn.addEventListener("click", () => switchCal(statsTab, -1));
nextCalBtn.addEventListener("click", () => switchCal(statsTab, 1));
setCalDateLabel(statsTab.calDate);

// generate workout logic
const genWorkoutRadios = document.getElementsByName("create-workout");
genWorkoutRadios.forEach(radio => {
    radio.addEventListener("click", () => {
        currentGenerateRadio = toggleGenerateRadios(currentGenerateRadio, radio);
    });
    if (radio.checked) {
        radio.click();
    }
});

// custom exercise search


// FIXME: temporary to test pages without manually clicking each refresh
// selectTabBtn.click();