// Ouve as mensagens do popup.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.command === 'start') {
    console.log('Iniciando alarme...');
    // Cria um alarme chamado 'pomodoroTimer' que dispara em 1 minuto (para teste)
    chrome.alarms.create('pomodoroTimer', { delayInMinutes: 1 });
    chrome.storage.local.set({ isRunning: true });

  } else if (message.command === 'stop' || message.command === 'reset') {
    console.log('Parando alarme...');
    chrome.alarms.clear('pomodoroTimer');
    chrome.storage.local.set({ isRunning: false });
  }
});

// Ouve o evento do alarme disparando
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'pomodoroTimer') {
    console.log('Alarme disparado!');
    // Envia uma notificação do Chrome
    chrome.notifications.create({
      type: 'basic',
      iconUrl: '../icons/icon128.png',
      title: 'Pomodoro Concluído!',
      message: 'Hora de uma pausa, guerreiro do foco!',
      priority: 2
    });
    chrome.storage.local.set({ isRunning: false });
  }
});