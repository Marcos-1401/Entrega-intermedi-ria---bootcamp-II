const startBtn = document.getElementById('start-button');
let isRunning = false;

startBtn.addEventListener('click', () => {
  isRunning = !isRunning;
  if (isRunning) {
    startBtn.textContent = 'Stop';
    chrome.runtime.sendMessage({ command: 'start' });
  } else {
    startBtn.textContent = 'Start';
    chrome.runtime.sendMessage({ command: 'stop' });
  }
});

document.getElementById('reset-button').addEventListener('click', () => {
  chrome.runtime.sendMessage({ command: 'reset' });
  document.getElementById('timer-display').textContent = '25:00';
  startBtn.textContent = 'Start';
  isRunning = false;
});