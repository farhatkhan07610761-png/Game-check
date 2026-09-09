/* =========================================================
   GAMECHECK V4 — MADE BY AUK
   FULL FIXED / MATCHED VERSION
   CINEMATIC VS BATTLE UPGRADE
   ========================================================= */

"use strict";

/* =========================================================
   HELPERS
   ========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function on(selector, event, callback) {
  const element = $(selector);
  if (element) element.addEventListener(event, callback);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* =========================================================
   GAME DATABASE
   ========================================================= */

const games = [
  ["Minecraft", "Survival", "⛏️", "minecraft"],
  ["Fortnite", "Battle Royale", "🪂", "fortnite"],
  ["Valorant", "FPS", "🎯", "valorant"],
  ["Counter-Strike 2", "FPS", "🔫", "counter-strike"],
  ["Grand Theft Auto V", "Open World", "🚗", "gta"],
  ["Apex Legends", "Battle Royale", "⚡", "apex"],
  ["PUBG", "Battle Royale", "🪖", "pubg"],
  ["Rocket League", "Sports", "🚘", "rocket-league"],
  ["Overwatch 2", "FPS", "🦸", "overwatch"],
  ["League of Legends", "MOBA", "⚔️", "league-of-legends"],
  ["Dota 2", "MOBA", "🧙", "dota-2"],
  ["Warframe", "Action", "🥷", "warframe"],
  ["Forza Horizon 5", "Racing", "🏎️", "forza"],
  ["Roblox", "Sandbox", "🧱", "roblox"],
  ["Call of Duty", "FPS", "💥", "call-of-duty"],
  ["The Witcher 3", "RPG", "🐺", "witcher"],
  ["Cyberpunk 2077", "RPG", "🌃", "cyberpunk"],
  ["Genshin Impact", "RPG", "✨", "genshin"],
  ["Red Dead Redemption 2", "Open World", "🤠", "rdr2"],
  ["Elden Ring", "RPG", "⚔️", "elden-ring"],
  ["Terraria", "Sandbox", "🌲", "terraria"],
  ["Among Us", "Party", "🚀", "among-us"],
  ["Fall Guys", "Party", "🏃", "fall-guys"],
  ["The Sims 4", "Simulation", "🏠", "sims"],
  ["Rainbow Six Siege", "FPS", "🎯", "rainbow"],
  ["Destiny 2", "FPS", "🌌", "destiny"],
  ["War Thunder", "Simulation", "✈️", "war-thunder"],
  ["Rust", "Survival", "🔨", "rust"],
  ["DayZ", "Survival", "🧟", "dayz"],
  ["ARK: Survival Evolved", "Survival", "🦖", "ark"],
  ["Palworld", "Survival", "🌎", "palworld"],
  ["Hogwarts Legacy", "RPG", "🪄", "hogwarts"],
  ["God of War", "Action", "🪓", "god-of-war"],
  ["Spider-Man Remastered", "Action", "🕷️", "spider-man"],
  ["Horizon Zero Dawn", "RPG", "🏹", "horizon"],
  ["Assassin's Creed Valhalla", "Action", "🛡️", "assassins"],
  ["Far Cry 6", "FPS", "🔫", "far-cry"],
  ["Dying Light 2", "Horror", "🧟", "dying-light"],
  ["Dead by Daylight", "Horror", "👻", "dead-by-daylight"],
  ["Phasmophobia", "Horror", "👻", "phasmophobia"],
  ["Resident Evil 4", "Horror", "🧟", "resident-evil"],
  ["Forza Horizon 4", "Racing", "🏁", "forza"],
  ["Need for Speed Heat", "Racing", "🏎️", "nfs"],
  ["Trackmania", "Racing", "🏁", "trackmania"],
  ["F1 24", "Racing", "🏎️", "f1"],
  ["EA Sports FC 25", "Sports", "⚽", "fc"],
  ["NBA 2K25", "Sports", "🏀", "nba"],
  ["Fallout 4", "RPG", "☢️", "fallout"],
  ["Skyrim", "RPG", "🐉", "skyrim"],
  ["Dark Souls III", "RPG", "⚔️", "dark-souls"],
  ["Monster Hunter World", "RPG", "🐲", "monster-hunter"],
  ["Street Fighter 6", "Fighting", "🥊", "street-fighter"],
  ["Tekken 8", "Fighting", "👊", "tekken"],
  ["Mortal Kombat 1", "Fighting", "🥋", "mortal-kombat"],
  ["Brawlhalla", "Fighting", "⚔️", "brawlhalla"],
  ["Paladins", "FPS", "🏹", "paladins"],
  ["The Finals", "FPS", "💥", "the-finals"],
  ["Splitgate", "FPS", "🌀", "splitgate"],
  ["Battlefield 2042", "FPS", "💣", "battlefield"],
  ["Halo Infinite", "FPS", "🪖", "halo"],
  ["DOOM Eternal", "FPS", "👹", "doom"],
  ["Metro Exodus", "FPS", "🚇", "metro"],
  ["Left 4 Dead 2", "FPS", "🧟", "left4dead"],
  ["Euro Truck Simulator 2", "Simulation", "🚛", "ets2"],
  ["Microsoft Flight Simulator", "Simulation", "✈️", "flight"],
  ["Cities: Skylines", "Simulation", "🏙️", "cities"],
  ["Planet Zoo", "Simulation", "🦁", "planet-zoo"],
  ["Stardew Valley", "Simulation", "🌾", "stardew"],
  ["Subnautica", "Survival", "🌊", "subnautica"],
  ["The Forest", "Survival", "🌲", "forest"],
  ["Sons of the Forest", "Survival", "🌲", "sons"],
  ["Valheim", "Survival", "⚔️", "valheim"],
  ["Don't Starve Together", "Survival", "🔥", "dont-starve"],
  ["Cuphead", "Platform", "☕", "cuphead"],
  ["Hollow Knight", "Platform", "🪲", "hollow-knight"],
  ["Celeste", "Platform", "🏔️", "celeste"],
  ["Hades", "Action", "🔥", "hades"],
  ["Dead Cells", "Action", "⚔️", "dead-cells"],
  ["Portal 2", "Puzzle", "🌀", "portal"],
  ["Human Fall Flat", "Puzzle", "🤸", "human-fall-flat"],
  ["It Takes Two", "Adventure", "👥", "it-takes-two"],
  ["Sea of Thieves", "Adventure", "🏴‍☠️", "sea-of-thieves"],
  ["No Man's Sky", "Adventure", "🚀", "no-mans-sky"],
  ["Starfield", "RPG", "🌌", "starfield"],
  ["Baldur's Gate 3", "RPG", "🐉", "baldurs-gate"],
  ["Diablo IV", "RPG", "😈", "diablo"],
  ["Path of Exile 2", "RPG", "💀", "path-of-exile"],
  ["World of Warcraft", "MMO", "🛡️", "wow"],
  ["Final Fantasy XIV", "MMO", "⚔️", "ffxiv"],
  ["Guild Wars 2", "MMO", "🐉", "guild-wars"],
  ["Black Desert", "MMO", "⚔️", "black-desert"],
  ["Age of Empires IV", "Strategy", "🏰", "aoe"],
  ["Civilization VI", "Strategy", "🌍", "civilization"],
  ["Total War: Warhammer III", "Strategy", "⚔️", "total-war"],
  ["Teamfight Tactics", "Strategy", "♟️", "tft"]
];

/* =========================================================
   GAME LOGOS
   ========================================================= */

const logoMap = {
  Minecraft: "https://cdn.simpleicons.org/minecraft",
  Fortnite: "https://cdn.simpleicons.org/fortnite",
  Valorant: "https://cdn.simpleicons.org/valorant",
  "Counter-Strike 2": "https://cdn.simpleicons.org/counterstrike",
  "Grand Theft Auto V": "https://cdn.simpleicons.org/rockstargames",
  "Apex Legends": "https://cdn.simpleicons.org/apexlegends",
  PUBG: "https://cdn.simpleicons.org/pubg",
  "Rocket League": "https://cdn.simpleicons.org/rocketleague",
  "Overwatch 2": "https://cdn.simpleicons.org/overwatch",
  "League of Legends": "https://cdn.simpleicons.org/leagueoflegends",
  "Dota 2": "https://cdn.simpleicons.org/dota",
  Warframe: "https://cdn.simpleicons.org/warframe",
  "Forza Horizon 5": "https://cdn.simpleicons.org/forza",
  Roblox: "https://cdn.simpleicons.org/roblox",
  "Call of Duty": "https://cdn.simpleicons.org/callofduty",
  "The Witcher 3": "https://cdn.simpleicons.org/thewitcher",
  "Cyberpunk 2077": "https://cdn.simpleicons.org/cyberpunk",
  "Genshin Impact": "https://cdn.simpleicons.org/genshinimpact"
};

/* =========================================================
   GAME GRID
   ========================================================= */

let visibleGames = 24;
let currentCategory = "All";

function renderGames() {
  const grid = $("#gameGrid");
  if (!grid) return;

  const search = ($("#gameSearch")?.value || "")
    .trim()
    .toLowerCase();

  const filtered = games.filter(game => {
    const name = game[0];
    const category = game[1];

    const matchesSearch =
      !search ||
      name.toLowerCase().includes(search) ||
      category.toLowerCase().includes(search);

    const matchesCategory =
      currentCategory === "All" ||
      category.toLowerCase() === currentCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const shown = filtered.slice(0, visibleGames);

  grid.innerHTML = "";

  if (!shown.length) {
    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:50px;
        text-align:center;
        color:var(--muted);
        border:1px solid var(--border);
        border-radius:18px;
      ">
        <div style="font-size:3rem">🔎</div>
        <h3>No games found</h3>
        <p>Try another game or category.</p>
      </div>
    `;
  }

  shown.forEach(([name, category, emoji]) => {
    const card = document.createElement("article");

    card.className = "game-card";

    const logo = logoMap[name];

    card.innerHTML = `
      <div class="game-category">
        ${category.toUpperCase()}
      </div>

      <div class="game-logo">
        ${
          logo
            ? `
              <img
                class="game-logo-img"
                src="${logo}"
                alt=""
                loading="lazy"
                onerror="this.style.display='none';this.parentElement.innerHTML='<span class=game-fallback>${emoji}</span>'"
              >
            `
            : `<span class="game-fallback">${emoji}</span>`
        }
      </div>

      <h3>${name}</h3>
      <small>${category}</small>
    `;

    grid.appendChild(card);
  });

  const loadMore = $("#loadMore");

  if (loadMore) {
    loadMore.style.display =
      visibleGames < filtered.length
        ? "block"
        : "none";
  }
}

on("#gameSearch", "input", () => {
  visibleGames = 24;
  renderGames();
});

$$("#categories button").forEach(button => {
  button.addEventListener("click", () => {
    $$("#categories button").forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    currentCategory =
      button.dataset.category ||
      button.textContent.trim();

    if (currentCategory.toLowerCase() === "all") {
      currentCategory = "All";
    }

    visibleGames = 24;
    renderGames();
  });
});

on("#loadMore", "click", () => {
  visibleGames += 24;
  renderGames();
});

renderGames();

/* =========================================================
   HARDWARE DATABASE
   ========================================================= */

const gpuData = {
  "RTX 5090": 100,
  "RTX 5080": 96,
  "RTX 5070 Ti": 91,
  "RTX 5070": 87,
  "RTX 4090": 99,
  "RTX 4080 SUPER": 94,
  "RTX 4080": 92,
  "RTX 4070 Ti SUPER": 89,
  "RTX 4070 Ti": 86,
  "RTX 4070 SUPER": 84,
  "RTX 4070": 80,
  "RTX 4060 Ti": 69,
  "RTX 4060": 63,
  "RTX 3060 Ti": 68,
  "RTX 3060": 59,
  "RTX 3050": 45,
  "RTX 2060": 43,
  "GTX 1660 SUPER": 40,
  "GTX 1650": 30,
  "GTX 1050 Ti": 23,
  "RX 7900 XTX": 96,
  "RX 7900 XT": 91,
  "RX 7800 XT": 82,
  "RX 7700 XT": 77,
  "RX 7600 XT": 68,
  "RX 7600": 63,
  "RX 6700 XT": 69,
  "RX 6600 XT": 62,
  "RX 6600": 55,
  "RX 6500 XT": 39,
  "Intel Arc A770": 65,
  "Intel Arc A750": 59
};

const cpuData = {
  "Ryzen 9 9950X": 100,
  "Ryzen 9 7950X3D": 98,
  "Ryzen 9 7950X": 96,
  "Ryzen 7 7800X3D": 94,
  "Ryzen 7 7700X": 87,
  "Ryzen 7 7700": 84,
  "Ryzen 5 7600X": 79,
  "Ryzen 5 7600": 76,
  "Ryzen 5 5600": 68,
  "Ryzen 5 3600": 55,
  "Core i9-14900K": 100,
  "Core i7-14700K": 94,
  "Core i5-14600K": 89,
  "Core i5-14400F": 78,
  "Core i5-13400F": 74,
  "Core i5-12400F": 70,
  "Core i7-10700K": 70,
  "Core i5-10400F": 58,
  "Core i3-12100F": 55
};

const ramData = {
  "4 GB DDR4": 25,
  "8 GB DDR4": 45,
  "8 GB DDR5": 52,
  "16 GB DDR4": 70,
  "16 GB DDR5": 78,
  "24 GB DDR5": 84,
  "32 GB DDR4": 85,
  "32 GB DDR5": 92,
  "64 GB DDR5": 100
};

function fillSelect(id, data, oldValue) {
  const select = $("#" + id);

  if (!select) return;

  select.innerHTML = "";

  Object.entries(data).forEach(([name, score]) => {
    const option = document.createElement("option");

    option.value = score;
    option.textContent = name;
    option.dataset.name = name;

    if (String(score) === String(oldValue)) {
      option.selected = true;
    }

    select.appendChild(option);
  });
}

fillSelect("gpu1", gpuData, 80);
fillSelect("gpu2", gpuData, 68);
fillSelect("checkGpu", gpuData, 80);

fillSelect("cpu1", cpuData, 84);
fillSelect("cpu2", cpuData, 74);
fillSelect("checkCpu", cpuData, 84);

fillSelect("ram1", ramData, 92);
fillSelect("ram2", ramData, 70);
fillSelect("checkRam", ramData, 92);

/* =========================================================
   GAME SELECT FOR PC CHECK
   ========================================================= */

const checkGame = $("#checkGame");

if (checkGame) {
  checkGame.innerHTML = "";

  games.forEach(game => {
    const option = document.createElement("option");

    option.value = game[0];
    option.textContent = game[0];

    checkGame.appendChild(option);
  });
}

/* =========================================================
   VS BATTLE — CINEMATIC ENGINE
   ========================================================= */

function getStat(id) {
  const element = $("#" + id);
  return element ? Number(element.value) || 0 : 0;
}

function setHP(id, value) {
  const bar = $("#" + id);
  if (!bar) return;

  value = Math.max(0, Math.min(100, value));

  bar.style.width = value + "%";

  const number =
    id === "hp1"
      ? $("#hpNumber1")
      : $("#hpNumber2");

  if (number) {
    number.textContent = Math.round(value);
  }
}

function fighterNames() {
  const name1 =
    $("#player1")?.value.trim() || "PLAYER 1";

  const name2 =
    $("#player2")?.value.trim() || "PLAYER 2";

  if ($("#fighterName1")) {
    $("#fighterName1").textContent = name1;
  }

  if ($("#fighterName2")) {
    $("#fighterName2").textContent = name2;
  }

  if ($("#hpName1")) {
    $("#hpName1").textContent = name1;
  }

  if ($("#hpName2")) {
    $("#hpName2").textContent = name2;
  }

  return [name1, name2];
}

function battleMessage(text) {
  const weapon = $("#weapon");
  if (weapon) weapon.textContent = text;
}

function arenaMessage(text) {
  const arenaText = $("#arenaText");
  if (arenaText) arenaText.textContent = text;
}

/* =========================================================
   CINEMATIC STYLE INJECTION
   No CSS file changes required for the new effects.
   ========================================================= */

function installBattleFX() {
  if ($("#gamecheckBattleFX")) return;

  const style = document.createElement("style");

  style.id = "gamecheckBattleFX";

  style.textContent = `
    #battleArena {
      isolation:isolate;
    }

    #battleArena .fighter {
      position:relative;
      z-index:20;
      will-change:transform;
    }

    #battleArena .fighter-body {
      position:relative;
      z-index:21;
      will-change:transform,filter;
    }

    .gc-effect {
      position:absolute;
      pointer-events:none;
      z-index:40;
    }

    .gc-energy {
      width:18px;
      height:18px;
      border-radius:50%;
      background:white;
      box-shadow:
        0 0 8px white,
        0 0 20px #00e5ff,
        0 0 45px #7c5cff;
    }

    .gc-energy::after {
      content:"";
      position:absolute;
      width:65px;
      height:7px;
      top:50%;
      left:-55px;
      transform:translateY(-50%);
      border-radius:999px;
      background:linear-gradient(
        90deg,
        transparent,
        #00e5ff,
        white
      );
      box-shadow:0 0 15px #00e5ff;
    }

    .gc-slash {
      width:110px;
      height:18px;
      border-radius:50%;
      border-top:5px solid white;
      border-bottom:3px solid #7c5cff;
      box-shadow:
        0 0 10px white,
        0 0 25px #7c5cff;
    }

    .gc-wind {
      width:100px;
      height:100px;
      border:7px solid rgba(0,229,255,.75);
      border-left-color:transparent;
      border-bottom-color:transparent;
      border-radius:50%;
      box-shadow:0 0 30px #00e5ff;
    }

    .gc-plane {
      position:absolute;
      z-index:45;
      font-size:52px;
      pointer-events:none;
      filter:
        drop-shadow(0 0 8px white)
        drop-shadow(0 0 20px #00e5ff);
      will-change:transform;
    }

    .gc-parachute {
      position:absolute;
      z-index:44;
      font-size:40px;
      pointer-events:none;
      filter:
        drop-shadow(0 0 10px #7c5cff);
    }

    .gc-build {
      position:absolute;
      z-index:8;
      width:34px;
      height:34px;
      border:2px solid rgba(255,255,255,.35);
      background:
        linear-gradient(135deg,
        rgba(124,92,255,.65),
        rgba(0,229,255,.28));
      box-shadow:0 0 15px rgba(124,92,255,.5);
      border-radius:5px;
      pointer-events:none;
    }

    .gc-hit-ring {
      position:absolute;
      width:20px;
      height:20px;
      border:5px solid white;
      border-radius:50%;
      box-shadow:
        0 0 15px white,
        0 0 35px #00e5ff;
      pointer-events:none;
      z-index:50;
    }

    .gc-impact {
      position:absolute;
      width:90px;
      height:90px;
      border-radius:50%;
      border:5px solid white;
      box-shadow:
        0 0 15px white,
        0 0 35px #7c5cff,
        0 0 70px #00e5ff;
      pointer-events:none;
      z-index:48;
    }

    .gc-spark {
      position:absolute;
      width:7px;
      height:7px;
      border-radius:50%;
      background:white;
      box-shadow:
        0 0 8px white,
        0 0 18px #00e5ff;
      z-index:55;
      pointer-events:none;
      animation:gcSpark .7s ease-out forwards;
    }

    @keyframes gcSpark {
      from {
        opacity:1;
        transform:translate(0,0) scale(1);
      }
      to {
        opacity:0;
        transform:
          translate(var(--x),var(--y))
          scale(.1);
      }
    }

    @keyframes gcHit {
      0%,100% {
        transform:translateX(0) rotate(0) scale(1);
        filter:none;
      }
      20% {
        transform:translateX(-9px) rotate(-4deg) scale(.96);
        filter:brightness(2);
      }
      40% {
        transform:translateX(9px) rotate(4deg) scale(1.02);
      }
      60% {
        transform:translateX(-5px) rotate(-2deg);
      }
    }

    .fighter-hit .fighter-body {
      animation:gcHit .45s ease-out;
    }

    @keyframes gcWinner {
      0%,100% {
        transform:translateY(0) scale(1);
      }
      50% {
        transform:translateY(-12px) scale(1.08);
      }
    }

    .fighter-winner .fighter-body {
      animation:gcWinner .8s ease-in-out infinite;
      filter:
        drop-shadow(0 0 12px #00e5ff)
        drop-shadow(0 0 30px #7c5cff);
    }

    .fighter-loser {
      opacity:.5;
      filter:grayscale(.5);
    }

    @keyframes gcCharge {
      0%,100% {
        transform:scale(1);
      }
      50% {
        transform:scale(1.12);
      }
    }

    .fighter-charge .fighter-body {
      animation:gcCharge .35s ease-in-out infinite;
    }

    .gc-round-banner {
      position:absolute;
      left:50%;
      top:12%;
      transform:translateX(-50%) scale(.7);
      z-index:60;
      padding:10px 20px;
      border:1px solid rgba(255,255,255,.25);
      border-radius:999px;
      background:rgba(0,0,0,.55);
      backdrop-filter:blur(10px);
      color:white;
      font-weight:900;
      letter-spacing:2px;
      white-space:nowrap;
      opacity:0;
      pointer-events:none;
    }

    .gc-round-banner.show {
      animation:gcBanner .8s ease forwards;
    }

    @keyframes gcBanner {
      0% {
        opacity:0;
        transform:translateX(-50%) scale(.6);
      }
      25%,75% {
        opacity:1;
        transform:translateX(-50%) scale(1);
      }
      100% {
        opacity:0;
        transform:translateX(-50%) scale(1.05);
      }
    }

    @media(max-width:650px) {
      .gc-plane {
        font-size:38px;
      }

      .gc-parachute {
        font-size:30px;
      }

      .gc-round-banner {
        font-size:11px;
        padding:8px 12px;
      }
    }
  `;

  document.head.appendChild(style);
}

installBattleFX();

/* =========================================================
   ARENA EFFECTS
   ========================================================= */

function flashArena() {
  const arena = $("#battleArena");
  if (!arena) return;

  arena.classList.remove("arena-shake");

  void arena.offsetWidth;

  arena.classList.add("arena-shake");

  const flash = document.createElement("div");

  flash.className = "battle-flash";

  arena.appendChild(flash);

  setTimeout(() => flash.remove(), 400);
}

function createSparksAt(x, y, amount = 14) {
  const arena = $("#battleArena");
  if (!arena) return;

  for (let i = 0; i < amount; i++) {
    const spark = document.createElement("div");

    spark.className = "gc-spark";

    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;

    spark.style.setProperty(
      "--x",
      `${Math.random() * 180 - 90}px`
    );

    spark.style.setProperty(
      "--y",
      `${Math.random() * 140 - 70}px`
    );

    arena.appendChild(spark);

    setTimeout(() => spark.remove(), 750);
  }
}

function createImpact(x, y) {
  const arena = $("#battleArena");
  if (!arena) return;

  const impact = document.createElement("div");

  impact.className = "gc-impact";

  impact.style.left = `${x - 45}px`;
  impact.style.top = `${y - 45}px`;

  arena.appendChild(impact);

  impact.animate(
    [
      {
        transform:"scale(.2)",
        opacity:1
      },
      {
        transform:"scale(1.7)",
        opacity:0
      }
    ],
    {
      duration:500,
      easing:"cubic-bezier(.2,.8,.2,1)"
    }
  );

  createSparksAt(x, y);

  setTimeout(() => impact.remove(), 520);
}

function createHitRing(x, y) {
  const arena = $("#battleArena");
  if (!arena) return;

  const ring = document.createElement("div");

  ring.className = "gc-hit-ring";

  ring.style.left = `${x - 10}px`;
  ring.style.top = `${y - 10}px`;

  arena.appendChild(ring);

  ring.animate(
    [
      {
        transform:"scale(.5)",
        opacity:1
      },
      {
        transform:"scale(4)",
        opacity:0
      }
    ],
    {
      duration:450,
      easing:"ease-out"
    }
  );

  setTimeout(() => ring.remove(), 500);
}

function showRoundBanner(text) {
  const arena = $("#battleArena");
  if (!arena) return;

  let banner =
    arena.querySelector(".gc-round-banner");

  if (!banner) {
    banner = document.createElement("div");
    banner.className = "gc-round-banner";
    arena.appendChild(banner);
  }

  banner.textContent = text;

  banner.classList.remove("show");

  void banner.offsetWidth;

  banner.classList.add("show");
}

/* =========================================================
   COUNTDOWN
   ========================================================= */

async function countdown() {
  const element = $("#countdown");

  arenaMessage("GET READY...");

  if (!element) {
    await wait(500);
    return;
  }

  for (const number of ["3", "2", "1", "GO!"]) {
    element.textContent = number;

    arenaMessage(
      number === "GO!"
        ? "FIGHT!"
        : `BATTLE STARTING... ${number}`
    );

    element.classList.remove("count-pop");

    void element.offsetWidth;

    element.classList.add("count-pop");

    await wait(
      number === "GO!"
        ? 600
        : 700
    );
  }

  element.textContent = "";

  arenaMessage("FIGHT!");
}

/* =========================================================
   FIGHTER POSITION HELPERS
   ========================================================= */

function getFighterPoint(fighter) {
  const arena = $("#battleArena");

  if (!arena || !fighter) {
    return null;
  }

  const ar = arena.getBoundingClientRect();
  const fr = fighter.getBoundingClientRect();

  return {
    x: fr.left + fr.width / 2 - ar.left,
    y: fr.top + fr.height * .42 - ar.top
  };
}

async function moveFighterToAttack(fighter, side) {
  if (!fighter) {
    await wait(300);
    return;
  }

  const arena = $("#battleArena");

  const opponent =
    side === 1
      ? $(".fighter-two")
      : $(".fighter-one");

  if (!arena || !opponent) {
    await wait(300);
    return;
  }

  const fighterRect =
    fighter.getBoundingClientRect();

  const opponentRect =
    opponent.getBoundingClientRect();

  const arenaRect =
    arena.getBoundingClientRect();

  const fighterCenter =
    fighterRect.left +
    fighterRect.width / 2;

  const opponentCenter =
    opponentRect.left +
    opponentRect.width / 2;

  const desiredGap =
    Math.max(
      55,
      Math.min(
        90,
        (fighterRect.width +
          opponentRect.width) *
          .32
      )
    );

  let distance =
    opponentCenter -
    fighterCenter;

  if (side === 1) {
    distance -= desiredGap;
  } else {
    distance += desiredGap;
  }

  const maxTravel =
    arenaRect.width * .40;

  distance =
    Math.max(
      -maxTravel,
      Math.min(
        maxTravel,
        distance
      )
    );

  fighter._gcAttackDistance =
    distance;

  fighter.classList.add(
    "fighter-charge"
  );

  const animation =
    fighter.animate(
      [
        {
          transform:
            "translateX(0) scale(1)"
        },
        {
          transform:
            `translateX(${distance}px) scale(1.04)`
        }
      ],
      {
        duration:
          Math.min(
            850,
            Math.max(
              420,
              Math.abs(distance) * 2.1
            )
          ),
        easing:
          "cubic-bezier(.16,.84,.24,1)",
        fill:"forwards"
      }
    );

  try {
    await animation.finished;
  } catch {}

  fighter.classList.remove(
    "fighter-charge"
  );
}

async function returnFighter(fighter) {
  if (!fighter) {
    await wait(300);
    return;
  }

  const distance =
    Number(
      fighter._gcAttackDistance
    ) || 0;

  const animation =
    fighter.animate(
      [
        {
          transform:
            `translateX(${distance}px) scale(1.04)`
        },
        {
          transform:
            "translateX(0) scale(1)"
        }
      ],
      {
        duration:460,
        easing:
          "cubic-bezier(.2,.8,.2,1)",
        fill:"forwards"
      }
    );

  try {
    await animation.finished;
  } catch {}

  animation.cancel();

  fighter.style.transform = "";

  fighter._gcAttackDistance = 0;
}

/* =========================================================
   BUILD / BRIDGE EFFECT — RAM ROUND
   ========================================================= */

async function buildBridge(fighter, side) {
  const arena = $("#battleArena");

  if (!arena || !fighter) {
    await wait(300);
    return;
  }

  const start =
    getFighterPoint(fighter);

  if (!start) return;

  const blocks = [];

  for (let i = 0; i < 5; i++) {
    const block =
      document.createElement("div");

    block.className =
      "gc-build";

    const direction =
      side === 1 ? 1 : -1;

    block.style.left =
      `${start.x +
        direction *
        (i * 34 + 25)}px`;

    block.style.top =
      `${start.y +
        45 -
        i * 28}px`;

    block.style.opacity = "0";

    arena.appendChild(block);

    blocks.push(block);

    block.animate(
      [
        {
          opacity:0,
          transform:"translateY(30px) scale(.4)"
        },
        {
          opacity:1,
          transform:"translateY(0) scale(1)"
        }
      ],
      {
        duration:280,
        delay:i * 100,
        fill:"forwards",
        easing:"cubic-bezier(.2,.8,.2,1)"
      }
    );
  }

  await wait(800);

  blocks.forEach(block => {
    block.animate(
      [
        {
          transform:"translateY(0)"
        },
        {
          transform:"translateY(15px)",
          opacity:0
        }
      ],
      {
        duration:350,
        fill:"forwards"
      }
    );

    setTimeout(
      () => block.remove(),
      400
    );
  });
}

/* =========================================================
   PLANE + PARACHUTE — CPU ROUND
   ========================================================= */

async function planeEntrance(fighter, side) {
  const arena = $("#battleArena");

  if (!arena || !fighter) {
    await wait(300);
    return;
  }

  const arenaRect =
    arena.getBoundingClientRect();

  const plane =
    document.createElement("div");

  plane.className =
    "gc-plane";

  plane.textContent = "✈️";

  const fromX =
    side === 1
      ? -90
      : arenaRect.width + 90;

  const toX =
    side === 1
      ? arenaRect.width + 90
      : -90;

  const y =
    Math.max(
      25,
      arenaRect.height * .18
    );

  plane.style.left =
    `${fromX}px`;

  plane.style.top =
    `${y}px`;

  arena.appendChild(plane);

  const animation =
    plane.animate(
      [
        {
          transform:
            `translateX(0) rotate(${side === 1 ? 0 : 180}deg)`
        },
        {
          transform:
            `translateX(${toX - fromX}px) rotate(${side === 1 ? 0 : 180}deg)`
        }
      ],
      {
        duration:1500,
        easing:"linear"
      }
    );

  await wait(650);

  /* Parachute entrance */

  const parachute =
    document.createElement("div");

  parachute.className =
    "gc-parachute";

  parachute.textContent =
    "🪂";

  const centerX =
    arenaRect.width *
    (side === 1 ? .28 : .72);

  parachute.style.left =
    `${centerX}px`;

  parachute.style.top =
    `${y + 25}px`;

  arena.appendChild(
    parachute
  );

  const fighterPoint =
    getFighterPoint(fighter);

  const targetY =
    fighterPoint
      ? fighterPoint.y - 35
      : arenaRect.height * .55;

  await parachute.animate(
    [
      {
        transform:"translateY(0) scale(.8)",
        opacity:0
      },
      {
        transform:
          `translateY(${targetY - y}px) scale(1)`,
        opacity:1
      }
    ],
    {
      duration:900,
      easing:"cubic-bezier(.2,.8,.2,1)"
    }
  ).finished.catch(() => {});

  parachute.remove();

  await animation.finished
    .catch(() => {});

  plane.remove();

  /* Small landing effect */

  const point =
    getFighterPoint(fighter);

  if (point) {
    createImpact(
      point.x,
      point.y + 30
    );
  }

  await wait(300);
}

/* =========================================================
   ATTACK EFFECTS
   ========================================================= */

async function attackEffect(
  side,
  weapon
) {
  const arena =
    $("#battleArena");

  const attacker =
    side === 1
      ? $(".fighter-one")
      : $(".fighter-two");

  const defender =
    side === 1
      ? $(".fighter-two")
      : $(".fighter-one");

  if (
    !arena ||
    !attacker ||
    !defender
  ) {
    return;
  }

  const start =
    getFighterPoint(attacker);

  const end =
    getFighterPoint(defender);

  if (!start || !end) return;

  const dx =
    end.x - start.x;

  const dy =
    end.y - start.y;

  /* -------------------------
     SWORD
     ------------------------- */

  if (weapon === "SWORD") {
    const slash =
      document.createElement("div");

    slash.className =
      "gc-effect gc-slash";

    slash.style.left =
      `${start.x}px`;

    slash.style.top =
      `${start.y}px`;

    arena.appendChild(slash);

    const angle =
      Math.atan2(
        dy,
        dx
      ) *
      180 /
      Math.PI;

    await slash.animate(
      [
        {
          transform:
            `translate(-50%,-50%) translate(0,0) rotate(${angle}deg) scale(.5)`,
          opacity:0
        },
        {
          transform:
            `translate(-50%,-50%) translate(${dx}px,${dy}px) rotate(${angle}deg) scale(1.1)`,
          opacity:1
        }
      ],
      {
        duration:500,
        easing:
          "cubic-bezier(.2,.7,.2,1)"
      }
    ).finished.catch(() => {});

    slash.remove();

    createImpact(
      end.x,
      end.y
    );

    return;
  }

  /* -------------------------
     WIND / MACE
     ------------------------- */

  if (weapon === "WIND") {
    const wind =
      document.createElement("div");

    wind.className =
      "gc-effect gc-wind";

    wind.style.left =
      `${start.x}px`;

    wind.style.top =
      `${start.y}px`;

    arena.appendChild(wind);

    await wind.animate(
      [
        {
          transform:
            "translate(-50%,-50%) scale(.3) rotate(0deg)",
          opacity:0
        },
        {
          transform:
            `translate(${dx - 50}px,${dy - 50}px) scale(1.25) rotate(540deg)`,
          opacity:1
        }
      ],
      {
        duration:650,
        easing:
          "cubic-bezier(.2,.7,.2,1)"
      }
    ).finished.catch(() => {});

    wind.remove();

    createImpact(
      end.x,
      end.y
    );

    return;
  }

  /* -------------------------
     ENERGY CANNON
     ------------------------- */

  const energy =
    document.createElement("div");

  energy.className =
    "gc-effect gc-energy";

  energy.style.left =
    `${start.x}px`;

  energy.style.top =
    `${start.y}px`;

  arena.appendChild(
    energy
  );

  const angle =
    Math.atan2(
      dy,
      dx
    ) *
    180 /
    Math.PI;

  await energy.animate(
    [
      {
        transform:
          `translate(-50%,-50%) rotate(${angle}deg) scale(.5)`,
        opacity:0
      },
      {
        transform:
          `translate(-50%,-50%) translate(${dx * .55}px,${dy * .55}px) rotate(${angle}deg) scale(1.1)`,
        opacity:1
      },
      {
        transform:
          `translate(-50%,-50%) translate(${dx}px,${dy}px) rotate(${angle}deg) scale(1.3)`,
        opacity:1
      }
    ],
    {
      duration:700,
      easing:
        "cubic-bezier(.2,.7,.2,1)"
    }
  ).finished.catch(() => {});

  energy.remove();

  createImpact(
    end.x,
    end.y
  );
}

/* =========================================================
   HP
   ========================================================= */

let hp1 = 100;
let hp2 = 100;

function damagePlayer(
  player,
  amount
) {
  if (player === 1) {
    hp1 =
      Math.max(
        0,
        hp1 - amount
      );

    setHP(
      "hp1",
      hp1
    );
  } else {
    hp2 =
      Math.max(
        0,
        hp2 - amount
      );

    setHP(
      "hp2",
      hp2
    );
  }
}

/* =========================================================
   ONE CINEMATIC ROUND
   ========================================================= */

async function battleRound(
  round,
  stats1,
  stats2
) {
  const fighter1 =
    $(".fighter-one");

  const fighter2 =
    $(".fighter-two");

  const attacker =
    stats1 >= stats2
      ? 1
      : 2;

  const attackingFighter =
    attacker === 1
      ? fighter1
      : fighter2;

  const defendingFighter =
    attacker === 1
      ? fighter2
      : fighter1;

  const configs = [
    {
      weapon:"SWORD",
      icon:"⚔️",
      title:"DIAMOND SWORD",
      intro:"⚔️ GPU CLASH",
      attack:"⚔️ DIAMOND SLASH!",
      damage:30
    },
    {
      weapon:"WIND",
      icon:"🔨",
      title:"MACE + WIND BURST",
      intro:"🔨 RAM BRIDGE ASSAULT",
      attack:"🌪️ MACE WIND BURST!",
      damage:35
    },
    {
      weapon:"ENERGY",
      icon:"⚡",
      title:"ENERGY CANNON",
      intro:"✈️ CPU SKY ASSAULT",
      attack:"⚡ ENERGY BLAST!",
      damage:40
    }
  ];

  const config =
    configs[round - 1];

  const attackerName =
    attacker === 1
      ? "PLAYER 1"
      : "PLAYER 2";

  battleMessage(
    config.icon
  );

  showRoundBanner(
    `ROUND ${round} — ${config.title}`
  );

  arenaMessage(
    `ROUND ${round} — ${attackerName} HAS THE ADVANTAGE`
  );

  await wait(600);

  /* =====================================================
     ROUND 1 — GPU / SWORD
     ===================================================== */

  if (round === 1) {
    arenaMessage(
      `${attackerName} DRAWS THE DIAMOND SWORD ⚔️`
    );

    await wait(450);

    arenaMessage(
      `${attackerName} RUNS FORWARD!`
    );

    await moveFighterToAttack(
      attackingFighter,
      attacker
    );

    arenaMessage(
      config.attack
    );

    await attackEffect(
      attacker,
      config.weapon
    );
  }

  /* =====================================================
     ROUND 2 — RAM / BRIDGE / MACE
     ===================================================== */

  if (round === 2) {
    arenaMessage(
      `${attackerName} STARTS BUILDING!`
    );

    await buildBridge(
      attackingFighter,
      attacker
    );

    arenaMessage(
      `${attackerName} JUMPS FROM THE BRIDGE!`
    );

    if (attackingFighter) {
      await attackingFighter.animate(
        [
          {
            transform:
              "translateY(0) scale(1)"
          },
          {
            transform:
              "translateY(-65px) scale(1.03)"
          },
          {
            transform:
              "translateY(0) scale(1)"
          }
        ],
        {
          duration:650,
          easing:
            "cubic-bezier(.2,.8,.2,1)"
        }
      ).finished.catch(() => {});
    }

    await moveFighterToAttack(
      attackingFighter,
      attacker
    );

    arenaMessage(
      config.attack
    );

    await attackEffect(
      attacker,
      config.weapon
    );
  }

  /* =====================================================
     ROUND 3 — CPU / PLANE / PARACHUTE / ENERGY
     ===================================================== */

  if (round === 3) {
    arenaMessage(
      `${attackerName} IS ENTERING FROM THE SKY! ✈️`
    );

    await planeEntrance(
      attackingFighter,
      attacker
    );

    arenaMessage(
      `${attackerName} LANDS AND CHARGES THE ENERGY CANNON ⚡`
    );

    if (attackingFighter) {
      attackingFighter.classList.add(
        "fighter-charge"
      );
    }

    await wait(900);

    if (attackingFighter) {
      attackingFighter.classList.remove(
        "fighter-charge"
      );
    }

    arenaMessage(
      config.attack
    );

    await attackEffect(
      attacker,
      config.weapon
    );
  }

  /* =====================================================
     DEFENDER GETS HIT
     ===================================================== */

  if (defendingFighter) {
    defendingFighter.classList.remove(
      "fighter-hit"
    );

    void defendingFighter.offsetWidth;

    defendingFighter.classList.add(
      "fighter-hit"
    );

    const point =
      getFighterPoint(
        defendingFighter
      );

    if (point) {
      createHitRing(
        point.x,
        point.y
      );
    }

    setTimeout(
      () => {
        defendingFighter.classList.remove(
          "fighter-hit"
        );
      },
      500
    );
  }

  /* =====================================================
     DAMAGE ONLY TO THE PLAYER HIT
     ===================================================== */

  await wait(120);

  damagePlayer(
    attacker === 1
      ? 2
      : 1,
    config.damage
  );

  arenaMessage(
    `${attackerName} DEALS ${config.damage} DAMAGE`
  );

  await wait(450);

  /* =====================================================
     ATTACKER RETURNS HOME
     ===================================================== */

  arenaMessage(
    `${attackerName} RETURNS TO THEIR SIDE!`
  );

  await returnFighter(
    attackingFighter
  );

  await wait(350);

  arenaMessage(
    `ROUND ${round} COMPLETE`
  );

  await wait(650);
}

/* =========================================================
   START BATTLE
   ========================================================= */

let battleRunning = false;

async function startBattle() {
  if (battleRunning) return;

  battleRunning = true;

  const button =
    $("#startBattle");

  const result =
    $("#battleResult");

  if (button) {
    button.disabled = true;

    button.textContent =
      "⚔️ FIGHTING...";
  }

  if (result) {
    result.classList.remove(
      "show"
    );

    result.innerHTML = "";
  }

  /* Reset HP */

  hp1 = 100;
  hp2 = 100;

  setHP(
    "hp1",
    100
  );

  setHP(
    "hp2",
    100
  );

  /* Reset fighters */

  $$(".fighter-one,.fighter-two")
    .forEach(fighter => {
      fighter.classList.remove(
        "fighter-winner",
        "fighter-loser",
        "fighter-hit",
        "fighter-charge"
      );

      fighter.getAnimations()
        .forEach(animation =>
          animation.cancel()
        );

      fighter.style.transform = "";

      fighter._gcAttackDistance = 0;
    });

  const [
    name1,
    name2
  ] = fighterNames();

  const stats1 = [
    getStat("gpu1"),
    getStat("ram1"),
    getStat("cpu1")
  ];

  const stats2 = [
    getStat("gpu2"),
    getStat("ram2"),
    getStat("cpu2")
  ];

  arenaMessage(
    `${name1} VS ${name2}`
  );

  battleMessage(
    "⚔️"
  );

  await countdown();

  let wins1 = 0;
  let wins2 = 0;

  /* =====================================================
     THREE ROUNDS
     ===================================================== */

  for (
    let round = 1;
    round <= 3;
    round++
  ) {
    const roundText =
      $("#roundText");

    if (roundText) {
      roundText.textContent =
        `ROUND ${round} / 3`;
    }

    await battleRound(
      round,
      stats1[round - 1],
      stats2[round - 1]
    );

    if (
      stats1[round - 1] >=
      stats2[round - 1]
    ) {
      wins1++;
    } else {
      wins2++;
    }
  }

  /* =====================================================
     OVERALL WINNER
     ===================================================== */

  const winner =
    wins1 === wins2
      ? hp1 >= hp2
        ? 1
        : 2
      : wins1 > wins2
      ? 1
      : 2;

  const winnerName =
    winner === 1
      ? name1
      : name2;

  const loserName =
    winner === 1
      ? name2
      : name1;

  const winnerFighter =
    winner === 1
      ? $(".fighter-one")
      : $(".fighter-two");

  const loserFighter =
    winner === 1
      ? $(".fighter-two")
      : $(".fighter-one");

  [winnerFighter, loserFighter]
    .filter(Boolean)
    .forEach(fighter => {
      fighter.classList.remove(
        "fighter-hit",
        "fighter-charge"
      );

      fighter.getAnimations()
        .forEach(animation =>
          animation.cancel()
        );

      fighter.style.transform = "";
    });

  if (winnerFighter) {
    winnerFighter.classList.add(
      "fighter-winner"
    );
  }

  if (loserFighter) {
    loserFighter.classList.add(
      "fighter-loser"
    );
  }

  battleMessage(
    "🏆"
  );

  showRoundBanner(
    "🏆 FINAL VICTORY"
  );

  arenaMessage(
    `🏆 ${winnerName.toUpperCase()} WINS THE BATTLE!`
  );

  /* Final victory sparks */

  const point =
    getFighterPoint(
      winnerFighter
    );

  if (point) {
    createImpact(
      point.x,
      point.y
    );

    createSparksAt(
      point.x,
      point.y,
      28
    );
  }

  if (result) {
    result.innerHTML = `
      <div class="victory-title">
        VICTORY
      </div>

      <strong>
        ${winnerName}
      </strong>

      <span>
        ${winnerName} defeated ${loserName}
      </span>

      <small style="
        display:block;
        margin-top:8px;
        opacity:.75;
      ">
        ${name1}: ${wins1} rounds
        &nbsp;•&nbsp;
        ${name2}: ${wins2} rounds
      </small>
    `;

    result.classList.add(
      "show"
    );
  }

  if (button) {
    button.disabled = false;

    button.textContent =
      "⚔️ FIGHT AGAIN";
  }

  battleRunning = false;
}

on(
  "#startBattle",
  "click",
  startBattle
);

/* =========================================================
   PC ANALYSIS
   ========================================================= */

const gameMultipliers = {
  Minecraft: 1.15,
  Fortnite: 0.95,
  Valorant: 1.35,
  "Counter-Strike 2": 1.18,
  "Grand Theft Auto V": 0.85,
  "Apex Legends": 0.92,
  PUBG: 0.90,
  "Rocket League": 1.30,
  "Cyberpunk 2077": 0.58,
  "Red Dead Redemption 2": 0.62,
  "Elden Ring": 0.72,
  "Genshin Impact": 0.90,
  "Forza Horizon 5": 0.68,
  "Call of Duty": 0.82,
  "The Witcher 3": 0.75
};

function getGameMultiplier(game) {
  return gameMultipliers[game] || 0.85;
}

function animateNumber(
  element,
  target,
  duration = 900
) {
  if (!element) return;

  const start =
    performance.now();

  function update(now) {
    const progress =
      Math.min(
        1,
        (now - start) /
          duration
      );

    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );

    element.textContent =
      Math.round(
        target * eased
      );

    if (progress < 1) {
      requestAnimationFrame(
        update
      );
    }
  }

  requestAnimationFrame(
    update
  );
}

function setStage(
  id,
  state
) {
  const stage =
    $("#" + id);

  if (!stage) return;

  stage.classList.remove(
    "active",
    "done"
  );

  if (state) {
    stage.classList.add(
      state
    );
  }
}

async function checkPC() {
  const button =
    $("#checkPcBtn");

  if (button) {
    button.disabled = true;

    button.textContent =
      "SCANNING...";
  }

  const consoleBox =
    $("#analysisConsole");

  const result =
    $("#pcResult");

  if (consoleBox) {
    consoleBox.style.display =
      "block";
  }

  if (result) {
    result.classList.remove(
      "show"
    );
  }

  const stages = [
    ["stageGpu", "GPU", 20],
    ["stageCpu", "CPU", 45],
    ["stageRam", "RAM", 70],
    ["stageGame", "GAME", 100]
  ];

  const messages =
    $("#analysisMessages");

  const progress =
    $("#scanProgress");

  const percent =
    $("#scanPercent");

  const status =
    $("#scanStatus");

  for (
    const [
      id,
      label,
      value
    ] of stages
  ) {
    setStage(
      id,
      "active"
    );

    if (status) {
      status.textContent =
        `ANALYZING ${label}...`;
    }

    if (messages) {
      messages.textContent =
        `> Checking ${label.toLowerCase()} performance...`;
    }

    if (progress) {
      progress.style.width =
        value + "%";
    }

    if (percent) {
      percent.textContent =
        value + "%";
    }

    await wait(700);

    setStage(
      id,
      "done"
    );
  }

  const gpu =
    getStat("checkGpu");

  const cpu =
    getStat("checkCpu");

  const ram =
    getStat("checkRam");

  const game =
    $("#checkGame")?.value ||
    "Minecraft";

  const score =
    Math.round(
      gpu * 0.48 +
      cpu * 0.34 +
      ram * 0.18
    );

  const multiplier =
    getGameMultiplier(
      game
    );

  const fps =
    Math.max(
      15,
      Math.round(
        score * multiplier
      )
    );

  let tier;
  let title;
  let description;

  if (score >= 90) {
    tier = "S";
    title = "BEAST MODE";
    description =
      "Your PC is built for serious gaming.";
  } else if (score >= 78) {
    tier = "A";
    title = "HIGH PERFORMANCE";
    description =
      "Excellent hardware for modern gaming.";
  } else if (score >= 65) {
    tier = "B";
    title = "SOLID GAMER";
    description =
      "A strong setup for most games.";
  } else if (score >= 50) {
    tier = "C";
    title = "MID RANGE";
    description =
      "Good for lighter and competitive games.";
  } else {
    tier = "D";
    title = "ENTRY GAMER";
    description =
      "Best suited for optimized or lighter games.";
  }

  const lowest =
    Math.min(
      gpu,
      cpu,
      ram
    );

  let bottleneck =
    "Balanced";

  if (lowest === gpu) {
    bottleneck = "GPU";
  }

  if (lowest === cpu) {
    bottleneck = "CPU";
  }

  if (lowest === ram) {
    bottleneck = "RAM";
  }

  if (status) {
    status.textContent =
      "SCAN COMPLETE";
  }

  if (messages) {
    messages.textContent =
      "> Analysis complete. Performance profile generated.";
  }

  const scoreElement =
    $("#scoreValue");

  const titleElement =
    $("#performanceTitle");

  const descriptionElement =
    $("#performanceText");

  const fpsElement =
    $("#fpsValue");

  const gpuElement =
    $("#gpuResult");

  const cpuElement =
    $("#cpuResult");

  const ramElement =
    $("#ramResult");

  const bottleneckElement =
    $("#bottleneckValue");

  if (titleElement) {
    titleElement.textContent =
      `${tier} — ${title}`;
  }

  if (descriptionElement) {
    descriptionElement.textContent =
      description;
  }

  if (bottleneckElement) {
    bottleneckElement.textContent =
      bottleneck;
  }

  animateNumber(
    scoreElement,
    score
  );

  animateNumber(
    fpsElement,
    fps
  );

  animateNumber(
    gpuElement,
    gpu
  );

  animateNumber(
    cpuElement,
    cpu
  );

  animateNumber(
    ramElement,
    ram
  );

  if (result) {
    result.classList.add(
      "show"
    );
  }

  if (button) {
    button.disabled = false;

    button.textContent =
      "⚡ SCAN AGAIN";
  }
}

on(
  "#checkPcBtn",
  "click",
  checkPC
);

/* =========================================================
   THEMES
   ========================================================= */

function applyTheme(theme) {
  document.body.classList.remove(
    "theme-inferno",
    "theme-toxic",
    "theme-aqua",
    "theme-midnight",
    "theme-electric"
  );

  if (theme !== "cyber") {
    document.body.classList.add(
      "theme-" + theme
    );
  }

  localStorage.setItem(
    "gamecheckTheme",
    theme
  );

  $$("[data-theme]").forEach(
    button => {
      button.classList.toggle(
        "selected",
        button.dataset.theme ===
          theme
      );
    }
  );
}

const savedTheme =
  localStorage.getItem(
    "gamecheckTheme"
  ) || "cyber";

applyTheme(
  savedTheme
);

$$("[data-theme]").forEach(
  button => {
    button.addEventListener(
      "click",
      () => {
        applyTheme(
          button.dataset.theme
        );

        const modal =
          $("#themeModal");

        if (modal) {
          modal.classList.remove(
            "open"
          );
        }
      }
    );
  }
);

on(
  "#themeBtn",
  "click",
  () => {
    $("#themeModal")?.classList.add(
      "open"
    );
  }
);

/* =========================================================
   MODALS
   ========================================================= */

$$("[data-close]").forEach(
  button => {
    button.addEventListener(
      "click",
      () => {
        const id =
          button.dataset.close;

        $("#" + id)?.classList.remove(
          "open"
        );
      }
    );
  }
);

$$(".modal").forEach(
  modal => {
    modal.addEventListener(
      "click",
      event => {
        if (
          event.target ===
          modal
        ) {
          modal.classList.remove(
            "open"
          );
        }
      }
    );
  }
);

document.addEventListener(
  "keydown",
  event => {
    if (
      event.key ===
      "Escape"
    ) {
      $$(".modal.open").forEach(
        modal =>
          modal.classList.remove(
            "open"
          )
      );
    }
  }
);

/* =========================================================
   LOGIN
   ========================================================= */

function updateLoginButton() {
  const button =
    $("#loginBtn");

  const user =
    localStorage.getItem(
      "gamecheckUser"
    );

  if (button) {
    button.textContent =
      user
        ? `👤 ${user}`
        : "LOGIN";
  }
}

updateLoginButton();

on(
  "#loginBtn",
  "click",
  () => {
    $("#loginModal")?.classList.add(
      "open"
    );

    const input =
      $("#loginName");

    if (input) {
      input.focus();
    }
  }
);

on(
  "#loginSubmit",
  "click",
  () => {
    const input =
      $("#loginName");

    if (!input) return;

    const name =
      input.value.trim();

    if (!name) {
      input.focus();
      return;
    }

    localStorage.setItem(
      "gamecheckUser",
      name
    );

    updateLoginButton();

    $("#loginModal")?.classList.remove(
      "open"
    );

    input.value = "";
  }
);

/* =========================================================
   MOBILE MENU
   ========================================================= */

const nav =
  $(".navbar nav");

on(
  "#menuBtn",
  "click",
  () => {
    if (!nav) return;

    nav.classList.toggle(
      "mobile-open"
    );

    const button =
      $("#menuBtn");

    if (button) {
      button.textContent =
        nav.classList.contains(
          "mobile-open"
        )
          ? "✕"
          : "☰";
    }
  }
);

$$(".navbar nav a").forEach(
  link => {
    link.addEventListener(
      "click",
      () => {
        nav?.classList.remove(
          "mobile-open"
        );

        const button =
          $("#menuBtn");

        if (button) {
          button.textContent =
            "☰";
        }
      }
    );
  }
);

/* =========================================================
   FRIENDS
   ========================================================= */

let friends = [];

try {
  friends =
    JSON.parse(
      localStorage.getItem(
        "gamecheckFriends"
      ) || "[]"
    );
} catch {
  friends = [];
}

function renderFriends() {
  const list =
    $("#friendList");

  if (!list) return;

  if (!friends.length) {
    list.innerHTML = `
      <div class="friend-card">
        <strong>No friends yet</strong>
        <small>
          Add your first gaming friend.
        </small>
      </div>
    `;

    return;
  }

  list.innerHTML = "";

  friends.forEach(
    (friend, index) => {
      const card =
        document.createElement(
          "div"
        );

      card.className =
        "friend-card";

      card.innerHTML = `
        <strong>👤 ${friend}</strong>

        <small class="online">
          ● Online
        </small>

        <button
          data-remove-friend="${index}"
          style="
            margin-top:12px;
            padding:8px 12px;
            border:1px solid var(--border);
            border-radius:8px;
            background:rgba(255,255,255,.04);
            color:white;
            cursor:pointer;
          "
        >
          Remove
        </button>
      `;

      list.appendChild(
        card
      );
    }
  );

  $$("[data-remove-friend]")
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          const index =
            Number(
              button.dataset
                .removeFriend
            );

          friends.splice(
            index,
            1
          );

          localStorage.setItem(
            "gamecheckFriends",
            JSON.stringify(
              friends
            )
          );

          renderFriends();
        }
      );
    });
}

on(
  "#addFriend",
  "click",
  () => {
    const name =
      prompt(
        "Enter your friend's username:"
      );

    if (!name) return;

    const cleanName =
      name.trim();

    if (!cleanName) return;

    friends.push(
      cleanName
    );

    localStorage.setItem(
      "gamecheckFriends",
      JSON.stringify(
        friends
      )
    );

    renderFriends();
  }
);

renderFriends();

/* =========================================================
   COUNTERS
   ========================================================= */

$$("[data-target]").forEach(
  element => {
    const target =
      Number(
        element.dataset.target
      ) || 0;

    animateNumber(
      element,
      target,
      1200
    );
  }
);

/* =========================================================
   SCROLL REVEAL
   ========================================================= */

if (
  "IntersectionObserver" in
  window
) {
  const observer =
    new IntersectionObserver(
      entries => {
        entries.forEach(
          entry => {
            if (
              entry.isIntersecting
            ) {
              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          }
        );
      },
      {
        threshold:0.08
      }
    );

  $$(".section,.game-card")
    .forEach(element => {
      element.classList.add(
        "reveal"
      );

      observer.observe(
        element
      );
    });
} else {
  $$(".section,.game-card")
    .forEach(element => {
      element.classList.add(
        "visible"
      );
    });
}

/* =========================================================
   PARTICLES
   ========================================================= */

function createParticles() {
  const container =
    $("#particles");

  if (!container) return;

  if (
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    return;
  }

  const amount =
    window.innerWidth < 650
      ? 8
      : 18;

  for (
    let i = 0;
    i < amount;
    i++
  ) {
    const particle =
      document.createElement(
        "span"
      );

    particle.className =
      "particle";

    particle.style.left =
      Math.random() * 100 +
      "%";

    particle.style.animationDuration =
      8 +
      Math.random() * 12 +
      "s";

    particle.style.animationDelay =
      -Math.random() * 12 +
      "s";

    container.appendChild(
      particle
    );
  }
}

createParticles();

/* =========================================================
   SOUND SYSTEM
   ========================================================= */

let audioContext = null;

function initAudio() {
  if (!audioContext) {
    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if (AudioContext) {
      audioContext =
        new AudioContext();
    }
  }

  if (
    audioContext &&
    audioContext.state ===
      "suspended"
  ) {
    audioContext.resume();
  }
}

function tone(
  frequency,
  duration = 0.1
) {
  if (!audioContext) return;

  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();

  oscillator.frequency.value =
    frequency;

  oscillator.type =
    "sine";

  gain.gain.setValueAtTime(
    0.0001,
    audioContext.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.08,
    audioContext.currentTime +
      0.01
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime +
      duration
  );

  oscillator.connect(
    gain
  );

  gain.connect(
    audioContext.destination
  );

  oscillator.start();

  oscillator.stop(
    audioContext.currentTime +
      duration
  );
}

let soundEnabled =
  localStorage.getItem(
    "gamecheckSound"
  ) !== "off";

function createSoundToggle() {
  if ($("#soundToggle")) {
    return;
  }

  const button =
    document.createElement(
      "button"
    );

  button.id =
    "soundToggle";

  button.title =
    "Toggle sound";

  button.textContent =
    soundEnabled
      ? "🔊"
      : "🔇";

  document.body.appendChild(
    button
  );

  button.addEventListener(
    "click",
    () => {
      soundEnabled =
        !soundEnabled;

      localStorage.setItem(
        "gamecheckSound",
        soundEnabled
          ? "on"
          : "off"
      );

      button.textContent =
        soundEnabled
          ? "🔊"
          : "🔇";

      if (soundEnabled) {
        initAudio();
        tone(700, 0.12);
      }
    }
  );
}

createSoundToggle();

document.addEventListener(
  "click",
  event => {
    if (!soundEnabled) return;

    if (
      event.target.closest(
        "button,.primary-btn,.secondary-btn,.battle-btn"
      )
    ) {
      initAudio();
      tone(520, 0.06);
    }
  }
);

/* =========================================================
   PREVENT UNWANTED AUTO-SCROLL
   ========================================================= */

if (
  "scrollRestoration" in
  history
) {
  history.scrollRestoration =
    "manual";
}

/* =========================================================
   LOADER — GUARANTEED TO DISAPPEAR
   ========================================================= */

function hideLoader() {
  const loader =
    $("#loader");

  if (!loader) return;

  loader.classList.add(
    "loaded"
  );

  loader.classList.add(
    "hidden"
  );

  setTimeout(() => {
    loader.style.display =
      "none";
  }, 700);
}

window.addEventListener(
  "load",
  () => {
    setTimeout(
      hideLoader,
      500
    );
  }
);

/* Emergency fallback */

setTimeout(
  hideLoader,
  3000
);

/* =========================================================
   FINAL INIT
   ========================================================= */

console.log(
  "%cGAMECHECK V4 ONLINE",
  "color:#00e5ff;font-size:20px;font-weight:bold"
);

console.log(
  "%cCINEMATIC VS ENGINE ONLINE",
  "color:#7c5cff;font-size:14px;font-weight:bold"
);

console.log(
  "%cMade by AUK",
  "color:#7c5cff;font-size:14px;font-weight:bold"
);
