
const express = require('express');
const venom = require('venom-bot');

const app = express();
const PORT = process.env.PORT || 3000;

let clientStarted = false;

app.get('/api/start-bot', async (req, res) => {
  if (clientStarted) {
    return res.send('🤖 Bot já está em execução.');
  }

  venom
    .create({
      session: 'bot-api',
      multidevice: true,
      headless: true,
      browserArgs: ['--no-sandbox']
    })
    .then((client) => {
      client.onMessage(async (message) => {
        if (!message.fromMe && !message.isGroupMsg) {
          const texto = message.body.toLowerCase().trim();
          if (['oi', 'olá', 'ola'].some(s => texto.includes(s))) {
            await client.sendText(message.from, 'oi');
          }
        }
      });
      clientStarted = true;
      console.log('🤖 Bot iniciado com sucesso.');
    })
    .catch((error) => {
      console.error('❌ Erro ao iniciar bot:', error);
    });

  res.send('✅ Bot sendo iniciado...');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
