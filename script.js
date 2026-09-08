/* =========================================================
   GAMECHECK V4 — MADE BY AUK
   FULL FIXED / MATCHED VERSION
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
   VS BATTLE
   ========================================================= */

function getStat(id) {
  const element = $("#" + id);

  return element
    ? Number(element.value) || 0
    : 0;
}

function setHP(id, value) {
  const bar = $("#" + id);

  if (!bar) return;

  value = Math.max(
    0,
    Math.min(100, value)
  );

  bar.style.width = value + "%";

  const parent = bar.closest(".hp-side");

  if (parent) {
    const number =
      parent.querySelector(".hp-number");

    if (number) {
      number.textContent = Math.round(value);
    }
  }

  /* Fallback for the current HTML IDs */
  if (id === "hp1") {
    const number1 = $("#hpNumber1");

    if (number1) {
      number1.textContent = Math.round(value);
    }
  }

  if (id === "hp2") {
    const number2 = $("#hpNumber2");

    if (number2) {
      number2.textContent = Math.round(value);
    }
  }
}

function fighterNames() {
  const name1 =
    $("#player1")?.value.trim() ||
    "PLAYER 1";

  const name2 =
    $("#player2")?.value.trim() ||
    "PLAYER 2";

  if ($("#fighterName1")) {
    $("#fighterName1").textContent = name1;
  }

  if ($("#fighterName2")) {
    $("#fighterName2").textContent = name2;
  }

  return [name1, name2];
}

function battleMessage(text) {
  const weapon = $("#weapon");

  if (weapon) {
    weapon.textContent = text;
  }
}

function flashArena() {
  const arena = $("#battleArena");

  if (!arena) return;

  arena.classList.remove("arena-shake");

  void arena.offsetWidth;

  arena.classList.add("arena-shake");

  const flash =
    document.createElement("div");

  flash.className = "battle-flash";

  arena.appendChild(flash);

  setTimeout(() => flash.remove(), 400);
}

function createSparks() {
  const arena = $("#battleArena");

  if (!arena) return;

  for (let i = 0; i < 10; i++) {
    const spark =
      document.createElement("div");

    spark.className = "battle-spark";

    spark.style.setProperty(
      "--x",
      `${Math.random() * 260 - 130}px`
    );

    spark.style.setProperty(
      "--y",
      `${Math.random() * 180 - 90}px`
    );

    arena.appendChild(spark);

    setTimeout(
      () => spark.remove(),
      700
    );
  }
}

async function countdown() {
  const element = $("#countdown");

  if (!element) return;

  for (const number of [
    "3",
    "2",
    "1",
    "GO!"
  ]) {
    element.textContent = number;

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
}

function attackEffect(side, weapon) {
  const arena = $("#battleArena");

  if (!arena) return;

  let effect;

  if (weapon === "SWORD") {
    effect =
      document.createElement("div");

    effect.className =
      "battle-slash " +
      (side === 1
        ? "slash-left"
        : "slash-right");
  } else {
    effect =
      document.createElement("div");

    effect.className =
      "battle-projectile " +
      (side === 1
        ? "projectile-left"
        : "projectile-right");
  }

  arena.appendChild(effect);

  setTimeout(
    () => effect.remove(),
    800
  );

  flashArena();
  createSparks();
}

let hp1 = 100;
let hp2 = 100;

function damagePlayer(player, amount) {
  if (player === 1) {
    hp1 = Math.max(
      0,
      hp1 - amount
    );

    setHP("hp1", hp1);
  } else {
    hp2 = Math.max(
      0,
      hp2 - amount
    );

    setHP("hp2", hp2);
  }
}

async function battleRound(
  round,
  stats1,
  stats2
) {
  const fighter1 =
    $(".fighter-one");

  const fighter2 =
    $(".fighter-two");

  const types = [
    "SWORD",
    "BLASTER",
    "ROCKET"
  ];

  const weapon =
    types[round - 1];

  battleMessage(
    weapon === "SWORD"
      ? "⚔️"
      : weapon === "BLASTER"
      ? "🔫"
      : "🚀"
  );

  if (fighter1) {
    fighter1.classList.add(
      "fighter-charge"
    );

    setTimeout(
      () =>
        fighter1.classList.remove(
          "fighter-charge"
        ),
      600
    );
  }

  if (fighter2) {
    fighter2.classList.add(
      "fighter-charge"
    );

    setTimeout(
      () =>
        fighter2.classList.remove(
          "fighter-charge"
        ),
      600
    );
  }

  await wait(450);

  const damage = [
    30,
    35,
    40
  ][round - 1];

  if (stats1 >= stats2) {
    attackEffect(
      1,
      weapon
    );

    if (fighter2) {
      fighter2.classList.add(
        "fighter-hit"
      );

      setTimeout(
        () =>
          fighter2.classList.remove(
            "fighter-hit"
          ),
        500
      );
    }

    await wait(250);

    damagePlayer(
      2,
      damage
    );
  } else {
    attackEffect(
      2,
      weapon
    );

    if (fighter1) {
      fighter1.classList.add(
        "fighter-hit"
      );

      setTimeout(
        () =>
          fighter1.classList.remove(
            "fighter-hit"
          ),
        500
      );
    }

    await wait(250);

    damagePlayer(
      1,
      damage
    );
  }

  await wait(750);
}

async function startBattle() {
  const button =
    $("#startBattle");

  const result =
    $("#battleResult");

  if (button) {
    button.disabled = true;
    button.textContent = "⚔️ FIGHTING...";
  }

  if (result) {
    result.classList.remove("show");
    result.innerHTML = "";
  }

  hp1 = 100;
  hp2 = 100;

  setHP("hp1", 100);
  setHP("hp2", 100);

  $$(".fighter-one,.fighter-two")
    .forEach(fighter => {
      fighter.classList.remove(
        "fighter-winner",
        "fighter-loser"
      );
    });

  const [
    name1,
    name2
  ] = fighterNames();

  const gpu1 =
    getStat("gpu1");

  const cpu1 =
    getStat("cpu1");

  const ram1 =
    getStat("ram1");

  const gpu2 =
    getStat("gpu2");

  const cpu2 =
    getStat("cpu2");

  const ram2 =
    getStat("ram2");

  const stats1 = [
    gpu1,
    cpu1,
    ram1
  ];

  const stats2 = [
    gpu2,
    cpu2,
    ram2
  ];

  await countdown();

  let wins1 = 0;
  let wins2 = 0;

  for (
    let round = 1;
    round <= 3;
    round++
  ) {
    if ($("#roundText")) {
      $("#roundText").textContent =
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

    if (
      hp1 <= 0 ||
      hp2 <= 0
    ) {
      break;
    }
  }

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

  battleMessage("🏆");

  if (result) {
    result.innerHTML = `
      <div class="victory-title">
        VICTORY
      </div>

      <strong>${winnerName}</strong>

      <span>
        ${winnerName} defeated ${loserName}
      </span>
    `;

    result.classList.add("show");
  }

  if (button) {
    button.disabled = false;
    button.textContent =
      "⚔️ FIGHT AGAIN";
  }
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

  /* Read hardware values */

  const gpu =
    getStat("checkGpu");

  const cpu =
    getStat("checkCpu");

  const ram =
    getStat("checkRam");

  const game =
    $("#checkGame")?.value ||
    "Minecraft";

  /* Calculate PC score */

  const score =
    Math.round(
      gpu * 0.48 +
      cpu * 0.34 +
      ram * 0.18
    );

  /* Calculate estimated FPS */

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

  /* Performance tier */

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

  /* Bottleneck */

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

  /* =====================================================
     IMPORTANT:
     These IDs MATCH the HTML.
     This fixes the 0 / empty result bug.
     ===================================================== */

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

  /* Write results */

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

  /* Animate numbers */

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
        threshold: 0.08
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
  "%cMade by AUK",
  "color:#7c5cff;font-size:14px;font-weight:bold"
);
