const calendarImgRoot = "/static/images/calendar/"

export function getCurrentDateTime() {
    return new Date(Date.now());
}

export function getCurrentDate() {
    const dateTime = getCurrentDateTime();
    return truncTime(dateTime);
    
}

export function truncTime(dateTime) {
    const date = new Date(dateTime);
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    return date;
}

export function getFirstDayOfMonth(date) {
    const firstDay = new Date(date);
    firstDay.setDate(1);
    return firstDay;
}

export function getLastDayOfMonth(date) {
    const lastDay = new Date(date);
    lastDay.setMonth(lastDay.getMonth() + 1);
    lastDay.setDate(0);
    return lastDay;
}

export function getDaysInMonth(date) {
    return getLastDayOfMonth(date).getDate();
}

export function getMonthImgHref(month) {
    return `${calendarImgRoot}calendar-${month}-48.png`
}

export function getDayNumberImgHref(dayNumber) {
    return `${calendarImgRoot}calendar-${dayNumber}-48.png`
}

export function getDayNameImgHref(day) {
    if (!isNaN(day)) {
        day = getDayName(day);
    }
    return `${calendarImgRoot}${day}-48.png`
}

export function getDayName(day) {
    switch (day) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        default: throw new Error(`Day out of range: ${day}`);
    }
}

export function getMonthName(month) {
    switch (month) {
        case 0: return "Janurary";
        case 1: return "Feburary";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
        default: throw new Error(`Month out of range: ${month}`);
    }
}

export function dateEquals(dateA, dateB) {
    return dateA.getFullYear() === dateB.getFullYear()
        && dateA.getMonth() === dateB.getMonth()
        && dateA.getDate() === dateB.getDate();
}

export function dateLessThan(dateA, dateB) {
    return dateA.getFullYear() < dateB.getFullYear()
        || dateA.getMonth() < dateB.getMonth()
        || dateA.getDate() < dateB.getDate();
}

export function dateGreaterThan(dateA, dateB) {
    return dateA.getFullYear() > dateB.getFullYear()
        || dateA.getMonth() > dateB.getMonth()
        || dateA.getDate() > dateB.getDate();
}