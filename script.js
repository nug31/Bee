const apologyText = "Bee, aku mau minta maaf dari hati yang paling dalam... Sayang, maafin yaa, semoga ngga buat kamu sedih lagi, aku janji. Kasih aku kesempatan buat perbaiki yaa Bee. I love you so much, Sayang... ❤️";

const apologyElement = document.getElementById('apology-text');
const mainCard = document.getElementById('mainCard');
const successCard = document.getElementById('successCard');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

let i = 0;

// Typewriter Effect
function typeWriter() {
    if (i < apologyText.length) {
        apologyElement.innerHTML += apologyText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Start typewriter on load
window.onload = typeWriter;

// Runaway Button Logic
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// Success Event
yesBtn.addEventListener('click', () => {
    mainCard.style.display = 'none';
    successCard.style.display = 'block';

    // Confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
});

// Create Floating Hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('particle');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.opacity = Math.random();

    document.body.appendChild(heart);

    const animation = heart.animate([
        { transform: 'translateY(0vh) rotate(0deg)', opacity: 1 },
        { transform: 'translateY(110vh) rotate(360deg)', opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 3000,
        iterations: 1
    });

    animation.onfinish = () => heart.remove();
}

setInterval(createHeart, 300);
