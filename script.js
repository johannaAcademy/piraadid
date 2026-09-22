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
 toast.textContent="💰 AARDE LEITUD";toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200);
});
let ctx,master,on=false,timer;
document.querySelector("#sound")?.addEventListener("click",()=>{
 const b=document.querySelector("#sound");
 if(on){on=false;clearTimeout(timer);b.textContent="🔊 HELI OFF";master.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.5);return}
 ctx=new(window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=.03;master.connect(ctx.destination);
 const buf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),a=buf.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=(Math.random()*2-1)*.2;
 const n=ctx.createBufferSource(),f=ctx.createBiquadFilter();n.buffer=buf;n.loop=true;f.type="lowpass";f.frequency.value=580;n.connect(f).connect(master);n.start();
 const notes=[147,175,196,220,196,175,147,131];let i=0;
 function play(){if(!on)return;let o=ctx.createOscillator(),g=ctx.createGain();o.type="triangle";o.frequency.value=notes[i++%notes.length];g.gain.setValueAtTime(.001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.075,ctx.currentTime+.02);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.55);o.connect(g).connect(master);o.start();o.stop(ctx.currentTime+.6);timer=setTimeout(play,560)}
 on=true;play();b.textContent="🔊 HELI ON";
});
document.querySelector("#mapFrame")?.addEventListener("click",()=>{document.querySelector(".routeOverlay").style.animationDuration=".45s";setTimeout(()=>document.querySelector(".routeOverlay").style.animationDuration="1.4s",1400)});
