// Definiraj sve token linkove i trajanje (u minutama)
const tokens = {
  TOKEN123: 30,
  TOKEN456: 30,
};

function checkToken() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (!token || !tokens[token]) {
    window.location.href = "expired.html";
    return;
  }

  const tokenStart = localStorage.getItem(token + "_start");
  const now = Date.now();

  if (!tokenStart) {
    // prvi put kad je link otvoren
    localStorage.setItem(token + "_start", now);
  } else {
    const minutesElapsed = (now - tokenStart) / (1000 * 60);
    if (minutesElapsed > tokens[token]) {
      window.location.href = "expired.html";
      return;
    }
  }

  // Token validan → preusmjeri na home
  window.location.href = "home.html";
}

// Pokreni odmah na index.html
checkToken();
