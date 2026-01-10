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
