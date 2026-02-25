const apologyText = "Bee, aku mau minta maaf dari hati yang paling dalam... Sayang, maafin yaa, semoga ngga buat kamu sedih lagi, aku janji. Kasih aku kesempatan buat perbaiki yaa Bee. I love you so much, Sayang... 🤍";

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

// Start typewriter is now handled by startBtn click
// window.onload = typeWriter;

// Runaway Button Logic
function moveButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Mencegah klik beneran di HP
    moveButton();
});
noBtn.addEventListener('click', (e) => {
    // Sebagai jaga-jaga kalau kena klik di PC/HP
    moveButton();
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
    heart.innerHTML = '🤍';
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

// Create Random Photo Particles
const photos = ['public/1.jpeg', 'public/2.jpeg', 'public/3.jpeg', 'public/4.jpeg'];

function createPhotoParticle() {
    const photo = document.createElement('img');
    photo.src = photos[Math.floor(Math.random() * photos.length)];
    photo.classList.add('photo-particle');

    const size = Math.random() * 100 + 100; // 100px - 200px
    photo.style.width = size + 'px';
    photo.style.height = size + 'px';

    photo.style.left = Math.random() * (window.innerWidth - size) + 'px';
    photo.style.top = Math.random() * (window.innerHeight - size) + 'px';

    const rotation = Math.random() * 40 - 20; // -20deg to 20deg
    photo.style.transform = `scale(0) rotate(${rotation}deg)`;

    document.body.appendChild(photo);

    // Animate in
    setTimeout(() => {
        photo.style.opacity = '0.7';
        photo.style.transform = `scale(1) rotate(${rotation}deg)`;
    }, 10);

    // Animate out
    setTimeout(() => {
        photo.style.opacity = '0';
        photo.style.transform = `scale(0) rotate(${rotation}deg)`;
        setTimeout(() => photo.remove(), 500);
    }, 2000);
}

// Music Control
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
const welcomeOverlay = document.getElementById('welcomeOverlay');
const startBtn = document.getElementById('startBtn');
let isMusicPlaying = false;

function toggleMusic() {
    if (isMusicPlaying) {
        music.pause();
        musicBtn.classList.remove('playing');
    } else {
        music.play();
        musicBtn.classList.add('playing');
    }
    isMusicPlaying = !isMusicPlaying;
}

musicBtn.addEventListener('click', toggleMusic);

// Handle Welcome Overlay
startBtn.addEventListener('click', () => {
    welcomeOverlay.classList.add('hidden');

    // Start music
    music.play().then(() => {
        isMusicPlaying = true;
        musicBtn.classList.add('playing');
    }).catch(e => console.log("Autoplay blocked"));

    // Start typewriter
    typeWriter();
});

setInterval(createHeart, 300);
setInterval(createPhotoParticle, 800);
