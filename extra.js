// ===== Estrelinhas: missões, prêmios, versículo e fruto da semana + sincronização =====
(function () {
  const NAMES = ["Manu", "Elena"];
  const AGES = { Manu: 9, Elena: 7 };

  // Missões pensadas para meninas de 7 e 9 anos
  const DEFAULT_TASKS = [
    { id: "cama", e: "🛏️", t: "Arrumar a cama", p: "arrumou a sua cama", g: "manha", on: true },
    { id: "dentes1", e: "🪥", t: "Escovar os dentes (manhã)", p: "escovou os dentes direitinho", g: "manha", on: false },
    { id: "oracao1", e: "🙏", t: "Oração da manhã", p: "começou o dia falando com Deus", g: "manha", on: true },
    { id: "devocional", e: "📖", t: "Ler a Bíblia sozinha (devocional)", p: "leu a Bíblia sozinha", g: "manha", on: true, who: "Manu" },
    { id: "mochila", e: "🎒", t: "Arrumar a mochila e o uniforme", p: "arrumou a mochila sozinha", g: "manha", on: false },
    { id: "licao", e: "✏️", t: "Fazer a lição de casa sem reclamar", p: "fez a lição de casa", g: "escola", on: true },
    { id: "leitura", e: "📚", t: "Ler 15 minutos", p: "leu um livro por 15 minutos", g: "escola", on: true },
    { id: "mesa", e: "🍽️", t: "Pôr ou tirar a mesa", p: "ajudou com a mesa", g: "dia", on: true },
    { id: "quarto", e: "🧸", t: "Arrumar o quarto e os brinquedos", p: "deixou o quarto arrumado", g: "dia", on: true, who: "Elena" },
    { id: "roupas", e: "👕", t: "Guardar as próprias roupas", p: "guardou as suas roupas", g: "dia", on: false },
    { id: "cozinha", e: "🥣", t: "Ajudar no jantar ou na louça", p: "ajudou na cozinha", g: "dia", on: false, who: "Manu" },
    { id: "banho", e: "🛁", t: "Banho sem reclamar", p: "tomou banho sem reclamar", g: "noite", on: false },
    { id: "biblia", e: "🌙", t: "Rotina da Bíblia e oração", p: "ouviu a história e orou", g: "noite", on: true },
    { id: "deitar", e: "😴", t: "Deitar na hora sem enrolar", p: "foi deitar na hora certinha", g: "noite", on: false },
    { id: "obedecer", e: "👂", t: "Obedecer na primeira vez", p: "obedeceu na primeira vez", g: "coracao", on: true },
    { id: "irma", e: "💕", t: "Ser gentil com a irmã", p: "foi gentil com a sua irmã", g: "coracao", on: true },
    { id: "verdade", e: "✅", t: "Falar sempre a verdade", p: "falou a verdade", g: "coracao", on: false },
    { id: "perdao", e: "🤝", t: "Pedir desculpas / perdoar", p: "pediu desculpas e perdoou", g: "coracao", on: false },
    { id: "orar", e: "🙌", t: "Orar por alguém", p: "orou por outra pessoa", g: "coracao", on: false }
  ];
  const GROUPS = { manha: "☀️ Manhã", escola: "📚 Escola", dia: "🌤️ Em casa", noite: "🌙 Noite", coracao: "💖 Coração" };

  const DEFAULT_PRIZES = [
    { id: "p1", e: "🍮", t: "Escolher a sobremesa do dia", c: 5 },
    { id: "p2", e: "🎶", t: "Escolher o louvor da família no carro", c: 8 },
    { id: "p3", e: "⏰", t: "30 minutos a mais acordada (fim de semana)", c: 12 },
    { id: "p4", e: "📱", t: "30 minutos extras de tablet ou TV", c: 15 },
    { id: "p5", e: "🍿", t: "Noite do filme em família com pipoca", c: 20 },
    { id: "p6", e: "👩‍🍳", t: "Cozinhar uma receita com o papai ou a mamãe", c: 25 },
    { id: "p7", e: "👨‍👧", t: "Tarde especial só com o papai ou a mamãe", c: 30 },
    { id: "p8", e: "👭", t: "Convidar uma amiga para brincar em casa", c: 40 },
    { id: "p9", e: "🗺️", t: "Escolher o passeio do sábado", c: 50 },
    { id: "p10", e: "⛪", t: "Ser ajudante especial do papai/mamãe na igreja", c: 60 },
    { id: "p11", e: "🎁", t: "Livro ou brinquedo que ela escolher", c: 80 },
    { id: "p12", e: "🛌", t: "Noite do pijama com uma amiga", c: 120 },
    { id: "p13", e: "🎢", t: "Passeio especial (zoológico, cinema, parque)", c: 150 }
  ];

  // Versículos em linguagem simples para crianças (confira na sua Bíblia preferida)
  const VERSES = [
    { r: "Efésios 6:1", t: "Filhos, obedeçam a seus pais no Senhor, pois isso é certo.", mr: "Efésios 6:1-3", m: "Filhos, obedeçam a seus pais no Senhor, pois isso é certo. Honre seu pai e sua mãe, para que tudo lhe vá bem." },
    { r: "Salmo 56:3", t: "Quando eu tiver medo, vou confiar em Ti, Senhor.", mr: "Salmo 56:3-4", m: "Quando eu tiver medo, vou confiar em Ti. Em Deus eu confio e não terei medo." },
    { r: "Filipenses 4:13", t: "Tudo posso naquele que me fortalece.", mr: "Filipenses 4:6,13", m: "Não fiquem ansiosos por nada, mas em tudo orem a Deus. Tudo posso naquele que me fortalece." },
    { r: "Efésios 4:32", t: "Sejam bondosos uns com os outros e perdoem-se, como Deus perdoou vocês." },
    { r: "Salmo 118:24", t: "Este é o dia que o Senhor fez: vamos nos alegrar nele!", mr: "Salmo 118:24,29", m: "Este é o dia que o Senhor fez: vamos nos alegrar nele! Deem graças ao Senhor, porque Ele é bom; o seu amor dura para sempre." },
    { r: "1 João 4:19", t: "Nós amamos porque Deus nos amou primeiro.", mr: "1 João 4:7,19", m: "Amados, amemos uns aos outros, pois o amor vem de Deus. Nós amamos porque Ele nos amou primeiro." },
    { r: "Josué 1:9", t: "Seja forte e corajoso! O Senhor, seu Deus, está com você aonde você for." },
    { r: "Salmo 119:105", t: "A Tua Palavra é lâmpada para os meus pés e luz para o meu caminho.", mr: "Salmo 119:11,105", m: "Guardei a Tua Palavra no meu coração para não pecar contra Ti. A Tua Palavra é lâmpada para os meus pés e luz para o meu caminho." },
    { r: "1 Tessalonicenses 5:18", t: "Em tudo deem graças a Deus.", mr: "1 Tessalonicenses 5:16-18", m: "Estejam sempre alegres, orem sem parar e em tudo deem graças a Deus." },
    { r: "Provérbios 3:5", t: "Confie no Senhor de todo o seu coração.", mr: "Provérbios 3:5-6", m: "Confie no Senhor de todo o seu coração e não se apoie no seu próprio entendimento. Lembre-se de Deus em tudo o que fizer, e Ele vai mostrar o caminho certo." },
    { r: "Colossenses 3:20", t: "Filhos, obedeçam a seus pais em tudo, pois isso agrada ao Senhor." },
    { r: "João 3:16", t: "Deus amou tanto o mundo que deu o seu Filho Jesus, para que todo aquele que nele crê tenha a vida eterna." },
    { r: "Salmo 4:8", t: "Em paz me deito e logo durmo, porque só Tu, Senhor, me fazes viver em segurança." },
    { r: "Mateus 19:14", t: "Jesus disse: Deixem as crianças virem a mim.", m: "Jesus disse: Deixem as crianças virem a mim e não as impeçam, pois o Reino dos céus pertence aos que são como elas." }
  ];

  // Fruto do Espírito (Gálatas 5:22-23): um por semana
  const FRUITS = [
    { f: "Amor", e: "❤️", c: "Fazer um carinho ou um desenho para alguém da família" },
    { f: "Alegria", e: "😄", c: "Fazer alguém sorrir hoje" },
    { f: "Paz", e: "🕊️", c: "Resolver uma briga conversando, sem gritar" },
    { f: "Paciência", e: "⏳", c: "Esperar a sua vez sem reclamar" },
    { f: "Amabilidade", e: "🌷", c: "Falar com carinho, mesmo quando estiver brava" },
    { f: "Bondade", e: "🎁", c: "Ajudar alguém sem ninguém pedir" },
    { f: "Fidelidade", e: "🤞", c: "Cumprir uma promessa que você fez" },
    { f: "Mansidão", e: "🐑", c: "Responder com calma quando ficar chateada" },
    { f: "Domínio próprio", e: "🛑", c: "Parar na primeira vez que o papai ou a mamãe pedir" }
  ];

  const WEEK0 = "2026-11-09"; // segunda-feira
  const today = () => tonight();
  const weekIdx = () => Math.floor((dayNum(today()) - dayNum(WEEK0)) / 7);
  const verse = who => { const v = VERSES[((weekIdx() % VERSES.length) + VERSES.length) % VERSES.length]; return who === "Manu" && v.m ? { r: v.mr || v.r, t: v.m } : v; };
  const fruit = () => FRUITS[((weekIdx() % FRUITS.length) + FRUITS.length) % FRUITS.length];
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  // ---------- estado ----------
  function K() {
    if (!S.k) S.k = {};
    const k = S.k;
    if (k.v !== 3) {
      const myTasks = (k.tasks || []).filter(t => t.custom), myPrizes = (k.prizes || []).filter(p => !/^p\d+$/.test(p.id));
      k.tasks = DEFAULT_TASKS.map(t => Object.assign({}, t)).concat(myTasks);
      k.prizes = DEFAULT_PRIZES.map(p => Object.assign({}, p)).concat(myPrizes);
      k.v = 3;
    }
    k.log = k.log || {}; k.bonus = k.bonus || []; k.spent = k.spent || []; k.goal = k.goal || {};
    return k;
  }
  if (!S.family) { S.family = Array.from({ length: 20 }, () => "abcdefghijkmnpqrstuvwxyz23456789"[Math.floor(Math.random() * 32)]).join(""); }
  K();

  let sel = NAMES[0];
  try { const v = localStorage.getItem("hdd.sel"); if (NAMES.includes(v)) sel = v; } catch (e) {}
  const setSel = n => { sel = n; try { localStorage.setItem("hdd.sel", n); } catch (e) {} render(); };

  const isDone = (d, who, id) => { const v = ((K().log[d] || {})[who] || {})[id]; return typeof v === "number" && v > 0; };
  function earned(who) {
    const k = K(); let n = 0;
    for (const d in k.log) { const m = k.log[d][who] || {}; for (const id in m) if (m[id] > 0) n++; }
    k.bonus.forEach(b => { if (b.w === who) n += b.n; });
    return n;
  }
  const spentOf = who => K().spent.filter(s => s.w === who).reduce((a, s) => a + s.c, 0);
  const balance = who => earned(who) - spentOf(who);
  const todayCount = who => { const m = (K().log[today()] || {})[who] || {}; return Object.values(m).filter(v => v > 0).length + K().bonus.filter(b => b.w === who && b.d === today()).reduce((a, b) => a + b.n, 0); };

  // estrelinhas do topo da tela Hoje passam a mostrar o saldo
  stars = function (name) { return balance(name); };

  // ---------- ações ----------
  function toggleTask(id) {
    const k = K(), d = today();
    k.log[d] = k.log[d] || {}; k.log[d][sel] = k.log[d][sel] || {};
    const task = taskById(id);
    if (isDone(d, sel, id)) {
      ask(`Desfazer “${task.t}”?`, "Use só se marcou por engano.", "Desfazer", () => { k.log[d][sel][id] = -Date.now(); commit(); });
      return;
    }
    k.log[d][sel][id] = Date.now();
    commit();
    celebrate("⭐", `Muito bem, ${sel}!`, `Você ${task.p}! +1 estrelinha`);
  }
  function taskById(id) {
    if (id === "fruto") { const f = fruit(); return { id, e: f.e, t: "Desafio: " + f.c, p: "viveu o fruto da " + f.f.toLowerCase() }; }
    return K().tasks.find(t => t.id === id) || { id, e: "⭐", t: id, p: "fez algo muito bom" };
  }
  function addBonus(n, why) {
    K().bonus.push({ id: uid(), w: sel, n, why, d: today() }); commit();
    celebrate("🌟", `Parabéns, ${sel}!`, `${why} +${n} estrelinha${n > 1 ? "s" : ""}`);
  }
  function verseDone() {
    const wk = "v" + weekIdx();
    if (K().bonus.some(b => b.w === sel && b.vk === wk)) { toast("Já ganhou o versículo desta semana 💛"); return; }
    K().bonus.push({ id: uid(), w: sel, n: 3, why: "Recitou o versículo da semana!", d: today(), vk: wk }); commit();
    celebrate("📜", `Que lindo, ${sel}!`, "Você guardou a Palavra no coração! +3 estrelinhas");
  }
  function redeem(pid) {
    const p = K().prizes.find(x => x.id === pid); if (!p) return;
    const b = balance(sel);
    if (b < p.c) { toast(`Faltam ${p.c - b} estrelinhas 💪`); return; }
    ask(`Trocar ${p.c} ⭐ por “${p.t}”?`, `${sel} fica com ${b - p.c} estrelinhas.`, "Trocar", () => {
      K().spent.push({ id: uid(), w: sel, pid, t: p.t, c: p.c, d: today() });
      if (K().goal[sel] === pid) delete K().goal[sel];
      commit(); celebrate("🎉", `Prêmio conquistado!`, `${sel}: ${p.e} ${p.t}`);
    });
  }
  function setGoal(pid) { K().goal[sel] = K().goal[sel] === pid ? null : pid; commit(); }
  function commit() { save(); render(); renderHoje(); }

  // ---------- interface ----------
  const css = `
  .ex-kids{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
  .ex-kids button{padding:12px;border-radius:18px;font-family:"Baloo 2";font-size:22px;font-weight:800;background:#ffffff12;border:2px solid transparent}
  .ex-kids button.on.manu{background:var(--manu);color:#fff}.ex-kids button.on.elena{background:var(--elena);color:#0b3b36}
  .ex-bal{text-align:center;padding:18px;border-radius:24px;margin-bottom:14px}
  .ex-bal.manu{background:linear-gradient(160deg,#ff6fae,#b84ad6)}.ex-bal.elena{background:linear-gradient(160deg,#4fc9bc,#3e7fd9)}
  .ex-bal .n{font-family:"Baloo 2";font-size:56px;font-weight:800;line-height:1}
  .ex-bal small{display:block;font-weight:700;opacity:.95}
  .ex-bar{height:14px;background:#0003;border-radius:99px;overflow:hidden;margin:10px 0 4px}.ex-bar i{display:block;height:100%;background:var(--gold);border-radius:99px}
  .ex-g{font-family:"Baloo 2";font-size:17px;margin:14px 0 8px;color:var(--gold)}
  .ex-task{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:#ffffff0d;border:1px solid var(--line);border-radius:16px;padding:12px;margin-bottom:8px}
  .ex-task .ic{font-size:30px;width:40px;text-align:center}.ex-task b{flex:1;font-size:16px}
  .ex-task .st{font-size:26px;filter:grayscale(1);opacity:.35}.ex-task.done{background:#ffd16622;border-color:#ffd16677}.ex-task.done .st{filter:none;opacity:1}
  .ex-week{display:grid;gap:10px;margin-bottom:14px}
  .ex-prize{display:flex;align-items:center;gap:10px;background:#ffffff0d;border-radius:14px;padding:10px;margin-bottom:8px}
  .ex-prize .ic{font-size:28px}.ex-prize .tx{flex:1}.ex-prize .tx small{display:block;color:var(--gold);font-weight:700}
  .ex-prize .btn{min-height:40px;padding:8px 12px}.ex-prize .goal{font-size:20px;opacity:.4}.ex-prize .goal.on{opacity:1}
  .ex-hist{font-size:14px;color:var(--muted);line-height:1.7}
  .ex-cel{position:fixed;inset:0;z-index:40;display:none;align-items:center;justify-content:center;background:#0b0820ee;text-align:center;padding:20px}
  .ex-cel.on{display:flex}.ex-cel .big{font-size:110px;animation:pop .6s cubic-bezier(.2,1.6,.4,1)}
  .ex-cel h2{font-size:34px;margin:6px 0}.ex-cel p{font-size:18px;margin:0;max-width:320px}
  @keyframes pop{from{transform:scale(.2) rotate(-30deg);opacity:0}}
  .ex-conf{position:fixed;top:-20px;font-size:22px;z-index:41;animation:fall 1.8s linear forwards;pointer-events:none}
  @keyframes fall{to{transform:translateY(110vh) rotate(360deg)}}
  .ex-edit{display:flex;gap:8px;align-items:center;margin-bottom:8px}.ex-edit input{padding:8px}.ex-edit .em{width:52px;text-align:center}.ex-edit .num{width:70px}
  .ex-edit label{margin:0;display:flex;align-items:center;gap:8px;flex:1;color:var(--ink);font-weight:600}
  .ex-edit input[type=checkbox]{width:22px;height:22px}
  .ex-x{font-size:18px;padding:6px 10px;border-radius:10px;background:#ffffff14}
  .tabs button{padding:4px 6px}
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const sec = document.createElement("section"); sec.className = "view"; sec.id = "v-estrelas";
  document.querySelector("main").insertBefore(sec, document.getElementById("v-cal"));
  const tab = document.createElement("button"); tab.dataset.v = "estrelas"; tab.innerHTML = "<span>⭐</span>Estrelas";
  const tabs = document.querySelector(".tabs"); tabs.insertBefore(tab, tabs.querySelector('[data-v="cal"]'));
  tab.onclick = () => { render(); show("estrelas"); window.scrollTo(0, 0); };

  const cel = document.createElement("div"); cel.className = "ex-cel"; cel.onclick = () => cel.classList.remove("on");
  document.body.appendChild(cel);
  const modal = document.createElement("div"); modal.className = "modal"; modal.id = "ex-ask";
  modal.innerHTML = `<div class="sheet"><h3 id="ex-ask-t"></h3><p id="ex-ask-p"></p><div class="row"><button class="btn pri" id="ex-ask-ok"></button><button class="btn" id="ex-ask-no">Cancelar</button></div></div>`;
  document.body.appendChild(modal);
  function ask(t, p, ok, fn) {
    $("ex-ask-t").textContent = t; $("ex-ask-p").textContent = p; $("ex-ask-ok").textContent = ok;
    $("ex-ask-ok").onclick = () => { modal.classList.remove("on"); fn(); };
    $("ex-ask-no").onclick = () => modal.classList.remove("on");
    modal.classList.add("on");
  }
  let celT;
  function celebrate(icon, title, text) {
    cel.innerHTML = `<div><div class="big">${icon}</div><h2>${esc(title)}</h2><p>${esc(text)}</p></div>`;
    cel.classList.add("on"); clearTimeout(celT); celT = setTimeout(() => cel.classList.remove("on"), 2600);
    for (let i = 0; i < 18; i++) { const c = document.createElement("div"); c.className = "ex-conf"; c.textContent = ["⭐", "✨", "💛", "🌟"][i % 4]; c.style.left = Math.random() * 100 + "vw"; c.style.animationDelay = Math.random() * .5 + "s"; document.body.appendChild(c); setTimeout(() => c.remove(), 2600); }
    try { if (window.speechSynthesis) { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(title); u.lang = "pt-BR"; const v = pickVoice(); if (v) u.voice = v; speechSynthesis.speak(u); } } catch (e) {}
  }

  function render() {
    const k = K(), who = sel, cls = who.toLowerCase(), b = balance(who), d = today();
    const goal = k.prizes.find(p => p.id === k.goal[who]);
    const pct = goal ? Math.min(100, Math.round(b / goal.c * 100)) : 0;
    const v = verse(who), f = fruit();
    const active = k.tasks.filter(t => t.on && (!t.who || t.who === who));
    let h = `<div class="top"><h1 style="font-size:24px">Estrelinhas ⭐</h1><small>${cap(parse(d).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }))}</small></div>`;
    h += `<div class="ex-kids">${NAMES.map(n => `<button class="${n.toLowerCase()} ${n === who ? "on" : ""}" onclick="EX.sel('${n}')">${n} <small style="font-size:13px;opacity:.8">${AGES[n]} anos</small></button>`).join("")}</div>`;
    h += `<div class="ex-bal ${cls}"><small>${who} tem</small><div class="n">${b} ⭐</div><small>${todayCount(who)} hoje</small>`;
    h += goal ? `<div class="ex-bar"><i style="width:${pct}%"></i></div><small>🎯 ${esc(goal.t)}: ${b >= goal.c ? "já pode trocar! 🎉" : "faltam " + (goal.c - b)}</small>` : `<small style="margin-top:8px;opacity:.85">Toque em 🎯 num prêmio para escolher a meta</small>`;
    h += `</div>`;
    h += `<div class="ex-week"><div class="card" style="margin:0"><small style="color:var(--gold);font-weight:700">📜 Versículo da semana · ${esc(v.r)}</small><p style="font-size:18px;line-height:1.5;margin:6px 0 10px">“${esc(v.t)}”</p><div class="row"><button class="btn" onclick="EX.say()">🔊 Ouvir</button><button class="btn pri" onclick="EX.verse()">Recitou! +3 ⭐</button></div></div>`;
    h += `<div class="card" style="margin:0"><small style="color:var(--gold);font-weight:700">🍇 Fruto do Espírito da semana</small><h3 style="font-size:22px;margin:4px 0">${f.e} ${esc(f.f)}</h3><p style="margin:0;color:var(--muted)">Gálatas 5:22-23 · Desafio: ${esc(f.c)}</p></div></div>`;
    h += `<div class="card"><h3 style="font-size:20px">Missões de hoje</h3><p class="hint" style="text-align:left;margin:4px 0 0">Toque quando ${who} fizer. Elogie na hora! 💛</p>`;
    for (const g in GROUPS) {
      const list = active.filter(t => t.g === g);
      if (g === "coracao") list.push(taskById("fruto"));
      if (!list.length) continue;
      h += `<div class="ex-g">${GROUPS[g]}</div>`;
      h += list.map(t => `<button class="ex-task ${isDone(d, who, t.id) ? "done" : ""}" onclick="EX.task('${t.id}')"><span class="ic">${t.e}</span><b>${esc(t.t)}</b><span class="st">⭐</span></button>`).join("");
    }
    h += `<button class="btn full" style="margin-top:6px" onclick="EX.bonus()">🌟 Estrelinha bônus</button></div>`;
    h += `<div class="card"><h3 style="font-size:20px;margin-bottom:10px">🎁 Prêmios</h3>`;
    h += k.prizes.slice().sort((a, c) => a.c - c.c).map(p => `<div class="ex-prize"><span class="ic">${p.e}</span><span class="tx">${esc(p.t)}<small>${p.c} ⭐</small></span><button class="goal ${k.goal[who] === p.id ? "on" : ""}" onclick="EX.goal('${p.id}')" aria-label="Meta">🎯</button><button class="btn ${b >= p.c ? "pri" : ""}" onclick="EX.redeem('${p.id}')">Trocar</button></div>`).join("");
    h += `<p class="hint">Dica: entregue o prêmio logo, e nunca tire estrelinhas já ganhas.</p></div>`;
    const hist = [];
    k.spent.filter(s => s.w === who).forEach(s => hist.push([s.d, `🎁 Trocou ${s.c} ⭐ por ${s.t}`]));
    k.bonus.filter(s => s.w === who).forEach(s => hist.push([s.d, `🌟 +${s.n} ${s.why}`]));
    hist.sort((a, c) => a[0] < c[0] ? 1 : -1);
    if (hist.length) h += `<div class="card"><h3 style="font-size:18px;margin-bottom:6px">Histórico</h3><div class="ex-hist">${hist.slice(0, 12).map(x => `${parse(x[0]).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} · ${esc(x[1])}`).join("<br>")}</div></div>`;
    sec.innerHTML = h;
  }

  function bonusPrompt() {
    const why = prompt(`Por que ${sel} ganhou estrelinha bônus?`, "Ajudou sem ninguém pedir");
    if (why === null) return;
    addBonus(1, why.trim() || "Estrelinha bônus");
  }
  function sayVerse() { const v = verse(sel); speakText(`${v.r}. ${v.t}`, null); }

  // ---------- ajustes ----------
  const aj = document.createElement("div");
  document.getElementById("v-aj").insertBefore(aj, document.getElementById("v-aj").children[1]);
  function renderAjustes() {
    const k = K();
    let h = `<div class="card"><h3 style="font-size:20px">⭐ Missões</h3><p class="hint" style="text-align:left">Comece com poucas (5 a 8). Quando virar hábito, troque por outras. Escolha se cada missão é da Manu, da Elena ou das duas.</p>`;
    h += k.tasks.map(t => `<div class="ex-edit"><label><input type="checkbox" ${t.on ? "checked" : ""} onchange="EX.tOn('${t.id}',this.checked)"> ${t.e} ${esc(t.t)}</label><select style="width:96px;padding:6px" onchange="EX.tWho('${t.id}',this.value)">${["", "Manu", "Elena"].map(o => `<option value="${o}" ${(t.who || "") === o ? "selected" : ""}>${o || "Ambas"}</option>`).join("")}</select>${t.custom ? `<button class="ex-x" onclick="EX.tDel('${t.id}')">✕</button>` : ""}</div>`).join("");
    h += `<div class="ex-edit" style="margin-top:10px"><input class="em" id="ex-nt-e" value="⭐"><input id="ex-nt-t" placeholder="Nova missão"><select id="ex-nt-g" style="width:110px">${Object.keys(GROUPS).map(g => `<option value="${g}">${GROUPS[g]}</option>`).join("")}</select></div><button class="btn full" onclick="EX.tAdd()">+ Adicionar missão</button></div>`;
    h += `<div class="card"><h3 style="font-size:20px">🎁 Prêmios</h3><p class="hint" style="text-align:left">Ajuste os valores e escolha prêmios junto com as meninas.</p>`;
    h += k.prizes.map(p => `<div class="ex-edit"><input class="em" value="${esc(p.e)}" onchange="EX.pSet('${p.id}','e',this.value)"><input value="${esc(p.t)}" onchange="EX.pSet('${p.id}','t',this.value)"><input class="num" type="number" min="1" value="${p.c}" onchange="EX.pSet('${p.id}','c',this.value)"><button class="ex-x" onclick="EX.pDel('${p.id}')">✕</button></div>`).join("");
    h += `<button class="btn full" onclick="EX.pAdd()">+ Adicionar prêmio</button></div>`;
    h += `<div class="card"><h3 style="font-size:20px">👨‍👩‍👧‍👧 Família conectada</h3><p style="color:var(--muted);margin:8px 0;line-height:1.5" id="ex-sync">${syncText()}</p><button class="btn pri full" onclick="share()">💌 Convidar a mamãe (ou o papai)</button></div>`;
    aj.innerHTML = h;
  }
  const _fill = fillAjustes; fillAjustes = function () { _fill(); renderAjustes(); };

  // ---------- sincronização entre os celulares ----------
  let syncState = "off", syncTimer = null, pushing = false;
  function syncText() {
    return syncState === "on" ? "✅ Sincronizado: tudo o que um marca aparece no celular do outro."
      : syncState === "wait" ? "⏳ Sincronizando…"
      : "📱 Usando só neste celular. Envie o convite pelo botão abaixo para ligar os dois celulares.";
  }
  function setSync(s) { syncState = s; const e = $("ex-sync"); if (e) e.textContent = syncText(); }
  function mergeLog(a, b) {
    const out = JSON.parse(JSON.stringify(a || {}));
    for (const d in b || {}) for (const w in b[d]) for (const id in b[d][w]) {
      out[d] = out[d] || {}; out[d][w] = out[d][w] || {};
      const x = out[d][w][id], y = b[d][w][id];
      if (x === undefined || Math.abs(y) > Math.abs(x)) out[d][w][id] = y;
    }
    return out;
  }
  const unionById = (a, b) => { const m = {}; (a || []).concat(b || []).forEach(x => { m[x.id] = x; }); return Object.values(m); };
  function merge(remote) {
    if (!remote) return false;
    const mine = JSON.parse(JSON.stringify(S));
    const newer = (remote.updatedAt || 0) > (S.updatedAt || 0) ? remote : mine;
    const rk = remote.k || {}, lk = mine.k || {};
    const k = Object.assign({}, newer.k || {});
    k.log = mergeLog(lk.log, rk.log);
    k.bonus = unionById(lk.bonus, rk.bonus);
    k.spent = unionById(lk.spent, rk.spent);
    const keepLocal = { voice: S.voice, rate: S.rate };
    for (const key in S) delete S[key];
    Object.assign(S, newer, keepLocal, { k, family: mine.family, updatedAt: Math.max(remote.updatedAt || 0, mine.updatedAt || 0) });
    return JSON.stringify(S) !== JSON.stringify(Object.assign({}, mine));
  }
  async function pull() {
    try {
      const r = await fetch("/api/state?f=" + S.family, { cache: "no-store" });
      if (!r.ok) { setSync("off"); return false; }
      const j = await r.json(); setSync("on");
      if (j.state) { merge(j.state); _save(); renderAll(); render(); } else schedule();
      return true;
    } catch (e) { setSync("off"); return false; }
  }
  async function push() {
    if (pushing) { schedule(); return; }
    pushing = true;
    try {
      const r0 = await fetch("/api/state?f=" + S.family, { cache: "no-store" });
      if (!r0.ok) { setSync("off"); return; }
      const j = await r0.json(); if (j.state) { merge(j.state); _save(); }
      const r = await fetch("/api/state?f=" + S.family, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(S) });
      setSync(r.ok ? "on" : "off");
      renderAll(); render();
    } catch (e) { setSync("off"); } finally { pushing = false; }
  }
  function schedule() { clearTimeout(syncTimer); syncTimer = setTimeout(push, 800); }
  const _save = save;
  save = function () { S.updatedAt = Date.now(); _save(); schedule(); };

  // convite: o link leva o código da família (e o calendário, se a sincronização estiver desligada)
  const _shareLink = shareLink;
  shareLink = function () { return location.origin + "/#fam=" + S.family + "&" + _shareLink().split("#")[1]; };
  function checkFamily() {
    const m = location.hash.match(/fam=([a-z0-9]{12,40})/);
    if (m) $("m-import").classList.remove("on");
    if (!m) return;
    if (m[1] === S.family) { history.replaceState(null, "", location.pathname); return; }
    ask("Ligar ao celular da família? 💌", "Este celular vai mostrar o mesmo calendário, as mesmas missões e as mesmas estrelinhas do outro.", "Sim, ligar", async () => {
      const old = S.family; S.family = m[1]; S.updatedAt = 0; _save();
      history.replaceState(null, "", location.pathname);
      const ok = await pull();
      if (!ok) {
        S.family = old; _save();
        const c = (location.hash || "").match(/cal=([A-Za-z0-9+/]+)/) || (m.input.match(/cal=([A-Za-z0-9+/]+)/));
        if (c) { try { pending = JSON.parse(atob(c[1])); doImport(); } catch (e) {} }
        toast("Calendário copiado (sincronização ainda desligada)"); return;
      }
      toast("Celulares ligados 💕"); schedule();
    });
  }

  window.EX = {
    sel: setSel, task: toggleTask, bonus: bonusPrompt, verse: verseDone, say: sayVerse, redeem, goal: setGoal,
    tOn(id, on) { const t = K().tasks.find(x => x.id === id); if (t) { t.on = on; save(); render(); } },
    tWho(id, w) { const t = K().tasks.find(x => x.id === id); if (t) { t.who = w || null; save(); render(); } },
    tDel(id) { K().tasks = K().tasks.filter(x => x.id !== id); save(); renderAjustes(); render(); },
    tAdd() { const t = $("ex-nt-t").value.trim(); if (!t) return toast("Escreva a missão"); K().tasks.push({ id: "c" + uid(), e: $("ex-nt-e").value.trim() || "⭐", t, p: "cumpriu a missão: " + t.toLowerCase(), g: $("ex-nt-g").value, on: true, custom: true }); save(); renderAjustes(); render(); toast("Missão adicionada"); },
    pSet(id, f, v) { const p = K().prizes.find(x => x.id === id); if (!p) return; p[f] = f === "c" ? Math.max(1, parseInt(v) || 1) : v; save(); render(); },
    pDel(id) { K().prizes = K().prizes.filter(x => x.id !== id); save(); renderAjustes(); render(); },
    pAdd() { K().prizes.push({ id: "p" + uid(), e: "🎁", t: "Novo prêmio", c: 10 }); save(); renderAjustes(); render(); }
  };

  render(); renderHoje();
  checkFamily();
  pull();
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") pull(); });
  setInterval(() => { if (document.visibilityState === "visible" && !pushing) pull(); }, 30000);
})();
