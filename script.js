document.documentElement.classList.add("js");
const form=document.querySelector("#rsvpForm"),status=document.querySelector("#status");
form?.addEventListener("submit",async e=>{
 e.preventDefault();status.textContent="⚓ Saadan kaptenile...";
 try{const r=await fetch(form.action,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});const d=await r.json();if(!r.ok||d.success===false)throw 0;status.innerHTML="☠️ <b>Vastus jõudis kaptenini.</b>";form.reset()}catch(_){status.textContent="⚠️ Saatmine ebaõnnestus. Proovi uuesti."}
});
const chest=document.querySelector("#chestBtn"),secret=document.querySelector("#secret"),toast=document.querySelector("#toast");
chest?.addEventListener("click",()=>{
 secret.style.display="block";
 for(let i=0;i<24;i++){const c=document.createElement("span");c.className="coin";c.textContent="🪙";c.style.left="24%";c.style.top="70%";c.style.setProperty("--x",`${(Math.random()-.5)*520}px`);c.style.setProperty("--y",`${-Math.random()*330-40}px`);document.body.appendChild(c);setTimeout(()=>c.remove(),1800)}
 toast.textContent="💰 AARE LEITUD";toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200);
});
const soundBtn=document.querySelector("#sound");
const audio=new Audio("pirate-theme.mp3");audio.loop=true;audio.volume=.7;let on=true;
const setBtn=()=>{if(soundBtn)soundBtn.textContent=on?"\u{1F50A} HELI ON":"\u{1F507} HELI OFF"};
const startMusic=()=>{audio.play().then(()=>{on=true;setBtn()}).catch(()=>{on=true;setBtn();const kick=()=>{audio.play().then(()=>setBtn()).catch(()=>{});document.removeEventListener("pointerdown",kick)};document.addEventListener("pointerdown",kick)})};
startMusic();
soundBtn?.addEventListener("click",()=>{
 if(on){on=false;audio.pause()}else{on=true;audio.play().catch(()=>{})}
 setBtn();
});
document.querySelector("#mapFrame")?.addEventListener("click",()=>{document.querySelector(".routeOverlay").style.animationDuration=".45s";setTimeout(()=>document.querySelector(".routeOverlay").style.animationDuration="1.4s",1400)});

const menuBtn=document.querySelector("#menuBtn"),navLinks=document.querySelector("#navLinks");
menuBtn?.addEventListener("click",()=>{const o=navLinks.classList.toggle("open");menuBtn.textContent=o?"\u2715":"\u2630";menuBtn.setAttribute("aria-expanded",o)});
navLinks?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{navLinks.classList.remove("open");menuBtn.textContent="\u2630";menuBtn.setAttribute("aria-expanded",false)}));
const addToCalendar=()=>{
 const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//piraadid//ET","BEGIN:VEVENT","UID:piraadid-20261017@piraadid","DTSTAMP:20261008T000000Z","DTSTART:20261017T150000Z","DTEND:20261017T210000Z","SUMMARY:☠️ Mereröövlid pardal — Johanna sünnipäev","LOCATION:Vanalinn (täpne koht selgub)","DESCRIPTION:Dresscode: päris mereröövel! "+location.href.split("#")[0],"END:VEVENT","END:VCALENDAR"].join("\r\n");
 const url=URL.createObjectURL(new Blob([ics],{type:"text/calendar;charset=utf-8"}));
 const a=document.createElement("a");a.href=url;a.download="merer\u00f6\u00f6vlid-pardal.ics";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
};
document.querySelectorAll(".calBtn").forEach(b=>b.addEventListener("click",addToCalendar));
