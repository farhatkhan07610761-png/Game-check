const gpuScore = {
  "RTX 3060": 55,
  "RTX 4060": 68,
  "RTX 4070": 88,
  "RX 7600": 65
};

const cpuScore = {
  "Ryzen 5 5600": 58,
  "Ryzen 5 7600": 72,
  "Core i5-12400F": 64,
  "Core i7-13700K": 90
};

const ramScore = {
  "8 GB": 45,
  "16 GB": 70,
  "32 GB": 82
};

const fpsMultiplier = {
  "Minecraft": 1.25,
  "Fortnite": 1.05,
  "Valorant": 1.55,
  "GTA V": 0.95,
  "GTA VI": 0.55,
  "CS2": 1.35,
  "Roblox": 1.50,
  "Apex Legends": 1.00,
  "Call of Duty": 0.85,
  "PUBG": 1.00,
  "Rocket League": 1.45,
  "Overwatch 2": 1.30,
  "Rainbow Six Siege": 1.35,
  "League of Legends": 1.65,
  "EA FC 26": 1.20,
  "Elden Ring": 0.65,
  "Cyberpunk 2077": 0.55,
  "Red Dead Redemption 2": 0.60
};

let selectedGame = "Minecraft";


/* LOGIN */

function showLogin() {
  document.getElementById("loginBox").style.display = "grid";
}

function closeLogin() {
  document.getElementById("loginBox").style.display = "none";
}


/* GAME SELECT */

function selectGame(game, button) {

  selectedGame = game;

  document.getElementById("selectedGame").textContent = game;

  document.querySelectorAll(".game-card")
    .forEach(card => card.classList.remove("active"));

  button.classList.add("active");

  const select = document.getElementById("game");

  if (select) {
    select.value = game;
  }
}


/* GAME SEARCH */

function filterGames() {

  const search =
    document.getElementById("gameSearch")
      .value
      .toLowerCase();

  document.querySelectorAll(".game-card")
    .forEach(card => {

      const name =
        card.querySelector("strong")
          .textContent
          .toLowerCase();

      card.style.display =
        name.includes(search)
          ? ""
          : "none";
    });
}


/* SCORE */

function calculateScore(gpu, cpu, ram) {

  const g = gpuScore[gpu] || 50;
  const c = cpuScore[cpu] || 50;
  const r = ramScore[ram] || 50;

  return Math.min(
    100,
    Math.round((g + c + r) / 2.4)
  );
}


/* NUMBER ANIMATION */

function animateNumber(element, target, duration = 1200) {

  const startTime = performance.now();

  function update(time) {

    const progress =
      Math.min(
        (time - startTime) / duration,
        1
      );

    element.textContent =
      Math.floor(progress * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}


/* VS BATTLE */

function comparePlayers() {

  const p1 =
    document.getElementById("player1")
      .value.trim() || "Player 1";

  const p2 =
    document.getElementById("player2")
      .value.trim() || "Player 2";

  const gpu1 =
    document.getElementById("gpu1").value;

  const gpu2 =
    document.getElementById("gpu2").value;

  const cpu1 =
    document.getElementById("cpu1").value;

  const cpu2 =
    document.getElementById("cpu2").value;

  const score1 =
    calculateScore(gpu1,cpu1,"16 GB");

  const score2 =
    calculateScore(gpu2,cpu2,"16 GB");

  const result =
    document.getElementById("vsResult");

  result.className =
    "result battle-enter";

  let winner;

  if (score1 > score2) {

    winner =
      `🏆 ${p1} WINS!`;

  } else if (score2 > score1) {

    winner =
      `🏆 ${p2} WINS!`;

  } else {

    winner =
      "⚔️ PERFECT DRAW!";
  }

  result.innerHTML = `

    <p class="tag">BATTLE ANALYSIS COMPLETE</p>

    <div class="winner">
      ${winner}
    </div>

    <div class="battle-score">

      <span id="scoreA">0</span>

      <small> VS </small>

      <span id="scoreB">0</span>

    </div>

    <p>
      ${p1} ⚡ ${p2}
    </p>

    <p style="color:#69738d;margin-top:8px">
      GPU + CPU power comparison
    </p>

  `;

  animateNumber(
    document.getElementById("scoreA"),
    score1
  );

  animateNumber(
    document.getElementById("scoreB"),
    score2
  );

  result.scrollIntoView({
    behavior:"smooth",
    block:"center"
  });
}


/* PC ANALYSIS */

function checkPC() {

  const cpu =
    document.getElementById("cpu").value;

  const gpu =
    document.getElementById("gpu").value;

  const ram =
    document.getElementById("ram").value;

  const game =
    document.getElementById("game").value;

  const score =
    calculateScore(gpu,cpu,ram);

  const fps =
    Math.round(
      score * (fpsMultiplier[game] || 1)
    );

  let rating;

  if (score >= 85) {
    rating = "🔥 ELITE GAMING PC";
  } else if (score >= 70) {
    rating = "⚡ VERY GOOD";
  } else if (score >= 55) {
    rating = "👍 GOOD";
  } else {
    rating = "💻 ENTRY LEVEL";
  }

  const result =
    document.getElementById("pcResult");

  result.innerHTML = `

    <div class="analysis-box">

      <p class="tag">🔍 SYSTEM ANALYSIS COMPLETE</p>

      <div class="analysis-score">
        <span id="pcScore">0</span>/100
      </div>

      <h3>${rating}</h3>

      <p style="
        text-align:center;
        color:#69738d;
        margin:8px 0 25px
      ">
        ${cpu} • ${gpu} • ${ram}
      </p>

      <div class="analysis-bar">

        <div class="analysis-label">
          <span>GPU POWER</span>
          <b>${gpuScore[gpu]}</b>
        </div>

        <div class="bar">
          <i data-width="${gpuScore[gpu]}%"></i>
        </div>

      </div>

      <div class="analysis-bar">

        <div class="analysis-label">
          <span>CPU POWER</span>
          <b>${cpuScore[cpu]}</b>
        </div>

        <div class="bar">
          <i data-width="${cpuScore[cpu]}%"></i>
        </div>

      </div>

      <div class="analysis-bar">

        <div class="analysis-label">
          <span>RAM PERFORMANCE</span>
          <b>${ramScore[ram]}</b>
        </div>

        <div class="bar">
          <i data-width="${ramScore[ram]}%"></i>
        </div>

      </div>

      <hr style="
        border-color:#ffffff0d;
        margin:25px 0
      ">

      <h2 style="text-align:center">
        🎮 ${game}
      </h2>

      <h3 style="
        text-align:center;
        margin-top:10px
      ">
        Estimated FPS:
        <span style="color:#887cff">
          ~${fps}
        </span>
      </h3>

    </div>
  `;

  animateNumber(
    document.getElementById("pcScore"),
    score
  );

  setTimeout(() => {

    document.querySelectorAll(
      ".analysis-bar .bar i"
    ).forEach(bar => {

      bar.style.width =
        bar.dataset.width;

    });

  },100);

  result.scrollIntoView({
    behavior:"smooth",
    block:"center"
  });
}


/* LEADERBOARD */

const leaderboard = [

  {
    name:"ShadowAUK",
    gpu:"RTX 4070",
    cpu:"Ryzen 5 7600",
    score:9240
  },

  {
    name:"NightFox",
    gpu:"RTX 4070",
    cpu:"Core i7-13700K",
    score:9180
  },

  {
    name:"PixelRush",
    gpu:"RTX 4060",
    cpu:"Ryzen 5 7600",
    score:8140
  },

  {
    name:"VoidX",
    gpu:"RX 7600",
    cpu:"Core i5-12400F",
    score:7820
  },

  {
    name:"CraftKing",
    gpu:"RTX 3060",
    cpu:"Ryzen 5 5600",
    score:7020
  }

];

function renderLeaderboard() {

  const list =
    document.getElementById(
      "leaderboardList"
    );

  list.innerHTML = "";

  leaderboard.forEach(
    (player,index) => {

      const item =
        document.createElement("div");

      item.className = "lb";

      item.style.animationDelay =
        `${index * .12}s`;

      item.innerHTML = `

        <div class="rank">
          #${index + 1}
        </div>

        <div>

          <strong>
            ${player.name}
          </strong>

          <p style="
            color:#737d94;
            margin-top:3px
          ">
            ${player.gpu} • ${player.cpu}
          </p>

        </div>

        <div class="score">
          ${player.score.toLocaleString()}
        </div>

      `;

      list.appendChild(item);
    }
  );
}


/* FRIENDS */

function getFriends() {

  return JSON.parse(
    localStorage.getItem(
      "gamecheckFriends"
    ) ||
    '["NightFox","PixelRush"]'
  );
}

function renderFriends() {

  const list =
    document.getElementById(
      "friendsList"
    );

  const friends =
    getFriends();

  list.innerHTML = "";

  friends.forEach(
    (friend,index) => {

      const div =
        document.createElement("div");

      div.className = "friend";

      div.innerHTML = `

        <div class="avatar">
          ${friend.charAt(0).toUpperCase()}
        </div>

        <div>

          <strong>
            ${friend}
          </strong>

          <p style="color:#737d94">
            🟢 Online • PC Score
            ${9000 - index * 350}
          </p>

        </div>

      `;

      list.appendChild(div);
    }
  );
}

function addFriend() {

  const input =
    document.getElementById(
      "friendName"
    );

  const name =
    input.value.trim();

  if (!name) {
    alert("Enter a username first!");
    return;
  }

  const friends =
    getFriends();

  if (friends.includes(name)) {
    alert("Already your friend!");
    return;
  }

  friends.push(name);

  localStorage.setItem(
    "gamecheckFriends",
    JSON.stringify(friends)
  );

  input.value = "";

  renderFriends();
}


/* START */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderLeaderboard();
    renderFriends();

  }
);
