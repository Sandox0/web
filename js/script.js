const terminal = document.getElementById('terminal');
const sfxBroken = document.getElementById('sfx-broken');
const sfxTyping = document.getElementById('sfx-typing');
const music = document.getElementById('bg-music');
const crackOverlay = document.getElementById('crack-overlay');
const btnStart = document.getElementById('btn-start');

// --- LÓGICA DEL BOTÓN TROLL ---
let clickCount = 0;

function gestionarClicks() {
    clickCount++;

    if (clickCount <= 3) {
        // Mover botón a posición aleatoria
        moverBoton();
    } else if (clickCount === 4) {
        // Restaurar botón y cambiar mensaje
        resetearBoton();
    } else {
        // A partir del 5to click, inicia de verdad
        iniciarSecuencia();
    }
}

function moverBoton() {
    let sound = sfxTyping.cloneNode();
    sound.volume = 0.5;
    sound.play().catch(e=>{});
    setTimeout(() => sound.pause(), 100);

    // Calcular posición aleatoria (evitando bordes extremos)
    const x = Math.random() * (window.innerWidth - 250); 
    const y = Math.random() * (window.innerHeight - 100);
    
    btnStart.style.position = "fixed"; 
    btnStart.style.left = `${x}px`;
    btnStart.style.top = `${y}px`;
    btnStart.innerText = "¡ERROR DE ACCESO!";
    btnStart.style.borderColor = "red";
    btnStart.style.color = "red";
}

function resetearBoton() {
    btnStart.style.position = "static"; 
    btnStart.innerText = "OK AHORA SI DALE CLICK XD";
    btnStart.style.borderColor = "#0f0";
    btnStart.style.color = "#0f0";
    btnStart.style.transform = "scale(1.2)";
}

// --- LÓGICA PRINCIPAL ---
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const logs = [
    { text: "Iniciando escaneo biométrico...", delay: 500 },
    { text: "Sujeto identificado: ANGELO RIVAS (Edad: 17)", delay: 800 },
    { text: "Accediendo a bases de datos de la liga...", delay: 1200 },
    { text: "Analizando estadísticas de salto vertical...", delay: 1500 },
    { text: "ERROR CRÍTICO: Altura de salto insuficiente para el objetivo 'ARO'.", type: "error", delay: 2000 },
    { text: "Intentando forzar capacidades físicas...", delay: 2500 },
    { text: "ADVERTENCIA: Riesgo de vergüenza extrema inminente.", type: "warning", delay: 1500 },
    { text: "FATAL SYSTEM FAILURE: El hardware no responde.", type: "error", delay: 2000 },
    { text: "Iniciando protocolo de emergencia...", type: "error", delay: 1500 },
    { text: "Borrando evidencia de los intentos fallidos...", delay: 1000 },
    { text: "Formateando realidad... 100%", delay: 800 },
    { text: "Redirigiendo a modo celebración...", delay: 1500 }
];

async function typeWriter(text, element) {
    sfxTyping.currentTime = 0;
    if(text.length > 3) sfxTyping.play().catch(e => {}); 
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        terminal.scrollTop = terminal.scrollHeight;
        const typingSpeed = Math.random() * (70 - 30) + 30;
        await wait(typingSpeed);
    }
    sfxTyping.pause();
}

async function iniciarSecuencia() {
    document.getElementById('start-screen').style.display = 'none';
    terminal.style.display = 'block';

    for (const log of logs) {
        await wait(log.delay);
        const p = document.createElement('div');
        p.className = 'line';
        terminal.appendChild(p);

        if(log.type === 'error') {
            p.classList.add('error-text');
            sfxBroken.currentTime = 0;
            sfxBroken.play().catch(e => {});
            triggerBrokenScreenEffect();
            crackOverlay.style.display = "block";
        } else if (log.type === 'warning') {
            p.classList.add('warning-text');
        }

        await typeWriter(`> ${log.text}`, p);
    }

    await wait(1000);
    const bar = document.createElement('div');
    bar.className = 'progress-container';
    bar.innerHTML = '<div class="progress-bar" id="p-bar"></div>';
    terminal.appendChild(bar);
    bar.style.display = 'block';
    terminal.scrollTop = terminal.scrollHeight;

    setTimeout(() => { document.getElementById('p-bar').style.width = "100%"; }, 100);
    
    await wait(2500);
    lanzarFiesta();
}

function triggerBrokenScreenEffect() {
    document.body.classList.add('broken-screen-effect');
    setTimeout(() => {
        document.body.classList.remove('broken-screen-effect');
    }, 400); 
}

function lanzarFiesta() {
    terminal.style.display = 'none';
    crackOverlay.style.display = 'none';
    document.getElementById('final-party').style.display = 'flex';
    document.body.style.background = "radial-gradient(circle, #222 0%, #000 100%)";
    
    music.volume = 1.0;
    music.play().catch(e => console.log("Error música final:", e));

    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 45, spread: 360, ticks: 120, zIndex: 0, colors: ['#FFD700', '#FF0000', '#ffffff'] };

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 80 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random() * 0.2 + 0.1, y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random() * 0.2 + 0.7, y: Math.random() - 0.2 } }));
    }, 250);
}