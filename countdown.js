// Set the date we're counting down to
const countDownDate = new Date('6/3/2024 16:00').getTime();

// Update the countdown every 1 second
const x = setInterval(function () {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the remaining time
  const distance = countDownDate - now;

  // Calculate days, hours, minutes, seconds, and months
  const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.4375));
  const days = Math.floor(distance / (1000 * 60 * 60 * 24)) % 30;
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the countdown
  document.getElementById('months').innerHTML = months;
  document.getElementById('days').innerHTML = days;
  document.getElementById('hours').innerHTML = hours;
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;

  // Check if the countdown is over
  if (distance < 0) {
    clearInterval(x);
    // Hide countdown elements
    document.getElementById('countdown').style.display = 'none';
  }
}, 1000);
