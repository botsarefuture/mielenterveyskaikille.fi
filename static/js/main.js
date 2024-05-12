// Countdown Timer
const countdownDate = new Date('June 3, 2024 16:00:00').getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `
        <div class="countdown-item">
            <div class="countdown-value">${days}</div>
            <div class="countdown-label">Days</div>
        </div>
        <div class="countdown-item">
            <div class="countdown-value">${hours}</div>
            <div class="countdown-label">Hours</div>
        </div>
        <div class="countdown-item">
            <div class="countdown-value">${minutes}</div>
            <div class="countdown-label">Minutes</div>
        </div>
        <div class="countdown-item">
            <div class="countdown-value">${seconds}</div>
            <div class="countdown-label">Seconds</div>
        </div>
    `;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById('countdown').innerHTML = '<div class="countdown-expired">The event has started!</div>';
    }
};

const timerInterval = setInterval(updateCountdown, 1000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
