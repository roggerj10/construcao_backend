const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const DepartamentoController = require('./controllers/DepartamentoController');
const CargoController = require('./controllers/CargoController');
const FuncionarioController = require('./controllers/FuncionarioController');
const ProjetoController = require('./controllers/ProjetoController');
const TarefaController = require('./controllers/TarefaController');

const app = express();
app.use(express.json());
app.use(cors());

const DB_USER = 'roger10';
const DB_PASS = 'flamengothebest';
const DB_HOST = 'cluster0.x4fxuzj.mongodb.net';
const DB_NAME = 'livraria';

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas!'))
  .catch((err) => console.error('❌ Erro ao conectar ao MongoDB:', err));

app.use('/departamentos', DepartamentoController);
app.use('/cargos', CargoController);
app.use('/funcionarios', FuncionarioController);
app.use('/projetos', ProjetoController);
app.use('/tarefas', TarefaController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} 🚀`));
