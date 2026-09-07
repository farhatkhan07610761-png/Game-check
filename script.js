/* =========================================
   GAMECHECK
   ========================================= */


/* GAME DATABASE */

const games = [

  ["Minecraft","survival","https://cdn.simpleicons.org/minecraft"],
  ["Fortnite","fps","https://cdn.simpleicons.org/fortnite"],
  ["Valorant","fps","https://cdn.simpleicons.org/valorant"],
  ["Grand Theft Auto V","rpg","https://cdn.simpleicons.org/gta"],
  ["Counter-Strike 2","fps","https://cdn.simpleicons.org/counterstrike"],
  ["Roblox","survival","https://cdn.simpleicons.org/roblox"],
  ["Apex Legends","fps","https://cdn.simpleicons.org/apexlegends"],
  ["Call of Duty","fps","https://cdn.simpleicons.org/callofduty"],
  ["PUBG","fps","https://cdn.simpleicons.org/pubg"],
  ["Rocket League","sports","https://cdn.simpleicons.org/rocketleague"],
  ["Overwatch 2","fps","https://cdn.simpleicons.org/overwatch"],
  ["League of Legends","rpg","https://cdn.simpleicons.org/leagueoflegends"],
  ["Elden Ring","rpg","https://cdn.simpleicons.org/eldenring"],
  ["Cyberpunk 2077","rpg","https://cdn.simpleicons.org/cyberpunk2077"],
  ["Red Dead Redemption 2","rpg","https://cdn.simpleicons.org/reddeadredemption"],
  ["Rainbow Six Siege","fps","https://cdn.simpleicons.org/rainbowsixsiege"],
  ["EA SPORTS FC","sports","https://cdn.simpleicons.org/easports"],
  ["Trackmania","racing","https://cdn.simpleicons.org/trackmania"]

];


/*
   Expand the library for the prototype.
   These are searchable entries and can later be
   replaced with a full verified 600+ game dataset.
*/

const extraGames = [
  "Terraria","Among Us","Fall Guys","Genshin Impact",
  "Honkai Star Rail","The Witcher 3","Skyrim",
  "Forza Horizon 5","Forza Motorsport","Need for Speed Heat",
  "Need for Speed Unbound","Assetto Corsa","F1 26",
  "BeamNG.drive","Euro Truck Simulator 2","War Thunder",
  "Dota 2","Team Fortress 2","Paladins","Destiny 2",
  "Warframe","Borderlands 3","Far Cry 6","Far Cry 5",
  "Assassin's Creed Mirage","Assassin's Creed Valhalla",
  "Assassin's Creed Odyssey","God of War","God of War Ragnarok",
  "Hogwarts Legacy","Monster Hunter Wilds","Baldur's Gate 3",
  "Diablo IV","Path of Exile 2","Dark Souls III",
  "Sekiro","Lies of P","Resident Evil 4","Resident Evil Village",
  "Dead by Daylight","Phasmophobia","Subnautica",
  "Palworld","Rust","DayZ","ARK Survival Ascended",
  "7 Days to Die","The Forest","Sons of the Forest",
  "Left 4 Dead 2","Half-Life 2","Portal 2",
  "Starfield","No Man's Sky","Sea of Thieves",
  "Fallout 4","Fallout 76","Mass Effect Legendary Edition",
  "Dragon Age Veilguard","Marvel Rivals","The Finals",
  "XDefiant","Battlefield 2042","Battlefield V",
  "Battlefield 1","Battlefield 6","Halo Infinite",
  "Halo MCC","Destiny","Quake Champions","DOOM Eternal",
  "DOOM","Mortal Kombat 1","Street Fighter 6",
  "Tekken 8","Guilty Gear Strive","WWE 2K26",
  "NBA 2K26","eFootball","FIFA 23","F1 25",
  "MotoGP 25","Wreckfest","Dirt Rally 2.0",
  "The Crew Motorfest","Watch Dogs 2","Sleeping Dogs",
  "Just Cause 4","Mafia Definitive Edition",
  "Lethal Company","Content Warning","Brotato",
  "Hades","Hades II","Hollow Knight","Cuphead",
  "Celeste","Stardew Valley","Dead Cells",
  "Risk of Rain 2","Valheim","V Rising",
  "Factorio","Satisfactory","Cities Skylines II"
];

extraGames.forEach(name => {
  games.push([
    name,
    guessCategory(name),
    "https://cdn.simpleicons.org/gamepad"
  ]);
});


/* CATEGORY GUESS */

function guessCategory(name) {

  const n = name.toLowerCase();

  if (
    n.includes("call") ||
    n.includes("battlefield") ||
    n.includes("valorant") ||
    n.includes("counter") ||
    n.includes("halo") ||
    n.includes("doom") ||
    n.includes("apex") ||
    n.includes("siege")
  ) return "fps";

  if (
    n.includes("racing") ||
    n.includes("forza") ||
    n.includes("need for speed") ||
    n.includes("f1") ||
    n.includes("assetto") ||
    n.includes("track") ||
    n.includes("crew") ||
    n.includes("dirt")
  ) return "racing";

  if (
    n.includes("fc") ||
    n.includes("fifa") ||
    n.includes("nba") ||
    n.includes("wwe") ||
    n.includes("football")
  ) return "sports";

  if (
    n.includes("elden") ||
    n.includes("witcher") ||
    n.includes("skyrim") ||
    n.includes("cyberpunk") ||
    n.includes("god of war") ||
    n.includes("assassin") ||
    n.includes("diablo")
  ) return "rpg";

  return "survival";
}


/* GAME DISPLAY */

let displayedGames = 16;
let currentCategory = "all";


function renderGames() {

  const grid = document.getElementById("gameGrid");

  const search =
    document.getElementById("gameSearch").value.toLowerCase();

  grid.innerHTML = "";

  let filtered = games.filter(game => {

    const matchesSearch =
      game[0].toLowerCase().includes(search);

    const matchesCategory =
      currentCategory === "all" ||
      game[1] === currentCategory;

    return matchesSearch && matchesCategory;
  });

  const visible = filtered.slice(0, displayedGames);

  visible.forEach((game,index) => {

    const card = document.createElement("div");

    card.className = "game-card";

    if (
      game[0] ===
      document.getElementById("selectedGame").textContent
    ) {
      card.classList.add("selected");
    }

    card.style.animationDelay =
      `${index * 0.035}s`;

    card.innerHTML = `
      <img
        class="game-logo"
        src="${game[2]}"
        alt="${game[0]} logo"
        onerror="this.src='https://cdn.simpleicons.org/gamepad'"
      >

      <h3>${game[0]}</h3>

      <p>${game[1].toUpperCase()}</p>
    `;

    card.onclick = () => selectGame(game[0]);

    grid.appendChild(card);

  });

  document.getElementById("loadMore").style.display =
    visible.length < filtered.length ? "block" : "none";
}


function selectGame(name) {

  document.getElementById("selectedGame").textContent = name;

  const select = document.getElementById("pcGame");

  select.value = name;

  renderGames();
}


function filterGames() {

  displayedGames = 16;
  renderGames();

}


function filterCategory(category,button) {

  currentCategory = category;
  displayedGames = 16;

  document.querySelectorAll(".filter")
    .forEach(x => x.classList.remove("active"));

  button.classList.add("active");

  renderGames();
}


function loadMoreGames() {

  displayedGames += 16;

  renderGames();

}


/* PC GAME SELECT */

function fillGameSelect() {

  const select = document.getElementById("pcGame");

  games.forEach(game => {

    const option = document.createElement("option");

    option.value = game[0];
    option.textContent = game[0];

    select.appendChild(option);

  });

  select.value = "Minecraft";
}


/* HARDWARE SCORES */

const gpuScores = {
  "RTX 3060":55,
  "RTX 4060":68,
  "RTX 4070":88,
  "RX 7600":65
};

const cpuScores = {
  "Ryzen 5 5600":58,
  "Ryzen 5 7600":72,
  "Core i5-12400F":64,
  "Core i7-13700K":90
};

const ramScores = {
  "8 GB":45,
  "16 GB":70,
  "32 GB":82
};


/* FPS MULTIPLIERS */

const fpsMultiplier = {
  "Minecraft":1.25,
  "Fortnite":1.05,
  "Valorant":1.55,
  "Grand Theft Auto V":.95,
  "Counter-Strike 2":1.35,
  "Roblox":1.50,
  "Apex Legends":1,
  "Call of Duty":.85,
  "PUBG":1,
  "Rocket League":1.45,
  "Overwatch 2":1.30,
  "League of Legends":1.65,
  "Elden Ring":.65,
  "Cyberpunk 2077":.55,
  "Red Dead Redemption 2":.60
};


/* SCORE */

function pcScore(gpu,cpu,ram) {

  return Math.min(
    100,
    Math.round(
      (
        gpuScores[gpu] +
        cpuScores[cpu] +
        ramScores[ram]
      ) / 2.4
    )
  );

}


/* VS BATTLE */

let battleRunning = false;


function startBattle() {

  if (battleRunning) return;

  battleRunning = true;

  const arena = document.querySelector(".battle-arena");
  const countdown = document.getElementById("countdown");
  const result = document.getElementById("battleResult");

  let hp1 = 100;
  let hp2 = 100;

  document.getElementById("hp1").style.width = "100%";
  document.getElementById("hp2").style.width = "100%";

  document.getElementById("hpText1").textContent = "100 HP";
  document.getElementById("hpText2").textContent = "100 HP";

  result.innerHTML = "";

  const sequence = ["3","2","1","FIGHT!"];

  let i = 0;

  const timer = setInterval(() => {

    countdown.textContent = sequence[i];

    countdown.animate(
      [
        {transform:"scale(.4)",opacity:0},
        {transform:"scale(1.4)",opacity:1},
        {transform:"scale(1)",opacity:1}
      ],
      {duration:500}
    );

    i++;

    if (i === sequence.length) {

      clearInterval(timer);

      setTimeout(() => {

        runRound(1,() => {

          runRound(2,() => {

            runRound(3,() => {

              finishBattle(hp1,hp2);

            });

          });

        });

      },600);

    }

  },700);


  function runRound(round,done) {

    const roundNames = [
      "GPU",
      "RAM",
      "CPU"
    ];

    const weapons = [
      "⚔️",
      "💣",
      "🔫"
    ];

    document.getElementById("roundText").textContent =
      `ROUND ${round} — ${roundNames[round-1]}`;

    document.getElementById("weapon").textContent =
      weapons[round-1];

    const gpu1 = document.getElementById("gpu1").value;
    const gpu2 = document.getElementById("gpu2").value;

    const ram1 = document.getElementById("ram1").value;
    const ram2 = document.getElementById("ram2").value;

    const cpu1 = document.getElementById("cpu1").value;
    const cpu2 = document.getElementById("cpu2").value;

    let score1;
    let score2;

    if (round === 1) {
      score1 = gpuScores[gpu1];
      score2 = gpuScores[gpu2];
    }

    if (round === 2) {
      score1 = ramScores[ram1];
      score2 = ramScores[ram2];
    }

    if (round === 3) {
      score1 = cpuScores[cpu1];
      score2 = cpuScores[cpu2];
    }

    countdown.textContent = "FIGHT!";

    const attack =
      document.getElementById("attackEffect");

    attack.className = "attack-effect";

    void attack.offsetWidth;

    if (score1 >= score2) {

      attack.classList.add("attack-left");

      hp2 = Math.max(
        0,
        hp2 - Math.max(10,Math.round(score1/6))
      );

      setTimeout(() => {

        showImpact();

        updateHP();

        setTimeout(done,900);

      },500);

    } else {

      attack.classList.add("attack-right");

      hp1 = Math.max(
        0,
        hp1 - Math.max(10,Math.round(score2/6))
      );

      setTimeout(() => {

        showImpact();

        updateHP();

        setTimeout(done,900);

      },500);

    }

  }


  function showImpact() {

    const impact =
      document.getElementById("impact");

    impact.classList.remove("show");

    void impact.offsetWidth;

    impact.classList.add("show");

    arena.classList.remove("shake");

    void arena.offsetWidth;

    arena.classList.add("shake");

  }


  function updateHP() {

    document.getElementById("hp1").style.width =
      hp1 + "%";

    document.getElementById("hp2").style.width =
      hp2 + "%";

    document.getElementById("hpText1").textContent =
      hp1 + " HP";

    document.getElementById("hpText2").textContent =
      hp2 + " HP";

  }


  function finishBattle() {

    const name1 =
      document.getElementById("player1").value || "PLAYER 1";

    const name2 =
      document.getElementById("player2").value || "PLAYER 2";

    const gpuWinner =
      gpuScores[
        document.getElementById("gpu1").value
      ] >=
      gpuScores[
        document.getElementById("gpu2").value
      ] ? 1 : 2;

    const ramWinner =
      ramScores[
        document.getElementById("ram1").value
      ] >=
      ramScores[
        document.getElementById("ram2").value
      ] ? 1 : 2;

    const cpuWinner =
      cpuScores[
        document.getElementById("cpu1").value
      ] >=
      cpuScores[
        document.getElementById("cpu2").value
      ] ? 1 : 2;

    const wins1 =
      [gpuWinner,ramWinner,cpuWinner]
      .filter(x => x === 1).length;

    const wins2 =
      [gpuWinner,ramWinner,cpuWinner]
      .filter(x => x === 2).length;

    const winner =
      wins1 >= wins2 ? name1 : name2;

    countdown.textContent = "BATTLE COMPLETE!";

    result.innerHTML = `
      <div style="font-size:45px">🏆</div>
      <div>${winner} WINS!</div>
      <small>
        GPU: ${gpuWinner === 1 ? name1 : name2}
        •
        RAM: ${ramWinner === 1 ? name1 : name2}
        •
        CPU: ${cpuWinner === 1 ? name1 : name2}
      </small>
    `;

    result.animate(
      [
        {opacity:0,transform:"scale(.5)"},
        {opacity:1,transform:"scale(1.15)"},
        {opacity:1,transform:"scale(1)"}
      ],
      {duration:900}
    );

    battleRunning = false;

  }

}


/* PC ANALYZER */

function checkPC() {

  const gpu =
    document.getElementById("pcGPU").value;

  const cpu =
    document.getElementById("pcCPU").value;

  const ram =
    document.getElementById("pcRAM").value;

  const game =
    document.getElementById("pcGame").value;

  const score =
    pcScore(gpu,cpu,ram);

  const multiplier =
    fpsMultiplier[game] || 1;

  const fps =
    Math.round(score * multiplier * 2);

  document.getElementById("pcResult").innerHTML = `

    <div class="score">${score}</div>

    <p>GAMECHECK PERFORMANCE SCORE</p>

    <div class="stat-bar">
      <label>
        GPU
        <span>${gpuScores[gpu]}/100</span>
      </label>

      <div class="bar">
        <i style="width:${gpuScores[gpu]}%"></i>
      </div>
    </div>

    <div class="stat-bar">
      <label>
        CPU
        <span>${cpuScores[cpu]}/100</span>
      </label>

      <div class="bar">
        <i style="width:${cpuScores[cpu]}%"></i>
      </div>
    </div>

    <div class="stat-bar">
      <label>
        RAM
        <span>${ramScores[ram]}/100</span>
      </label>

      <div class="bar">
        <i style="width:${ramScores[ram]}%"></i>
      </div>
    </div>

    <h3 style="margin-top:25px">
      ${game}
    </h3>

    <p style="color:var(--muted);margin-top:8px">
      Prototype estimated FPS:
      <strong style="color:var(--accent)">
        ${fps} FPS
      </strong>
    </p>

  `;

}


/* LEADERBOARD */

const leaderboard = [
  ["1","ShadowAUK","9240","RTX 4070"],
  ["2","NightFox","9180","RTX 4070"],
  ["3","PixelRush","8140","RTX 4060"],
  ["4","VoidX","7820","RX 7600"],
  ["5","CraftKing","7020","RTX 3060"]
];


function renderLeaderboard() {

  const box =
    document.getElementById("leaderboardList");

  box.innerHTML = "";

  leaderboard.forEach((p,i) => {

    const row = document.createElement("div");

    row.className = "leader";

    row.style.animationDelay =
      `${i*.12}s`;

    row.innerHTML = `
      <div class="rank">#${p[0]}</div>

      <div>
        <strong>${p[1]}</strong>
        <small>PC POWER PLAYER</small>
      </div>

      <strong>${p[2]}</strong>

      <small>${p[3]}</small>
    `;

    box.appendChild(row);

  });

}


/* FRIENDS */

let friends =
  JSON.parse(
    localStorage.getItem("gamecheckFriends") ||
    '["NightFox","PixelRush"]'
  );


function renderFriends() {

  const box =
    document.getElementById("friendsList");

  box.innerHTML = "";

  friends.forEach(name => {

    const div =
      document.createElement("div");

    div.className = "friend";

    div.innerHTML = `
      <strong>🟢 ${name}</strong>
      <button onclick="removeFriend('${name}')">
        REMOVE
      </button>
    `;

    box.appendChild(div);

  });

}


function addFriend() {

  const input =
    document.getElementById("friendInput");

  const name =
    input.value.trim();

  if (!name) return;

  if (!friends.includes(name)) {

    friends.push(name);

    localStorage.setItem(
      "gamecheckFriends",
      JSON.stringify(friends)
    );

  }

  input.value = "";

  renderFriends();

}


function removeFriend(name) {

  friends =
    friends.filter(x => x !== name);

  localStorage.setItem(
    "gamecheckFriends",
    JSON.stringify(friends)
  );

  renderFriends();

}


/* LOGIN */

function openLogin() {
  document
    .getElementById("loginModal")
    .classList.add("show");
}

function closeLogin() {
  document
    .getElementById("loginModal")
    .classList.remove("show");
}

function demoLogin() {

  alert(
    "GameCheck login is currently a UI prototype. Real accounts will need a backend."
  );

}


/* THEMES */

function openThemes() {

  document
    .getElementById("themeModal")
    .classList.add("show");

}

function closeThemes() {

  document
    .getElementById("themeModal")
    .classList.remove("show");

}


function setTheme(theme) {

  document.body.className = "";

  if (theme !== "cyber") {

    document.body.classList.add(
      "theme-" + theme
    );

  }

  localStorage.setItem(
    "gamecheckTheme",
    theme
  );

  closeThemes();

}


/* FIRST VISIT THEME */

function loadTheme() {

  const saved =
    localStorage.getItem("gamecheckTheme");

  if (saved) {

    setTheme(saved);

  } else {

    setTimeout(() => {
      openThemes();
    },3200);

  }

}


/* SCROLL REVEAL */

function setupScrollAnimations() {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold:.12
      }
    );

  document
    .querySelectorAll(".reveal")
    .forEach(el => observer.observe(el));

}


/* PARTICLES */

function createParticles() {

  const container =
    document.getElementById("particles");

  for(let i=0;i<45;i++) {

    const particle =
      document.createElement("div");

    particle.className = "particle";

    particle.style.left =
      Math.random()*100 + "%";

    particle.style.animationDuration =
      (8 + Math.random()*15) + "s";

    particle.style.animationDelay =
      (-Math.random()*15) + "s";

    particle.style.opacity =
      (.1 + Math.random()*.4);

    container.appendChild(particle);

  }

}


/* MOUSE PARALLAX FOR PC */

document.addEventListener(
  "mousemove",
  e => {

    if (window.innerWidth < 900) return;

    const x =
      (e.clientX / window.innerWidth - .5);

    const y =
      (e.clientY / window.innerHeight - .5);

    const battle =
      document.querySelector(".hero-battle");

    if (battle) {

      battle.style.transform =
        `translate(${x*12}px,${y*12}px)`;

    }

  }
);


/* START */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    fillGameSelect();

    renderGames();

    renderLeaderboard();

    renderFriends();

    createParticles();

    setupScrollAnimations();

    loadTheme();

  }
);
