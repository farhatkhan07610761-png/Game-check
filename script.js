/* =========================================================
   GAMECHECK V4
   MADE BY AUK
   ========================================================= */

"use strict";

/* =========================================================
   HELPERS
   ========================================================= */

const $ = id => document.getElementById(id);

const safeOn = (id, event, handler) => {
  const el = $(id);
  if (el) el.addEventListener(event, handler);
};

const wait = ms =>
  new Promise(resolve => setTimeout(resolve, ms));


/* =========================================================
   GAME DATABASE
   ========================================================= */

const games = [
  ["Minecraft", "Survival", "⛏️"],
  ["Fortnite", "Battle Royale", "🎯"],
  ["Valorant", "FPS", "🎯"],
  ["Counter-Strike 2", "FPS", "💣"],
  ["Grand Theft Auto V", "Open World", "🚗"],
  ["Grand Theft Auto VI", "Open World", "🚗"],
  ["Apex Legends", "Battle Royale", "⚡"],
  ["PUBG", "Battle Royale", "🔫"],
  ["Rocket League", "Sports", "🚗"],
  ["Overwatch 2", "FPS", "🦸"],
  ["League of Legends", "MOBA", "⚔️"],
  ["Dota 2", "MOBA", "🧙"],
  ["Forza Horizon 5", "Racing", "🏎️"],
  ["Forza Horizon 4", "Racing", "🏎️"],
  ["Forza Motorsport", "Racing", "🏁"],
  ["Call of Duty", "FPS", "🔫"],
  ["Call of Duty Warzone", "Battle Royale", "🔫"],
  ["Call of Duty Black Ops 6", "FPS", "🔫"],
  ["Call of Duty Black Ops 7", "FPS", "🔫"],
  ["Valorant", "FPS", "🎯"],
  ["The Witcher 3", "RPG", "⚔️"],
  ["Cyberpunk 2077", "RPG", "🌃"],
  ["Red Dead Redemption 2", "Open World", "🤠"],
  ["Elden Ring", "RPG", "⚔️"],
  ["Dark Souls III", "RPG", "💀"],
  ["Sekiro", "RPG", "⚔️"],
  ["God of War", "Action", "⚔️"],
  ["God of War Ragnarök", "Action", "⚔️"],
  ["Horizon Zero Dawn", "Action", "🏹"],
  ["Horizon Forbidden West", "Action", "🏹"],
  ["Marvel Rivals", "FPS", "🦸"],
  ["The Finals", "FPS", "💥"],
  ["Rainbow Six Siege", "FPS", "🎯"],
  ["Battlefield 2042", "FPS", "💣"],
  ["Battlefield V", "FPS", "💣"],
  ["Battlefield 6", "FPS", "💣"],
  ["Helldivers 2", "Action", "🚀"],
  ["Destiny 2", "FPS", "🌌"],
  ["Warframe", "Action", "⚔️"],
  ["Paladins", "FPS", "🎯"],
  ["Team Fortress 2", "FPS", "🔫"],
  ["Left 4 Dead 2", "Action", "🧟"],
  ["Dead by Daylight", "Horror", "👻"],
  ["Phasmophobia", "Horror", "👻"],
  ["Resident Evil 4", "Horror", "🧟"],
  ["Resident Evil Village", "Horror", "🏚️"],
  ["Silent Hill 2", "Horror", "👻"],
  ["Dying Light", "Action", "🧟"],
  ["Dying Light 2", "Action", "🧟"],
  ["Terraria", "Survival", "🌳"],
  ["Roblox", "Platform", "🎮"],
  ["Garry's Mod", "Sandbox", "🧱"],
  ["Rust", "Survival", "🏕️"],
  ["ARK Survival Evolved", "Survival", "🦖"],
  ["ARK Survival Ascended", "Survival", "🦖"],
  ["Raft", "Survival", "🌊"],
  ["Subnautica", "Survival", "🌊"],
  ["Valheim", "Survival", "🛡️"],
  ["Palworld", "Survival", "🐾"],
  ["DayZ", "Survival", "🧟"],
  ["Sons of the Forest", "Survival", "🌲"],
  ["Don't Starve Together", "Survival", "🔥"],
  ["Among Us", "Party", "🚀"],
  ["Fall Guys", "Party", "🏃"],
  ["Gang Beasts", "Party", "🥊"],
  ["Human Fall Flat", "Puzzle", "🧩"],
  ["Stardew Valley", "Simulation", "🌱"],
  ["The Sims 4", "Simulation", "🏠"],
  ["Cities Skylines II", "Simulation", "🏙️"],
  ["Microsoft Flight Simulator", "Simulation", "✈️"],
  ["Euro Truck Simulator 2", "Simulation", "🚛"],
  ["Assetto Corsa", "Racing", "🏎️"],
  ["Assetto Corsa Competizione", "Racing", "🏁"],
  ["F1 25", "Racing", "🏎️"],
  ["Need for Speed Heat", "Racing", "🚘"],
  ["Need for Speed Unbound", "Racing", "🚘"],
  ["Trackmania", "Racing", "🏁"],
  ["The Crew Motorfest", "Racing", "🚗"],
  ["EA Sports FC 25", "Sports", "⚽"],
  ["EA Sports FC 26", "Sports", "⚽"],
  ["FIFA 23", "Sports", "⚽"],
  ["NBA 2K25", "Sports", "🏀"],
  ["NBA 2K26", "Sports", "🏀"],
  ["WWE 2K25", "Sports", "🥊"],
  ["Mortal Kombat 1", "Fighting", "🥊"],
  ["Tekken 8", "Fighting", "🥊"],
  ["Street Fighter 6", "Fighting", "🥊"],
  ["Guilty Gear Strive", "Fighting", "⚔️"],
  ["Hades", "RPG", "🔥"],
  ["Hades II", "RPG", "🔥"],
  ["Baldur's Gate 3", "RPG", "🐉"],
  ["Starfield", "RPG", "🚀"],
  ["Fallout 4", "RPG", "☢️"],
  ["Fallout 76", "RPG", "☢️"],
  ["Skyrim", "RPG", "🐉"],
  ["Diablo IV", "RPG", "🔥"],
  ["Path of Exile 2", "RPG", "⚔️"],
  ["Monster Hunter Wilds", "Action", "🐉"],
  ["Monster Hunter World", "Action", "🐉"],
  ["Black Myth Wukong", "Action", "🐒"],
  ["Lies of P", "Action", "⚔️"],
  ["Assassin's Creed Shadows", "Action", "🥷"],
  ["Assassin's Creed Valhalla", "Action", "🪓"],
  ["Assassin's Creed Odyssey", "Action", "⚔️"],
  ["Far Cry 6", "FPS", "🔫"],
  ["Far Cry 5", "FPS", "🔫"],
  ["Watch Dogs Legion", "Open World", "💻"],
  ["Watch Dogs 2", "Open World", "💻"],
  ["Sleeping Dogs", "Open World", "🥋"],
  ["Mafia Definitive Edition", "Open World", "🚗"],
  ["Mafia II", "Open World", "🚗"],
  ["Death Stranding", "Action", "🌧️"],
  ["Death Stranding 2", "Action", "🌧️"],
  ["Control", "Action", "🌀"],
  ["Alan Wake 2", "Horror", "🔦"],
  ["Remnant II", "Action", "🔫"],
  ["Lords of the Fallen", "RPG", "⚔️"],
  ["Dragon's Dogma 2", "RPG", "🐉"],
  ["Final Fantasy VII Rebirth", "RPG", "⚔️"],
  ["Final Fantasy XVI", "RPG", "⚔️"],
  ["Persona 5 Royal", "RPG", "🎭"],
  ["Persona 3 Reload", "RPG", "🎭"],
  ["Black Desert", "MMO", "⚔️"],
  ["Lost Ark", "MMO", "⚔️"],
  ["World of Warcraft", "MMO", "🐉"],
  ["Final Fantasy XIV", "MMO", "🐉"],
  ["New World", "MMO", "⚔️"],
  ["The Elder Scrolls Online", "MMO", "🐉"],
  ["Star Wars Jedi Survivor", "Action", "⚔️"],
  ["Star Wars Outlaws", "Action", "🌌"],
  ["Avatar Frontiers of Pandora", "Action", "🌿"],
  ["Hogwarts Legacy", "RPG", "🪄"],
  ["Lego Star Wars", "Action", "🧱"],
  ["It Takes Two", "Adventure", "👥"],
  ["A Way Out", "Adventure", "👥"],
  ["Sea of Thieves", "Adventure", "🏴‍☠️"],
  ["Grounded", "Survival", "🐜"],
  ["Minecraft Dungeons", "Action", "⛏️"],
  ["No Man's Sky", "Survival", "🚀"],
  ["The Outer Worlds", "RPG", "🚀"],
  ["Borderlands 3", "FPS", "🔫"],
  ["Borderlands 4", "FPS", "🔫"],
  ["DOOM Eternal", "FPS", "💀"],
  ["DOOM The Dark Ages", "FPS", "💀"],
  ["Quake", "FPS", "🔫"],
  ["ULTRAKILL", "FPS", "💥"],
  ["War Thunder", "Simulation", "✈️"],
  ["World of Tanks", "Action", "🛡️"],
  ["World of Warships", "Action", "🚢"],
  ["Enlisted", "FPS", "🔫"],
  ["Escape from Tarkov", "FPS", "🎯"],
  ["Hunt Showdown 1896", "FPS", "🔫"],
  ["Ready or Not", "FPS", "🎯"],
  ["Insurgency Sandstorm", "FPS", "🔫"],
  ["Squad", "FPS", "🎯"],
  ["Hell Let Loose", "FPS", "💣"],
  ["Day of Infamy", "FPS", "💣"],
  ["BattleBit Remastered", "FPS", "🔫"],
  ["Lethal Company", "Horror", "👻"],
  ["Content Warning", "Horror", "📹"],
  ["GTFO", "Horror", "👾"],
  ["The Forest", "Survival", "🌲"],
  ["Project Zomboid", "Survival", "🧟"],
  ["7 Days to Die", "Survival", "🧟"],
  ["The Long Dark", "Survival", "❄️"],
  ["Green Hell", "Survival", "🌿"],
  ["Core Keeper", "Survival", "⛏️"],
  ["Factorio", "Strategy", "⚙️"],
  ["Civilization VI", "Strategy", "🏛️"],
  ["Age of Empires IV", "Strategy", "🏰"],
  ["StarCraft II", "Strategy", "🚀"],
  ["Total War Warhammer III", "Strategy", "⚔️"],
  ["Company of Heroes 3", "Strategy", "💣"],
  ["XCOM 2", "Strategy", "👽"],
  ["Crusader Kings III", "Strategy", "👑"],
  ["Cities Skylines", "Simulation", "🏙️"],
  ["Planet Zoo", "Simulation", "🦁"],
  ["Planet Coaster 2", "Simulation", "🎢"],
  ["Kerbal Space Program", "Simulation", "🚀"],
  ["Euro Truck Simulator", "Simulation", "🚛"],
  ["BeamNG.drive", "Racing", "🚗"],
  ["CarX Drift Racing Online", "Racing", "🏎️"],
  ["Wreckfest", "Racing", "🚗"],
  ["Dirt Rally 2.0", "Racing", "🏁"],
  ["Grid Legends", "Racing", "🏎️"],
  ["Hot Wheels Unleashed 2", "Racing", "🏎️"],
  ["Trackmania Turbo", "Racing", "🏁"],
  ["Paladins", "FPS", "🎯"],
  ["Splitgate 2", "FPS", "🌀"],
  ["XDefiant", "FPS", "🔫"],
  ["The Finals", "FPS", "💥"],
  ["Halo Infinite", "FPS", "🪖"],
  ["Halo MCC", "FPS", "🪖"],
  ["Destiny", "FPS", "🌌"],
  ["Borderlands 2", "FPS", "🔫"],
  ["Payday 2", "FPS", "💰"],
  ["Payday 3", "FPS", "💰"],
  ["Deep Rock Galactic", "Action", "⛏️"],
  ["Risk of Rain 2", "Action", "🌧️"],
  ["Warhammer 40000 Darktide", "Action", "🔫"],
  ["V Rising", "Survival", "🧛"],
  ["Enshrouded", "Survival", "🏰"],
  ["Once Human", "Survival", "👾"],
  ["Palia", "Adventure", "🌿"],
  ["Core Keeper", "Adventure", "⛏️"],
  ["Terraria", "Survival", "⛏️"],
  ["Don't Starve", "Survival", "🔥"],
  ["Cuphead", "Platform", "☕"],
  ["Hollow Knight", "Adventure", "🐞"],
  ["Hollow Knight Silksong", "Adventure", "🕷️"],
  ["Ori and the Will of the Wisps", "Adventure", "🌿"],
  ["Celeste", "Platform", "🏔️"],
  ["Dead Cells", "Action", "⚔️"],
  ["Risk of Rain", "Action", "🌧️"],
  ["Undertale", "RPG", "❤️"],
  ["Among Us", "Party", "🚀"],
  ["Brawlhalla", "Fighting", "🥊"],
  ["MultiVersus", "Fighting", "🥊"],
  ["Genshin Impact", "RPG", "✨"],
  ["Honkai Star Rail", "RPG", "🚂"],
  ["Zenless Zone Zero", "Action", "⚡"],
  ["Wuthering Waves", "RPG", "🌊"],
  ["Blue Protocol", "RPG", "⚔️"],
  ["Tower of Fantasy", "RPG", "🌌"],
  ["Naraka Bladepoint", "Action", "⚔️"],
  ["PUBG Battlegrounds", "Battle Royale", "🔫"],
  ["Free Fire", "Battle Royale", "🔥"],
  ["Fall Guys", "Party", "🏃"],
  ["The Sims 4", "Simulation", "🏠"],
  ["Euro Truck Simulator 2", "Simulation", "🚛"],
  ["American Truck Simulator", "Simulation", "🚛"],
  ["Microsoft Flight Simulator 2024", "Simulation", "✈️"],
  ["Farming Simulator 25", "Simulation", "🚜"],
  ["House Flipper 2", "Simulation", "🏠"],
  ["PowerWash Simulator", "Simulation", "🧽"],
  ["Phasmophobia", "Horror", "👻"],
  ["Outlast", "Horror", "👻"],
  ["Outlast 2", "Horror", "👻"],
  ["Amnesia The Bunker", "Horror", "🔦"],
  ["SOMA", "Horror", "🤖"],
  ["Little Nightmares", "Horror", "👻"],
  ["Little Nightmares II", "Horror", "👻"],
  ["Poppy Playtime", "Horror", "🧸"],
  ["Five Nights at Freddy's", "Horror", "🐻"],
  ["Five Nights at Freddy's Security Breach", "Horror", "🐻"],
  ["Resident Evil 2", "Horror", "🧟"],
  ["Resident Evil 3", "Horror", "🧟"],
  ["Resident Evil 7", "Horror", "🏚️"],
  ["Resident Evil Village", "Horror", "🏚️"],
  ["Devil May Cry 5", "Action", "⚔️"],
  ["Nioh 2", "Action", "⚔️"],
  ["Wo Long Fallen Dynasty", "Action", "⚔️"],
  ["Lies of P", "Action", "⚔️"],
  ["Mortal Shell", "RPG", "⚔️"],
  ["Remnant From the Ashes", "Action", "🔫"],
  ["The Division 2", "Action", "🔫"],
  ["Ghost Recon Breakpoint", "Action", "🎯"],
  ["Ghost Recon Wildlands", "Action", "🎯"],
  ["Metal Gear Solid V", "Action", "🐍"],
  ["Deathloop", "Action", "🔫"],
  ["Prey", "Action", "👽"],
  ["Dishonored 2", "Action", "🎭"],
  ["Doom", "FPS", "💀"],
  ["Doom II", "FPS", "💀"],
  ["Doom Eternal", "FPS", "💀"],
  ["Wolfenstein II", "FPS", "🔫"],
  ["Wolfenstein Youngblood", "FPS", "🔫"],
  ["Rage 2", "FPS", "🔫"],
  ["Crysis Remastered", "FPS", "🔫"],
  ["Crysis 3", "FPS", "🔫"],
  ["Metro Exodus", "FPS", "🚇"],
  ["Metro Last Light", "FPS", "🚇"],
  ["Stalker 2", "FPS", "☢️"],
  ["Atomic Heart", "FPS", "🤖"],
  ["Prey", "FPS", "👽"],
  ["Starfield", "RPG", "🚀"],
  ["Mass Effect Legendary Edition", "RPG", "🚀"],
  ["Dragon Age Veilguard", "RPG", "🐉"],
  ["Baldur's Gate 3", "RPG", "🐉"],
  ["Divinity Original Sin 2", "RPG", "⚔️"],
  ["Path of Exile", "RPG", "⚔️"],
  ["Diablo III", "RPG", "🔥"],
  ["Torchlight III", "RPG", "🔥"],
  ["Grim Dawn", "RPG", "⚔️"],
  ["Borderlands", "FPS", "🔫"],
  ["Borderlands 2", "FPS", "🔫"],
  ["Borderlands 3", "FPS", "🔫"],
  ["Borderlands 4", "FPS", "🔫"],
  ["Tiny Tina's Wonderlands", "RPG", "🐉"],
  ["Sea of Thieves", "Adventure", "🏴‍☠️"],
  ["No Man's Sky", "Adventure", "🚀"],
  ["Star Wars Battlefront II", "FPS", "🌌"],
  ["Star Wars Jedi Fallen Order", "Action", "⚔️"],
  ["Star Wars Jedi Survivor", "Action", "⚔️"],
  ["Star Wars Outlaws", "Action", "🌌"],
  ["Marvel Rivals", "FPS", "🦸"],
  ["Suicide Squad Kill the Justice League", "Action", "🦸"],
  ["Batman Arkham Knight", "Action", "🦇"],
  ["Middle Earth Shadow of War", "Action", "⚔️"],
  ["Middle Earth Shadow of Mordor", "Action", "⚔️"],
  ["Mad Max", "Action", "🚗"],
  ["Just Cause 4", "Open World", "💥"],
  ["Just Cause 3", "Open World", "💥"],
  ["Far Cry 3", "FPS", "🔫"],
  ["Far Cry 4", "FPS", "🔫"],
  ["Far Cry 5", "FPS", "🔫"],
  ["Far Cry 6", "FPS", "🔫"],
  ["Watch Dogs", "Open World", "💻"],
  ["Watch Dogs 2", "Open World", "💻"],
  ["Watch Dogs Legion", "Open World", "💻"],
  ["Saints Row", "Open World", "🚗"],
  ["Saints Row IV", "Open World", "🚗"],
  ["Sleeping Dogs", "Open World", "🥋"],
  ["Just Cause 2", "Open World", "💥"]
];


/* =========================================================
   REAL GAME LOGOS
   ========================================================= */

const logoMap = {
  "Minecraft": "https://cdn.simpleicons.org/minecraft",
  "Fortnite": "https://cdn.simpleicons.org/fortnite",
  "Valorant": "https://cdn.simpleicons.org/valorant",
  "Counter-Strike 2": "https://cdn.simpleicons.org/counterstrike",
  "Grand Theft Auto V": "https://cdn.simpleicons.org/grandtheftauto",
  "Apex Legends": "https://cdn.simpleicons.org/apexlegends",
  "PUBG": "https://cdn.simpleicons.org/pubg",
  "Rocket League": "https://cdn.simpleicons.org/rocketleague",
  "Overwatch 2": "https://cdn.simpleicons.org/overwatch",
  "League of Legends": "https://cdn.simpleicons.org/leagueoflegends",
  "Dota 2": "https://cdn.simpleicons.org/dota",
  "Warframe": "https://cdn.simpleicons.org/warframe",
  "Forza Horizon 5": "https://cdn.simpleicons.org/forza",
  "Roblox": "https://cdn.simpleicons.org/roblox",
  "Discord": "https://cdn.simpleicons.org/discord",
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
  const grid = $("gameGrid");
  if (!grid) return;

  const search =
    ($("gameSearch")?.value || "")
      .toLowerCase()
      .trim();

  const filtered = games.filter(game => {
    const name = game[0].toLowerCase();
    const category = game[1];

    return (
      (currentCategory === "All" ||
        category === currentCategory) &&
      (!search || name.includes(search))
    );
  });

  const shown = filtered.slice(0, visibleGames);

  grid.innerHTML = shown.map(game => {
    const [name, category, emoji] = game;
    const logo = logoMap[name];

    return `
      <article class="game-card">
        <div class="game-icon">
          ${
            logo
              ? `
                <img
                  src="${logo}"
                  alt="${name} logo"
                  loading="lazy"
                  onerror="this.style.display='none';this.nextElementSibling.style.display='grid';"
                >
                <span class="game-fallback" style="display:none">
                  ${emoji}
                </span>
              `
              : `
                <span class="game-fallback">
                  ${emoji}
                </span>
              `
          }
        </div>

        <div class="game-info">
          <h3>${name}</h3>
          <span>${category}</span>
        </div>
      </article>
    `;
  }).join("");

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
        .forEach(btn =>
          btn.classList.remove("active")
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


/* =========================================================
   HARDWARE DATABASE
   ========================================================= */

const gpuData = {
  "RTX 5090": 100,
  "RTX 5080": 94,
  "RTX 5070 Ti": 88,
  "RTX 5070": 83,
  "RTX 5060 Ti": 76,
  "RTX 5060": 70,
  "RTX 4090": 99,
  "RTX 4080 Super": 94,
  "RTX 4080": 91,
  "RTX 4070 Ti Super": 88,
  "RTX 4070 Ti": 84,
  "RTX 4070 Super": 82,
  "RTX 4070": 78,
  "RTX 4060 Ti": 68,
  "RTX 4060": 62,
  "RTX 4050": 52,
  "RTX 3090 Ti": 89,
  "RTX 3090": 86,
  "RTX 3080 Ti": 84,
  "RTX 3080": 81,
  "RTX 3070 Ti": 76,
  "RTX 3070": 73,
  "RTX 3060 Ti": 69,
  "RTX 3060": 61,
  "RTX 3050": 50,
  "GTX 1660 Super": 45,
  "GTX 1660": 42,
  "GTX 1650": 32,
  "GTX 1080 Ti": 53,
  "GTX 1080": 49,
  "GTX 1070 Ti": 45,
  "GTX 1070": 42,
  "GTX 1060": 35,
  "GTX 1050 Ti": 25,

  "RX 7900 XTX": 96,
  "RX 7900 XT": 89,
  "RX 7800 XT": 81,
  "RX 7700 XT": 76,
  "RX 7600 XT": 67,
  "RX 7600": 62,
  "RX 6950 XT": 87,
  "RX 6900 XT": 84,
  "RX 6800 XT": 80,
  "RX 6800": 75,
  "RX 6700 XT": 68,
  "RX 6600 XT": 59,
  "RX 6600": 54,
  "RX 6500 XT": 35,
  "RX 580": 30,
  "RX 570": 26,

  "Intel Arc B580": 61,
  "Intel Arc B570": 55,
  "Intel Arc A770": 54,
  "Intel Arc A750": 49,
  "Intel Arc A580": 42,
  "Intel Arc A380": 28
};

const cpuData = {
  "Intel Core i9-14900K": 98,
  "Intel Core i9-14900KS": 100,
  "Intel Core i7-14700K": 91,
  "Intel Core i5-14600K": 84,
  "Intel Core i5-14400F": 72,
  "Intel Core i9-13900K": 94,
  "Intel Core i7-13700K": 88,
  "Intel Core i5-13600K": 82,
  "Intel Core i5-13400F": 70,
  "Intel Core i9-12900K": 87,
  "Intel Core i7-12700K": 82,
  "Intel Core i5-12600K": 76,
  "Intel Core i5-12400F": 67,
  "Intel Core i9-11900K": 72,
  "Intel Core i7-11700K": 66,
  "Intel Core i5-11600K": 60,
  "Intel Core i5-10400F": 54,
  "Intel Core i7-10700K": 62,
  "Intel Core i5-9600K": 50,

  "AMD Ryzen 9 9950X": 100,
  "AMD Ryzen 9 9900X": 94,
  "AMD Ryzen 7 9800X3D": 99,
  "AMD Ryzen 7 9700X": 88,
  "AMD Ryzen 5 9600X": 82,
  "AMD Ryzen 9 7950X3D": 98,
  "AMD Ryzen 9 7950X": 94,
  "AMD Ryzen 9 7900X": 90,
  "AMD Ryzen 7 7800X3D": 96,
  "AMD Ryzen 7 7700X": 84,
  "AMD Ryzen 5 7600X": 78,
  "AMD Ryzen 5 7600": 75,
  "AMD Ryzen 7 5800X3D": 87,
  "AMD Ryzen 7 5800X": 77,
  "AMD Ryzen 5 5600X": 68,
  "AMD Ryzen 5 5600": 65,
  "AMD Ryzen 5 3600": 53,
  "AMD Ryzen 7 3700X": 58
};

const ramData = {
  "4 GB DDR4": 25,
  "8 GB DDR4": 42,
  "16 GB DDR4": 68,
  "32 GB DDR4": 82,
  "64 GB DDR4": 91,
  "128 GB DDR4": 96,
  "8 GB DDR5": 46,
  "16 GB DDR5": 74,
  "24 GB DDR5": 79,
  "32 GB DDR5": 88,
  "48 GB DDR5": 92,
  "64 GB DDR5": 96,
  "128 GB DDR5": 100,
  "8 GB DDR3": 25,
  "16 GB DDR3": 38,
  "32 GB DDR3": 50
};


/* =========================================================
   HARDWARE SELECTS
   ========================================================= */

function fillSelect(id, data) {
  const select = $(id);
  if (!select) return;

  const oldValue = select.value;

  select.innerHTML = "";

  Object.entries(data).forEach(([name, score]) => {
    const option = document.createElement("option");

    option.value = score;
    option.textContent = name;
    option.dataset.name = name;

    select.appendChild(option);
  });

  if (oldValue) {
    select.value = oldValue;
  }
}

[
  "gpu1",
  "gpu2",
  "checkGpu"
].forEach(id =>
  fillSelect(id, gpuData)
);

[
  "cpu1",
  "cpu2",
  "checkCpu"
].forEach(id =>
  fillSelect(id, cpuData)
);

[
  "ram1",
  "ram2",
  "checkRam"
].forEach(id =>
  fillSelect(id, ramData)
);


/* =========================================================
   GAME SELECT FOR PC ANALYSIS
   ========================================================= */

function fillGameSelect() {
  const select = $("checkGame");

  if (!select) return;

  select.innerHTML = "";

  games.forEach(game => {
    const option = document.createElement("option");

    option.value = game[0];
    option.textContent = game[0];

    select.appendChild(option);
  });
}

fillGameSelect();


/* =========================================================
   VS BATTLE
   ========================================================= */

function getStat(id) {
  const value = parseFloat($(id)?.value);
  return Number.isFinite(value) ? value : 50;
}

function setHP(player, value) {
  value = Math.max(0, Math.round(value));

  const number = $(`hpNumber${player}`);
  const bar = $(`hp${player}`);

  if (number) {
    number.textContent = value;
  }

  if (bar) {
    bar.style.width = `${value}%`;

    if (value <= 25) {
      bar.classList.add("critical");
    } else {
      bar.classList.remove("critical");
    }
  }
}

let audioContext = null;
let soundEnabled =
  localStorage.getItem("gamecheckSound") !== "off";

function initAudio() {
  if (!soundEnabled) return;

  try {
    if (!audioContext) {
      audioContext =
        new (
          window.AudioContext ||
          window.webkitAudioContext
        )();
    }

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  } catch {
    audioContext = null;
  }
}

function tone(
  frequency,
  duration = .12,
  type = "sine",
  volume = .05,
  endFrequency = null
) {
  if (!soundEnabled) return;

  initAudio();

  if (!audioContext) return;

  const osc =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();

  osc.type = type;

  osc.frequency.setValueAtTime(
    frequency,
    audioContext.currentTime
  );

  if (endFrequency) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(20, endFrequency),
      audioContext.currentTime + duration
    );
  }

  gain.gain.setValueAtTime(
    .0001,
    audioContext.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    volume,
    audioContext.currentTime + .01
  );

  gain.gain.exponentialRampToValueAtTime(
    .0001,
    audioContext.currentTime + duration
  );

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.start();
  osc.stop(
    audioContext.currentTime +
    duration +
    .02
  );
}

function noise(duration = .15, volume = .07) {
  if (!soundEnabled) return;

  initAudio();

  if (!audioContext) return;

  const buffer =
    audioContext.createBuffer(
      1,
      audioContext.sampleRate * duration,
      audioContext.sampleRate
    );

  const data =
    buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {
    data[i] =
      Math.random() * 2 - 1;
  }

  const source =
    audioContext.createBufferSource();

  const gain =
    audioContext.createGain();

  source.buffer = buffer;

  gain.gain.setValueAtTime(
    volume,
    audioContext.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    .0001,
    audioContext.currentTime + duration
  );

  source.connect(gain);
  gain.connect(audioContext.destination);

  source.start();
}

function sfx(name) {
  if (!soundEnabled) return;

  switch (name) {

    case "count":
      tone(
        520,
        .12,
        "square",
        .05
      );
      break;

    case "go":
      tone(
        300,
        .22,
        "sawtooth",
        .06,
        850
      );
      break;

    case "sword":
      noise(.12, .045);
      tone(
        750,
        .13,
        "sawtooth",
        .045,
        120
      );
      break;

    case "gun":
      noise(.08, .08);
      tone(
        180,
        .1,
        "square",
        .045,
        60
      );
      break;

    case "build":
      tone(
        180,
        .1,
        "square",
        .035
      );

      setTimeout(() =>
        tone(
          300,
          .1,
          "square",
          .035
        ),
        100
      );
      break;

    case "rocket":
      tone(
        80,
        .5,
        "sawtooth",
        .06,
        500
      );
      break;

    case "hit":
      noise(.13, .1);
      tone(
        100,
        .16,
        "square",
        .06,
        40
      );
      break;

    case "boom":
      noise(.45, .14);
      tone(
        65,
        .42,
        "sawtooth",
        .08,
        25
      );
      break;

    case "win":
      tone(440, .14, "square", .05);

      setTimeout(() =>
        tone(660, .14, "square", .05),
        130
      );

      setTimeout(() =>
        tone(880, .25, "square", .06),
        270
      );

      break;
  }
}


/* =========================================================
   SOUND BUTTON
   ========================================================= */

function createSoundButton() {
  if ($("soundToggle")) return;

  const button =
    document.createElement("button");

  button.id = "soundToggle";
  button.type = "button";

  button.textContent =
    soundEnabled ? "🔊" : "🔇";

  button.title =
    soundEnabled
      ? "Mute sound"
      : "Enable sound";

  document.body.appendChild(button);

  button.addEventListener("click", () => {

    soundEnabled = !soundEnabled;

    localStorage.setItem(
      "gamecheckSound",
      soundEnabled ? "on" : "off"
    );

    button.textContent =
      soundEnabled ? "🔊" : "🔇";

    if (soundEnabled) {
      initAudio();
      sfx("go");
    }
  });
}

createSoundButton();

window.addEventListener(
  "pointerdown",
  initAudio,
  { once: true }
);


/* =========================================================
   BATTLE EFFECTS
   ========================================================= */

function getArena() {
  return $("battleArena");
}

function clearBattleEffects() {
  const ar = getArena();
  if (!ar) return;

  ar.querySelectorAll(
    ".battle-slash," +
    ".battle-projectile," +
    ".battle-wall," +
    ".battle-flash," +
    ".battle-spark"
  ).forEach(el => el.remove());
}

function shakeArena() {
  const ar = getArena();
  if (!ar) return;

  ar.classList.remove("arena-shake");

  void ar.offsetWidth;

  ar.classList.add("arena-shake");

  setTimeout(() =>
    ar.classList.remove("arena-shake"),
    500
  );
}

function flashArena() {
  const ar = getArena();
  if (!ar) return;

  const flash =
    document.createElement("div");

  flash.className =
    "battle-flash";

  ar.appendChild(flash);

  setTimeout(
    () => flash.remove(),
    400
  );
}

function sparks() {
  const ar = getArena();
  if (!ar) return;

  for (let i = 0; i < 15; i++) {

    const spark =
      document.createElement("i");

    spark.className =
      "battle-spark";

    spark.style.left =
      `${45 + Math.random() * 10}%`;

    spark.style.top =
      `${40 + Math.random() * 20}%`;

    spark.style.setProperty(
      "--x",
      `${(Math.random() - .5) * 180}px`
    );

    spark.style.setProperty(
      "--y",
      `${(Math.random() - .5) * 140}px`
    );

    ar.appendChild(spark);

    setTimeout(
      () => spark.remove(),
      700
    );
  }
}


/* =========================================================
   COUNTDOWN
   ========================================================= */

async function battleCountdown() {
  const el = $("countdown");
  if (!el) return;

  for (const number of [
    "3",
    "2",
    "1"
  ]) {

    el.textContent = number;

    el.classList.remove("count-pop");

    void el.offsetWidth;

    el.classList.add("count-pop");

    sfx("count");

    await wait(650);
  }

  el.textContent = "GO!";

  el.classList.remove("count-pop");

  void el.offsetWidth;

  el.classList.add("count-pop");

  sfx("go");

  await wait(600);

  el.textContent = "";
}


/* =========================================================
   FIGHTER ANIMATION
   ========================================================= */

function resetFighters() {
  document
    .querySelectorAll(
      ".fighter-one,.fighter-two"
    )
    .forEach(fighter => {

      fighter.classList.remove(
        "fighter-jump-left",
        "fighter-jump-right",
        "fighter-charge",
        "fighter-hit",
        "fighter-winner",
        "fighter-loser"
      );
    });
}

function animateFighter(player) {
  const fighter =
    document.querySelector(
      player === 1
        ? ".fighter-one"
        : ".fighter-two"
    );

  if (!fighter) return;

  fighter.classList.add(
    player === 1
      ? "fighter-jump-left"
      : "fighter-jump-right"
  );

  setTimeout(() => {
    fighter.classList.remove(
      "fighter-jump-left",
      "fighter-jump-right"
    );
  }, 750);
}


/* =========================================================
   ATTACKS
   ========================================================= */

function swordAttack(player) {
  const ar = getArena();
  if (!ar) return;

  animateFighter(player);

  const slash =
    document.createElement("div");

  slash.className =
    player === 1
      ? "battle-slash slash-left"
      : "battle-slash slash-right";

  ar.appendChild(slash);

  sfx("sword");

  setTimeout(
    () => slash.remove(),
    600
  );
}

function gunAttack(player) {
  const ar = getArena();
  if (!ar) return;

  animateFighter(player);

  const projectile =
    document.createElement("div");

  projectile.className =
    player === 1
      ? "battle-projectile projectile-left"
      : "battle-projectile projectile-right";

  ar.appendChild(projectile);

  sfx("gun");

  setTimeout(
    () => projectile.remove(),
    700
  );
}

function rocketAttack(player) {
  const ar = getArena();
  if (!ar) return;

  animateFighter(player);

  const projectile =
    document.createElement("div");

  projectile.className =
    player === 1
      ? "battle-projectile rocket-left"
      : "battle-projectile rocket-right";

  ar.appendChild(projectile);

  sfx("rocket");

  setTimeout(
    () => projectile.remove(),
    900
  );
}

function buildWall(player) {
  const ar = getArena();
  if (!ar) return;

  const wall =
    document.createElement("div");

  wall.className =
    player === 1
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
  }, 800);

  setTimeout(() => {
    wall.remove();
  }, 1200);
}


/* =========================================================
   DAMAGE
   ========================================================= */

async function damagePlayer(
  player,
  amount
) {
  const hpEl =
    $(`hpNumber${player}`);

  const current =
    parseInt(
      hpEl?.textContent || "100",
      10
    );

  const next =
    Math.max(
      0,
      current - amount
    );

  const fighter =
    document.querySelector(
      player === 1
        ? ".fighter-one"
        : ".fighter-two"
    );

  if (fighter) {
    fighter.classList.add(
      "fighter-hit"
    );

    setTimeout(() =>
      fighter.classList.remove(
        "fighter-hit"
      ),
      500
    );
  }

  setHP(player, next);

  sfx("hit");
  flashArena();
  shakeArena();
  sparks();

  await wait(650);

  return next;
}


/* =========================================================
   ROUND
   ========================================================= */

async function playRound(
  round,
  winner,
  stats1,
  stats2
) {
  const roundText =
    $("roundText");

  const weaponText =
    $("weapon");

  if (roundText) {
    roundText.textContent =
      `ROUND ${round}`;
  }

  clearBattleEffects();
  resetFighters();

  if (round === 1) {

    if (weaponText)
      weaponText.textContent =
        "⚔ GPU CLASH";

    swordAttack(winner);

    await wait(650);

    const loser =
      winner === 1 ? 2 : 1;

    await damagePlayer(
      loser,
      30
    );
  }

  if (round === 2) {

    if (weaponText)
      weaponText.textContent =
        "🔫 RAM RAID";

    buildWall(winner);

    await wait(450);

    gunAttack(winner);

    await wait(650);

    const loser =
      winner === 1 ? 2 : 1;

    await damagePlayer(
      loser,
      35
    );
  }

  if (round === 3) {

    if (weaponText)
      weaponText.textContent =
        "🚀 CPU OVERDRIVE";

    rocketAttack(winner);

    await wait(850);

    sfx("boom");
    flashArena();
    shakeArena();
    sparks();

    const loser =
      winner === 1 ? 2 : 1;

    await damagePlayer(
      loser,
      40
    );
  }

  await wait(500);
}


/* =========================================================
   START BATTLE
   ========================================================= */

async function startBattle() {

  initAudio();

  const button =
    $("startBattle");

  if (button) {
    button.disabled = true;
    button.textContent =
      "⚡ BATTLE RUNNING...";
  }

  const result =
    $("battleResult");

  if (result) {
    result.classList.remove("show");
    result.innerHTML = "";
  }

  const name1 =
    $("player1")?.value.trim()
    || "PLAYER 1";

  const name2 =
    $("player2")?.value.trim()
    || "PLAYER 2";

  if ($("fighterName1"))
    $("fighterName1").textContent =
      name1;

  if ($("fighterName2"))
    $("fighterName2").textContent =
      name2;

  if ($("hpName1"))
    $("hpName1").textContent =
      name1;

  if ($("hpName2"))
    $("hpName2").textContent =
      name2;

  setHP(1, 100);
  setHP(2, 100);

  clearBattleEffects();
  resetFighters();

  const stats1 = {
    gpu: getStat("gpu1"),
    ram: getStat("ram1"),
    cpu: getStat("cpu1")
  };

  const stats2 = {
    gpu: getStat("gpu2"),
    ram: getStat("ram2"),
    cpu: getStat("cpu2")
  };

  await battleCountdown();

  const roundWinners = [];

  const stats = [
    ["gpu", 1],
    ["ram", 2],
    ["cpu", 3]
  ];

  for (const [stat, round] of stats) {

    const winner =
      stats1[stat] === stats2[stat]
        ? Math.random() < .5
          ? 1
          : 2
        : stats1[stat] > stats2[stat]
          ? 1
          : 2;

    roundWinners.push(winner);

    await playRound(
      round,
      winner,
      stats1,
      stats2
    );
  }

  const wins1 =
    roundWinners.filter(
      winner => winner === 1
    ).length;

  const wins2 =
    roundWinners.filter(
      winner => winner === 2
    ).length;

  const finalWinner =
    wins1 >= wins2 ? 1 : 2;

  const winnerFighter =
    document.querySelector(
      finalWinner === 1
        ? ".fighter-one"
        : ".fighter-two"
    );

  const loserFighter =
    document.querySelector(
      finalWinner === 1
        ? ".fighter-two"
        : ".fighter-one"
    );

  if (winnerFighter)
    winnerFighter.classList.add(
      "fighter-winner"
    );

  if (loserFighter)
    loserFighter.classList.add(
      "fighter-loser"
    );

  const winnerName =
    finalWinner === 1
      ? name1
      : name2;

  if (result) {

    result.innerHTML = `
      <div class="victory-title">
        🏆 VICTORY
      </div>

      <strong>
        ${winnerName}
      </strong>

      <span>
        DOMINATED THE BATTLE
      </span>
    `;

    result.classList.add("show");
  }

  sfx("win");

  if (button) {
    button.disabled = false;
    button.textContent =
      "⚔ START BATTLE";
  }
}

safeOn(
  "startBattle",
  "click",
  startBattle
);


/* =========================================================
   PC ANALYSIS
   ========================================================= */

const gameMultipliers = {
  "Minecraft": 1.55,
  "Valorant": 2.1,
  "Counter-Strike 2": 1.8,
  "Fortnite": 1.35,
  "Grand Theft Auto V": 1.25,
  "Grand Theft Auto VI": .75,
  "Apex Legends": 1.3,
  "PUBG": 1.2,
  "Rocket League": 1.9,
  "Forza Horizon 5": 1.05,
  "Cyberpunk 2077": .72,
  "Red Dead Redemption 2": .82,
  "Elden Ring": .9,
  "God of War": .95,
  "Marvel Rivals": .95,
  "Call of Duty Warzone": 1.0
};

function getGameMultiplier(name) {
  return gameMultipliers[name] || 1.1;
}

function animateNumber(
  element,
  target,
  duration = 1000
) {
  if (!element) return;

  const start = performance.now();

  function update(now) {

    const progress =
      Math.min(
        1,
        (now - start) / duration
      );

    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );

    const value =
      Math.round(
        target * eased
      );

    element.textContent =
      value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function setStage(
  id,
  active = false,
  complete = false
) {
  const el = $(id);
  if (!el) return;

  el.classList.toggle(
    "active",
    active
  );

  el.classList.toggle(
    "complete",
    complete
  );
}

async function checkPC() {

  const button =
    $("checkPcBtn");

  if (button) {
    button.disabled = true;
    button.textContent =
      "SCANNING...";
  }

  const consoleBox =
    $("analysisConsole");

  if (consoleBox) {
    consoleBox.classList.add(
      "scanning"
    );
  }

  const stages = [
    ["stageGpu", "GPU SCAN"],
    ["stageCpu", "CPU SCAN"],
    ["stageRam", "RAM SCAN"],
    ["stageGame", "GAME TEST"]
  ];

  for (let i = 0; i < stages.length; i++) {

    const [id, text] =
      stages[i];

    setStage(
      id,
      true,
      false
    );

    if ($("scanStatus")) {
      $("scanStatus").textContent =
        text;
    }

    if ($("analysisMessages")) {
      $("analysisMessages").textContent =
        `${text} IN PROGRESS...`;
    }

    for (
      let percent = 0;
      percent <= 100;
      percent += 10
    ) {

      if ($("scanPercent")) {
        $("scanPercent").textContent =
          `${Math.min(
            100,
            Math.round(
              (i * 100 + percent) /
              stages.length
            )
          )}%`;
      }

      if ($("scanProgress")) {
        $("scanProgress").style.width =
          `${Math.min(
            100,
            (i * 100 + percent) /
            stages.length
          )}%`;
      }

      await wait(35);
    }

    setStage(
      id,
      false,
      true
    );
  }

  const gpu =
    getStat("checkGpu");

  const cpu =
    getStat("checkCpu");

  const ram =
    getStat("checkRam");

  const game =
    $("checkGame")?.value ||
    "Minecraft";

  const score = Math.round(
    gpu * .48 +
    cpu * .34 +
    ram * .18
  );

  const fps = Math.max(
    15,
    Math.round(
      score *
      getGameMultiplier(game)
    )
  );

  let tier;
  let title;
  let description;

  if (score >= 90) {

    tier = "MONSTER";
    title = "ABSOLUTE BEAST";
    description =
      "Your PC has serious gaming power.";

  } else if (score >= 75) {

    tier = "GREAT";
    title = "HIGH PERFORMANCE";
    description =
      "Excellent hardware for modern gaming.";

  } else if (score >= 55) {

    tier = "PLAYABLE";
    title = "SOLID GAMING PC";
    description =
      "You can handle a large range of games.";

  } else {

    tier = "ENTRY";
    title = "BUDGET GAMING";
    description =
      "Best suited for lighter games and competitive settings.";
  }

  const lowest =
    Math.min(
      gpu,
      cpu,
      ram
    );

  let bottleneck;

  if (lowest === gpu)
    bottleneck = "GPU";

  else if (lowest === cpu)
    bottleneck = "CPU";

  else
    bottleneck = "RAM";

  if ($("performanceTitle"))
    $("performanceTitle").textContent =
      `${title} — ${tier}`;

  if ($("performanceText"))
    $("performanceText").textContent =
      `${description} Estimated performance for ${game}.`;

  if ($("bottleneckValue"))
    $("bottleneckValue").textContent =
      bottleneck;

  if ($("gpuResult"))
    $("gpuResult").textContent =
      Math.round(gpu);

  if ($("cpuResult"))
    $("cpuResult").textContent =
      Math.round(cpu);

  if ($("ramResult"))
    $("ramResult").textContent =
      Math.round(ram);

  animateNumber(
    $("scoreValue"),
    score,
    1200
  );

  animateNumber(
    $("fpsValue"),
    fps,
    1400
  );

  const result =
    $("pcResult");

  if (result) {
    result.classList.add("show");
  }

  if ($("scanStatus"))
    $("scanStatus").textContent =
      "ANALYSIS COMPLETE";

  if ($("analysisMessages"))
    $("analysisMessages").textContent =
      "SYSTEM ANALYSIS COMPLETE.";

  if (consoleBox) {
    consoleBox.classList.remove(
      "scanning"
    );
  }

  if (button) {
    button.disabled = false;
    button.textContent =
      "⚡ ANALYZE PC";
  }
}

safeOn(
  "checkPcBtn",
  "click",
  checkPC
);


/* =========================================================
   THEMES
   ========================================================= */

function applyTheme(theme) {

  document.body.dataset.theme =
    theme;

  localStorage.setItem(
    "gamecheckTheme",
    theme
  );

  document
    .querySelectorAll(
      "[data-theme]"
    )
    .forEach(button => {

      button.classList.toggle(
        "selected",
        button.dataset.theme === theme
      );
    });
}

const savedTheme =
  localStorage.getItem(
    "gamecheckTheme"
  ) || "cyber";

applyTheme(savedTheme);

document
  .querySelectorAll(
    "[data-theme]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        applyTheme(
          button.dataset.theme
        );

        const modal =
          $("themeModal");

        if (modal) {
          modal.classList.remove(
            "show"
          );
        }
      }
    );
  });


/* =========================================================
   FIRST VISIT THEME PICKER
   ========================================================= */

if (
  !localStorage.getItem(
    "gamecheckThemeChosen"
  )
) {

  setTimeout(() => {

    const modal =
      $("themeModal");

    if (modal) {
      modal.classList.add(
        "show"
      );
    }

    localStorage.setItem(
      "gamecheckThemeChosen",
      "yes"
    );

  }, 1500);
}


/* =========================================================
   LOGIN
   ========================================================= */

function loadLogin() {

  const saved =
    localStorage.getItem(
      "gamecheckUser"
    );

  const button =
    $("loginBtn");

  if (
    saved &&
    button
  ) {
    button.textContent =
      `👤 ${saved}`;
  }
}

safeOn(
  "loginBtn",
  "click",
  () => {

    const modal =
      $("loginModal");

    if (modal) {
      modal.classList.add(
        "show"
      );
    }
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

    if (!name) return;

    localStorage.setItem(
      "gamecheckUser",
      name
    );

    const modal =
      $("loginModal");

    if (modal) {
      modal.classList.remove(
        "show"
      );
    }

    loadLogin();
  }
);

loadLogin();


/* =========================================================
   MODALS
   ========================================================= */

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
            "show"
          );
        }
      }
    );
  });


/* =========================================================
   MOBILE MENU
   ========================================================= */

safeOn(
  "menuBtn",
  "click",
  () => {

    const nav =
      document.querySelector(
        ".nav-links"
      );

    if (nav) {
      nav.classList.toggle(
        "mobile-open"
      );
    }
  }
);

document
  .querySelectorAll(
    ".nav-links a"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        document
          .querySelector(
            ".nav-links"
          )
          ?.classList.remove(
            "mobile-open"
          );
      }
    );
  });


/* =========================================================
   FRIEND LIST
   ========================================================= */

function loadFriends() {

  const list =
    $("friendList");

  if (!list) return;

  let friends = [];

  try {
    friends =
      JSON.parse(
        localStorage.getItem(
          "gamecheckFriends"
        )
      ) || [];
  } catch {
    friends = [];
  }

  list.innerHTML = "";

  friends.forEach(name => {

    const item =
      document.createElement(
        "div"
      );

    item.className =
      "friend-item";

    item.innerHTML = `
      <span class="friend-dot"></span>
      <strong>${name}</strong>
      <small>ONLINE</small>
    `;

    list.appendChild(item);
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

    if (!name?.trim())
      return;

    let friends = [];

    try {
      friends =
        JSON.parse(
          localStorage.getItem(
            "gamecheckFriends"
          )
        ) || [];
    } catch {
      friends = [];
    }

    if (
      friends.includes(
        name.trim()
      )
    ) return;

    friends.push(
      name.trim()
    );

    localStorage.setItem(
      "gamecheckFriends",
      JSON.stringify(
        friends
      )
    );

    loadFriends();
  }
);

loadFriends();


/* =========================================================
   COUNTERS
   ========================================================= */

document
  .querySelectorAll(
    "[data-target]"
  )
  .forEach(counter => {

    const target =
      parseInt(
        counter.dataset.target,
        10
      );

    if (!Number.isFinite(target))
      return;

    let current = 0;

    const step =
      Math.max(
        1,
        Math.ceil(
          target / 60
        )
      );

    const timer =
      setInterval(() => {

        current += step;

        if (
          current >= target
        ) {
          current = target;
          clearInterval(timer);
        }

        counter.textContent =
          current.toLocaleString();

      }, 25);
  });


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

if (
  "IntersectionObserver"
  in window
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
                "revealed"
              );

              observer.unobserve(
                entry.target
              );
            }
          }
        );

      },
      {
        threshold: .12
      }
    );

  document
    .querySelectorAll(
      ".section," +
      ".game-card," +
      ".feature-card," +
      ".leaderboard-card"
    )
    .forEach(element => {

      element.classList.add(
        "reveal"
      );

      observer.observe(
        element
      );
    });
}


/* =========================================================
   DEVICE DETECTION
   ========================================================= */

const isTouch =
  window.matchMedia(
    "(hover: none)"
  ).matches ||
  navigator.maxTouchPoints > 0;

document.body.classList.add(
  isTouch
    ? "touch-device"
    : "desktop-device"
);


/* =========================================================
   PARTICLES
   ========================================================= */

function createParticles() {

  const container =
    $("particles");

  if (!container) return;

  const reduced =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (reduced) return;

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
        "i"
      );

    particle.className =
      "particle";

    particle.style.left =
      `${Math.random() * 100}%`;

    particle.style.top =
      `${Math.random() * 100}%`;

    particle.style.animationDelay =
      `${Math.random() * 6}s`;

    particle.style.animationDuration =
      `${5 + Math.random() * 7}s`;

    container.appendChild(
      particle
    );
  }
}

createParticles();


/* =========================================================
   LOADER
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

  }, 700);
}

if (
  document.readyState ===
  "complete"
) {

  setTimeout(
    hideLoader,
    700
  );

} else {

  window.addEventListener(
    "load",
    () => {
      setTimeout(
        hideLoader,
        700
      );
    },
    { once: true }
  );
}

setTimeout(
  hideLoader,
  5000
);


/* =========================================================
   PREVENT ACCIDENTAL AUTO-SCROLL
   ========================================================= */

window.addEventListener(
  "load",
  () => {

    if (
      "scrollRestoration"
      in history
    ) {
      history.scrollRestoration =
        "manual";
    }

  }
);


/* =========================================================
   STARTUP
   ========================================================= */

console.log(
  "%cGAMECHECK V4 ONLINE",
  "font-size:18px;font-weight:900;"
);

console.log(
  "%cMADE BY AUK",
  "font-size:14px;font-weight:700;"
);
