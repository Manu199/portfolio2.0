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

function getCV(id){ return document.getElementById(id).textContent; }

let lang = 'IT';
const overlay = document.getElementById('cvOverlay');
const frame   = document.getElementById('cvFrame');

function openCV(){
  document.body.style.overflow='hidden';
  overlay.classList.add('open');
  loadCV('IT');
}
function closeCV(){
  overlay.classList.remove('open');
  document.body.style.overflow='';
}
function switchLang(l){
  if(lang===l) return;
  loadCV(l);
}
function loadCV(l){
  lang=l;
  document.getElementById('btnIT').classList.toggle('active',l==='IT');
  document.getElementById('btnEN').classList.toggle('active',l==='EN');
  document.getElementById('cvLangLabel').textContent=l==='IT'?'Italian':'English';
  frame.srcdoc=getCV('cv'+l);
}
function downloadCV(){
  const content=getCV('cv'+lang+'p');
  const filename='CV-Manvinder-Singh-'+lang+'.html';
  const blob=new Blob([content],{type:'text/html;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download=filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
overlay.addEventListener('click',e=>{if(e.target===overlay)closeCV();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCV();});
