/* =========================================================
   GAMECHECK V4 — MADE BY AUK
   Sound + Cinematic VS Battle
   ========================================================= */

const $ = id => document.getElementById(id);
const safeOn = (id, event, handler) => {
  const el = $(id);
  if (el) el.addEventListener(event, handler);
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/* =========================================================
   SOUND ENGINE
   ========================================================= */

let audioCtx = null;
let soundEnabled = localStorage.getItem("gamecheckSound") !== "off";

function initAudio() {
  if (!soundEnabled) return;

  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  } catch (e) {
    console.warn("Audio unavailable");
  }
}

function tone({
  frequency = 440,
  duration = 0.12,
  type = "sine",
  volume = 0.06,
  slideTo = null
}) {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  if (slideTo) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(20, slideTo),
      audioCtx.currentTime + duration
    );
  }

  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    volume,
    audioCtx.currentTime + 0.01
  );
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioCtx.currentTime + duration
  );

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration + 0.02);
}

function noise(duration = 0.18, volume = 0.08) {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const buffer = audioCtx.createBuffer(
    1,
    audioCtx.sampleRate * duration,
    audioCtx.sampleRate
  );

  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = audioCtx.createBufferSource();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();

  filter.type = "lowpass";
  filter.frequency.value = 1200;

  gain.gain.setValueAtTime(volume, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioCtx.currentTime + duration
  );

  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  source.start();
}

function sfx(name) {
  if (!soundEnabled) return;

  switch (name) {

    case "count":
      tone({
        frequency: 520,
        duration: 0.12,
        type: "square",
        volume: 0.055
      });
      break;

    case "go":
      tone({
        frequency: 350,
        duration: 0.18,
        type: "sawtooth",
        volume: 0.06,
        slideTo: 850
      });
      break;

    case "sword":
      noise(0.16, 0.045);
      tone({
        frequency: 700,
        duration: 0.12,
        type: "sawtooth",
        volume: 0.04,
        slideTo: 120
      });
      break;

    case "gun":
      noise(0.09, 0.075);
      tone({
        frequency: 180,
        duration: 0.09,
        type: "square",
        volume: 0.04,
        slideTo: 70
      });
      break;

    case "build":
      tone({
        frequency: 180,
        duration: 0.12,
        type: "square",
        volume: 0.035
      });

      setTimeout(() => {
        tone({
          frequency: 280,
          duration: 0.1,
          type: "square",
          volume: 0.035
        });
      }, 90);

      break;

    case "rocket":
      tone({
        frequency: 90,
        duration: 0.5,
        type: "sawtooth",
        volume: 0.055,
        slideTo: 420
      });
      break;

    case "hit":
      noise(0.12, 0.09);
      tone({
        frequency: 95,
        duration: 0.16,
        type: "square",
        volume: 0.055,
        slideTo: 45
      });
      break;

    case "boom":
      noise(0.42, 0.13);
      tone({
        frequency: 70,
        duration: 0.4,
        type: "sawtooth",
        volume: 0.08,
        slideTo: 28
      });
      break;

    case "win":
      tone({
        frequency: 440,
        duration: 0.14,
        type: "square",
        volume: 0.05
      });

      setTimeout(() => {
        tone({
          frequency: 660,
          duration: 0.16,
          type: "square",
          volume: 0.05
        });
      }, 130);

      setTimeout(() => {
        tone({
          frequency: 880,
          duration: 0.25,
          type: "square",
          volume: 0.06
        });
      }, 280);

      break;
  }
}

/* Activate audio only after user interaction */
window.addEventListener("pointerdown", initAudio, {
  once: true,
  passive: true
});


/* =========================================================
   SOUND TOGGLE
   ========================================================= */

function createSoundButton() {
  if ($("soundToggle")) return;

  const button = document.createElement("button");

  button.id = "soundToggle";
  button.type = "button";
  button.textContent = soundEnabled ? "🔊" : "🔇";
  button.title = soundEnabled ? "Mute sounds" : "Enable sounds";

  document.body.appendChild(button);

  button.addEventListener("click", () => {
    soundEnabled = !soundEnabled;

    localStorage.setItem(
      "gamecheckSound",
      soundEnabled ? "on" : "off"
    );

    button.textContent = soundEnabled ? "🔊" : "🔇";
    button.title = soundEnabled
      ? "Mute sounds"
      : "Enable sounds";

    if (soundEnabled) {
      initAudio();
      sfx("go");
    }
  });
}

createSoundButton();


/* =========================================================
   VS BATTLE
   ========================================================= */

function getNumber(id) {
  const el = $(id);
  if (!el) return 50;

  const value = parseFloat(el.value);
  return Number.isFinite(value) ? value : 50;
}

function getPlayerStats(player) {
  return {
    gpu: getNumber(`gpu${player}`),
    ram: getNumber(`ram${player}`),
    cpu: getNumber(`cpu${player}`)
  };
}

function setHP(player, value) {
  const number = $(`hpNumber${player}`);
  const bar = $(`hp${player}`);

  value = Math.max(0, Math.round(value));

  if (number) number.textContent = value;

  if (bar) {
    bar.style.width = `${value}%`;

    if (value <= 25) {
      bar.classList.add("critical");
    } else {
      bar.classList.remove("critical");
    }
  }

  if (value <= 25) {
    document.body.classList.add("low-hp");

    setTimeout(() => {
      document.body.classList.remove("low-hp");
    }, 300);
  }
}

function arena() {
  return $("battleArena");
}

function clearBattleEffects() {
  const ar = arena();
  if (!ar) return;

  ar.querySelectorAll(
    ".battle-slash," +
    ".battle-projectile," +
    ".battle-wall," +
    ".battle-flash," +
    ".battle-spark"
  ).forEach(el => el.remove());
}

function flashArena() {
  const ar = arena();
  if (!ar) return;

  const flash = document.createElement("div");
  flash.className = "battle-flash";

  ar.appendChild(flash);

  setTimeout(() => flash.remove(), 350);
}

function screenShake() {
  const ar = arena();
  if (!ar) return;

  ar.classList.remove("arena-shake");

  void ar.offsetWidth;

  ar.classList.add("arena-shake");

  setTimeout(() => {
    ar.classList.remove("arena-shake");
  }, 500);
}

function spawnSparks(side = "center") {
  const ar = arena();
  if (!ar) return;

  for (let i = 0; i < 14; i++) {
    const spark = document.createElement("i");

    spark.className = "battle-spark";

    spark.style.left =
      side === "left"
        ? `${28 + Math.random() * 12}%`
        : side === "right"
          ? `${60 + Math.random() * 12}%`
          : `${45 + Math.random() * 10}%`;

    spark.style.top = `${38 + Math.random() * 24}%`;

    spark.style.setProperty(
      "--x",
      `${(Math.random() - 0.5) * 180}px`
    );

    spark.style.setProperty(
      "--y",
      `${(Math.random() - 0.5) * 150}px`
    );

    ar.appendChild(spark);

    setTimeout(() => spark.remove(), 650);
  }
}

function resetFighters() {
  document
    .querySelectorAll(".fighter-one,.fighter-two")
    .forEach(f => {
      f.classList.remove(
        "fighter-jump-left",
        "fighter-jump-right",
        "fighter-charge",
        "fighter-build",
        "fighter-hit",
        "fighter-winner",
        "fighter-loser"
      );
    });
}

async function countdown() {
  const text = $("countdown");

  if (!text) return;

  for (const number of ["3", "2", "1"]) {
    text.textContent = number;
    text.classList.remove("count-pop");

    void text.offsetWidth;

    text.classList.add("count-pop");

    sfx("count");

    await wait(700);
  }

  text.textContent = "GO!";
  text.classList.remove("count-pop");

  void text.offsetWidth;

  text.classList.add("count-pop");

  sfx("go");

  await wait(650);

  text.textContent = "";
}

function attackAnimation(side, weapon) {
  const ar = arena();

  if (!ar) return;

  const fighter =
    side === 1
      ? document.querySelector(".fighter-one")
      : document.querySelector(".fighter-two");

  if (fighter) {
    fighter.classList.add(
      side === 1
        ? "fighter-jump-left"
        : "fighter-jump-right"
    );

    setTimeout(() => {
      fighter.classList.remove(
        "fighter-jump-left",
        "fighter-jump-right"
      );
    }, 700);
  }

  if (weapon === "sword") {
    const slash = document.createElement("div");

    slash.className =
      side === 1
        ? "battle-slash slash-left"
        : "battle-slash slash-right";

    ar.appendChild(slash);

    sfx("sword");

    setTimeout(() => slash.remove(), 500);
  }

  if (weapon === "gun") {
    if (fighter) {
      fighter.classList.add("fighter-charge");

      setTimeout(() => {
        fighter.classList.remove("fighter-charge");
      }, 500);
    }

    const projectile = document.createElement("div");

    projectile.className =
      side === 1
        ? "battle-projectile projectile-left"
        : "battle-projectile projectile-right";

    ar.appendChild(projectile);

    sfx("gun");

    setTimeout(() => projectile.remove(), 650);
  }

  if (weapon === "rocket") {
    if (fighter) {
      fighter.classList.add("fighter-charge");

      setTimeout(() => {
        fighter.classList.remove("fighter-charge");
      }, 700);
    }

    const projectile = document.createElement("div");

    projectile.className =
      side === 1
        ? "battle-projectile rocket-left"
        : "battle-projectile rocket-right";

    ar.appendChild(projectile);

    sfx("rocket");

    setTimeout(() => projectile.remove(), 850);
  }
}

function spawnBuildWall(side) {
  const ar = arena();
  if (!ar) return;

  const wall = document.createElement("div");

  wall.className =
    side === 1
      ? "battle-wall wall-left"
      : "battle-wall wall-right";

  wall.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  `;

  ar.appendChild(wall);

  sfx("build");

  setTimeout(() => {
    wall.classList.add("wall-break");
  }, 850);

  setTimeout(() => {
    wall.remove();
  }, 1250);
}

async function damagePlayer(player, damage) {
  const current =
    getNumber(`hpNumber${player}`) || 100;

  const next = Math.max(0, current - damage);

  const fighter =
    player === 1
      ? document.querySelector(".fighter-one")
      : document.querySelector(".fighter-two");

  if (fighter) {
    fighter.classList.add("fighter-hit");

    setTimeout(() => {
      fighter.classList.remove("fighter-hit");
    }, 500);
  }

  setHP(player, next);

  sfx("hit");
  flashArena();
  screenShake();
  spawnSparks("center");

  await wait(650);

  return next;
}

async function doRound(round, attacker, stats1, stats2) {
  const roundText = $("roundText");
  const weaponText = $("weapon");

  if (roundText) {
    roundText.textContent = `ROUND ${round}`;
  }

  clearBattleEffects();
  resetFighters();

  let statName;
  let weapon;

  if (round === 1) {
    statName = "GPU";
    weapon = "sword";

    if (weaponText) {
      weaponText.textContent = "⚔ GPU CLASH";
    }
  }

  if (round === 2) {
    statName = "RAM";
    weapon = "gun";

    if (weaponText) {
      weaponText.textContent = "🔫 RAM RAID";
    }

    spawnBuildWall(attacker);
    await wait(450);
  }

  if (round === 3) {
    statName = "CPU";
    weapon = "rocket";

    if (weaponText) {
      weaponText.textContent = "🚀 CPU OVERDRIVE";
    }
  }

  const value1 = stats1[statName.toLowerCase()];
  const value2 = stats2[statName.toLowerCase()];

  const winner =
    value1 === value2
      ? Math.random() > 0.5 ? 1 : 2
      : value1 > value2
        ? 1
        : 2;

  const loser = winner === 1 ? 2 : 1;

  attackAnimation(winner, weapon);

  await wait(
    weapon === "rocket"
      ? 850
      : 650
  );

  let damage;

  if (round === 1) damage = 30;
  if (round === 2) damage = 35;
  if (round === 3) damage = 40;

  await damagePlayer(loser, damage);

  if (round === 3) {
    await wait(200);

    sfx("boom");
    flashArena();
    screenShake();
    spawnSparks("center");
  }

  await wait(600);

  return winner;
}

async function finishBattle(winner) {
  const result = $("battleResult");

  const fighterWinner =
    winner === 1
      ? document.querySelector(".fighter-one")
      : document.querySelector(".fighter-two");

  const fighterLoser =
    winner === 1
      ? document.querySelector(".fighter-two")
      : document.querySelector(".fighter-one");

  if (fighterWinner) {
    fighterWinner.classList.add("fighter-winner");
  }

  if (fighterLoser) {
    fighterLoser.classList.add("fighter-loser");
  }

  sfx("win");

  if (result) {
    const winnerName =
      winner === 1
        ? ($("fighterName1")?.textContent || "PLAYER 1")
        : ($("fighterName2")?.textContent || "PLAYER 2");

    result.innerHTML = `
      <div class="victory-title">🏆 VICTORY</div>
      <strong>${winnerName}</strong>
      <span>DOMINATED THE BATTLE</span>
    `;

    result.classList.add("show");
  }
}

async function startBattle() {
  const p1Name =
    $("player1")?.value.trim() || "PLAYER 1";

  const p2Name =
    $("player2")?.value.trim() || "PLAYER 2";

  const startButton = $("startBattle");

  if (startButton) {
    startButton.disabled = true;
    startButton.textContent = "⚡ BATTLE RUNNING...";
  }

  const result = $("battleResult");

  if (result) {
    result.classList.remove("show");
    result.innerHTML = "";
  }

  const name1 = $("fighterName1");
  const name2 = $("fighterName2");
  const hpName1 = $("hpName1");
  const hpName2 = $("hpName2");

  if (name1) name1.textContent = p1Name;
  if (name2) name2.textContent = p2Name;

  if (hpName1) hpName1.textContent = p1Name;
  if (hpName2) hpName2.textContent = p2Name;

  setHP(1, 100);
  setHP(2, 100);

  resetFighters();
  clearBattleEffects();

  const stats1 = getPlayerStats(1);
  const stats2 = getPlayerStats(2);

  await countdown();

  const roundWinners = [];

  for (let round = 1; round <= 3; round++) {

    const winner = await doRound(
      round,
      round === 1
        ? stats1.gpu >= stats2.gpu ? 1 : 2
        : round === 2
          ? stats1.ram >= stats2.ram ? 1 : 2
          : stats1.cpu >= stats2.cpu ? 1 : 2,
      stats1,
      stats2
    );

    roundWinners.push(winner);

    await wait(500);
  }

  const wins1 =
    roundWinners.filter(x => x === 1).length;

  const wins2 =
    roundWinners.filter(x => x === 2).length;

  const finalWinner = wins1 >= wins2 ? 1 : 2;

  await finishBattle(finalWinner);

  if (startButton) {
    startButton.disabled = false;
    startButton.textContent = "⚔ START BATTLE";
  }
}

safeOn("startBattle", "click", () => {
  initAudio();
  startBattle();
});


/* =========================================================
   THEME SYSTEM
   ========================================================= */

function applyTheme(theme) {
  document.body.dataset.theme = theme;

  localStorage.setItem(
    "gamecheckTheme",
    theme
  );
}

const savedTheme =
  localStorage.getItem("gamecheckTheme") || "cyber";

applyTheme(savedTheme);

document.querySelectorAll("[data-theme]").forEach(button => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.theme);

    const modal = $("themeModal");

    if (modal) {
      modal.classList.remove("show");
    }
  });
});


/* =========================================================
   LOGIN DEMO
   ========================================================= */

safeOn("loginBtn", "click", () => {
  const modal = $("loginModal");

  if (modal) {
    modal.classList.add("show");
  }
});

safeOn("loginSubmit", "click", () => {
  const name = $("loginName")?.value.trim();

  if (!name) return;

  localStorage.setItem(
    "gamecheckUser",
    name
  );

  const modal = $("loginModal");

  if (modal) {
    modal.classList.remove("show");
  }

  const loginButton = $("loginBtn");

  if (loginButton) {
    loginButton.textContent = `👤 ${name}`;
  }
});


/* =========================================================
   MODALS
   ========================================================= */

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
});


/* =========================================================
   MOBILE MENU
   ========================================================= */

safeOn("menuBtn", "click", () => {
  const nav = document.querySelector(".nav-links");

  if (nav) {
    nav.classList.toggle("mobile-open");
  }
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document
      .querySelector(".nav-links")
      ?.classList.remove("mobile-open");
  });
});


/* =========================================================
   LOADER
   ========================================================= */

function hideLoader() {
  const loader = $("loader");

  if (!loader) return;

  loader.classList.add("loaded");

  setTimeout(() => {
    loader.remove();
  }, 700);
}

if (document.readyState === "complete") {
  setTimeout(hideLoader, 700);
} else {
  window.addEventListener(
    "load",
    () => setTimeout(hideLoader, 700),
    { once: true }
  );
}

setTimeout(hideLoader, 5000);


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12
        }
      )
    : null;

if (revealObserver) {
  document
    .querySelectorAll(
      ".section,.game-card,.feature-card,.leaderboard-card"
    )
    .forEach(el => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
}


/* =========================================================
   DEVICE DETECTION
   ========================================================= */

const touchDevice =
  window.matchMedia("(hover: none)").matches ||
  navigator.maxTouchPoints > 0;

document.body.classList.add(
  touchDevice
    ? "touch-device"
    : "desktop-device"
);


/* =========================================================
   FRIENDS
   ========================================================= */

function loadFriends() {
  const list = $("friendList");
  if (!list) return;

  let friends = [];

  try {
    friends =
      JSON.parse(
        localStorage.getItem("gamecheckFriends")
      ) || [];
  } catch {
    friends = [];
  }

  list.innerHTML = "";

  friends.forEach(friend => {
    const item = document.createElement("div");

    item.className = "friend-item";

    item.innerHTML = `
      <span class="friend-dot"></span>
      <strong>${friend}</strong>
      <small>ONLINE</small>
    `;

    list.appendChild(item);
  });
}

safeOn("addFriend", "click", () => {
  const name = prompt("Enter friend's username:");

  if (!name?.trim()) return;

  let friends = [];

  try {
    friends =
      JSON.parse(
        localStorage.getItem("gamecheckFriends")
      ) || [];
  } catch {
    friends = [];
  }

  friends.push(name.trim());

  localStorage.setItem(
    "gamecheckFriends",
    JSON.stringify(friends)
  );

  loadFriends();
});

loadFriends();


/* =========================================================
   COUNTERS
   ========================================================= */

document
  .querySelectorAll("[data-target]")
  .forEach(counter => {

    const target =
      parseInt(counter.dataset.target, 10);

    if (!Number.isFinite(target)) return;

    let value = 0;

    const step = Math.max(
      1,
      Math.ceil(target / 60)
    );

    const timer = setInterval(() => {

      value += step;

      if (value >= target) {
        value = target;
        clearInterval(timer);
      }

      counter.textContent =
        value.toLocaleString();

    }, 25);
  });


/* =========================================================
   PARTICLES
   ========================================================= */

function createParticles() {
  const container = $("particles");

  if (!container) return;

  const reduced =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (reduced) return;

  const amount =
    window.innerWidth < 650 ? 8 : 18;

  for (let i = 0; i < amount; i++) {

    const particle =
      document.createElement("i");

    particle.className = "particle";

    particle.style.left =
      `${Math.random() * 100}%`;

    particle.style.top =
      `${Math.random() * 100}%`;

    particle.style.animationDelay =
      `${Math.random() * 6}s`;

    particle.style.animationDuration =
      `${5 + Math.random() * 7}s`;

    container.appendChild(particle);
  }
}

createParticles();


/* =========================================================
   GAME GRID — SAFE EXISTING DATA SUPPORT
   ========================================================= */

const fallbackGames = [
  ["Minecraft", "Survival", "⛏️"],
  ["Fortnite", "Battle Royale", "🛡️"],
  ["Valorant", "FPS", "🎯"],
  ["Counter-Strike 2", "FPS", "💣"],
  ["Grand Theft Auto V", "Open World", "🚗"],
  ["Apex Legends", "Battle Royale", "⚡"],
  ["PUBG", "Battle Royale", "🔫"],
  ["Rocket League", "Sports", "🚗"],
  ["Overwatch 2", "FPS", "🦸"],
  ["League of Legends", "MOBA", "⚔️"],
  ["Dota 2", "MOBA", "🧙"],
  ["Forza Horizon 5", "Racing", "🏎️"]
];

if (
  typeof games === "undefined"
) {
  window.games = fallbackGames;
}

let visibleGames = 24;
let currentCategory = "All";

const knownLogos = {
  "Minecraft":
    "https://cdn.simpleicons.org/minecraft",

  "Fortnite":
    "https://cdn.simpleicons.org/fortnite",

  "Valorant":
    "https://cdn.simpleicons.org/valorant",

  "Counter-Strike 2":
    "https://cdn.simpleicons.org/counterstrike",

  "Grand Theft Auto V":
    "https://cdn.simpleicons.org/grandtheftauto",

  "Apex Legends":
    "https://cdn.simpleicons.org/apexlegends",

  "PUBG":
    "https://cdn.simpleicons.org/pubg",

  "Rocket League":
    "https://cdn.simpleicons.org/rocketleague",

  "Overwatch 2":
    "https://cdn.simpleicons.org/overwatch",

  "League of Legends":
    "https://cdn.simpleicons.org/leagueoflegends",

  "Dota 2":
    "https://cdn.simpleicons.org/dota",

  "Forza Horizon 5":
    "https://cdn.simpleicons.org/forza"
};

function gameLogo(name, fallback) {
  const url = knownLogos[name];

  if (!url) {
    return `<span class="game-fallback">${fallback}</span>`;
  }

  return `
    <img
      class="game-logo-img"
      src="${url}"
      alt="${name} logo"
      loading="lazy"
      onerror="this.outerHTML='<span class=&quot;game-fallback&quot;>${fallback}</span>'"
    >
  `;
}

function renderGames() {
  const grid = $("gameGrid");

  if (!grid) return;

  const search =
    ($("gameSearch")?.value || "")
      .toLowerCase()
      .trim();

  const filtered = games.filter(game => {

    const name =
      String(game[0]).toLowerCase();

    const category =
      String(game[1]);

    const categoryMatch =
      currentCategory === "All" ||
      category === currentCategory;

    const searchMatch =
      !search ||
      name.includes(search);

    return categoryMatch && searchMatch;
  });

  const shown =
    filtered.slice(0, visibleGames);

  grid.innerHTML = shown.map(game => `
    <article class="game-card">
      <div class="game-icon">
        ${gameLogo(game[0], game[2])}
      </div>

      <div>
        <h3>${game[0]}</h3>
        <span>${game[1]}</span>
      </div>
    </article>
  `).join("");

  const loadMore = $("loadMore");

  if (loadMore) {
    loadMore.style.display =
      shown.length < filtered.length
        ? "block"
        : "none";
  }
}

safeOn("gameSearch", "input", () => {
  visibleGames = 24;
  renderGames();
});

document
  .querySelectorAll("#categories button")
  .forEach(button => {

    button.addEventListener("click", () => {

      currentCategory =
        button.dataset.category ||
        button.textContent.trim();

      document
        .querySelectorAll("#categories button")
        .forEach(b =>
          b.classList.remove("active")
        );

      button.classList.add("active");

      visibleGames = 24;

      renderGames();
    });
  });

safeOn("loadMore", "click", () => {
  visibleGames += 24;
  renderGames();
});

renderGames();

console.log(
  "%cGAMECHECK V4 ONLINE — MADE BY AUK",
  "font-size:16px;font-weight:bold"
);
