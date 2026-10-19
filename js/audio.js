/* Trilha ambiente "espaço sideral" gerada em tempo real (Web Audio) — sem arquivos de áudio */
(()=>{
const btn=document.getElementById('snd');const hint=document.getElementById('sh');let ctx,master,on=true,rev,dry;
const ui=()=>{btn.setAttribute('aria-pressed',on);btn.setAttribute('aria-label',on?'Desligar som':'Ligar som');btn.classList.toggle('off',!on)};
function build(){
 const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;ctx=new AC();
 master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);
 const len=ctx.sampleRate*6,ir=ctx.createBuffer(2,len,ctx.sampleRate);
 for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.5)}
 rev=ctx.createConvolver();rev.buffer=ir;const wet=ctx.createGain();wet.gain.value=.75;rev.connect(wet);wet.connect(master);
 dry=ctx.createGain();dry.gain.value=.45;dry.connect(master);
 const bus=ctx.createGain();bus.connect(dry);bus.connect(rev);
 const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=700;lp.Q.value=.7;lp.connect(bus);
 const lfo=(freq,amt,param)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=freq;g.gain.value=amt;o.connect(g);g.connect(param);o.start()};
 lfo(.05,350,lp.frequency);
 [55,82.41,110,164.81,220,246.94].forEach((f,i)=>[-6,6].forEach(dt=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=i%2?'triangle':'sine';o.frequency.value=f;o.detune.value=dt;g.gain.value=.035;lfo(.03+Math.random()*.06,.025,g.gain);o.connect(g);g.connect(lp);o.start()}));
 const nb=ctx.createBuffer(1,ctx.sampleRate*4,ctx.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
 const n=ctx.createBufferSource();n.buffer=nb;n.loop=true;const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=500;bp.Q.value=.8;const ng=ctx.createGain();ng.gain.value=.03;lfo(.07,300,bp.frequency);n.connect(bp);bp.connect(ng);ng.connect(bus);n.start();
 (function ping(){if(ctx.state=='running'&&on){const t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=[659.25,783.99,880,987.77,1174.66,1318.5][Math.random()*6|0];g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.05,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+4);o.connect(g);g.connect(rev);g.connect(dry);o.start(t);o.stop(t+4.2)}setTimeout(ping,5000+Math.random()*7000)})();
 return true}
function fade(){if(!ctx)return;master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(on?.55:0,ctx.currentTime,on?1.6:.25)}
const upd=()=>{if(hint)hint.hidden=!on||!!(ctx&&ctx.state=='running')};
function start(){if(!ctx){if(!build())return;ctx.onstatechange=upd}ctx.resume().then(upd,upd);fade();upd()}
btn.addEventListener('click',()=>{on=!on;if(on)start();else{fade();upd()}ui()});
['pointerdown','keydown','touchend','click'].forEach(ev=>addEventListener(ev,e=>{if(btn.contains(e.target)||!on||(ctx&&ctx.state=='running'))return;start()},{passive:true}));
document.addEventListener('visibilitychange',()=>{if(!ctx)return;document.hidden?ctx.suspend():(on&&ctx.resume())});
ui();start();setTimeout(upd,400);
})();
