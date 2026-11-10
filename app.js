// ---------- armazenamento ----------
const KEY = "horaDeDormir.v1";
const DEFAULTS = { anchorDate: "2026-11-11", anchorName: "Manu", overrides: {}, done: {}, voice: "", rate: "0.95" };
let S = load();
function load() {
  try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || "{}")); }
  catch (e) { return Object.assign({}, DEFAULTS); }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

// ---------- datas ----------
const pad = n => String(n).padStart(2, "0");
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const dayNum = s => { const [y, m, d] = s.split("-").map(Number); return Math.round(Date.UTC(y, m - 1, d) / 864e5); };
const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return iso(d); };
// Antes das 5h da manhã ainda conta como "a noite de ontem"
function tonight() { const d = new Date(); if (d.getHours() < 5) d.setDate(d.getDate() - 1); return iso(d); }
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const other = n => (n === "Manu" ? "Elena" : "Manu");

function whoOn(dateStr) {
  if (S.overrides[dateStr]) return S.overrides[dateStr];
  const diff = dayNum(dateStr) - dayNum(S.anchorDate);
  return Math.abs(diff) % 2 === 0 ? S.anchorName : other(S.anchorName);
}

// ---------- histórias ----------
// Uma história para cada dia do ano (29/02 repete a de 28/02)
const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const DIAS_MES = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function idxOf(m, d) { let i = 0; for (let k = 0; k < m - 1; k++) i += DIAS_MES[k]; return i + Math.min(d, DIAS_MES[m - 1]) - 1; }
function dateOfIdx(i) { let m = 0; while (i >= DIAS_MES[m]) { i -= DIAS_MES[m]; m++; } return { m: m + 1, d: i + 1 }; }
function todayStoryIdx() { const [, m, d] = tonight().split("-").map(Number); return idxOf(m, d) % STORIES.length; }
const emo = s => s.e || (s.em || "📖").split("|")[0];

// ---------- ilustração de cada história (desenho em SVG) ----------
const CENAS = {
  luz: ["#fff3c4", "#ffb86b", "#ffd98a", "raios"], ceu: ["#8fd3ff", "#e3f6ff", "#9be07a", "sol"],
  noite: ["#141036", "#3b2f86", "#2a2160", "lua"], mar: ["#8fd3ff", "#e3f6ff", "#2f7fd1", "mar"],
  deserto: ["#ffd9a0", "#fff1d6", "#f0b765", "sol"], acampamento: ["#ffd9a0", "#fff1d6", "#f0b765", "sol"],
  jardim: ["#a8e6ff", "#effaff", "#6ccf6a", "flores"], campo: ["#9edcff", "#eefaff", "#7ccf5a", "sol"],
  cidade: ["#ffcfa8", "#fff0e0", "#d9b48a", "predios"], chuva: ["#7d8aa3", "#b9c3d6", "#5b8f6a", "chuva"],
  montanha: ["#9fd0ff", "#eaf5ff", "#7aa36a", "montes"], casa: ["#f6dfbf", "#fff4e4", "#c8935f", "janela"],
  rio: ["#9fd8ff", "#eefaff", "#6cc46a", "rio"], palacio: ["#7b5cc9", "#c9b6ff", "#5a3e9e", "colunas"],
  prisao: ["#3a3a4a", "#5d5d70", "#2d2d38", "grades"], templo: ["#ffdca8", "#fff3dd", "#d8b07a", "colunas"]
};
function ilustracao(s, id) {
  const c = CENAS[s.sc] || CENAS.ceu, em = (s.em || emo(s)).split("|");
  let deco = "";
  if (c[3] === "sol") deco = `<circle cx="270" cy="38" r="20" fill="#ffd34d"/>`;
  if (c[3] === "lua") { deco = `<circle cx="265" cy="36" r="16" fill="#ffe08a"/><circle cx="272" cy="31" r="14" fill="${c[0]}"/>`; for (let i = 0; i < 18; i++) deco += `<circle cx="${(i * 53) % 320}" cy="${(i * 37) % 90 + 6}" r="${i % 3 ? 1.2 : 2}" fill="#fff" opacity=".8"/>`; }
  if (c[3] === "raios") for (let i = 0; i < 12; i++) deco += `<rect x="158" y="-40" width="6" height="140" fill="#fff" opacity=".35" transform="rotate(${i * 30} 160 70)"/>`;
  if (c[3] === "chuva") for (let i = 0; i < 26; i++) deco += `<line x1="${(i * 29) % 320}" y1="${(i * 17) % 80}" x2="${(i * 29) % 320 - 6}" y2="${(i * 17) % 80 + 14}" stroke="#dfe8ff" stroke-width="2" opacity=".7"/>`;
  if (c[3] === "predios") deco = [20, 70, 230, 280].map((x, i) => `<rect x="${x}" y="${70 - i % 2 * 18}" width="38" height="80" rx="4" fill="#e9c79e"/>`).join("");
  if (c[3] === "montes") deco = `<path d="M0 140 L70 60 L140 140 Z" fill="#8bb58a"/><path d="M110 140 L210 40 L310 140 Z" fill="#9cc79a"/><path d="M190 58 L210 40 L230 58 Z" fill="#fff"/>`;
  if (c[3] === "janela") deco = `<rect x="226" y="24" width="70" height="56" rx="6" fill="#bfe6ff" stroke="#fff" stroke-width="5"/><line x1="261" y1="24" x2="261" y2="80" stroke="#fff" stroke-width="4"/>`;
  if (c[3] === "colunas") deco = [30, 80, 230, 280].map(x => `<rect x="${x - 8}" y="20" width="16" height="125" rx="3" fill="#fff" opacity=".45"/>`).join("");
  if (c[3] === "grades") deco = Array.from({ length: 9 }, (_, i) => `<rect x="${i * 38 + 8}" y="0" width="6" height="180" fill="#20202a" opacity=".55"/>`).join("");
  let chao = `<path d="M0 135 Q80 118 160 132 T320 128 V180 H0 Z" fill="${c[2]}"/>`;
  if (c[3] === "mar") chao = `<path d="M0 120 Q40 110 80 120 T160 120 T240 120 T320 120 V180 H0 Z" fill="#3a8fe0"/><path d="M0 140 Q40 130 80 140 T160 140 T240 140 T320 140 V180 H0 Z" fill="${c[2]}"/>`;
  if (c[3] === "rio") chao += `<path d="M120 180 Q150 150 140 132 L180 132 Q200 150 210 180 Z" fill="#4aa8f0"/>`;
  if (c[3] === "flores") { deco = `<circle cx="270" cy="38" r="20" fill="#ffd34d"/>`; chao += [30, 70, 250, 290].map((x, i) => `<circle cx="${x}" cy="${150 + i % 2 * 10}" r="5" fill="${["#ff6fae", "#ffd34d", "#fff", "#b388ff"][i]}"/>`).join(""); }
  const t = (e, x, y, sz, cls) => e ? `<text x="${x}" y="${y}" font-size="${sz}" text-anchor="middle" class="${cls}">${e}</text>` : "";
  return `<svg viewBox="0 0 320 180" role="img" aria-label="Ilustração: ${esc(s.t)}" class="ill-svg"><defs><linearGradient id="g${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs><rect width="320" height="180" fill="url(#g${id})"/>${deco}${chao}${t(em[1], 62, 150, 46, "b2")}${t(em[2], 258, 150, 46, "b3")}${t(em[0], 160, 128, 86, "b1")}</svg>`;
}
(function () {
  const st = document.createElement("style");
  st.textContent = `.ill{border-radius:20px;overflow:hidden;margin:4px 0 14px;box-shadow:0 6px 18px #0004;line-height:0}
  .ill-svg{width:100%;height:auto;display:block}.ill-svg text{dominant-baseline:auto}
  .ill-svg .b1{animation:bob 3s ease-in-out infinite}.ill-svg .b2{animation:bob 3.6s ease-in-out infinite .4s}.ill-svg .b3{animation:bob 3.3s ease-in-out infinite .8s}
  @keyframes bob{50%{transform:translateY(-4px)}}
  .mes{background:#ffffff0d;border-radius:14px;margin-bottom:8px;padding:4px 10px}.mes summary{font-family:"Baloo 2";font-size:18px;padding:8px 2px;cursor:pointer;color:var(--gold)}
  .li .dt{font-size:12px;color:var(--gold);font-weight:700;min-width:38px}
  .hs-ill{margin:0 0 12px}`;
  document.head.appendChild(st);
})();
let curStory = 0;
function openStory(i) { curStory = i; renderStory(); show("historia"); window.scrollTo(0, 0); }
function stepStory(d) { stopSpeak(); curStory = (curStory + d + STORIES.length) % STORIES.length; renderStory(); window.scrollTo(0, 0); }
function renderStory() {
  const s = STORIES[curStory];
  $("s-em").textContent = emo(s); $("s-t").textContent = s.t; $("s-ref").textContent = s.ref;
  let il = $("s-ill"); if (!il) { il = document.createElement("div"); il.id = "s-ill"; il.className = "ill"; $("s-txt").parentNode.insertBefore(il, $("s-txt")); }
  il.innerHTML = ilustracao(s, "s");
  $("s-txt").innerHTML = s.txt.split("\n").map(p => `<p>${esc(p)}</p>`).join("");
  $("s-lic").textContent = s.lic; $("s-q").textContent = s.q; $("s-ora").textContent = s.ora;
  const dt = dateOfIdx(curStory);
  $("st-pos").textContent = `${dt.d} de ${MESES[dt.m - 1]}` + (curStory === todayStoryIdx() ? " · hoje" : "");
}
function renderList() {
  const hoje = dateOfIdx(todayStoryIdx()).m; let h = "", i = 0;
  MESES.forEach((nome, m) => {
    let itens = "";
    for (let d = 1; d <= DIAS_MES[m]; d++, i++) { const s = STORIES[i]; if (!s) break; itens += `<button class="li" onclick="openStory(${i})"><span class="dt">${d}/${m + 1}</span><span class="em">${emo(s)}</span><span><b>${esc(s.t)}</b><small>${esc(s.ref)}</small></span></button>`; }
    h += `<details class="mes" ${m + 1 === hoje ? "open" : ""}><summary>${cap(nome)}</summary><div class="list">${itens}</div></details>`;
  });
  $("s-list").innerHTML = h;
}
function openVideo() {
  const q = "história bíblica infantil " + STORIES[curStory].t;
  window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent(q), "_blank", "noopener");
  markStep("ler");
}

// ---------- áudio (voz do celular) ----------
let speaking = false;
function voices() { return (window.speechSynthesis ? speechSynthesis.getVoices() : []).filter(v => /^pt/i.test(v.lang)); }
function pickVoice() {
  const vs = voices();
  return vs.find(v => v.voiceURI === S.voice) || vs.find(v => /pt-BR/i.test(v.lang)) || vs[0] || null;
}
function speakText(text, btn) {
  if (!window.speechSynthesis) { toast("Este celular não tem leitura em voz"); return; }
  stopSpeak();
  const parts = text.match(/[^.!?…]+[.!?…"”]{0,3}\s{0,9}/g) || [text];
  const v = pickVoice();
  parts.forEach((p, i) => {
    const u = new SpeechSynthesisUtterance(p.trim());
    u.lang = "pt-BR"; if (v) u.voice = v; u.rate = parseFloat(S.rate) || 0.95; u.pitch = 1.05;
    if (i === parts.length - 1) u.onend = () => { speaking = false; setPlaying(false); };
    speechSynthesis.speak(u);
  });
  speaking = true; setPlaying(true, btn);
}
function setPlaying(on, btn) {
  const b = $("btn-ouvir");
  b.classList.toggle("playing", on && btn === b);
  b.textContent = on && btn === b ? "⏹ Parar" : "🔊 Ouvir";
}
function stopSpeak() { if (window.speechSynthesis) speechSynthesis.cancel(); speaking = false; setPlaying(false); }
function toggleSpeak() {
  if (speaking) return stopSpeak();
  const s = STORIES[curStory];
  speakText(`${s.t}. ${s.txt.replace(/\n/g, " ")} O que aprendemos: ${s.lic} Vamos conversar: ${s.q}`, $("btn-ouvir"));
  markStep("ler");
}
function speakPrayer() { speakText(STORIES[curStory].ora, null); }
function fillVoices() {
  const vs = voices(), sel = $("aj-voz");
  sel.innerHTML = vs.length ? vs.map(v => `<option value="${esc(v.voiceURI)}">${esc(v.name)} (${v.lang})</option>`).join("") : "<option value=''>Voz padrão</option>";
  const v = pickVoice(); if (v) sel.value = v.voiceURI;
}
if (window.speechSynthesis) speechSynthesis.onvoiceschanged = fillVoices;

// ---------- rotina ----------
const STEPS = [
  { k: "ler", ic: "📖", t: "Ler ou ouvir a história", d: "Toque para abrir a história de hoje" },
  { k: "conversar", ic: "💬", t: "Conversar", d: "Responder a pergunta juntas" },
  { k: "orar", ic: "🙏", t: "Orar juntos", d: "Agradecer e pedir proteção" },
  { k: "beijo", ic: "😘", t: "Beijo de boa noite", d: "E um abraço bem apertado" }
];
function markStep(k, toggle) {
  const t = tonight(); S.done[t] = S.done[t] || {};
  S.done[t][k] = toggle ? !S.done[t][k] : true; save(); renderHoje();
}
function stepClick(k) {
  if (k === "ler" && !(S.done[tonight()] || {}).ler) { openStory(todayStoryIdx()); return; }
  markStep(k, true);
}
const complete = d => d && STEPS.every(s => d[s.k]);
function stars(name) { return Object.keys(S.done).filter(d => complete(S.done[d]) && whoOn(d) === name).length; }

function renderHoje() {
  const t = tonight(), who = whoOn(t);
  $("hoje-data").textContent = cap(parse(t).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }));
  $("hero").className = "hero " + who.toLowerCase();
  $("hero-name").textContent = who;
  $("hero-sub").textContent = `e a ${other(who)} dorme com a mamãe 💕`;
  $("amanha").textContent = whoOn(addDays(t, 1));
  $("st-manu").textContent = "⭐ " + stars("Manu"); $("st-elena").textContent = "⭐ " + stars("Elena");
  const d = S.done[t] || {};
  $("steps").innerHTML = STEPS.map(s =>
    `<button class="step ${d[s.k] ? "done" : ""}" onclick="stepClick('${s.k}')"><span class="ic">${s.ic}</span><span class="tx"><b>${s.t}</b><span>${s.d}</span></span><span class="ck">${d[s.k] ? "✓" : ""}</span></button>`).join("");
  $("celebrate").style.display = complete(d) ? "block" : "none";
  const st = STORIES[todayStoryIdx()];
  $("hs-em").textContent = emo(st); $("hs-t").textContent = st.t;
  let hi = $("hs-ill"); if (!hi) { hi = document.createElement("div"); hi.id = "hs-ill"; hi.className = "ill hs-ill"; const card = $("hs-t").closest(".card"); card.insertBefore(hi, card.firstChild); }
  hi.innerHTML = ilustracao(st, "h");
}

// ---------- calendário ----------
let calY, calM, editDate = null;
function moveMonth(d) { calM += d; if (calM < 0) { calM = 11; calY--; } if (calM > 11) { calM = 0; calY++; } renderCal(); }
function renderCal() {
  const first = new Date(calY, calM, 1), days = new Date(calY, calM + 1, 0).getDate();
  $("cal-title").textContent = cap(first.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }));
  const t = tonight();
  let h = ["D", "S", "T", "Q", "Q", "S", "S"].map(d => `<div class="dow">${d}</div>`).join("");
  for (let i = 0; i < first.getDay(); i++) h += `<div class="day out"></div>`;
  for (let d = 1; d <= days; d++) {
    const ds = `${calY}-${pad(calM + 1)}-${pad(d)}`, w = whoOn(ds);
    const cls = ["day", w.toLowerCase(), ds === t ? "today" : "", S.overrides[ds] ? "ov" : ""].join(" ");
    h += `<button class="${cls}" onclick="editDay('${ds}')"><span class="n">${d}</span><span class="w">${w}</span>${complete(S.done[ds]) ? '<span class="st">⭐</span>' : ""}</button>`;
  }
  $("cal-grid").innerHTML = h;
}
function editDay(ds) {
  editDate = ds;
  $("m-title").textContent = parse(ds).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  $("m-day").classList.add("on");
}
function closeModal() { $("m-day").classList.remove("on"); }
function setDay(name) {
  if (!editDate) return;
  delete S.overrides[editDate];
  if (name && name !== whoOn(editDate)) S.overrides[editDate] = name;
  save(); closeModal(); renderCal(); renderHoje(); toast("Calendário atualizado");
}

// ---------- ajustes ----------
function fillAjustes() { $("aj-data").value = S.anchorDate; $("aj-nome").value = S.anchorName; $("aj-vel").value = S.rate; fillVoices(); }
function saveRule() {
  const d = $("aj-data").value; if (!d) return toast("Escolha uma data");
  S.anchorDate = d; S.anchorName = $("aj-nome").value; save(); renderAll(); toast("Revezamento salvo");
}
function clearOverrides() { S.overrides = {}; save(); renderAll(); toast("Trocas apagadas"); }

// ---------- compartilhar com a mamãe ----------
function shareLink() {
  const payload = btoa(JSON.stringify({ a: S.anchorDate, n: S.anchorName, o: S.overrides })).replace(/=+$/, "");
  return location.origin + location.pathname + "#cal=" + payload;
}
async function share() {
  const url = shareLink(), text = "Calendário da hora de dormir da Manu e da Elena 🌙";
  try {
    if (navigator.share) { await navigator.share({ title: "Hora de Dormir", text, url }); return; }
  } catch (e) { if (e && e.name === "AbortError") return; }
  try { await navigator.clipboard.writeText(url); toast("Link copiado! Cole no WhatsApp"); }
  catch (e) { prompt("Copie o link:", url); }
}
let pending = null;
function checkImport() {
  const m = location.hash.match(/#cal=([A-Za-z0-9+/]+)/);
  if (!m) return;
  try { pending = JSON.parse(atob(m[1])); $("m-import").classList.add("on"); } catch (e) {}
}
function doImport() {
  if (pending && /^\d{4}-\d{2}-\d{2}$/.test(pending.a) && ["Manu", "Elena"].includes(pending.n)) {
    S.anchorDate = pending.a; S.anchorName = pending.n;
    S.overrides = {};
    Object.entries(pending.o || {}).forEach(([k, v]) => { if (/^\d{4}-\d{2}-\d{2}$/.test(k) && ["Manu", "Elena"].includes(v)) S.overrides[k] = v; });
    save(); renderAll(); toast("Calendário atualizado 💕");
  }
  cancelImport();
}
function cancelImport() { pending = null; $("m-import").classList.remove("on"); history.replaceState(null, "", location.pathname); }

// ---------- navegação e utilidades ----------
function $(id) { return document.getElementById(id); }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
let tT; function toast(m) { const t = $("toast"); t.textContent = m; t.style.display = "block"; clearTimeout(tT); tT = setTimeout(() => t.style.display = "none", 2200); }
function show(v) {
  document.querySelectorAll(".view").forEach(e => e.classList.toggle("on", e.id === "v-" + v));
  document.querySelectorAll(".tabs button").forEach(b => b.classList.toggle("on", b.dataset.v === v));
  if (v !== "historia") stopSpeak();
  if (v === "cal") renderCal();
  if (v === "aj") fillAjustes();
}
document.querySelectorAll(".tabs button").forEach(b => b.onclick = () => { if (b.dataset.v === "historia") renderStory(); show(b.dataset.v); window.scrollTo(0, 0); });
$("aj-voz").onchange = e => { S.voice = e.target.value; save(); };
$("aj-vel").onchange = e => { S.rate = e.target.value; save(); };

let deferredInstall = null;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredInstall = e; $("btn-install").style.display = "flex"; });
$("btn-install").onclick = async () => { if (!deferredInstall) return; deferredInstall.prompt(); deferredInstall = null; $("btn-install").style.display = "none"; };

function renderAll() { renderHoje(); renderCal(); }
(function init() {
  const st = $("stars");
  for (let i = 0; i < 40; i++) { const s = document.createElement("i"); s.style.left = Math.random() * 100 + "%"; s.style.top = Math.random() * 100 + "%"; s.style.animationDelay = Math.random() * 3 + "s"; st.appendChild(s); }
  const t = parse(tonight()); calY = t.getFullYear(); calM = t.getMonth();
  curStory = todayStoryIdx();
  renderList(); renderStory(); renderAll(); checkImport();
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
