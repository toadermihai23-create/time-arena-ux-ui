import { missions } from "./data/missions.js";
import { penalties, banRedemption, reentryQuest, systemBreach } from "./data/penalties.js";
import { shopTickets } from "./data/shop.js";
import { rulesText } from "./data/rules.js";

/**
 * Minimal state (localStorage)
 * - minutesMax, minutesEarned, xp, level, streak
 * - todayKey for daily streak update
 * - history array
 * - activeBan { level, name, endsAtMs }
 */

const LS_KEY = "timearena_uxui_state_v1";

const defaultState = {
  userName: "Nikita",
  minutesMax: 120,
  minutesEarned: 0,
  xp: 0,
  level: 1,
  streak: 0,
  lastSeenDayKey: "",
  history: [],
  activeBan: null, // { level, name, endsAtMs }
  theme: "dark",
};

function dayKey(d = new Date()){
  // local date signature
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const dd = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${dd}`;
}

function loadState(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);
    return { ...structuredClone(defaultState), ...parsed };
  }catch(e){
    return structuredClone(defaultState);
  }
}

function saveState(){
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

function addHistory(type, title, details = ""){
  state.history.unshift({
    at: Date.now(),
    type,
    title,
    details,
  });
  // keep minimal
  state.history = state.history.slice(0, 60);
  saveState();
}

function calcLevelFromXp(xp){
  // simple curve: 0-99 => Lv1, 100-249 => Lv2, 250-449 => Lv3, ...
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 450) return 3;
  if (xp < 700) return 4;
  if (xp < 1000) return 5;
  return 6;
}

function formatHMS(ms){
  const s = Math.max(0, Math.floor(ms/1000));
  const hh = String(Math.floor(s/3600)).padStart(2,"0");
  const mm = String(Math.floor((s%3600)/60)).padStart(2,"0");
  const ss = String(s%60).padStart(2,"0");
  return `${hh}:${mm}:${ss}`;
}

const state = loadState();

/** Daily streak logic (minimal):
 * if new day -> streak +1 (since they opened the app).
 * Later we can change to streak based on missions.
 */
(function initDaily(){
  const today = dayKey();
  if(state.lastSeenDayKey !== today){
    // if yesterday was lastSeen -> keep streak+1, else reset to 1
    if(state.lastSeenDayKey){
      const last = new Date(state.lastSeenDayKey + "T00:00:00");
      const now = new Date(today + "T00:00:00");
      const diffDays = Math.round((now - last) / (24*3600*1000));
      if(diffDays === 1) state.streak = Math.max(0, state.streak) + 1;
      else state.streak = 1;
    } else {
      state.streak = 1;
    }
    state.lastSeenDayKey = today;
    addHistory("system", "New Day 🌅", `Streak: ${state.streak}`);
    saveState();
  }
})();

/** Theme init */
document.documentElement.dataset.theme = state.theme || "dark";

const viewRoot = document.getElementById("viewRoot");

const statMax = document.getElementById("statMax");
const statEarned = document.getElementById("statEarned");
const statXp = document.getElementById("statXp");
const statLevel = document.getElementById("statLevel");
const statStreak = document.getElementById("statStreak");

const dailyGreeting = document.getElementById("dailyGreeting");
const dailyMessage = document.getElementById("dailyMessage");

const penaltyStrip = document.getElementById("penaltyStrip");
const penaltyTitle = document.getElementById("penaltyTitle");
const penaltyCountdown = document.getElementById("penaltyCountdown");

document.getElementById("toggleThemeBtn").addEventListener("click", () => {
  state.theme = (state.theme === "dark") ? "light" : "dark";
  document.documentElement.dataset.theme = state.theme;
  saveState();
});

document.getElementById("openPenaltiesBtn").addEventListener("click", () => {
  navigate("penalties");
});

function renderTop(){
  dailyGreeting.textContent = `Salut, ${state.userName}! 👋`;

  const messages = [
    "Bun venit în arenă. Azi facem progres! ⚔️",
    "Questurile de azi te așteaptă. Hai! 🚀",
    "Câștigăm timp curat, nu negociem! 🛡️",
    "Streak-ul e foc. Ține-l aprins! 🔥",
    "Un pas mic azi = Level up mâine! 🆙",
  ];
  // deterministic-ish daily message
  const idx = (new Date().getDate() + state.streak) % messages.length;
  dailyMessage.textContent = messages[idx];

  statMax.textContent = String(state.minutesMax);
  statEarned.textContent = String(state.minutesEarned);
  statXp.textContent = String(state.xp);
  state.level = calcLevelFromXp(state.xp);
  statLevel.textContent = String(state.level);
  statStreak.textContent = String(state.streak);
}

function isBanActive(){
  if(!state.activeBan) return false;
  return Date.now() < state.activeBan.endsAtMs;
}

function clearBanIfExpired(){
  if(state.activeBan && Date.now() >= state.activeBan.endsAtMs){
    addHistory("ban", "Ban expirat ✅", state.activeBan.name);
    state.activeBan = null;
    saveState();
  }
}

function renderPenaltyStrip(){
  clearBanIfExpired();

  if(isBanActive()){
    penaltyStrip.classList.remove("hidden");
    penaltyTitle.textContent = state.activeBan.name;
    const left = state.activeBan.endsAtMs - Date.now();
    penaltyCountdown.textContent = `Reactivare în: ${formatHMS(left)}`;
  } else {
    penaltyStrip.classList.add("hidden");
  }
}

setInterval(() => {
  renderPenaltyStrip();
}, 1000);

/** Actions */
function applyMissionReward(m){
  if(isBanActive()){
    addHistory("blocked", "Reward blocat (BAN) 🔴", m.title);
    alert("⚠️ Există un BAN activ. Nu se pot câștiga bonusuri acum.");
    return;
  }

  // reward parsing minimal:
  // +X min OR +X XP
  const r = m.reward;
  if(r.includes("min")){
    const n = parseInt(r.replace(/[^0-9]/g,""), 10) || 0;
    state.minutesEarned = Math.min(state.minutesMax, state.minutesEarned + n);
  }
  if(r.toUpperCase().includes("XP")){
    const n = parseInt(r.replace(/[^0-9]/g,""), 10) || 0;
    state.xp += n;
  } else {
    // implicit XP for completed mission
    state.xp += 10;
  }

  state.level = calcLevelFromXp(state.xp);
  addHistory("mission", `✅ ${m.title}`, `Reward: ${m.reward}`);
  saveState();
  renderTop();
}

function applyPenaltyByName(pName){
  // find penalty by level name match
  const p = penalties.find(x => x.name === pName) || penalties.find(x => pName.includes(x.name.split(" ")[0]));
  if(!p){
    alert("Penalty not found.");
    return;
  }

  // durations -> seconds
  const duration = p.durationSeconds;
  if(duration > 0){
    state.activeBan = {
      level: p.level,
      name: p.name,
      endsAtMs: Date.now() + duration*1000,
    };
  }

  // quick effects (minimal)
  if(p.level >= 2){
    state.minutesEarned = Math.max(0, state.minutesEarned - 20);
  } else if(p.level === 1){
    state.minutesEarned = Math.max(0, state.minutesEarned - 10);
  }

  addHistory("penalty", `⚠️ ${p.name}`, p.desc);
  saveState();
  renderTop();
  renderPenaltyStrip();
}

function resetToday(){
  state.minutesEarned = 0;
  addHistory("system", "Reset zi (test) 🔄", "Minute câștigate = 0");
  saveState();
  renderTop();
}

/** Navigation */
const navButtons = Array.from(document.querySelectorAll(".navbtn"));
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navigate(btn.dataset.view);
  });
});

function setActiveNav(view){
  navButtons.forEach(b => b.classList.toggle("active", b.dataset.view === view));
}

function navigate(view){
  setActiveNav(view);
  renderTop();
  renderPenaltyStrip();

  if(view === "dashboard") renderDashboard();
  if(view === "missions") renderMissions();
  if(view === "shop") renderShop();
  if(view === "penalties") renderPenalties();
  if(view === "rules") renderRules();
  if(view === "history") renderHistory();
}

function card(html){
  return `<section class="card">${html}</section>`;
}

/** Views */
function renderDashboard(){
  const pct = Math.round((state.minutesEarned / Math.max(1,state.minutesMax))*100);

  viewRoot.innerHTML = `
    ${card(`
      <h2>My Time Plan 🗺️</h2>
      <p>Ținta de azi: câștigi timp prin questuri. Îl cheltui în Magazin.</p>
      <div class="big-number">${state.minutesEarned} <span style="font-size:14px;color:var(--muted)">min</span></div>
      <div class="sub-number">din max ${state.minutesMax} min • Progres: ${pct}%</div>
      <div class="progressbar"><div style="width:${pct}%"></div></div>
      <div style="display:flex; gap:10px; margin-top:12px;">
        <button class="btn primary" id="playBtn">PLAY ▶</button>
        <button class="btn ghost" id="resetBtn">Reset (test)</button>
      </div>
    `)}

    <div class="row">
      ${card(`
        <h2>Locked Time 🔒</h2>
        <p>Deblochezi minute prin misiuni și obiceiuri.</p>
        <div class="big-number">${Math.max(0, state.minutesMax - state.minutesEarned)} <span style="font-size:14px;color:var(--muted)">min</span></div>
      `)}
      ${card(`
        <h2>Streak & Level 🔥</h2>
        <p>Ține streak-ul aprins și urcă level-ul.</p>
        <div class="big-number">Lv ${state.level}</div>
        <div class="sub-number">Streak: ${state.streak} zile • XP: ${state.xp}</div>
      `)}
    </div>

    ${card(`
      <h2>Quick Actions ⚡</h2>
      <p>Teste rapide (minim funcțional) — ulterior le legăm de reguli/flow.</p>
      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
        <button class="btn" data-ban="Scratch Damage 🟡">Scratch Damage 🟡</button>
        <button class="btn" data-ban="Penalty Zone 🟠">Penalty Zone 🟠</button>
        <button class="btn" data-ban="Daily Ban 🔴">Daily Ban 🔴</button>
      </div>
    `)}
  `;

  document.getElementById("playBtn").addEventListener("click", () => {
    alert("▶ PLAY: În v1, Play doar
