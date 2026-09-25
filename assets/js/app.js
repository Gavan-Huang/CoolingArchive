const data = {
  ice:{date:'1750–',title:'冷并不等于“制冷”',body:'在机械制冷出现之前，人类已经拥有复杂的降温经验：储冰、地下空间、夜间通风、湿帘与蒸发。真正的技术分水岭，是把“自然里存在的冷”变成可以随时生产、搬运与控制的冷。',tag:'入门：先理解需求',evidence:'史学提示：早期“空调”叙事常把不同文明的被动降温技术与现代机械空调混为一谈。本网站将两者区分。'},
  factory:{date:'1830s–',title:'人工制冷进入工业问题',body:'19 世纪的机械制冷探索与人工造冰、食品储存和工业生产紧密相连。技术史的重点不是“突然出现一台冰箱”，而是压缩、膨胀、蒸发与凝结逐渐成为可工程化的循环。',tag:'工业化：制造冷',evidence:'证据方向：早期制冷专利、工业设备图纸、人工造冰史料。'},
  compress:{date:'19 世纪后期',title:'蒸汽压缩循环成为主线',body:'机械制冷逐渐形成我们今天仍然熟悉的骨架：压缩、冷凝、膨胀、蒸发。随着压缩机、换热器、密封和电机技术成熟，这套循环可以从实验装置变成连续运行的机器。',tag:'原理：四个状态变化',evidence:'工程史线索：热力学理论与设备制造能力共同塑造了系统。'},
  comfort:{date:'1900s–',title:'“空调”开始意味着空气处理',body:'现代空调的历史不仅是“降低温度”。工业环境需要控制湿度、露点、空气流动与洁净度；这些需求推动空气处理成为一套系统工程。',tag:'Carrier：湿度也是问题',evidence:'适合进一步加入原始专利与工业案例，让“空调”概念有具体来源。'},
  cfc:{date:'1930s–',title:'CFC 带来便利，也带来新的约束',body:'新型卤代工质被开发并广泛应用，推动制冷空调进入更大规模的商业与家用市场。几十年后，环境科学揭示其臭氧层影响，制冷剂路线随之改变。',tag:'环境：技术外部性',evidence:'后续专题应串联臭氧层科学、《蒙特利尔议定书》与产业替代。'},
  hfc:{date:'1990s–',title:'替代 CFC 之后，气候问题接棒',body:'HFC 等路线缓解了臭氧层风险，但部分工质具有较高全球变暖潜势。工程师再次面对多目标权衡：效率、安全、成本与环境影响同时进入选型。',tag:'权衡：多目标优化',evidence:'后续专题应加入 GWP、法规时间线与不同应用场景。'},
  natural:{date:'今天',title:'天然工质与低 GWP 路线重新崛起',body:'CO₂、氨、烃类以及新型低 GWP 工质正在不同应用中扮演越来越重要的角色。现代制冷的“难题”已经从单一设备效率，扩展到整个生命周期与基础设施。',tag:'当代：系统优化',evidence:'下一版本可加入不同地区法规与标准的时间轴，并标注适用场景。'},
  dc:{date:'2000s–今天',title:'数据中心：冷却不再只是“舒适”',body:'计算设备把热管理推向另一极端：稳定性、冗余、能源效率与局部高热流密度成为关键。空调与制冷技术因此进入数字基础设施核心层。',tag:'基础设施：热就是负载',evidence:'适合加入液冷、CRAC/CRAH、PUE 与高密度机架等专题。'},
  electronics:{date:'20 世纪中后期',title:'电子工业改变热管理尺度',body:'从精密制造到计算机，温度、湿度、洁净度与热流密度逐步变成产品可靠性的组成部分。空调不再只是“舒适设备”。',tag:'产业：环境即工艺',evidence:'后续可加入洁净室、电子制造与早期计算机冷却案例。'},
  centrifugal:{date:'20 世纪',title:'压缩机开始分化',body:'离心、螺杆、涡旋、滚动转子等不同压缩机路线，分别回应容量、效率、维护、噪声、调节范围与系统体积等需求。没有一种压缩机在所有场景里都占优。',tag:'设备：场景决定架构',evidence:'专家层可继续加入压缩机型谱、性能地图与历史型号。'},
  heatpump:{date:'今天',title:'热泵：把“制冷”反过来',body:'当系统可以通过换向让室内侧吸热/放热角色互换，制冷设备就成为热泵系统的一部分。制冷史由此与建筑供热、电气化和能源转型连接起来。',tag:'能源：同一循环，两种用途',evidence:'下一版可加入热泵、制冷与季节性能指标的对照。'}
};

// Local archive search prototype. No external AI/API is used.
window.renderArchiveAnswer = function(query) {
  const q = (query || '').trim().toLowerCase();
  const nodes = Object.entries(data).map(([id, x]) => ({id, ...x}));
  if (!q) return {title:'Ask the Archive', body:'请输入一个关于制冷史、制冷剂、压缩机、空调或热泵的问题。', matches:[]};
  const aliases = {
    refrigerant:['制冷剂','cfc','hfc','天然工质','gwp','氨','co2','r134a','r-134a'],
    compressor:['压缩机','压缩','离心','螺杆','涡旋'],
    aircon:['空调','carrier','湿度','空气处理'],
    heatpump:['热泵','供热','电气化'],
    datacenter:['数据中心','服务器','液冷','crac','pue']
  };
  const expanded=[q];
  for (const words of Object.values(aliases)) if(words.some(w=>q.includes(w))) expanded.push(...words);
  const score = n => expanded.reduce((s,k)=> s + ([n.title,n.body,n.tag,n.evidence,n.id].join(' ').toLowerCase().includes(k)?1:0),0);
  const matches=nodes.map(n=>[score(n),n]).filter(x=>x[0]>0).sort((a,b)=>b[0]-a[0]).slice(0,3).map(x=>x[1]);
  if (!matches.length) return {title:'暂未找到直接匹配', body:'当前是本地档案检索原型。可以尝试“为什么制冷剂会不断更换？”、“压缩机为什么有不同类型？”或“空调为什么最初与湿度有关？”。', matches:[]};
  return {title:matches[0].title, body:matches.map(x=>x.body).join(' '), matches};
};

function updateCard(id){
  const d=data[id]||data.ice;
  document.getElementById('timelineCard').innerHTML=`<div class="date">${d.date}</div><div><h3>${d.title}</h3><p>${d.body}</p><div><span class="tag">${d.tag}</span><span class="tag">点击节点继续</span></div><div class="evidence">${d.evidence}</div></div>`;
}
document.querySelectorAll('.node').forEach(n=>n.addEventListener('click',()=>{
  document.querySelectorAll('.node').forEach(x=>x.classList.remove('active'));
  const id=n.dataset.id; document.querySelectorAll(`.node[data-id="${id}"]`).forEach(x=>x.classList.add('active'));
  updateCard(id);
}));

const setPart=(part)=>{
  document.querySelectorAll('.cycle-note').forEach(n=>n.classList.toggle('active',n.dataset.part===part));
};
document.querySelectorAll('.cycle-note').forEach(n=>n.addEventListener('click',()=>setPart(n.dataset.part)));
document.querySelectorAll('.component').forEach(n=>n.addEventListener('click',()=>setPart(n.dataset.part)));

document.querySelectorAll('.toggle button').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.toggle button').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const eng=btn.dataset.view==='engineering';
  document.querySelectorAll('.simple').forEach(x=>x.style.display=eng?'none':'block');
  document.querySelectorAll('.eng').forEach(x=>x.style.display=eng?'block':'none');
  document.getElementById('viewCaption').textContent=eng?'能量与状态变化（理想化）':'热被搬到室外';
  document.getElementById('compSub').textContent=eng?'h₁→h₂ + W':'做功';
  document.getElementById('condSub').textContent=eng?'放热 / 相变':'向外放热';
  document.getElementById('expSub').textContent=eng?'近似等焓':'降压';
  document.getElementById('evapSub').textContent=eng?'吸热 / 除湿':'从室内吸热';
}));
const askInput=document.getElementById('askInput');
const askBtn=document.getElementById('askBtn');
const askAnswer=document.getElementById('askAnswer');
function doAsk(){ const r=window.renderArchiveAnswer(askInput.value); askAnswer.innerHTML=`<strong>${r.title}</strong><p>${r.body}</p>${r.matches.length?'<div class="tag">匹配档案：'+r.matches.map(x=>x.title).join(' · ')+'</div>':''}`; }
askBtn.addEventListener('click',doAsk);
askInput.addEventListener('keydown',e=>{if(e.key==='Enter')doAsk()});
document.querySelectorAll('.suggestions button').forEach(b=>b.addEventListener('click',()=>{askInput.value=b.dataset.q;doAsk()}));

(function(){
  const $=s=>document.querySelector(s);
  const qs=s=>document.querySelectorAll(s);
  const state={ref:'R-134a',te:-10,tc:45,sh:5,sc:5,eta:80,stage:0,anim:null,dome:true};
  const refFactor={'R-134a':1.00,'R-410A':1.08,'R-290':0.96,'R-717':0.91,'R-744':1.20};
  const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
  function calc(){
    const lift=Math.max(10,state.tc-state.te);
    const ratio=1+0.085*lift*refFactor[state.ref];
    const q=Math.max(55,145-1.15*lift+0.85*state.sc-0.45*state.sh);
    const w=Math.max(10,18+0.62*lift/refFactor[state.ref]+(100-state.eta)*0.42+state.sh*0.08);
    const cop=q/w;
    const mdot=1000/q;
    const discharge=state.tc+35+0.70*lift*(100/state.eta-0.95)+0.12*state.sh;
    return {lift,ratio,q,w,cop,mdot,discharge};
  }
  function setText(id,t){const e=$(id);if(e)e.textContent=t}
  function render(){
    const c=calc();
    setText('#refOut',state.ref);setText('#teOut',state.te+' °C');setText('#tcOut',state.tc+' °C');setText('#shOut',state.sh+' K');setText('#scOut',state.sc+' K');setText('#etaOut',state.eta+'%');
    setText('#rCop',c.cop.toFixed(2));setText('#rRatio',c.ratio.toFixed(1)+'×');setText('#rQ',c.q.toFixed(1));setText('#rW',c.w.toFixed(1));setText('#rMass',c.mdot.toFixed(2));setText('#rDischarge',c.discharge.toFixed(0));setText('#rLift',c.lift.toFixed(0));
    const p1={x:190,y:315},p2={x:255,y:105},p3={x:448,y:110},p4={x:420,y:320};
    const path=document.querySelector('#cyclePath'); if(path) path.setAttribute('d',`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} L ${p1.x} ${p1.y}`);
    const pts=document.querySelector('#phPts'); if(pts){pts.innerHTML='';[[p1,'1'],[p2,'2'],[p3,'3'],[p4,'4']].forEach(([p,n])=>{const g=document.createElementNS('http://www.w3.org/2000/svg','g');const c1=document.createElementNS('http://www.w3.org/2000/svg','circle');c1.setAttribute('cx',p.x);c1.setAttribute('cy',p.y);c1.setAttribute('r','7');c1.setAttribute('fill','#a15e42');const tx=document.createElementNS('http://www.w3.org/2000/svg','text');tx.setAttribute('x',p.x+10);tx.setAttribute('y',p.y-8);tx.setAttribute('font-size','12');tx.textContent=n;g.append(c1,tx);pts.appendChild(g)})}
    const dot=$('#refrigDot'); if(dot){const pos=[p1,p2,p3,p4][state.stage%4];dot.setAttribute('cx',pos.x);dot.setAttribute('cy',pos.y)}
  }
  function updateStage(i){state.stage=i;['#st1','#st2','#st3','#st4'].forEach((id,n)=>$(id)?.classList.toggle('on',n<=i));const names=['压缩','冷凝','膨胀','蒸发'];setText('#stageText',`STAGE ${String(i+1).padStart(2,'0')} · ${names[i]}`);setText('#stageHint',i===0?'正在把热力学状态抬到高压侧':'继续观察状态点如何移动');}
  function run(){if(state.anim)return;let i=0;updateStage(0);render();state.anim=setInterval(()=>{i++;if(i<4){updateStage(i);render()}else{clearInterval(state.anim);state.anim=null;updateStage(3);setText('#stageHint','一圈完成 · 可继续调参数')}} ,950)}
  function reset(){if(state.anim){clearInterval(state.anim);state.anim=null}Object.assign(state,{ref:'R-134a',te:-10,tc:45,sh:5,sc:5,eta:80,stage:0,dome:true});$('#refSelect').value=state.ref;['te','tc','sh','sc','eta'].forEach(id=>$('#'+id).value=state[id]);$('#dome').style.display='block';updateStage(0);render()}
  ['te','tc','sh','sc','eta'].forEach(id=>$('#'+id).addEventListener('input',e=>{state[id]=Number(e.target.value);render()}));
  $('#refSelect').addEventListener('change',e=>{state.ref=e.target.value;render()});$('#runSim').addEventListener('click',run);$('#resetSim').addEventListener('click',reset);$('#domeBtn').addEventListener('click',()=>{state.dome=!state.dome;$('#dome').style.display=state.dome?'block':'none'});
  qs('[data-sim-mode]').forEach(b=>b.addEventListener('click',()=>{qs('[data-sim-mode]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const mode=b.dataset.simMode;setText('#rMode',mode==='simulate'?'教学':mode==='explore'?'理解':'练习');const l=$('#simLesson');if(l)l.style.opacity=mode==='explore'?'1':'0.92'}));
  render();updateStage(0);
})();
