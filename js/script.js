const cur=document.getElementById('cursor');
const ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cur.style.left=mx+'px';cur.style.top=my+'px';
});

(function tick(){
  rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  requestAnimationFrame(tick);
})();


// Hover on main btn
document.querySelectorAll(".btn-main").forEach(btn => {
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
    if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*100);obs.unobserve(e.target)}
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

