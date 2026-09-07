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


// -------------------------
// PAGE / LOGIN
// -------------------------

function showLogin() {
  document.getElementById("loginBox").style.display = "grid";
}

function closeLogin() {
  document.getElementById("loginBox").style.display = "none";
}


// -------------------------
// PC SCORE
// -------------------------

function calculateScore(gpu, cpu, ram) {
  const g = gpuScore[gpu] || 50;
  const c = cpuScore[cpu] || 50;
  const r = ramScore[ram] || 50;

  return Math.round((g + c + r) / 2.4);
}


// -------------------------
// VS COMPARISON
// -------------------------

function comparePlayers() {

  const player1 =
    document.getElementById("player1").value.trim() || "Player 1";

  const player2 =
    document.getElementById("player2").value.trim() || "Player 2";

  const gpu1 = document.getElementById("gpu1").value;
  const gpu2 = document.getElementById("gpu2").value;

  const cpu1 = document.getElementById("cpu1").value;
  const cpu2 = document.getElementById("cpu2").value;

  const score1 = calculateScore(gpu1, cpu1, "16 GB");
  const score2 = calculateScore(gpu2, cpu2, "16 GB");

  let winner;

  if (score1 > score2) {
    winner = `🏆 ${player1} WINS!`;
  } else if (score2 > score1) {
    winner = `🏆 ${player2} WINS!`;
  } else {
    winner = "⚔️ IT'S A DRAW!";
  }

  document.getElementById("vsResult").innerHTML = `
    <p class="tag">BATTLE RESULT</p>

    <h2>${winner}</h2>

    <p>
      ${player1}: <strong>${score1}</strong>
      &nbsp; VS &nbsp;
      ${player2}: <strong>${score2}</strong>
    </p>
  `;

  document
    .getElementById("vsResult")
    .scrollIntoView({ behavior: "smooth" });
}


// -------------------------
// PC CHECK
// -------------------------

function checkPC() {

  const cpu = document.getElementById("cpu").value;
  const gpu = document.getElementById("gpu").value;
  const ram = document.getElementById("ram").value;
  const game = document.getElementById("game").value;

  const score = calculateScore(gpu, cpu, ram);

  const fpsMultipliers = {
    "Minecraft": 1.25,
    "Fortnite": 1.05,
    "Valorant": 1.55,
    "GTA V": 0.95
  };

  const fps =
    Math.round(score * fpsMultipliers[game]);

  let rating;

  if (score >= 85) {
    rating = "🔥 Excellent";
  } else if (score >= 70) {
    rating = "⚡ Very Good";
  } else if (score >= 55) {
    rating = "👍 Good";
  } else {
    rating = "💻 Entry Level";
  }

  document.getElementById("pcResult").innerHTML = `
    <p class="tag">YOUR RESULT</p>

    <h2>${score}/100</h2>

    <h3>${rating}</h3>

    <p>
      ${cpu} • ${gpu} • ${ram}
    </p>

    <h3>
      🎮 Estimated ${game} FPS: ~${fps}
    </h3>
  `;

  document
    .getElementById("pcResult")
    .scrollIntoView({ behavior: "smooth" });
}


// -------------------------
// LEADERBOARD
// -------------------------

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

    const item = document.createElement("div");

    item.className = "lb";

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


// -------------------------
// FRIEND SYSTEM
// -------------------------

function getFriends() {

  return JSON.parse(
    localStorage.getItem("gamecheckFriends") ||
    '["NightFox","PixelRush"]'
  );
}


function renderFriends() {

  const list =
    document.getElementById("friendsList");

  const friends = getFriends();

  list.innerHTML = "";

  friends.forEach((friend, index) => {

    const div = document.createElement("div");

    div.className = "friend card";

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

  const name = input.value.trim();

  if (!name) {
    alert("Enter a username first!");
    return;
  }

  const friends = getFriends();

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

  alert("Friend added! 🎮");
}


// -------------------------
// STARTUP
// -------------------------

document.addEventListener("DOMContentLoaded", () => {

  renderLeaderboard();

  renderFriends();

});
