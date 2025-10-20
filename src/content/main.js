console.log('Content script "Focus Pomodoro" injetado em example.com!');

// Adiciona uma borda vermelha em todos os links da página
document.querySelectorAll('a').forEach(link => {
  link.style.border = '2px solid red';
  link.style.padding = '2px';
});