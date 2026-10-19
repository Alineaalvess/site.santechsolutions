/* Navegação e conteúdo. Edite o objeto SEC para trocar os textos. */
(()=>{
const $=s=>document.querySelector(s),B=document.body,WA='https://wa.me/5511947159885',GOLD='#E5A93B',TEAL='#55B5C2';
const md=t=>t.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
const FORM=`<form id="f"><label>SEU NOME OU O DA EMPRESA<input name="n" required></label><label>O QUE VOCÊ QUER RESOLVER<select name="t"><option>Criar um site<option>Criar um sistema sob medida<option>Integrar sistemas / IA <option>Automatizar uma tarefa repetitiva<option>Outro</select></label><label>CONTE EM DUAS LINHAS<textarea name="d" rows="2"></textarea></label><button class="pill">ENVIAR PELO WHATSAPP</button></form>`;
const SEC=[
{n:'QUEM SOMOS',c:'#7939D1',m:'code',st:[
 [{s:'l',h:'Tecnologia que resolve',p:['A Santech Solutions desenvolve **sites, sistemas e soluções de inteligência artificial** sob medida para empresas.','Nosso foco: **automatizar a operação** e tirar o trabalho repetitivo das suas mãos.']}],
 [{s:'r',h:'IA aplicada ao seu negócio',p:['Usamos inteligência artificial onde ela gera resultado: atendimento, qualificação de clientes, relatórios e rotinas internas.']}],
 [{s:'l',h:'Presença digital sólida',p:['Sites rápidos e bem construídos transmitem confiança e reforçam o profissionalismo da sua marca.']}]]},
{n:'COMO FAZEMOS',c:GOLD,m:'tunnel',st:[
 [{s:'l',h:'A conversa é a primeira etapa',p:['Não é entrevista, é conversa para entender como sua empresa opera e identificar onde há oportunidades de otimização. A partir disso, apresentamos uma solução adequada e um orçamento transparente.']}],
 [{s:'r',h:'Desenvolvimento sob medida',p:['Construímos do zero, por módulos, com entregas parciais para você acompanhar e validar cada passo.']}],
 [{s:'l',h:'Solução completa, com acompanhamento até a conclusão',p:['Depois da entrega seguimos com **suporte e manutenção**: ajustes, correções e evolução conforme a empresa cresce.']}]]},
{n:'PROJETOS',c:TEAL,m:'city',st:[
 [{s:'l',h:'Automação com IA',p:['Agentes e fluxos inteligentes que atendem, respondem e organizam informações 24 horas por dia.','*(Substitua por um case real)*']}],
 [{s:'r',h:'Softwares de gestão',p:['Controle de estoque, financeiro e pedidos, sob medida, no jeito que a sua empresa trabalha.']}],
 [{s:'l',h:'Sites profissionais e escaláveis.',p:['Sites institucionais e páginas de apresentação construídos do zero, rápidos e prontos para crescer.']}]]},
{n:'CONTATO',c:'#7939D1',m:'aurora',st:[
 [{s:'l',h:'Conte o que você precisa resolver',p:['Responda abaixo e falamos com você pelo WhatsApp'],f:FORM}],
 [{s:'r',h:'Onde nos achar',p:['Prefere falar direto? Estamos aqui.',`<a class="ct" href="${WA}" target="_blank" rel="noopener"><img src="assets/whatsapp.svg" alt=""><span>WhatsApp<br>(11) 94715-9885</span></a>`,`<a class="ct" href="mailto:atendimento@santechsolutions.com.br"><img src="assets/email.svg" alt=""><span>E-mail<br>atendimento@santechsolutions.com.br</span></a>`,`<a class="ct" href="https://www.instagram.com/santech.s/" target="_blank" rel="noopener"><img src="assets/instagram.svg" alt=""><span>Instagram<br>@santech.s</span></a>`]}],
 [{s:'l',h:'Obrigado pela visita',p:['Se algo aqui lembrou um problema da sua empresa, é só chamar que trazemos uma solução para o seu negócio.']}]]}];
const MC=SEC.map(s=>s.c);
let v='intro',sec=0,step=0,busy=0,ready=0,lock=0;
const setV=x=>{v=x;B.dataset.v=x};
E.mode('code',{spin:1,rings:1});E.theme(GOLD);E.brain(.5,.4,.2);
const warp=cb=>{if(busy)return;busy=1;ready=0;E.warp(cb);setTimeout(()=>busy=0,1500)};
function renderCards(){const s=SEC[sec],c=s.st[step],last=step==s.st.length-1;
 $('#cards').innerHTML=c.map(x=>`<div class="card ${x.s}"><h3>${x.h}</h3>${x.p.map(p=>`<p>${md(p)}</p>`).join('')}${x.f||''}</div>`).join('');
 $('#cnt').textContent=`${step+1}/${s.st.length}`;$('#dots').innerHTML=s.st.map((_,i)=>`<i class="d${i==step?' on':''}"></i>`).join('');
 $('#sf').style.height=(step+1)/s.st.length*100+'%';const ex=$('#exit');ex.className=last?'pill on':'pill';ex.textContent=sec<3?SEC[sec+1].n:'FINALIZAR';
 const f=$('#f');if(f)f.onsubmit=e=>{e.preventDefault();const d=new FormData(f);open(`${WA.replace(/$/,'')}?text=`+encodeURIComponent(`Olá! Sou ${d.get('n')}. Quero: ${d.get('t')}. ${d.get('d')||''}`),'_blank','noopener');next()}}
function enter(i){warp(()=>{sec=i;step=0;setV('sec');const s=SEC[i];E.mode(s.m);E.theme(s.c);E.brain(.5,.3,.15);
 $('#sn').textContent=s.n;$('#cards').innerHTML='';$('#exit').className='pill';
 const t=$('#title');t.textContent=s.n.split('').join(' ');t.className='';void t.offsetWidth;t.className='show';
 setTimeout(()=>{if(v!='sec'||sec!=i)return;E.brain(.5,.42,.32);renderCards();ready=1},2200)})}
function out(){warp(()=>{setV('out');E.mode('cosmos',{rings:1});E.theme(TEAL);E.brain(.5,.4,.3);$('#cards').innerHTML='';$('#exit').className='pill on';$('#exit').textContent='QUEM SOMOS';ready=1})}
function next(){if(!ready||busy)return;const s=SEC[sec];if(v=='out')return enter(0);if(step<s.st.length-1){step++;renderCards()}else sec<3?enter(sec+1):out()}
function prev(){if(!ready||busy||v!='sec'||step==0)return;step--;renderCards()}
function home(){warp(()=>{setV('intro');E.mode('code',{spin:1,rings:1});E.theme(GOLD);E.brain(.5,.4,.2);$('#cards').innerHTML=''})}
$('#go').onclick=()=>warp(()=>{setV('menu');E.theme(MC[0]);E.brain(.5,.42,.3)});
document.querySelectorAll('#menu button').forEach(b=>{const i=+b.dataset.i,h=()=>{E.theme(MC[i]);$('#mk').textContent=`${i+1}/4 · ${['COMEÇA','AGORA','NO MEIO','ESTOU PRONTO'][i]}`};b.onmouseenter=b.onfocus=h;b.onclick=()=>enter(i)});
$('#exit').onclick=next;$('#nxb').onclick=next;$('#pv').onclick=prev;$('#home').onclick=e=>{e.preventDefault();home()};
addEventListener('wheel',e=>{if(lock||Math.abs(e.deltaY)<15||e.target.closest('.card'))return;lock=1;setTimeout(()=>lock=0,800);e.deltaY>0?next():prev()},{passive:true});
addEventListener('keydown',e=>{if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key))next();if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key))prev();if(e.key=='Escape'&&v!='intro')home()});
let ty,tx;addEventListener('touchstart',e=>{ty=e.touches[0].clientY;tx=e.touches[0].clientX},{passive:true});
addEventListener('touchend',e=>{if(e.target.closest('.card'))return;const dy=ty-e.changedTouches[0].clientY,dx=tx-e.changedTouches[0].clientX,d=Math.abs(dy)>Math.abs(dx)?dy:dx;if(Math.abs(d)>50)d>0?next():prev()},{passive:true});
})();
