// Set the date we're counting down to
const countDownDate = new Date('6/3/2024 16:00').getTime();

// Update the countdown every 1 second
const x = setInterval(function () {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the remaining time
  const distance = countDownDate - now;

  // Calculate months and days
  // Step 1: Calculate total days
  const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));

  // Step 2: Calculate months
  const months = Math.floor(totalDays / 30.4375);

  // Step 3: Calculate remaining days after considering months
  const days = totalDays % 30.4375;

  // Calculate remaining hours after considering days
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // Calculate remaining minutes after considering hours
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  // Calculate remaining seconds after considering minutes
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
