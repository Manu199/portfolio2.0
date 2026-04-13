function getCV(id) {
    const el = document.getElementById(id);
    return el ? el.textContent : '';
}

let lang = 'IT';

const overlay = document.getElementById('cvOverlay');
const frame   = document.getElementById('cvFrame');

/* OPEN / CLOSE */

function openCV() {
    document.body.style.overflow = 'hidden';
    overlay.classList.add('open');
    loadCV(lang);
}

function closeCV() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

/* LANGUAGE SWITCH */

function switchLang(l) {
    if (lang === l) return;
    loadCV(l);
}

function loadCV(l) {
    lang = l;

    document.getElementById('btnIT')
        .classList.toggle('active', l === 'IT');

    document.getElementById('btnEN')
        .classList.toggle('active', l === 'EN');

    document.getElementById('cvLangLabel').textContent =
        l === 'IT' ? 'Italian' : 'English';

    frame.style.opacity = 0;

    setTimeout(() => {
        frame.src = l === 'IT'
            ? '../cv/cv-it.html'
            : '../cv/cv-en.html';
        frame.style.opacity = 1;
    }, 100);
}

/* DOWNLOAD FIX DEFINITIVO */

function downloadCV() {
    const file = lang === 'IT'
        ? '../cv/CV-Singh-Manvinder-IT.pdf'
        : '../cv/CV-Manvinder-Singh-EN.pdf';

    const a = document.createElement('a');
    a.href = file;
    a.download = file.split('/').pop();
    document.body.appendChild(a);
    a.click();
    a.remove();
}

/* EVENTS */

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCV();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCV();
});