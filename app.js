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
const STORY_START = "2026-11-10";
function todayStoryIdx() {
  const n = STORIES.length;
  return (((dayNum(tonight()) - dayNum(STORY_START)) % n) + n) % n;
}
let curStory = 0;
function openStory(i) { curStory = i; renderStory(); show("historia"); window.scrollTo(0, 0); }
function stepStory(d) { stopSpeak(); curStory = (curStory + d + STORIES.length) % STORIES.length; renderStory(); window.scrollTo(0, 0); }
function renderStory() {
  const s = STORIES[curStory];
  $("s-em").textContent = s.e; $("s-t").textContent = s.t; $("s-ref").textContent = s.ref;
  $("s-txt").innerHTML = s.txt.split("\n").map(p => `<p>${esc(p)}</p>`).join("");
  $("s-lic").textContent = s.lic; $("s-q").textContent = s.q; $("s-ora").textContent = s.ora;
  $("st-pos").textContent = `${curStory + 1} de ${STORIES.length}` + (curStory === todayStoryIdx() ? " · de hoje" : "");
}
function renderList() {
  $("s-list").innerHTML = STORIES.map((s, i) =>
    `<button class="li" onclick="openStory(${i})"><span class="em">${s.e}</span><span><b>${esc(s.t)}</b><small>${esc(s.ref)}</small></span></button>`).join("");
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
  $("hs-em").textContent = st.e; $("hs-t").textContent = st.t;
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
