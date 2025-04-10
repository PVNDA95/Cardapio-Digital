const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve arquivos estáticos, incluindo index.html

app.post('/update', (req, res) => {
    const { content } = req.body;
    fs.writeFile('public/index.html', content, (err) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar o arquivo.');
        }
        res.send('Arquivo atualizado com sucesso!');
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
