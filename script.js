/* =========================================================
   GAMECHECK V3
   Made by AUK
   ========================================================= */

"use strict";

/* ---------- HELPERS ---------- */

const $ = id => document.getElementById(id);

const safeOn = (id, event, handler) => {
  const el = $(id);
  if (el) el.addEventListener(event, handler);
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));


/* =========================================================
   GAME DATABASE
   ========================================================= */

const games = [
  ["Minecraft","survival","⛏️"],
  ["Fortnite","battle","🏗️"],
  ["Valorant","fps","🎯"],
  ["Counter-Strike 2","fps","💥"],
  ["Apex Legends","battle","🔺"],
  ["PUBG","battle","🪖"],
  ["Grand Theft Auto V","rpg","🚗"],
  ["Grand Theft Auto VI","rpg","🔥"],
  ["Red Dead Redemption 2","rpg","🤠"],
  ["Cyberpunk 2077","rpg","🌃"],
  ["Elden Ring","rpg","⚔️"],
  ["Dark Souls III","rpg","💀"],
  ["The Witcher 3","rpg","🐺"],
  ["Forza Horizon 5","racing","🏎️"],
  ["Forza Motorsport","racing","🏁"],
  ["Need for Speed Heat","racing","🚘"],
  ["Need for Speed Unbound","racing","🎨"],
  ["Rocket League","battle","🚀"],
  ["Overwatch 2","fps","🦾"],
  ["Call of Duty Warzone","fps","🎖️"],
  ["Call of Duty Black Ops 6","fps","🔫"],
  ["DOOM Eternal","fps","👹"],
  ["Halo Infinite","fps","🪐"],
  ["Battlefield 2042","fps","💣"],
  ["Rainbow Six Siege","fps","🛡️"],
  ["Destiny 2","fps","🌌"],
  ["The Finals","fps","🏆"],
  ["Helldivers 2","fps","🚀"],
  ["Palworld","survival","🐾"],
  ["ARK Survival Ascended","survival","🦖"],
  ["Rust","survival","🔨"],
  ["DayZ","survival","☣️"],
  ["Subnautica","survival","🌊"],
  ["Sons of the Forest","survival","🌲"],
  ["Terraria","survival","🌳"],
  ["Valheim","survival","🛡️"],
  ["Hogwarts Legacy","rpg","🪄"],
  ["Baldur's Gate 3","rpg","🐉"],
  ["Starfield","rpg","🚀"],
  ["Diablo IV","rpg","😈"],
  ["Monster Hunter Wilds","rpg","🐲"],
  ["Black Myth Wukong","rpg","🐒"],
  ["God of War Ragnarök","rpg","⚔️"],
  ["Spider-Man Remastered","rpg","🕷️"],
  ["Horizon Forbidden West","rpg","🏹"],
  ["The Last of Us Part I","rpg","🍄"],
  ["Resident Evil 4","rpg","🧟"],
  ["Resident Evil Village","rpg","🏚️"],
  ["Dead by Daylight","survival","☠️"],
  ["Phasmophobia","survival","👻"],
  ["Lethal Company","survival","👽"],
  ["Among Us","battle","🚀"],
  ["Fall Guys","battle","🏃"],
  ["The Sims 4","rpg","🏠"],
  ["Cities Skylines II","rpg","🏙️"],
  ["Microsoft Flight Simulator","racing","✈️"],
  ["Euro Truck Simulator 2","racing","🚛"],
  ["Assetto Corsa","racing","🏎️"],
  ["BeamNG.drive","racing","🚘"],
  ["Dirt Rally 2.0","racing","🏁"],
  ["F1 25","racing","🏎️"],
  ["Street Fighter 6","battle","🥊"],
  ["Tekken 8","battle","👊"],
  ["Mortal Kombat 1","battle","⚡"],
  ["Dragon Ball Sparking Zero","battle","🐉"],
  ["EA Sports FC 26","battle","⚽"],
  ["NBA 2K26","battle","🏀"],
  ["Paladins","fps","🛡️"],
  ["Warframe","fps","🥷"],
  ["War Thunder","battle","✈️"],
  ["World of Tanks","battle","🪖"],
  ["Enlisted","fps","🎖️"],
  ["Insurgency Sandstorm","fps","🎯"],
  ["Left 4 Dead 2","fps","🧟"],
  ["Borderlands 3","fps","🔫"],
  ["Far Cry 6","fps","🌴"],
  ["Crysis Remastered","fps","🦾"],
  ["Metro Exodus","fps","🚇"],
  ["Dying Light 2","survival","🧟"],
  ["Dead Space","rpg","👽"],
  ["Control","rpg","🌀"],
  ["Alan Wake 2","rpg","🔦"],
  ["Death Stranding","rpg","🌧️"],
  ["Sekiro","rpg","⚔️"],
  ["Lies of P","rpg","🤖"],
  ["Hades II","rpg","🔥"],
  ["Hades","rpg","🔥"],
  ["Hollow Knight","rpg","🐞"],
  ["Ori and the Will of the Wisps","rpg","🌿"],
  ["No Man's Sky","survival","🌌"],
  ["Grounded","survival","🐜"],
  ["The Forest","survival","🌲"],
  ["Don't Starve Together","survival","🔥"],
  ["Project Zomboid","survival","🧟"],
  ["7 Days to Die","survival","🧟"],
  ["Satisfactory","rpg","🏭"],
  ["Factorio","rpg","⚙️"],
  ["Stardew Valley","rpg","🌱"],
  ["Brotato","battle","🥔"],
  ["Vampire Survivors","battle","🧛"],
  ["Risk of Rain 2","battle","🌧️"],
  ["Dead Cells","rpg","⚔️"],
  ["Cuphead","battle","☕"],
  ["Portal 2","rpg","🌀"],
  ["Half-Life 2","fps","🔬"],
  ["Garry's Mod","rpg","🔧"],
  ["Dota 2","battle","⚔️"],
  ["League of Legends","battle","🧙"],
  ["Path of Exile 2","rpg","💀"],
  ["Lost Ark","rpg","⚔️"],
  ["New World","rpg","🌎"],
  ["Black Desert","rpg","🐎"],
  ["Warhammer 40K Space Marine 2","fps","⚔️"],
  ["Star Wars Jedi Survivor","rpg","⚔️"],
  ["Assassin's Creed Shadows","rpg","🥷"],
  ["Assassin's Creed Valhalla","rpg","🪓"],
  ["Far Cry 5","fps","🔫"],
  ["Watch Dogs Legion","rpg","💻"],
  ["Sleeping Dogs","rpg","🥋"],
  ["Just Cause 4","rpg","💥"],
  ["Dying Light","survival","🧟"],
  ["Dead Island 2","rpg","🧟"],
  ["Borderlands 2","fps","🔫"],
  ["Borderlands 4","fps","💥"],
  ["Payday 3","fps","💰"],
  ["Hunt Showdown 1896","fps","🎯"],
  ["Escape from Tarkov","fps","🎒"],
  ["BattleBit Remastered","fps","🪖"],
  ["Splitgate 2","fps","🌀"],
  ["Titanfall 2","fps","🤖"],
  ["Quake Champions","fps","⚡"],
  ["Unreal Tournament","fps","💥"],
  ["The Elder Scrolls V Skyrim","rpg","🐉"],
  ["Fallout 4","rpg","☢️"],
  ["Fallout 76","rpg","☢️"],
  ["Mass Effect Legendary Edition","rpg","🚀"],
  ["Dragon Age The Veilguard","rpg","🐉"],
  ["Final Fantasy VII Rebirth","rpg","🗡️"],
  ["Final Fantasy XVI","rpg","🔥"],
  ["Persona 5 Royal","rpg","🎭"],
  ["Monster Hunter World","rpg","🐲"],
  ["Monster Hunter Rise","rpg","🐲"],
  ["Dragon Quest XI","rpg","🐉"],
  ["Kingdom Come Deliverance II","rpg","⚔️"],
  ["Bioshock Infinite","fps","🔫"],
  ["Dishonored 2","rpg","🐀"],
  ["Prey","fps","👽"],
  ["Wolfenstein II","fps","🔫"],
  ["DOOM","fps","👹"],
  ["DOOM 3","fps","👹"],
  ["Quake","fps","💥"],
  ["Metro Last Light","fps","🚇"],
  ["Stalker 2","fps","☢️"],
  ["Chernobylite","survival","☢️"],
  ["Generation Zero","fps","🤖"],
  ["SnowRunner","racing","🚛"],
  ["Wreckfest","racing","💥"],
  ["The Crew Motorfest","racing","🏎️"],
  ["Need for Speed Payback","racing","🚘"],
  ["Need for Speed Rivals","racing","🏁"],
  ["Trackmania","racing","🏁"],
  ["MotoGP 25","racing","🏍️"],
  ["Ride 5","racing","🏍️"],
  ["WWE 2K25","battle","🤼"],
  ["Madden NFL 26","battle","🏈"],
  ["Golf With Your Friends","battle","⛳"],
  ["Human Fall Flat","rpg","🧍"],
  ["Gang Beasts","battle","👊"],
  ["Totally Accurate Battle Simulator","battle","⚔️"],
  ["Goat Simulator 3","rpg","🐐"],
  ["Teardown","rpg","💥"],
  ["PowerWash Simulator","rpg","💦"],
  ["House Flipper 2","rpg","🏠"],
  ["Remnant II","rpg","👹"],
  ["Warhammer Vermintide 2","battle","⚔️"],
  ["Deep Rock Galactic","survival","⛏️"],
  ["Sea of Thieves","rpg","🏴‍☠️"],
  ["Grounded 2","survival","🐜"],
  ["Enshrouded","survival","🌫️"],
  ["Once Human","survival","☣️"],
  ["V Rising","survival","🧛"],
  ["Conan Exiles","survival","⚔️"],
  ["Arkham Knight","rpg","🦇"],
  ["Batman Arkham City","rpg","🦇"],
  ["Middle-earth Shadow of War","rpg","⚔️"],
  ["Mad Max","rpg","🚗"],
  ["Watch Dogs 2","rpg","💻"],
  ["Mafia Definitive Edition","rpg","🚗"],
  ["Mafia II","rpg","🚗"],
  ["Hitman World of Assassination","rpg","🎯"],
  ["Deathloop","fps","🔫"],
  ["Returnal","fps","👽"],
  ["Ratchet & Clank Rift Apart","rpg","🔧"],
  ["Horizon Zero Dawn","rpg","🏹"],
  ["Days Gone","survival","🏍️"],
  ["Uncharted Legacy of Thieves","rpg","🗺️"],
  ["Ghost of Tsushima","rpg","⚔️"],
  ["Death Stranding 2","rpg","🌧️"],
  ["Cyberpunk Phantom Liberty","rpg","🌃"],
  ["Control Ultimate Edition","rpg","🌀"],
  ["Remnant From the Ashes","rpg","🔫"],
  ["Outlast","survival","👻"],
  ["Outlast 2","survival","👻"],
  ["Amnesia The Bunker","survival","👻"],
  ["Little Nightmares II","survival","👁️"],
  ["Inside","rpg","👁️"],
  ["Limbo","rpg","🌑"],
  ["It Takes Two","rpg","👫"],
  ["A Way Out","rpg","🔓"],
  ["Sea of Stars","rpg","⭐"],
  ["Divinity Original Sin 2","rpg","🐲"],
  ["Civilization VI","rpg","🌎"],
  ["Age of Empires IV","rpg","🏰"],
  ["Total War Warhammer III","rpg","⚔️"],
  ["StarCraft II","fps","🚀"],
  ["Warcraft III","rpg","⚔️"],
  ["Diablo III","rpg","😈"],
  ["Torchlight II","rpg","🔥"],
  ["Grim Dawn","rpg","💀"],
  ["Terraria Calamity","survival","⛏️"]
];


/* =========================================================
   GAME DATABASE
   ========================================================= */

let visibleGames = 24;
let currentCategory = "all";
let currentSearch = "";


const logoMap = {
  "Minecraft": "https://cdn.simpleicons.org/minecraft",
  "Fortnite": "https://cdn.simpleicons.org/fortnite",
  "Valorant": "https://cdn.simpleicons.org/valorant",
  "Counter-Strike 2": "https://cdn.simpleicons.org/counterstrike",
  "Apex Legends": "https://cdn.simpleicons.org/apexlegends",
  "PUBG": "https://cdn.simpleicons.org/pubg",
  "Grand Theft Auto V": "https://cdn.simpleicons.org/grandtheftauto",
  "Grand Theft Auto VI": "https://cdn.simpleicons.org/grandtheftauto",
  "Rocket League": "https://cdn.simpleicons.org/rocketleague",
  "Overwatch 2": "https://cdn.simpleicons.org/overwatch",
  "Dota 2": "https://cdn.simpleicons.org/dota2",
  "League of Legends": "https://cdn.simpleicons.org/leagueoflegends",
  "Warframe": "https://cdn.simpleicons.org/warframe",
  "The Witcher 3": "https://cdn.simpleicons.org/thewitcher",
  "Forza Horizon 5": "https://cdn.simpleicons.org/forza"
};


function filteredGames() {
  return games.filter(game => {
    const categoryMatch =
      currentCategory === "all" ||
      game[1] === currentCategory;

    const searchMatch =
      game[0].toLowerCase()
        .includes(currentSearch.toLowerCase());

    return categoryMatch && searchMatch;
  });
}


function renderGames() {

  const grid = $("gameGrid");

  if (!grid) return;

  const all = filteredGames();
  const list = all.slice(0, visibleGames);

  grid.innerHTML = "";

  if (!list.length) {

    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:50px;
        color:var(--muted)
      ">
        NO GAMES FOUND
      </div>
    `;

    return;
  }

  list.forEach((game,index) => {

    const [name,category,emoji] = game;

    const card = document.createElement("article");

    card.className = "game-card";

    card.style.animation =
      `gameIn .45s ease ${Math.min(index,10)*.025}s both`;

    const logo = logoMap[name];

    card.innerHTML = `
      <div class="game-category">
        ${category.toUpperCase()}
      </div>

      <div class="game-logo">
        ${
          logo
          ? `<img src="${logo}" alt="" loading="lazy">`
          : emoji
        }
      </div>

      <h3>${name}</h3>

      <small>
        CHECK ESTIMATED PERFORMANCE →
      </small>
    `;

    const img = card.querySelector("img");

    if (img) {

      img.addEventListener("error",() => {

        img.remove();

        const logoBox =
          card.querySelector(".game-logo");

        if (logoBox)
          logoBox.textContent = emoji;

      });
    }

    card.addEventListener("click",() => {

      const gameSelect = $("checkGame");

      if (!gameSelect) return;

      gameSelect.value = name;

      /*
        IMPORTANT:
        We intentionally do NOT auto-scroll here.
        This prevents the unwanted page movement.
      */

      const pcSection = $("pc");

      if (pcSection) {

        pcSection.classList.add("game-selected");

        setTimeout(() => {
          pcSection.classList.remove("game-selected");
        },1200);
      }
    });

    grid.appendChild(card);
  });

  const loadMore = $("loadMore");

  if (loadMore) {

    loadMore.style.display =
      list.length < all.length
      ? "block"
      : "none";
  }
}


const gameAnimationStyle =
document.createElement("style");

gameAnimationStyle.textContent = `
@keyframes gameIn {
  from {
    opacity:0;
    transform:translateY(15px);
  }

  to {
    opacity:1;
    transform:none;
  }
}

.game-selected {
  animation:gameSelected .7s ease;
}

@keyframes gameSelected {
  0% { filter:none; }
  50% { filter:brightness(1.5); }
  100% { filter:none; }
}
`;

document.head.appendChild(gameAnimationStyle);


/* ---------- GAME SEARCH ---------- */

safeOn("gameSearch","input",event => {

  currentSearch = event.target.value;

  visibleGames = 24;

  renderGames();

});


/* ---------- GAME CATEGORIES ---------- */

document
  .querySelectorAll("#categories button")
  .forEach(button => {

    button.addEventListener("click",() => {

      document
        .querySelectorAll("#categories button")
        .forEach(b =>
          b.classList.remove("active")
        );

      button.classList.add("active");

      currentCategory =
        button.dataset.category || "all";

      visibleGames = 24;

      renderGames();

    });

});


safeOn("loadMore","click",() => {

  visibleGames += 24;

  renderGames();

});


/* ---------- GAME SELECT ---------- */

function fillGameSelect() {

  const select = $("checkGame");

  if (!select) return;

  select.innerHTML = games
    .map(game =>
      `<option value="${game[0]}">${game[0]}</option>`
    )
    .join("");

}


fillGameSelect();
renderGames();


/* =========================================================
   VS BATTLE
   ========================================================= */

let battleRunning = false;


function getPlayerStats(player) {

  const prefix = player === 1 ? 1 : 2;

  return {
    gpu: Number(
      $(prefix === 1 ? "gpu1" : "gpu2")?.value || 0
    ),

    ram: Number(
      $(prefix === 1 ? "ram1" : "ram2")?.value || 0
    ),

    cpu: Number(
      $(prefix === 1 ? "cpu1" : "cpu2")?.value || 0
    )
  };
}


function setHP(player,value) {

  value = Math.max(
    0,
    Math.round(value)
  );

  const bar =
    $(player === 1 ? "hp1" : "hp2");

  const number =
    $(player === 1
      ? "hpNumber1"
      : "hpNumber2");

  if (bar)
    bar.style.width = `${value}%`;

  if (number)
    number.textContent = value;
}


async function countdown() {

  const count = $("countdown");

  if (!count) return;

  for (const number of ["3","2","1"]) {

    count.textContent = number;

    await wait(600);

  }

  count.textContent = "GO!";

  await wait(500);
}


async function attack(side,weapon) {

  const effect = $("attackEffect");
  const impact = $("impact");
  const arena = $("battleArena");
  const weaponBox = $("weapon");

  if (weaponBox)
    weaponBox.textContent = weapon;

  if (effect) {

    effect.className = "";

    void effect.offsetWidth;

    effect.classList.add(
      side === 1
      ? "attack-left"
      : "attack-right"
    );
  }

  if (impact) {

    impact.className = "";

    void impact.offsetWidth;

    impact.classList.add(
      "impact-animation"
    );
  }

  if (arena) {

    arena.classList.remove(
      "screen-shake"
    );

    void arena.offsetWidth;

    arena.classList.add(
      "screen-shake"
    );
  }

  await wait(500);
}


async function doRound(round,stat1,stat2) {

  const names = [
    ["ROUND 1","GPU CLASH","⚔️"],
    ["ROUND 2","RAM RAID","🔫"],
    ["ROUND 3","CPU OVERDRIVE","🚀"]
  ];

  const [roundName,title,weapon] =
    names[round - 1];

  const roundText = $("roundText");
  const arenaText = $("arenaText");

  if (roundText)
    roundText.textContent =
      `${roundName} • ${title}`;

  if (arenaText)
    arenaText.textContent = title;

  await wait(700);

  const first =
    stat1 >= stat2 ? 1 : 2;

  const difference =
    Math.abs(stat1 - stat2);

  const damage =
    stat1 === stat2
    ? 18
    : 15 + Math.min(
        25,
        Math.round(difference * .45)
      );

  await attack(first,weapon);

  if (first === 1) {

    const current =
      Number(
        $("hpNumber2")?.textContent || 100
      );

    setHP(2,current-damage);

  } else {

    const current =
      Number(
        $("hpNumber1")?.textContent || 100
      );

    setHP(1,current-damage);
  }

  await wait(600);

  return first;
}


async function startBattle() {

  if (battleRunning) return;

  battleRunning = true;

  const startButton =
    $("startBattle");

  if (startButton)
    startButton.disabled = true;

  const result =
    $("battleResult");

  if (result)
    result.innerHTML = "";

  const name1 =
    $("player1")?.value.trim()
    || "Player 1";

  const name2 =
    $("player2")?.value.trim()
    || "Player 2";

  $("fighterName1") &&
    ($("fighterName1").textContent =
      name1.toUpperCase());

  $("fighterName2") &&
    ($("fighterName2").textContent =
      name2.toUpperCase());

  $("hpName1") &&
    ($("hpName1").textContent = name1);

  $("hpName2") &&
    ($("hpName2").textContent = name2);

  setHP(1,100);
  setHP(2,100);

  $("arenaText") &&
    ($("arenaText").textContent =
      "ENTERING ARENA");

  await countdown();

  const p1 = getPlayerStats(1);
  const p2 = getPlayerStats(2);

  await doRound(1,p1.gpu,p2.gpu);

  if (
    Number($("hpNumber1")?.textContent || 0) <= 0 ||
    Number($("hpNumber2")?.textContent || 0) <= 0
  ) {

    await finishBattle(
      name1,
      name2
    );

    return;
  }

  await wait(400);

  await doRound(2,p1.ram,p2.ram);

  if (
    Number($("hpNumber1")?.textContent || 0) <= 0 ||
    Number($("hpNumber2")?.textContent || 0) <= 0
  ) {

    await finishBattle(
      name1,
      name2
    );

    return;
  }

  await wait(400);

  await doRound(3,p1.cpu,p2.cpu);

  await wait(500);

  await finishBattle(
    name1,
    name2
  );
}


async function finishBattle(name1,name2) {

  let hp1 =
    Number(
      $("hpNumber1")?.textContent || 0
    );

  let hp2 =
    Number(
      $("hpNumber2")?.textContent || 0
    );

  if (hp1 > 0 && hp2 > 0) {

    const p1 =
      getPlayerStats(1);

    const p2 =
      getPlayerStats(2);

    const score1 =
      p1.gpu +
      p1.ram +
      p1.cpu;

    const score2 =
      p2.gpu +
      p2.ram +
      p2.cpu;

    if (score1 > score2) {

      hp2 = 0;

    } else if (score2 > score1) {

      hp1 = 0;

    } else {

      hp1 = 0;
      hp2 = 0;
    }

    setHP(1,hp1);
    setHP(2,hp2);
  }

  $("roundText") &&
    ($("roundText").textContent =
      "FINAL HIT");

  $("arenaText") &&
    ($("arenaText").textContent =
      "FINAL SHOWDOWN!");

  $("weapon") &&
    ($("weapon").textContent = "💥");

  const impact = $("impact");

  if (impact) {

    impact.classList.remove(
      "impact-animation"
    );

    void impact.offsetWidth;

    impact.classList.add(
      "impact-animation"
    );
  }

  const arena =
    $("battleArena");

  if (arena)
    arena.classList.add(
      "screen-shake"
    );

  await wait(900);

  let output = "";

  if (hp1 > hp2) {

    output = `
      🏆 ${name1.toUpperCase()} WINS
      <small>ULTIMATE PC POWER</small>
    `;

  } else if (hp2 > hp1) {

    output = `
      🏆 ${name2.toUpperCase()} WINS
      <small>ULTIMATE PC POWER</small>
    `;

  } else {

    output = `
      🤝 DRAW
      <small>BOTH PCS ARE EVEN</small>
    `;
  }

  const result =
    $("battleResult");

  if (result)
    result.innerHTML = output;

  const startButton =
    $("startBattle");

  if (startButton)
    startButton.disabled = false;

  battleRunning = false;
}


safeOn(
  "startBattle",
  "click",
  startBattle
);


/* =========================================================
   PC ANALYSIS
   ========================================================= */

const fpsMultiplier = {

  "Minecraft":2.1,
  "Fortnite":1.65,
  "Valorant":2.4,
  "Counter-Strike 2":2.0,
  "Apex Legends":1.5,
  "PUBG":1.45,
  "Grand Theft Auto V":1.7,
  "Grand Theft Auto VI":.65,
  "Cyberpunk 2077":.8,
  "Red Dead Redemption 2":.9,
  "Elden Ring":1,
  "Forza Horizon 5":1.15,
  "Call of Duty Warzone":1.2,
  "Hogwarts Legacy":.85,
  "Black Myth Wukong":.65,
  "Starfield":.7
};


function calculatePCScore(
  gpu,
  cpu,
  ram
) {

  return Math.round(
    gpu*.48 +
    cpu*.34 +
    ram*.18
  );
}


function getFPS(game,score) {

  const multiplier =
    fpsMultiplier[game] || 1.15;

  return Math.max(
    18,
    Math.round(
      score * multiplier
    )
  );
}


function performanceTier(score) {

  if (score >= 85) {

    return [
      "MONSTER PERFORMANCE",
      "Excellent gaming performance."
    ];

  }

  if (score >= 70) {

    return [
      "GREAT PERFORMANCE",
      "A strong gaming setup."
    ];

  }

  if (score >= 55) {

    return [
      "PLAYABLE",
      "Good for gaming with sensible settings."
    ];

  }

  return [
    "ENTRY LEVEL",
    "Lower graphics settings may be needed."
  ];
}


function bottleneck(
  gpu,
  cpu,
  ram
) {

  const lowest =
    Math.min(gpu,cpu,ram);

  if (lowest === gpu)
    return "GPU";

  if (lowest === cpu)
    return "CPU";

  return "RAM";
}


async function animateNumber(
  element,
  target,
  duration=1000
) {

  if (!element) return;

  const start =
    performance.now();

  return new Promise(resolve => {

    function frame(now) {

      const progress =
        Math.min(
          1,
          (now-start)/duration
        );

      const eased =
        1 -
        Math.pow(
          1-progress,
          3
        );

      element.textContent =
        Math.round(
          target*eased
        );

      if (progress < 1) {

        requestAnimationFrame(frame);

      } else {

        resolve();
      }
    }

    requestAnimationFrame(frame);
  });
}


async function analysisStage(
  id,
  message,
  start,
  end
) {

  const stage = $(id);

  if (!stage) {

    await wait(300);

    return;
  }

  stage.classList.remove("done");
  stage.classList.add("active");

  $("scanStatus") &&
    ($("scanStatus").textContent =
      message);

  const duration = 700;

  const startTime =
    performance.now();

  return new Promise(resolve => {

    function tick(now) {

      const progress =
        Math.min(
          1,
          (now-startTime)/duration
        );

      const percent =
        Math.round(
          start +
          (end-start)*progress
        );

      $("scanProgress") &&
        ($("scanProgress").style.width =
          `${percent}%`);

      $("scanPercent") &&
        ($("scanPercent").textContent =
          `${percent}%`);

      if (progress < 1) {

        requestAnimationFrame(tick);

      } else {

        stage.classList.remove("active");
        stage.classList.add("done");

        const status =
          stage.querySelector("b");

        if (status)
          status.textContent =
            "COMPLETE";

        resolve();
      }
    }

    requestAnimationFrame(tick);
  });
}


async function checkPC() {

  const button =
    $("checkPcBtn");

  if (!button) return;

  button.disabled = true;

  $("pcResult") &&
    $("pcResult")
      .classList.remove("show");

  document
    .querySelectorAll(".scan-stage")
    .forEach(stage => {

      stage.classList.remove(
        "active",
        "done"
      );

      const status =
        stage.querySelector("b");

      if (status)
        status.textContent =
          "WAITING";
    });

  $("scanProgress") &&
    ($("scanProgress").style.width =
      "0%");

  $("scanPercent") &&
    ($("scanPercent").textContent =
      "0%");

  $("analysisMessages") &&
    ($("analysisMessages").textContent =
      "Connecting to GameCheck diagnostics...");

  await wait(400);

  await analysisStage(
    "stageGpu",
    "SCANNING GRAPHICS PROCESSOR...",
    0,
    25
  );

  await analysisStage(
    "stageCpu",
    "ANALYZING PROCESSOR POWER...",
    25,
    50
  );

  await analysisStage(
    "stageRam",
    "CHECKING MEMORY CAPACITY...",
    50,
    72
  );

  await analysisStage(
    "stageGame",
    "SIMULATING GAME LOAD...",
    72,
    100
  );

  $("scanStatus") &&
    ($("scanStatus").textContent =
      "CALCULATING FINAL RESULT...");

  $("analysisMessages") &&
    ($("analysisMessages").textContent =
      "Combining hardware scores...");

  await wait(700);

  const gpu =
    Number(
      $("checkGpu")?.value || 0
    );

  const cpu =
    Number(
      $("checkCpu")?.value || 0
    );

  const ram =
    Number(
      $("checkRam")?.value || 0
    );

  const game =
    $("checkGame")?.value ||
    "Minecraft";

  const score =
    calculatePCScore(
      gpu,
      cpu,
      ram
    );

  const fps =
    getFPS(game,score);

  const [title,text] =
    performanceTier(score);

  const weak =
    bottleneck(
      gpu,
      cpu,
      ram
    );

  $("performanceTitle") &&
    ($("performanceTitle").textContent =
      title);

  $("performanceText") &&
    ($("performanceText").textContent =
      `${text} Estimated for ${game}.`);

  $("fpsValue") &&
    ($("fpsValue").textContent =
      `${fps}+`);

  $("gpuResult") &&
    ($("gpuResult").textContent =
      `${gpu}/100`);

  $("cpuResult") &&
    ($("cpuResult").textContent =
      `${cpu}/100`);

  $("ramResult") &&
    ($("ramResult").textContent =
      `${ram}/100`);

  $("bottleneckValue") &&
    ($("bottleneckValue").textContent =
      weak === "RAM"
      ? "RAM may limit multitasking / demanding games."
      : `${weak} is currently your weakest component.`);

  const result =
    $("pcResult");

  if (result)
    result.classList.add("show");

  await animateNumber(
    $("scoreValue"),
    score,
    1100
  );

  button.disabled = false;

  /*
    No automatic scrolling here.
    This fixes the annoying page movement.
  */
}


safeOn(
  "checkPcBtn",
  "click",
  checkPC
);


/* =========================================================
   FRIENDS
   ========================================================= */

const defaultFriends = [
  ["Shadow","RTX 4070",true],
  ["Nova","RTX 4060",true],
  ["Rex","RX 7600",false]
];


function getFriends() {

  try {

    const saved =
      localStorage.getItem(
        "gamecheckFriends"
      );

    return saved
      ? JSON.parse(saved)
      : defaultFriends;

  } catch {

    return defaultFriends;
  }
}


function renderFriends() {

  const list =
    $("friendList");

  if (!list) return;

  list.innerHTML = "";

  getFriends().forEach(friend => {

    const [
      name,
      gpu,
      online
    ] = friend;

    const card =
      document.createElement("div");

    card.className =
      "friend-card";

    card.innerHTML = `
      <strong>${name}</strong>
      <small>${gpu}</small>
      <br>
      <small class="${online ? "online" : ""}">
        ${online ? "● ONLINE" : "○ OFFLINE"}
      </small>
    `;

    list.appendChild(card);
  });
}


safeOn(
  "addFriend",
  "click",
  () => {

    const name =
      prompt(
        "Enter friend's username:"
      );

    if (!name) return;

    const friends =
      getFriends();

    friends.push([
      name.slice(0,18),
      "PC not scanned",
      false
    ]);

    try {

      localStorage.setItem(
        "gamecheckFriends",
        JSON.stringify(friends)
      );

    } catch {}

    renderFriends();
  }
);


renderFriends();


/* =========================================================
   LOGIN
   ========================================================= */

safeOn(
  "loginBtn",
  "click",
  () => {

    $("loginModal") &&
      $("loginModal")
        .classList.add("open");

  }
);


safeOn(
  "loginSubmit",
  "click",
  () => {

    const input =
      $("loginName");

    const name =
      input?.value.trim();

    if (!name) {

      input?.focus();

      return;
    }

    try {

      localStorage.setItem(
        "gamecheckUser",
        name
      );

    } catch {}

    const button =
      $("loginBtn");

    if (button)
      button.textContent =
        name
          .slice(0,10)
          .toUpperCase();

    $("loginModal") &&
      $("loginModal")
        .classList.remove("open");

  }
);


try {

  const savedUser =
    localStorage.getItem(
      "gamecheckUser"
    );

  if (savedUser && $("loginBtn")) {

    $("loginBtn").textContent =
      savedUser
        .slice(0,10)
        .toUpperCase();
  }

} catch {}


/* =========================================================
   THEMES
   ========================================================= */

function setTheme(theme) {

  document.body.classList.remove(
    "theme-inferno",
    "theme-toxic",
    "theme-aqua",
    "theme-midnight",
    "theme-electric"
  );

  if (
    theme &&
    theme !== "cyber"
  ) {

    document.body.classList.add(
      `theme-${theme}`
    );
  }

  try {

    localStorage.setItem(
      "gamecheckTheme",
      theme
    );

  } catch {}
}


let savedTheme = null;

try {

  savedTheme =
    localStorage.getItem(
      "gamecheckTheme"
    );

} catch {}


if (savedTheme)
  setTheme(savedTheme);


safeOn(
  "themeBtn",
  "click",
  () => {

    $("themeModal") &&
      $("themeModal")
        .classList.add("open");

  }
);


document
  .querySelectorAll("[data-theme]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        setTheme(
          button.dataset.theme
        );

        $("themeModal") &&
          $("themeModal")
            .classList.remove("open");

      }
    );

});


/* First visit theme picker */

if (!savedTheme) {

  setTimeout(() => {

    $("themeModal") &&
      $("themeModal")
        .classList.add("open");

  },1500);

}


/* =========================================================
   MODALS
   ========================================================= */

document
  .querySelectorAll("[data-close]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const modal =
          $(button.dataset.close);

        if (modal)
          modal.classList.remove(
            "open"
          );
      }
    );

});


document
  .querySelectorAll(".modal")
  .forEach(modal => {

    modal.addEventListener(
      "click",
      event => {

        if (
          event.target === modal
        ) {

          modal.classList.remove(
            "open"
          );
        }
      }
    );

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

if (
  "IntersectionObserver" in window
) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add("visible");

            observer.unobserve(
              entry.target
            );
          }

        });

      },
      {
        threshold:.08
      }
    );

  document
    .querySelectorAll(".reveal")
    .forEach(element =>
      observer.observe(element)
    );

} else {

  document
    .querySelectorAll(".reveal")
    .forEach(element =>
      element.classList.add(
        "visible"
      )
    );
}


/* =========================================================
   COUNTERS
   ========================================================= */

document
  .querySelectorAll(".counter")
  .forEach(counter => {

    const target =
      Number(
        counter.dataset.target || 0
      );

    let value = 0;

    const interval =
      setInterval(() => {

        value +=
          Math.max(
            1,
            Math.ceil(target / 35)
          );

        if (value >= target) {

          value = target;

          clearInterval(
            interval
          );
        }

        counter.textContent =
          value;

      },35);

});


/* =========================================================
   PARTICLES
   ========================================================= */

function createParticles() {

  const container =
    $("particles");

  if (!container) return;

  const mobile =
    window.matchMedia(
      "(max-width:650px)"
    ).matches;

  const reduced =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  const count =
    reduced
    ? 0
    : mobile
      ? 10
      : 24;

  container.innerHTML = "";

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const particle =
      document.createElement("i");

    particle.className =
      "particle";

    particle.style.left =
      `${Math.random()*100}%`;

    particle.style.animationDuration =
      `${8+Math.random()*15}s`;

    particle.style.animationDelay =
      `${Math.random()*-15}s`;

    particle.style.opacity =
      `${.1+Math.random()*.3}`;

    container.appendChild(
      particle
    );
  }
}


createParticles();


/* =========================================================
   DEVICE DETECTION
   ========================================================= */

function updateDeviceClass() {

  const touch =
    window.matchMedia(
      "(hover:none) and (pointer:coarse)"
    ).matches;

  document.body.classList.toggle(
    "touch-device",
    touch
  );

  document.body.classList.toggle(
    "desktop-device",
    !touch
  );
}


updateDeviceClass();


let resizeTimer;

window.addEventListener(
  "resize",
  () => {

    clearTimeout(
      resizeTimer
    );

    resizeTimer =
      setTimeout(
        updateDeviceClass,
        150
      );

  }
);


/* =========================================================
   MOBILE MENU
   ========================================================= */

safeOn(
  "menuBtn",
  "click",
  () => {

    const nav =
      document.querySelector(
        ".navbar nav"
      );

    if (!nav) return;

    const hidden =
      getComputedStyle(nav)
        .display === "none";

    if (hidden) {

      nav.style.display =
        "flex";

      nav.style.position =
        "absolute";

      nav.style.top =
        "72px";

      nav.style.left =
        "15px";

      nav.style.right =
        "15px";

      nav.style.padding =
        "18px";

      nav.style.flexDirection =
        "column";

      nav.style.background =
        "#0b1020";

      nav.style.border =
        "1px solid var(--border)";

      nav.style.borderRadius =
        "15px";

    } else {

      nav.style.display =
        "none";
    }

  }
);


/* Close mobile menu after navigation */

document
  .querySelectorAll(
    ".navbar nav a"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        if (
          window.innerWidth <= 850
        ) {

          const nav =
            document.querySelector(
              ".navbar nav"
            );

          if (nav)
            nav.style.display =
              "none";
        }
      }
    );

});


/* =========================================================
   LOADER — FIXED
   ========================================================= */

function hideLoader() {

  const loader =
    $("loader");

  if (!loader) return;

  loader.classList.add(
    "loaded"
  );

  setTimeout(() => {

    if (
      loader &&
      loader.parentNode
    ) {

      loader.remove();
    }

  },700);
}


/*
  The old V2 script never removed the loader.
  This is the important fix.
*/

if (
  document.readyState === "complete"
) {

  setTimeout(
    hideLoader,
    900
  );

} else {

  window.addEventListener(
    "load",
    () => {

      setTimeout(
        hideLoader,
        900
      );

    },
    {once:true}
  );
}


/* =========================================================
   SAFETY FALLBACK
   ========================================================= */

/*
  If a browser blocks something unexpected,
  never leave the user trapped behind the loader.
*/

setTimeout(
  hideLoader,
  5000
);


/* =========================================================
   FINISHED
   ========================================================= */

console.log(
  "GAMECHECK V3 ONLINE — Made by AUK"
);
