const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Servir os arquivos HTML, CSS e JS da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// 2. Configurar o JSON Server para responder na rota /api (ou direto na raiz)
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(router);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});