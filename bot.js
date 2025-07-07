const { Telegraf } = require('telegraf');

// !!! ВАЖНО: Замените 'YOUR_BOT_TOKEN' на реальный токен вашего бота из BotFather
const bot = new Telegraf(7485417933:AAEDwQG3F8yDO9hOMkDTGw23kYJ130p_eNI);

// !!! ВАЖНО: Укажите здесь URL вашего веб-приложения, которое вы уже развернули
const WEB_APP_URL = 'https://kosovetis.github.io/reactjs-template/'; // Пример на основе вашего package.json

// Обработчик команды /start
bot.start((ctx) => {
  // Отправляем приветственное сообщение с кнопкой для открытия Web App
  ctx.reply('Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение.', {
    reply_markup: {
      // Создаем кнопку, которая открывает Web App
      inline_keyboard: [
        [{ text: '🚀 Открыть приложение', web_app: { url: WEB_APP_URL } }]
      ]
    }
  });
});

// Запускаем бота
bot.launch();

console.log('Бот запущен...');

// Нужно для корректной остановки бота (необязательно, но хорошая практика)
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));