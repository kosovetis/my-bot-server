const { Telegraf } = require('telegraf');

// Ваш токен бота
const BOT_TOKEN = '7485417933:AAEDwQG3F8yDO9hOMkDTGw23kYJ130p_eNI';

// ИСПРАВЛЕННЫЙ URL вашего веб-приложения (теста)
const WEB_APP_URL = 'https://kosovetis.github.io/reactjs-template/';

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(BOT_TOKEN);

// Обработчик команды /start
bot.start((ctx) => {
  ctx.reply('Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение.', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🚀 Открыть приложение', web_app: { url: WEB_APP_URL } }]
      ]
    }
  });
});

// Экспортируем обработчик для Vercel
module.exports = async (req, res) => {
  try {
    await bot.handleUpdate(req.body);
  } catch (err) {
    console.error('Error handling update:', err);
  }
  res.status(200).send('OK');
};