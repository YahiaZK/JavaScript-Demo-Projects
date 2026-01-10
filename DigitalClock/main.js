let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

function updateClock() {
  let currentTime = new Date();

  hrs.textContent = String(currentTime.getHours()).padStart(2, "0");
  min.textContent = String(currentTime.getMinutes()).padStart(2, "0");
  sec.textContent = String(currentTime.getSeconds()).padStart(2, "0");
}

updateClock();

setInterval(updateClock, 1000);

let [milliseconds, seconds, minutes] = [0, 0, 0];
let stopwatch = document.querySelector(".stopwatch");
let int = null;

function startStopwatch() {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 10);
}

function stopStopwatch() {
  clearInterval(int);
}

function resetStopwatch() {
  clearInterval(int);
  [milliseconds, seconds, minutes] = [0, 0, 0];
  document.getElementById("sw-min").textContent = "00";
  document.getElementById("sw-sec").textContent = "00";
  document.getElementById("sw-ms").textContent = "00";
}

function displayTimer() {
  milliseconds += 10;

  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }
  }

  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  document.getElementById("sw-min").textContent = m;
  document.getElementById("sw-sec").textContent = s;
  document.getElementById("sw-ms").textContent = String(ms).substring(0, 2);
}
