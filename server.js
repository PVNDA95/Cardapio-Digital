const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/update', async (req, res) => {
    const { content } = req.body;
    const repo = 'PVNDA95/Cardapio-Digital';
    const path = 'index.html';
    const branch = 'main';
    const token = process.env.GITHUB_TOKEN;

    const getFileResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });
    const fileData = await getFileResponse.json();
    const sha = fileData.sha;

    const updateResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Atualizando o arquivo index.html',
            content: Buffer.from(content).toString('base64'),
            sha,
            branch
        })
    });

    if (updateResponse.ok) {
        res.status(200).send('Arquivo atualizado com sucesso!');
    } else {
        res.status(500).send('Erro ao atualizar o arquivo.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
