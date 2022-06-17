const daysElement = document.getElementById('days')
const hoursElement = document.getElementById('hours')
const minsElement = document.getElementById('mins')
const cecondsElement = document.getElementById('seconds')

const newYears = '1 Jan 2023';

function countDown() {
    const newyearsDate = new Date(newYears);
    const currentDate   = new Date();

    const totalSeconds = (newyearsDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysElement.innerHTML = formatTime(days);
    hoursElement.innerHTML = formatTime(hours);
    minsElement.innerHTML = formatTime(mins);
    cecondsElement.innerHTML = formatTime(seconds);
}

function formatTime(time){
    return time < 10 ? (`0${time}`) : time
}
countDown()

setInterval(countDown, 1000);