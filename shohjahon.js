/* ---------------------------
   Utilities & small helpers
   --------------------------- */
const scrollTo = id => document.getElementById(id).scrollIntoView({behavior:'smooth', block:'center'});

/* ---------------------------
   Typing effect (rich)
   --------------------------- */
const typedEl = document.getElementById('typed');
const phrases = [
  "Salom, men Shohjahon Atayev",
  "Frontend Developer",
  "Animatsiyalar va UI/UX",
  "HTML • CSS • JavaScript"
];
let tpI = 0, chI = 0, forward = true, phraseIndex = 0;
function typeLoop(){
  const full = phrases[phraseIndex];
  if(forward){
    typedEl.textContent = full.slice(0, ++chI);
    if(chI === full.length){ forward=false; setTimeout(typeLoop,700); return; }
  } else {
    typedEl.textContent = full.slice(0, --chI);
    if(chI === 0){ forward=true; phraseIndex=(phraseIndex+1)%phrases.length; setTimeout(typeLoop,300); return; }
  }
  setTimeout(typeLoop, forward ? 60 : 30);
}
window.addEventListener('load', typeLoop);

/* ---------------------------
   Particles background (canvas)
   --------------------------- */
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth, H = canvas.height = innerHeight;
window.addEventListener('resize', ()=>{ W = canvas.width = innerWidth; H = canvas.height = innerHeight; initParticles(); });

let particles = [];
function initParticles(n = Math.round((W*H)/90000)){
  particles = [];
  for(let i=0;i<n;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*1.6 + 0.4,
      vx: (Math.random()-0.5)*0.6,
      vy: (Math.random()-0.5)*0.6,
      hue: 180 + Math.random()*120
    });
  }
}
initParticles();

function renderParticles(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{
    p.x += p.vx; p.y += p.vy;
    if(p.x<0) p.x = W;
    if(p.x>W) p.x = 0;
    if(p.y<0) p.y = H;
    if(p.y>H) p.y = 0;
    ctx.beginPath();
    const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
    g.addColorStop(0, `hsla(${p.hue},100%,60%,0.18)`);
    g.addColorStop(1, `hsla(${p.hue},100%,60%,0)`);
    ctx.fillStyle = g;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  });
  // connect near particles
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a = particles[i], b = particles[j];
      const dx = a.x-b.x, dy = a.y-b.y;
      const d = Math.sqrt(dx*dx+dy*dy);
      if(d < 110){
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,229,255,${(110-d)/220})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(renderParticles);
}
renderParticles();

/* ---------------------------
   Reveal on scroll (sections)
   --------------------------- */
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.classList.add('visible');
      // animate skill bars when skills section appears
      if(en.target.id === 'skills') animateSkillBars();
      obs.unobserve(en.target);
    }
  });
},{threshold:0.25});
reveals.forEach(r=>obs.observe(r));

/* ---------------------------
   Skill bars animation
   --------------------------- */
function animateSkillBars(){
  document.querySelectorAll('.bar-fill').forEach(el=>{
    const val = el.dataset.fill || 80;
    el.style.width = val + '%';
  });
}

/* ---------------------------
   3D tilt for project cards
   --------------------------- */
document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('mousemove',(e)=>{
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * 14;
    const ry = (x - 0.5) * -18;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    card.style.boxShadow = `${-ry}px ${rx}px 40px rgba(0,0,0,0.6)`;
  });
  card.addEventListener('mouseleave',()=>{ card.style.transform = ''; card.style.boxShadow = ''; });
  // optional click navigate if data-link set
  card.addEventListener('click', ()=>{ const url = card.dataset.link; if(url && url!="#") window.open(url,'_blank'); });
});

/* ---------------------------
   Stats counter (when in view)
   --------------------------- */
const statEls = document.querySelectorAll('.stat .num');
const statObserver = new IntersectionObserver((entries, o)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      const target = +el.dataset.target || 10;
      let cur=0;
      const step = Math.max(1, Math.floor(target/40));
      const timer = setInterval(()=>{ cur+=step; if(cur>=target){ el.textContent = target; clearInterval(timer);} else el.textContent = cur; },30);
      o.unobserve(el);
    }
  });
},{threshold:0.6});
statEls.forEach(s=>statObserver.observe(s));

/* ---------------------------
   Contact form — fake submit + animation
   --------------------------- */
const form = document.getElementById('contactForm');
const result = document.getElementById('formResult');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  result.textContent = 'Yuborilmoqda...';
  result.style.color = 'var(--muted)';
  // subtle fake progress
  setTimeout(()=>{
    result.textContent = `Rahmat, ${name}! Xabaringiz qabul qilindi.`;
    result.style.color = '#bff';
    form.reset();
  }, 900);
});

/* ---------------------------
   Theme toggle — small glow on/off
   --------------------------- */
const themeToggle = document.getElementById('themeToggle');
let glowOn = true;
themeToggle.addEventListener('click', ()=>{
  glowOn = !glowOn;
  document.documentElement.style.setProperty('--neon', glowOn ? '#00e5ff' : '#9aa0a6');
  document.documentElement.style.setProperty('--acc', glowOn ? '#ff6bd6' : '#6b7280');
});

/* ---------------------------
   Simple accessibility: keyboard nav to sections
   --------------------------- */
document.querySelectorAll('.nav a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const target = a.getAttribute('href').slice(1);
    scrollTo(target);
  });
});