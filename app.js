const counter = document.querySelector('#count');
const clickButton = document.querySelector('#click-button');
const resetButton = document.querySelector('#reset-button');
const storageKey = 'clicker.session.count';
let count = 0;

// Session storage keeps refreshes intact and clears when the tab closes.
try {
  const saved = Number(sessionStorage.getItem(storageKey));
  if (Number.isSafeInteger(saved) && saved >= 0) count = saved;
} catch { /* Counting still works when browser storage is unavailable. */ }

function render() {
  counter.textContent = count.toLocaleString();
  resetButton.disabled = count === 0;
  try { sessionStorage.setItem(storageKey, String(count)); } catch { /* Optional persistence. */ }
}

clickButton.addEventListener('click', () => {
  if (count < Number.MAX_SAFE_INTEGER) count += 1;
  render();
});
resetButton.addEventListener('click', () => { count = 0; render(); });
render();
