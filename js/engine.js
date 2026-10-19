/* Motor 3D (canvas, sem bibliotecas): corredor, pilares de código, túnel neon, cidade, aurora, cosmos, warp */
(()=>{
const cv=document.getElementById('c'),g=cv.getContext('2d'),PI=Math.PI,RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
let W,H,D=1;
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),mx=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t),rg=(c,a)=>`rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`,R=(a,b)=>a+Math.random()*(b-a);
const rs=()=>{D=Math.min(devicePixelRatio||1,1.6);cv.width=W=innerWidth*D;cv.height=H=innerHeight*D};addEventListener('resize',rs);rs();
const br=new Image();br.src='assets/brain-white.png';
const mk=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'));return c};
const code=mk(48,256,t=>{for(let x=0;x<48;x+=6)for(let y=0;y<256;y+=5)if(Math.random()<.55){t.fillStyle=`rgba(255,255,255,${R(.2,.9)})`;t.fillRect(x,y,R(2,5),2)}});
const wins=mk(32,128,t=>{for(let x=3;x<30;x+=7)for(let y=4;y<126;y+=8)if(Math.random()<.35){t.fillStyle=`rgba(255,235,190,${R(.4,1)})`;t.fillRect(x,y,4,4)}});
const stars=Array.from({length:170},()=>({x:Math.random(),y:Math.random(),p:Math.random()*6}));
const pil=Array.from({length:44},(_,i)=>({s:i%2?1:-1,o:Math.random()*3,z:2+i*1.1,h:R(5,13),w:R(.35,.7)}));
const ws=Array.from({length:170},()=>({a:R(0,2*PI),v:R(.35,1.3),w:R(1,2.6),c:Math.random()*3|0}));
const sh=Array.from({length:36},()=>({a:R(0,2*PI),v:R(.3,1.1),r:R(0,6),q:R(-8,8),z:R(3,8),col:['#E5A93B','#fff','#1a1226'][Math.random()*3|0]}));
const S={c:hx('#E5A93B'),k:hx('#E5A93B'),m:'code',b:{x:.5,y:.4,s:.2},tb:{x:.5,y:.4,s:.2},spin:1,rings:1,w:-1,cb:null,px:0,tx:0,py:0,ty:0,t:0};
let tc=null,tcc=[0,0,0];
const tint=()=>{if(!tc||Math.abs(S.c[0]-tcc[0])+Math.abs(S.c[1]-tcc[1])+Math.abs(S.c[2]-tcc[2])>12){tcc=S.c.slice();tc=tc||document.createElement('canvas');tc.width=br.width;tc.height=br.height;const t=tc.getContext('2d');t.clearRect(0,0,tc.width,tc.height);t.drawImage(br,0,0);t.globalCompositeOperation='source-in';t.fillStyle=rg(S.c,1);t.fillRect(0,0,tc.width,tc.height)}return tc};
addEventListener('pointermove',e=>{S.tx=(e.clientX/innerWidth-.5)*2;S.ty=(e.clientY/innerHeight-.5)*2});
let last=0;
function frame(ts){
 const dt=Math.min((ts-(last||ts))/1000,.05);last=ts;S.t+=dt;
 const q=1-Math.exp(-dt*3.5);S.c=mx(S.c,S.k,q);for(const a of['x','y','s'])S.b[a]+=(S.tb[a]-S.b[a])*q;
 S.px+=(S.tx*W*.02-S.px)*q;S.py+=(S.ty*H*.015-S.py)*q;
 let boost=0;if(S.w>=0){S.w+=dt/1.5;boost=Math.sin(Math.min(S.w,1)*PI);if(S.w>=.5&&S.cb){const f=S.cb;S.cb=null;f()}if(S.w>=1)S.w=-1}
 const sp=(RM?.2:1)*(1+boost*16),c=S.c,m=S.m,hy=H*.52+S.py,f=W*.6,cx=W/2+S.px,Y=z=>hy+f/z,X=(x,z)=>cx+x*f/z;
 const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#03020a');gr.addColorStop(.55,rg(mx([3,2,10],c,.2),1));gr.addColorStop(1,'#020106');g.fillStyle=gr;g.fillRect(0,0,W,H);
 g.globalCompositeOperation='lighter';
 const hg=g.createRadialGradient(cx,hy,0,cx,hy,W*.55);hg.addColorStop(0,rg(c,.4));hg.addColorStop(1,rg(c,0));g.fillStyle=hg;g.fillRect(0,0,W,H);
 if(m=='aurora'||m=='cosmos'){for(const s of stars){g.fillStyle=`rgba(255,255,255,${.3+.5*Math.sin(S.t*2+s.p)})`;g.fillRect(s.x*W,s.y*hy,1.5*D,1.5*D)}}
 if(m=='aurora')for(let L=0;L<3;L++){const col=L==1?mx(c,[229,169,59],.5):c;g.beginPath();g.moveTo(0,hy);for(let x=0;x<=W;x+=W/40)g.lineTo(x,hy-(.09+.05*Math.sin(x/W*6+S.t*.5+L*2)+.03*Math.sin(x/W*13-S.t*.8))*H*(1+L*.35));g.lineTo(W,hy+H*.03);g.lineTo(0,hy+H*.03);const a=g.createLinearGradient(0,hy-H*.3,0,hy+H*.03);a.addColorStop(0,rg(col,0));a.addColorStop(1,rg(col,.5-L*.1));g.fillStyle=a;g.fill()}
 g.globalCompositeOperation='source-over';
 const city=m=='city';
 if(m=='code'||city){pil.sort((a,b)=>b.z-a.z);for(const p of pil){p.z-=dt*sp*2.2;if(p.z<1.3){p.z+=48;p.h=R(5,13);p.o=Math.random()*3}
  const k=f/p.z,w=(city?p.w*3.5:p.w)*k,h=(city?p.h*.5:p.h)*k,x=cx+p.s*(1.7+p.o+(city?p.w*2:0))*k,yb=hy+k,a=Math.min(1,(52-p.z)/22)*Math.min(1,(p.z-1.3)/1.5);
  g.globalAlpha=a;g.fillStyle='rgba(4,3,9,.93)';g.fillRect(x-w/2,yb-h,w,h);g.globalAlpha=a*(city?.9:.75);g.drawImage(city?wins:code,x-w/2,yb-h,w,h);
  g.globalCompositeOperation='lighter';g.globalAlpha=a*.14;g.fillStyle=rg(c,1);g.fillRect(x-w/2,yb-h,w,h);
  if(city&&p.o>2.5){g.globalAlpha=a*.8;const b=g.createLinearGradient(0,yb-h*1.3,0,yb-h);b.addColorStop(0,rg([229,140,40],1));b.addColorStop(1,rg(c,1));g.fillStyle=b;g.fillRect(x-w*.7,yb-h*1.5,w*1.4,h*.3)}
  g.globalCompositeOperation='source-over'}g.globalAlpha=1}
 g.shadowColor=rg(c,1);g.shadowBlur=14*D;
 if(m=='tunnel'){const off=(S.t*sp*2.2)%3;g.lineWidth=2*D;for(let z=off+1.5;z<46;z+=3){const k=f/z,a=Math.min(1,(46-z)/20)*Math.min(1,(z-1.4)/1.5),ww=3.4*k,hh=3*k,yb=hy+k;g.strokeStyle=rg(c,a*.9);g.beginPath();g.moveTo(cx-ww,yb);g.lineTo(cx-ww,yb-hh*.6);g.lineTo(cx-ww*.6,yb-hh);g.lineTo(cx+ww*.6,yb-hh);g.lineTo(cx+ww,yb-hh*.6);g.lineTo(cx+ww,yb);g.stroke()}}
 if(m=='tunnel'||m=='aurora'||m=='cosmos'){g.lineWidth=1.2*D;for(let i=0;i<14;i++){const z=1.4*Math.pow(1.28,i),y=Y(z);if(y>H)continue;g.strokeStyle=rg(c,.4*(1-i/16));g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}}
 const rw=1.15,zn=1.25,zf=70,rd=g.createLinearGradient(0,hy,0,H);rd.addColorStop(0,rg(c,.02));rd.addColorStop(1,rg(c,.18));g.fillStyle=rd;g.beginPath();g.moveTo(X(-rw,zn),Y(zn));g.lineTo(X(rw,zn),Y(zn));g.lineTo(X(rw,zf),Y(zf));g.lineTo(X(-rw,zf),Y(zf));g.fill();
 g.strokeStyle=rg(c,.95);g.lineWidth=3*D;for(const s of[-1,1]){g.beginPath();g.moveTo(X(s*rw,zn),Y(zn));g.lineTo(X(s*rw,zf),Y(zf));g.stroke()}
 g.shadowBlur=0;
 if(m=='code'||city){g.lineWidth=D;g.strokeStyle=rg(c,.28);for(const s of[-3.2,-2,-.55,.55,2,3.2]){g.beginPath();g.moveTo(X(s,zn),Y(zn));g.lineTo(X(s*.12,zf),Y(zf));g.stroke()}}
 const o2=(S.t*sp*2.2)%2;g.strokeStyle=rg(c,.8);for(let z=1.4+o2;z<40;z+=2){g.lineWidth=Math.max(1,.05*f/z);g.beginPath();g.moveTo(cx,Y(z));g.lineTo(cx,Y(z+.8));g.stroke()}
 if(m!='city'){const o=(S.t*sp*1.2)%1.2;g.lineWidth=1.3*D;g.strokeStyle=rg(c,.5);for(let z=1.3+o;z<30;z+=1.2){g.beginPath();g.moveTo(X(-rw,z),Y(z));g.lineTo(X(rw,z),Y(z));g.stroke()}}
 g.globalCompositeOperation='lighter';
 if(m=='city'||m=='aurora'){const fg=g.createLinearGradient(0,hy-H*.1,0,H);fg.addColorStop(0,rg(c,.3));fg.addColorStop(1,rg(c,0));g.fillStyle=fg;g.fillRect(0,hy-H*.1,W,H)}
 if(S.rings){const ry0=m=='cosmos'?hy+H*.08:hy+H*.32;for(let i=0;i<4;i++){const rx=(m=='cosmos'?W*(.18+i*.09):W*(.06+i*.035))*(1+.04*Math.sin(S.t*2-i)),ry=rx*(m=='cosmos'?.12:.28);g.strokeStyle=rg(c,.9-i*.18);g.lineWidth=2*D;g.beginPath();g.ellipse(cx,ry0,rx,ry,0,0,2*PI);g.stroke()}
  const sg=g.createRadialGradient(cx,hy+H*.32,0,cx,hy+H*.32,W*.14);sg.addColorStop(0,rg(c,.55));sg.addColorStop(1,rg(c,0));g.save();g.translate(0,hy+H*.32);g.scale(1,.3);g.translate(0,-(hy+H*.32));g.fillStyle=sg;g.fillRect(0,0,W,H*2);g.restore()}
 g.globalCompositeOperation='source-over';
 if(br.complete&&br.width){const hh=H*S.b.s,ww=hh*br.width/br.height,bx=S.b.x*W+S.px*.6,by=S.b.y*H+Math.sin(S.t*1.5)*H*.008,sx=S.spin?Math.max(.18,Math.abs(Math.cos(S.t*.9))):Math.cos(Math.sin(S.t*.6)*.12);
  g.save();g.translate(bx,by);g.scale(sx,1);g.shadowColor=rg(c,1);g.shadowBlur=35*D;g.drawImage(br,-ww/2,-hh/2,ww,hh);g.shadowBlur=0;g.globalCompositeOperation='lighter';g.globalAlpha=.55;g.drawImage(tint(),-ww/2,-hh/2,ww,hh);g.restore()}
 if(S.w>=0){const p=Math.min(S.w,1),e=Math.sin(p*PI),mr=Math.hypot(W,H)/2,col=[rg(c,1),'rgba(229,169,59,1)','rgba(255,255,255,1)'];
  g.globalCompositeOperation='lighter';const rd2=g.createRadialGradient(cx,hy,0,cx,hy,mr*.7);rd2.addColorStop(0,rg(c,.8*e));rd2.addColorStop(1,rg(c,0));g.fillStyle=rd2;g.fillRect(0,0,W,H);
  for(const s of ws){const d=p*s.v*mr,l=d*.4*e+4,ca=Math.cos(s.a),sa=Math.sin(s.a);g.strokeStyle=col[s.c].replace(',1)',`,${e})`);g.lineWidth=s.w*D;g.beginPath();g.moveTo(cx+ca*(d-l),hy+sa*(d-l));g.lineTo(cx+ca*d,hy+sa*d);g.stroke()}
  g.globalCompositeOperation='source-over';for(const s of sh){const d=p*s.v*mr;g.save();g.translate(cx+Math.cos(s.a)*d,hy+Math.sin(s.a)*d);g.rotate(s.r+p*s.q);g.fillStyle=s.col;g.globalAlpha=e;g.fillRect(-s.z*D,-s.z*D*.5,s.z*2*D,s.z*D);g.restore()}g.globalAlpha=1}
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
window.E={theme:h=>{S.k=hx(h);document.documentElement.style.setProperty('--c',h)},mode:(m,o={})=>{S.m=m;S.spin=o.spin?1:0;S.rings=o.rings?1:0},brain:(x,y,s)=>{S.tb={x,y,s}},warp:cb=>{S.w=0;S.cb=cb}};
})();
