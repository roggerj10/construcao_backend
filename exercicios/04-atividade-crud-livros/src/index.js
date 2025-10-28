const express = require('express');
const mongoose = require('mongoose');
const livroRouter = require('./controllers/LivroController');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const DB_USER = 'roger10';
    const DB_PASS = 'flamengothebest';
    const DB_HOST = 'cluster0.x4fxuzj.mongodb.net';
    const DB_NAME = 'livraria';

    const uri = `mongodb+srv://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASS)}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

    await mongoose.connect(uri);
    console.log('✅ Conectado ao MongoDB Atlas com sucesso!');

    app.use('/livros', livroRouter);

    app.use((err, req, res, next) => {
      console.error('Erro no servidor:', err);
      res.status(err.status || 500).json({ error: err.message || 'Erro interno do servidor' });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro ao conectar ao banco ou iniciar o servidor:', err);
    process.exit(1);
  }
}

start();
