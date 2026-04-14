// CUSTOM CURSOR
const cur=document.getElementById('cursor');
const ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;

  cur.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
});

(function tick(){
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;

  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;

  requestAnimationFrame(tick);
})();

function toggleCursor(){
  if (window.innerWidth < 800){
    cur.style.display = 'none';
    ring.style.display = 'none';
  } else {
    cur.style.display = 'block';
    ring.style.display = 'block';
  }
}

toggleCursor();

window.addEventListener('resize', toggleCursor);

if (window.matchMedia('(hover: hover)').matches) {
  document.body.classList.add('custom-cursor');
}
// Hover on main btn
document.querySelectorAll(".is-orange").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        cur.style.backgroundColor = "black";
        ring.style.borderColor = "black";
    });

    btn.addEventListener("mouseleave", () => {
        cur.style.backgroundColor = "var(--main)";
        ring.style.borderColor = "var(--main)";
    });
});

const obs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*200);obs.unobserve(e.target)}
  });
},{threshold:0.1});
document.querySelectorAll('.reveal,.reveal-left').forEach(el=>obs.observe(el));
const barObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.value-fill').forEach(b=>b.style.width=b.dataset.w+'%');
      barObs.unobserve(e.target);
    }
  });
},{threshold:0.3});
  document.querySelectorAll('.about-values').forEach(el=>barObs.observe(el));
  document.querySelectorAll('a,button,.project-item,.sk-item').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='20px';cur.style.height='20px';ring.style.opacity='0.15'});
  el.addEventListener('mouseleave',()=>{cur.style.width='12px';cur.style.height='12px';ring.style.opacity='0.4'});
});





//Scrool behavior smmoth (forced)

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        const offset = 80;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;

        smoothScrollTo(y, 700);
    });
});
function smoothScrollTo(targetY, duration = 600) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    let start;

    function step(timestamp) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const progress = Math.min(time / duration, 1);

        // easeInOutQuad
        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startY + diff * ease);

        if (time < duration) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

