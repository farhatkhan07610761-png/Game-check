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

const fpsMultipliers = {
  "Minecraft": 1.25,
  "Fortnite": 1.05,
  "Valorant": 1.55,
  "GTA V": 0.95
};

let selectedGame = "Minecraft";


/* -------------------------
   LOGIN
------------------------- */

function showLogin() {
  document.getElementById("loginBox").style.display = "grid";
}

function closeLogin() {
  document.getElementById("loginBox").style.display = "none";
}


/* -------------------------
   GAME SELECTION
------------------------- */

function selectGame(game, button) {

  selectedGame = game;

  document.getElementById("selectedGame").textContent = game;

  document.querySelectorAll(".game-card").forEach(card => {
    card.classList.remove("active");
  });

  button.classList.add("active");

  const gameSelect = document.getElementById("game");

  if (gameSelect) {
    gameSelect.value = game;
  }
}


/* -------------------------
   PC SCORE
------------------------- */

function calculateScore(gpu, cpu, ram) {

  const g = gpuScore[gpu] || 50;
  const c = cpuScore[cpu] || 50;
  const r = ramScore[ram] || 50;

  return Math.min(
    100,
    Math.round((g + c + r) / 2.4)
  );
}


/* -------------------------
   NUMBER ANIMATION
------------------------- */

function animateNumber(element, target, duration = 1000) {

  let start = 0;
  const startTime = performance.now();

  function update(time) {

    const progress =
      Math.min((time - startTime) / duration, 1);

    const value =
      Math.floor(progress * target);

    element.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}


/* -------------------------
   VS BATTLE
------------------------- */

function comparePlayers() {

  const player1 =
    document.getElementById("player1").value.trim() ||
    "Player 1";

  const player2 =
    document.getElementById("player2").value.trim() ||
    "Player 2";

  const gpu1 = document.getElementById("gpu1").value;
  const gpu2 = document.getElementById("gpu2").value;

  const cpu1 = document.getElementById("cpu1").value;
  const cpu2 = document.getElementById("cpu2").value;

  const score1 =
    calculateScore(gpu1, cpu1, "16 GB");

  const score2 =
    calculateScore(gpu2, cpu2, "16 GB");

  const result =
    document.getElementById("vsResult");

  result.className = "result battle-result battle-start";

  let winnerHTML = "";

  if (score1 > score2) {

    winnerHTML = `
      <div class="winner">🏆 ${player1} WINS!</div>
    `;

  } else if (score2 > score1) {

    winnerHTML = `
      <div class="winner">🏆 ${player2} WINS!</div>
    `;

  } else {

    winnerHTML = `
      <div class="winner">⚔️ DRAW!</div>
    `;
  }

  result.innerHTML = `
    <p class="tag">⚡ BATTLE ANALYSIS COMPLETE</p>

    ${winnerHTML}

    <div class="battle-score">
      <span id="scoreA">0</span>
      <small> VS </small>
      <span id="scoreB">0</span>
    </div>

    <p>
      ${player1} &nbsp; ⚡ &nbsp; ${player2}
    </p>

    <p style="color:#737d94;margin-top:10px">
      GPU + CPU performance comparison
    </p>
  `;

  const scoreA =
    document.getElementById("scoreA");

  const scoreB =
    document.getElementById("scoreB");

  animateNumber(scoreA, score1, 1200);
  animateNumber(scoreB, score2, 1200);

  setTimeout(() => {
    result.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, 150);
}


/* -------------------------
   PC ANALYSIS
------------------------- */

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
    calculateScore(gpu, cpu, ram);

  const fps =
    Math.round(score * fpsMultipliers[game]);

  let rating;

  if (score >= 85) {
    rating = "🔥 Excellent Gaming PC";
  } else if (score >= 70) {
    rating = "⚡ Very Good Gaming PC";
  } else if (score >= 55) {
    rating = "👍 Good Gaming PC";
  } else {
    rating = "💻 Entry Level Gaming PC";
  }

  const result =
    document.getElementById("pcResult");

  result.innerHTML = `
    <div class="analysis-box">

      <p class="tag">🔍 SYSTEM ANALYSIS</p>

      <div class="analysis-score">
        <span id="pcScore">0</span>/100
      </div>

      <h3>${rating}</h3>

      <p style="color:#737d94;margin:8px 0 20px">
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
          <span>RAM</span>
          <b>${ramScore[ram]}</b>
        </div>

        <div class="bar">
          <i data-width="${ramScore[ram]}%"></i>
        </div>
      </div>

      <hr style="border-color:#ffffff0d;margin:22px 0">

      <h2>
        🎮 ${game}
      </h2>

      <h3 style="margin-top:8px">
        Estimated FPS: 
        <span style="color:#887cff">
          ~${fps}
        </span>
      </h3>

    </div>
  `;

  animateNumber(
    document.getElementById("pcScore"),
    score,
    1200
  );

  setTimeout(() => {

    document
      .querySelectorAll(".bar i")
      .forEach(bar => {
        bar.style.width =
          bar.dataset.width;
      });

  }, 150);

  setTimeout(() => {

    result.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 200);
}


/* -------------------------
   LEADERBOARD
------------------------- */

const leaderboard = [
  {
    name: "ShadowAUK",
    gpu: "RTX 4070",
    cpu: "Ryzen 5 7600",
    score: 9240
  },
  {
    name: "NightFox",
    gpu: "RTX 4070",
    cpu: "Core i7-13700K",
    score: 9180
  },
  {
    name: "PixelRush",
    gpu: "RTX 4060",
    cpu: "Ryzen 5 7600",
    score: 8140
  },
  {
    name: "VoidX",
    gpu: "RX 7600",
    cpu: "Core i5-12400F",
    score: 7820
  },
  {
    name: "CraftKing",
    gpu: "RTX 3060",
    cpu: "Ryzen 5 5600",
    score: 7020
  }
];

function renderLeaderboard() {

  const list =
    document.getElementById("leaderboardList");

  list.innerHTML = "";

  leaderboard.forEach((player, index) => {

    const item =
      document.createElement("div");

    item.className = "lb";

    item.style.animationDelay =
      `${index * 0.12}s`;

    item.innerHTML = `
      <div class="rank">
        #${index + 1}
      </div>

      <div>
        <strong>${player.name}</strong>

        <p style="color:#737d94">
          ${player.gpu} • ${player.cpu}
        </p>
      </div>

      <div class="score">
        ${player.score.toLocaleString()}
      </div>
    `;

    list.appendChild(item);
  });
}


/* -------------------------
   FRIEND SYSTEM
------------------------- */

function getFriends() {

  return JSON.parse(
    localStorage.getItem("gamecheckFriends") ||
    '["NightFox","PixelRush"]'
  );
}

function renderFriends() {

  const list =
    document.getElementById("friendsList");

  const friends =
    getFriends();

  list.innerHTML = "";

  friends.forEach((friend, index) => {

    const div =
      document.createElement("div");

    div.className = "friend";

    div.innerHTML = `
      <div class="avatar">
        ${friend.charAt(0).toUpperCase()}
      </div>

      <div>
        <strong>${friend}</strong>

        <p style="color:#737d94">
          🟢 Online • PC Score ${9000 - index * 350}
        </p>
      </div>
    `;

    list.appendChild(div);
  });
}

function addFriend() {

  const input =
    document.getElementById("friendName");

  const name =
    input.value.trim();

  if (!name) {
    alert("Enter a username first!");
    return;
  }

  const friends =
    getFriends();

  if (friends.includes(name)) {
    alert("This user is already your friend.");
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


/* -------------------------
   STARTUP
------------------------- */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderLeaderboard();
    renderFriends();

    setTimeout(() => {
      document.body.classList.add("loaded");
    }, 2000);

  }
);
