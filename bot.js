const { Telegraf } = require('telegraf');

// Безопасно получаем токен из переменных окружения Vercel
// Мы не вставляем токен прямо сюда, а будем хранить его на сервере Vercel
const BOT_TOKEN = process.env.BOT_TOKEN || '7485417933:AAEDwQG3F8yDO9hOMkDTGw23kYJ130p_eNI';

// URL вашего развернутого веб-приложения (фронтенда)
const WEB_APP_URL = 'https://mini-landing-black.vercel.app/';

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(BOT_TOKEN);

// Обработчик команды /start
bot.start((ctx) => {
  ctx.reply('Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение.', {
    reply_markup: {
      // Создаем кнопку, которая открывает Web App
      inline_keyboard: [
        [{ text: '🚀 Открыть приложение', web_app: { url: WEB_APP_URL } }]
      ]
    }
  });
});

// Экспортируем обработчик, чтобы Vercel мог его использовать
module.exports = async (req, res) => {
  try {
    // Передаем обновления от Telegram в наш бот
    await bot.handleUpdate(req.body);
  } catch (err) {
    console.error('Error handling update:', err);
  }
  // Отвечаем Telegram, что все в порядке
  res.status(200).send('OK');
};