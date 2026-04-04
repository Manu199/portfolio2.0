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


// Hover on lime btn
document.querySelectorAll(".btn-lime").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        cur.style.backgroundColor = "black";
        ring.style.borderColor = "black";
    });

    btn.addEventListener("mouseleave", () => {
        cur.style.backgroundColor = "#C8FF00";
        ring.style.borderColor = "#C8FF00";
    });
});