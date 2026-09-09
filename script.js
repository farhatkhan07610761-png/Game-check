/* =========================================================
   GAMECHECK V4 — MADE BY AUK
   FULL FIXED / MATCHED VERSION
   ========================================================= */

"use strict"

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
   VS BATTLE — GOAT ANIMATION SYSTEM
   ========================================================= */

/*
   This section intentionally uses Web Animations API.
   That means the fighter movement is calculated from
   the REAL positions of the two fighters instead of
   using a tiny hard-coded 55px movement.
*/

function installBattleAnimationStyles() {
  if (document.getElementById("gamecheckBattleFX")) {
    return;
  }

  const style = document.createElement("style");

  style.id = "gamecheckBattleFX";

  style.textContent = `
    .battle-arena .fighter {
      position: relative;
      z-index: 10;
      will-change: transform, filter;
    }

    .battle-arena .fighter-body {
      will-change: transform, filter;
    }

    .battle-arena .battle-slash,
    .battle-arena .battle-projectile {
      pointer-events: none;
      opacity: 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      will-change: transform, opacity;
    }

    .battle-arena .battle-energy {
      position: absolute;
      pointer-events: none;
      z-index: 25;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: white;
      box-shadow:
        0 0 8px white,
        0 0 20px #00e5ff,
        0 0 45px #7c5cff,
        0 0 75px #00e5ff;
      will-change: transform, opacity;
    }

    @keyframes gcSpark {
      from {
        transform:
          translate(-50%, -50%)
          translate(0, 0)
          scale(1);
        opacity: 1;
      }

      to {
        transform:
          translate(-50%, -50%)
          translate(var(--x), var(--y))
          scale(.1);
        opacity: 0;
      }
    }

    .battle-spark {
      animation:
        gcSpark .65s
        cubic-bezier(.2,.8,.2,1)
        forwards;
    }

    @keyframes gcFighterHit {
      0%,
      100% {
        transform:
          translateX(0)
          rotate(0)
          scale(1);
        filter: none;
      }

      18% {
        transform:
          translateX(var(--gc-hit-x, -10px))
          rotate(-5deg)
          scale(.94);
        filter: brightness(1.9);
      }

      38% {
        transform:
          translateX(var(--gc-hit-x, 10px))
          rotate(5deg)
          scale(1.04);
      }

      58% {
        transform:
          translateX(var(--gc-hit-x, -6px))
          rotate(-2deg)
          scale(1);
      }
    }

    .fighter-hit {
      animation:
        gcFighterHit .45s ease-out;
    }

    @keyframes gcWinner {
      0%,
      100% {
        transform: translateY(0) scale(1);
      }

      50% {
        transform: translateY(-12px) scale(1.08);
      }
    }

    .fighter-winner {
      animation:
        gcWinner .7s ease-in-out infinite;
    }

    .fighter-loser {
      opacity: .45;
      filter: grayscale(.8);
      transform: translateY(8px) scale(.92);
    }

    @keyframes gcSkyDrop {
      0% {
        transform:
          translateY(-180px)
          scale(.65);
        opacity: 0;
      }

      55% {
        transform:
          translateY(-55px)
          scale(.9);
        opacity: 1;
      }

      100% {
        transform:
          translateY(0)
          scale(1);
        opacity: 1;
      }
    }

    .gc-sky {
      animation:
        gcSkyDrop .75s
        cubic-bezier(.2,.8,.2,1);
    }

    .gc-energy-charge {
      filter:
        brightness(1.7)
        drop-shadow(0 0 18px #00e5ff)
        drop-shadow(0 0 35px #7c5cff);
    }
  `;

  document.head.appendChild(style);
}

installBattleAnimationStyles();

/* =========================================================
   STAT HELPERS
   ========================================================= */

function getStat(id) {
  const element = $("#" + id);
  return element ? Number(element.value) || 0 : 0;
}

function setHP(id, value) {
  const bar = $("#" + id);

  if (!bar) return;

  value = Math.max(
    0,
    Math.min(100, value)
  );

  bar.style.width = value + "%";

  const number =
    id === "hp1"
      ? $("#hpNumber1")
      : $("#hpNumber2");

  if (number) {
    number.textContent =
      Math.round(value);
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
    $("#fighterName1").textContent =
      name1;
  }

  if ($("#fighterName2")) {
    $("#fighterName2").textContent =
      name2;
  }

  if ($("#hpName1")) {
    $("#hpName1").textContent =
      name1;
  }

  if ($("#hpName2")) {
    $("#hpName2").textContent =
      name2;
  }

  return [name1, name2];
}

function battleMessage(text) {
  const weapon = $("#weapon");

  if (weapon) {
    weapon.textContent = text;
  }
}

function arenaMessage(text) {
  const arenaText =
    $("#arenaText");

  if (arenaText) {
    arenaText.textContent =
      text;
  }
}

/* =========================================================
   ARENA EFFECTS
   ========================================================= */

function flashArena() {
  const arena =
    $("#battleArena");

  if (!arena) return;

  arena.classList.remove(
    "arena-shake"
  );

  void arena.offsetWidth;

  arena.classList.add(
    "arena-shake"
  );

  const flash =
    document.createElement("div");

  flash.className =
    "battle-flash";

  arena.appendChild(
    flash
  );

  setTimeout(
    () => flash.remove(),
    400
  );
}

function createSparksAt(x, y) {
  const arena =
    $("#battleArena");

  if (!arena) return;

  for (
    let i = 0;
    i < 14;
    i++
  ) {
    const spark =
      document.createElement("div");

    spark.className =
      "battle-spark";

    spark.style.position =
      "absolute";

    spark.style.left =
      x + "px";

    spark.style.top =
      y + "px";

    spark.style.width =
      "7px";

    spark.style.height =
      "7px";

    spark.style.borderRadius =
      "50%";

    spark.style.background =
      "white";

    spark.style.boxShadow =
      "0 0 10px white";

    spark.style.zIndex =
      "30";

    spark.style.setProperty(
      "--x",
      `${Math.random() * 220 - 110}px`
    );

    spark.style.setProperty(
      "--y",
      `${Math.random() * 160 - 80}px`
    );

    arena.appendChild(
      spark
    );

    setTimeout(
      () => spark.remove(),
      700
    );
  }
}

function createSparks() {
  const arena =
    $("#battleArena");

  if (!arena) return;

  const rect =
    arena.getBoundingClientRect();

  createSparksAt(
    rect.width / 2,
    rect.height / 2
  );
}

/* =========================================================
   COUNTDOWN
   ========================================================= */

async function countdown() {
  const element =
    $("#countdown");

  arenaMessage(
    "GET READY..."
  );

  if (!element) {
    await wait(500);
    return;
  }

  for (
    const number of [
      "3",
      "2",
      "1",
      "GO!"
    ]
  ) {
    element.textContent =
      number;

    arenaMessage(
      number === "GO!"
        ? "FIGHT!"
        : `BATTLE STARTING... ${number}`
    );

    element.classList.remove(
      "count-pop"
    );

    void element.offsetWidth;

    element.classList.add(
      "count-pop"
    );

    await wait(
      number === "GO!"
        ? 600
        : 700
    );
  }

  element.textContent =
    "";

  arenaMessage(
    "FIGHT!"
  );
}

/* =========================================================
   FIND REAL ATTACK POSITIONS
   ========================================================= */

function getBattlePositions(
  attacker,
  defender
) {
  const arena =
    $("#battleArena");

  if (
    !arena ||
    !attacker ||
    !defender
  ) {
    return null;
  }

  const arenaRect =
    arena.getBoundingClientRect();

  const attackerRect =
    attacker.getBoundingClientRect();

  const defenderRect =
    defender.getBoundingClientRect();

  return {
    startX:
      attackerRect.left +
      attackerRect.width / 2 -
      arenaRect.left,

    startY:
      attackerRect.top +
      attackerRect.height * .42 -
      arenaRect.top,

    endX:
      defenderRect.left +
      defenderRect.width / 2 -
      arenaRect.left,

    endY:
      defenderRect.top +
      defenderRect.height * .42 -
      arenaRect.top
  };
}

/* =========================================================
   ATTACK EFFECT
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
    await wait(250);
    return;
  }

  const positions =
    getBattlePositions(
      attacker,
      defender
    );

  if (!positions) {
    await wait(250);
    return;
  }

  const {
    startX,
    startY,
    endX,
    endY
  } = positions;

  const dx =
    endX - startX;

  const dy =
    endY - startY;

  const distance =
    Math.hypot(
      dx,
      dy
    );

  /* =====================================================
     SWORD
     ===================================================== */

  if (
    weapon === "SWORD"
  ) {
    const slash =
      document.createElement(
        "div"
      );

    slash.className =
      "battle-slash";

    slash.style.position =
      "absolute";

    slash.style.left =
      startX + "px";

    slash.style.top =
      startY + "px";

    slash.style.width =
      Math.max(
        100,
        Math.min(
          190,
          distance * .45
        )
      ) + "px";

    slash.style.height =
      "12px";

    slash.style.borderRadius =
      "999px";

    slash.style.background =
      "linear-gradient(90deg,transparent,white,var(--accent),transparent)";

    slash.style.boxShadow =
      "0 0 12px white,0 0 30px var(--accent)";

    slash.style.zIndex =
      "25";

    arena.appendChild(
      slash
    );

    const angle =
      Math.atan2(
        dy,
        dx
      ) *
      180 /
      Math.PI;

    const animation =
      slash.animate(
        [
          {
            transform:
              `translate(-50%,-50%) rotate(${angle}deg) scale(.5)`,
            opacity: 0
          },

          {
            transform:
              `translate(-50%,-50%) rotate(${angle}deg) scale(1.1)`,
            opacity: 1
          },

          {
            transform:
              `translate(-50%,-50%) rotate(${angle}deg) scale(.9)`,
            opacity: 0
          }
        ],
        {
          duration: 360,
          easing:
            "cubic-bezier(.2,.8,.2,1)",
          fill: "forwards"
        }
      );

    try {
      await animation.finished;
    } catch {}

    slash.remove();

    flashArena();

    createSparksAt(
      endX,
      endY
    );

    return;
  }

  /* =====================================================
     ENERGY ATTACK
     ===================================================== */

  const projectile =
    document.createElement(
      "div"
    );

  projectile.className =
    "battle-energy";

  projectile.style.left =
    startX + "px";

  projectile.style.top =
    startY + "px";

  arena.appendChild(
    projectile
  );

  const angle =
    Math.atan2(
      dy,
      dx
    ) *
    180 /
    Math.PI;

  const duration =
    Math.min(
      650,
      Math.max(
        300,
        distance * 1.5
      )
    );

  const animation =
    projectile.animate(
      [
        {
          transform:
            `translate(-50%,-50%) translate(0,0) rotate(${angle}deg) scale(.4)`,
          opacity: 0
        },

        {
          transform:
            `translate(-50%,-50%) translate(${dx * .5}px,${dy * .5}px) rotate(${angle}deg) scale(1)`,
          opacity: 1
        },

        {
          transform:
            `translate(-50%,-50%) translate(${dx}px,${dy}px) rotate(${angle}deg) scale(1.15)`,
          opacity: 1
        }
      ],
      {
        duration,
        easing:
          "cubic-bezier(.15,.75,.2,1)",
        fill: "forwards"
      }
    );

  try {
    await animation.finished;
  } catch {}

  projectile.remove();

  flashArena();

  createSparksAt(
    endX,
    endY
  );
}

/* =========================================================
   REAL FIGHTER MOVEMENT
   ========================================================= */

async function moveFighterToAttack(
  fighter,
  side
) {
  if (!fighter) {
    await wait(300);
    return;
  }

  const arena =
    $("#battleArena");

  const opponent =
    side === 1
      ? $(".fighter-two")
      : $(".fighter-one");

  if (
    !arena ||
    !opponent
  ) {
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

  /*
     Keep a visible fighting gap.
     The distance is calculated from the actual
     screen positions, so it works on phones too.
  */

  const fightingGap =
    Math.max(
      48,
      Math.min(
        78,
        (
          fighterRect.width +
          opponentRect.width
        ) * .30
      )
    );

  let distance =
    opponentCenter -
    fighterCenter;

  if (side === 1) {
    distance -=
      fightingGap;
  } else {
    distance +=
      fightingGap;
  }

  const maxTravel =
    arenaRect.width *
    .42;

  distance =
    Math.max(
      -maxTravel,
      Math.min(
        maxTravel,
        distance
      )
    );

  const duration =
    Math.min(
      850,
      Math.max(
        420,
        Math.abs(distance) *
          2
      )
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
            `translateX(${distance}px) scale(1.05)`
        }
      ],
      {
        duration,
        easing:
          "cubic-bezier(.16,.84,.24,1)",
        fill: "forwards"
      }
    );

  fighter._gcAttackDistance =
    distance;

  try {
    await animation.finished;
  } catch {
    await wait(
      duration
    );
  }
}

/* =========================================================
   RETURN FIGHTER
   ========================================================= */

async function returnFighter(
  fighter
) {
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
            `translateX(${distance}px) scale(1.05)`
        },

        {
          transform:
            "translateX(0) scale(1)"
        }
      ],
      {
        duration: 480,
        easing:
          "cubic-bezier(.2,.8,.2,1)",
        fill: "forwards"
      }
    );

  try {
    await animation.finished;
  } catch {
    await wait(480);
  }

  animation.cancel();

  fighter.style.transform =
    "";

  fighter._gcAttackDistance =
    0;
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
  /*
     IMPORTANT:
     This function is only called AFTER an attack
     has successfully reached the defender.

     No idle damage exists.
  */

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
   ONE ROUND
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

  /*
     Stronger component wins the round.
     Tie = Player 1, matching the previous logic.
  */

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
      weapon: "SWORD",
      icon: "⚔️",
      title: "DIAMOND SWORD",
      attack:
        "⚔️ DIAMOND SWORD — SLASH!",
      damage: 30
    },

    {
      weapon: "WIND",
      icon: "🔨",
      title: "MACE + WIND BURST",
      attack:
        "🌪️ MACE + WIND BURST!",
      damage: 35
    },

    {
      weapon: "ENERGY",
      icon: "⚡",
      title: "ENERGY CANNON",
      attack:
        "⚡ ENERGY CANNON — BLAST!",
      damage: 40
    }
  ];

  const config =
    configs[
      round - 1
    ];

  battleMessage(
    config.icon
  );

  arenaMessage(
    `ROUND ${round} — ${
      attacker === 1
        ? "PLAYER 1"
        : "PLAYER 2"
    } ${config.title}`
  );

  await wait(450);

  /* =====================================================
     ROUND 3 — SKY ENTRY EFFECT
     ===================================================== */

  if (
    round === 3 &&
    attackingFighter
  ) {
    attackingFighter.classList.add(
      "gc-sky"
    );

    await wait(700);

    attackingFighter.classList.remove(
      "gc-sky"
    );

    battleMessage(
      "⚡"
    );

    arenaMessage(
      `${
        attacker === 1
          ? "PLAYER 1"
          : "PLAYER 2"
      } CHARGES ENERGY CANNON`
    );

    if (
      attackingFighter
    ) {
      attackingFighter.classList.add(
        "gc-energy-charge"
      );

      await wait(450);

      attackingFighter.classList.remove(
        "gc-energy-charge"
      );
    }
  }

  /* =====================================================
     MOVE TOWARD OPPONENT
     ===================================================== */

  arenaMessage(
    `${
      attacker === 1
        ? "PLAYER 1"
        : "PLAYER 2"
    } MOVES IN...`
  );

  await moveFighterToAttack(
    attackingFighter,
    attacker
  );

  /* =====================================================
     ATTACK
     ===================================================== */

  arenaMessage(
    config.attack
  );

  await attackEffect(
    attacker,
    config.weapon
  );

  /* =====================================================
     DEFENDER HIT
     ===================================================== */

  if (
    defendingFighter
  ) {
    const hitX =
      attacker === 1
        ? "10px"
        : "-10px";

    defendingFighter.style.setProperty(
      "--gc-hit-x",
      hitX
    );

    defendingFighter.classList.remove(
      "fighter-hit"
    );

    void defendingFighter.offsetWidth;

    defendingFighter.classList.add(
      "fighter-hit"
    );

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
     DAMAGE ONLY THE PLAYER WHO WAS HIT
     ===================================================== */

  await wait(140);

  damagePlayer(
    attacker === 1
      ? 2
      : 1,
    config.damage
  );

  arenaMessage(
    `${
      attacker === 1
        ? "PLAYER 1"
        : "PLAYER 2"
    } DEALS ${config.damage} DAMAGE`
  );

  await wait(300);

  /* =====================================================
     RETURN TO STARTING SIDE
     ===================================================== */

  arenaMessage(
    `${
      attacker === 1
        ? "PLAYER 1"
        : "PLAYER 2"
    } RETURNS`
  );

  await returnFighter(
    attackingFighter,
    attacker
  );

  await wait(300);

  arenaMessage(
    `ROUND ${round} COMPLETE`
  );

  await wait(550);
}

/* =========================================================
   START BATTLE
   ========================================================= */

let battleRunning =
  false;

async function startBattle() {
  if (battleRunning) {
    return;
  }

  battleRunning =
    true;

  const button =
    $("#startBattle");

  const result =
    $("#battleResult");

  if (button) {
    button.disabled =
      true;

    button.textContent =
      "⚔️ FIGHTING...";
  }

  if (result) {
    result.classList.remove(
      "show"
    );

    result.innerHTML =
      "";
  }

  /* =====================================================
     RESET HP
     ===================================================== */

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

  /* =====================================================
     RESET FIGHTERS
     ===================================================== */

  $$(".fighter-one,.fighter-two")
    .forEach(
      fighter => {
        fighter
          .getAnimations()
          .forEach(
            animation =>
              animation.cancel()
          );

        fighter.classList.remove(
          "fighter-winner",
          "fighter-loser",
          "fighter-hit",
          "fighter-charge",
          "gc-sky",
          "gc-energy-charge"
        );

        fighter.style.transform =
          "";

        fighter._gcAttackDistance =
          0;
      }
    );

  const [
    name1,
    name2
  ] =
    fighterNames();

  /* =====================================================
     READ COMPONENT STATS
     ===================================================== */

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
    if (
      hp1 <= 0 ||
      hp2 <= 0
    ) {
      break;
    }

    const roundText =
      $("#roundText");

    if (roundText) {
      roundText.textContent =
        `ROUND ${round} / 3`;
    }

    const stat1 =
      stats1[
        round - 1
      ];

    const stat2 =
      stats2[
        round - 1
      ];

    if (
      stat1 >= stat2
    ) {
      wins1++;
    } else {
      wins2++;
    }

    await battleRound(
      round,
      stat1,
      stat2
    );
  }

  /* =====================================================
     FIND OVERALL WINNER
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

  /* =====================================================
     FINAL ANIMATION
     ===================================================== */

  [
    winnerFighter,
    loserFighter
  ]
    .filter(Boolean)
    .forEach(
      fighter => {
        fighter.classList.remove(
          "fighter-hit",
          "fighter-charge",
          "gc-energy-charge"
        );

        fighter.style.transform =
          "";
      }
    );

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

  arenaMessage(
    `🏆 ${winnerName.toUpperCase()} WINS!`
  );

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

      <span>
        ${name1}: ${wins1} round${wins1 === 1 ? "" : "s"}
        &nbsp; • &nbsp;
        ${name2}: ${wins2} round${wins2 === 1 ? "" : "s"}
      </span>
    `;

    result.classList.add(
      "show"
    );
  }

  await wait(1500);

  if (button) {
    button.disabled =
      false;

    button.textContent =
      "⚔️ FIGHT AGAIN";
  }

  battleRunning =
    false;
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

    if (
      progress < 1
    ) {
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
    button.disabled =
      true;

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
    [
      "stageGpu",
      "GPU",
      20
    ],
    [
      "stageCpu",
      "CPU",
      45
    ],
    [
      "stageRam",
      "RAM",
      70
    ],
    [
      "stageGame",
      "GAME",
      100
    ]
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

    await wait(
      700
    );

    setStage(
      id,
      "done"
    );
  }

  /* =====================================================
     READ HARDWARE
     ===================================================== */

  const gpu =
    getStat("checkGpu");

  const cpu =
    getStat("checkCpu");

  const ram =
    getStat("checkRam");

  const game =
    $("#checkGame")?.value ||
    "Minecraft";

  /* =====================================================
     CALCULATE SCORE
     ===================================================== */

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
        score *
          multiplier
      )
    );

  /* =====================================================
     PERFORMANCE TIER
     ===================================================== */

  let tier;
  let title;
  let description;

  if (
    score >= 90
  ) {
    tier = "S";
    title =
      "BEAST MODE";

    description =
      "Your PC is built for serious gaming.";
  } else if (
    score >= 78
  ) {
    tier = "A";
    title =
      "HIGH PERFORMANCE";

    description =
      "Excellent hardware for modern gaming.";
  } else if (
    score >= 65
  ) {
    tier = "B";
    title =
      "SOLID GAMER";

    description =
      "A strong setup for most games.";
  } else if (
    score >= 50
  ) {
    tier = "C";
    title =
      "MID RANGE";

    description =
      "Good for lighter and competitive games.";
  } else {
    tier = "D";
    title =
      "ENTRY GAMER";

    description =
      "Best suited for optimized or lighter games.";
  }

  /* =====================================================
     BOTTLENECK
     ===================================================== */

  const lowest =
    Math.min(
      gpu,
      cpu,
      ram
    );

  let bottleneck =
    "Balanced";

  if (
    lowest === gpu
  ) {
    bottleneck =
      "GPU";
  }

  if (
    lowest === cpu
  ) {
    bottleneck =
      "CPU";
  }

  if (
    lowest === ram
  ) {
    bottleneck =
      "RAM";
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
     RESULT ELEMENTS
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

  /* =====================================================
     WRITE RESULTS
     ===================================================== */

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

  /* =====================================================
     ANIMATE RESULTS
     ===================================================== */

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
    button.disabled =
      false;

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

function applyTheme(
  theme
) {
  document.body.classList.remove(
    "theme-inferno",
    "theme-toxic",
    "theme-aqua",
    "theme-midnight",
    "theme-electric"
  );

  if (
    theme !== "cyber"
  ) {
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

    input.value =
      "";
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

  if (
    !friends.length
  ) {
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

  list.innerHTML =
    "";

  friends.forEach(
    (
      friend,
      index
    ) => {
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
    .forEach(
      button => {
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
      }
    );
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
    .forEach(
      element => {
        element.classList.add(
          "reveal"
        );

        observer.observe(
          element
        );
      }
    );
} else {
  $$(".section,.game-card")
    .forEach(
      element => {
        element.classList.add(
          "visible"
        );
      }
    );
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
      Math.random() *
        100 +
      "%";

    particle.style.animationDuration =
      8 +
      Math.random() *
        12 +
      "s";

    particle.style.animationDelay =
      -Math.random() *
        12 +
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

let audioContext =
  null;

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
  if (!audioContext)
    return;

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
  if (
    $("#soundToggle")
  ) {
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

      if (
        soundEnabled
      ) {
        initAudio();
        tone(
          700,
          0.12
        );
      }
    }
  );
}

createSoundToggle();

document.addEventListener(
  "click",
  event => {
    if (
      !soundEnabled
    ) {
      return;
    }

    if (
      event.target.closest(
        "button,.primary-btn,.secondary-btn,.battle-btn"
      )
    ) {
      initAudio();

      tone(
        520,
        0.06
      );
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

  setTimeout(
    () => {
      loader.style.display =
        "none";
    },
    700
  );
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
