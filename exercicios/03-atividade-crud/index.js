
const express = require('express');
const app = express();


app.use(express.json());


require('dotenv').config();


const mongoose = require('mongoose');


const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;


const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Servidor01`;


mongoose.connect(url)
  .then(() => {
    console.log("Conectado ao banco MongoDB Atlas!");
  })
  .catch(erro => {
    console.log("Erro ao conectar no banco MongoDB Atlas: ", erro);
  });



const LivroModel = mongoose.model('Livros', new mongoose.Schema(
  {
    titulo: String,
    autor: String,
    editora: String,
    ano: Number,
    preco: Number
  }
));


app.post('/livros', async (req, res, next) => {
  try {
   
    const livro = req.body;

    
    if (!livro.titulo || !livro.autor) {
      return res.status(400).json({ erro: "Campos título e autor são obrigatórios!" });
    }

    
    const livroCriado = await LivroModel.create(livro);

    res.status(201).json(livroCriado);

  } catch (erro) {
    console.log("Erro ao criar livro: ", erro);
    res.status(500).json({ erro: "Erro interno ao criar livro." });
  }
});


app.get('/livros', async (req, res, next) => {
  try {
  
    const livros = await LivroModel.find();

    
    res.json(livros);

  } catch (erro) {
    console.log("Erro ao listar livros: ", erro);
    res.status(500).json({ erro: "Erro interno ao listar livros." });
  }
});


app.get('/livros/:id', async (req, res, next) => {
  try {
    
    const id = req.params.id;

    
    const livro = await LivroModel.findById(id);


    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }

  
    res.json(livro);

  } catch (erro) {
    console.log("Erro ao buscar livro por ID: ", erro);
    res.status(500).json({ erro: "Erro interno ao buscar livro." });
  }
});


app.put('/livros/:id', async (req, res, next) => {
  try {
    
    const id = req.params.id;

    const livroAtualizado = req.body;


    const livro = await LivroModel.findByIdAndUpdate(id, livroAtualizado, { new: true });

  
    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }

    
    res.json(livro);

  } catch (erro) {
    console.log("Erro ao atualizar livro: ", erro);
    res.status(500).json({ erro: "Erro interno ao atualizar livro." });
  }
});


app.delete('/livros/:id', async (req, res, next) => {
  try {
   
    const id = req.params.id;

    
    const livro = await LivroModel.findByIdAndDelete(id);

    
    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }

    
    res.status(200).json({ mensagem: "Livro removido com sucesso!" });
    

  } catch (erro) {
    console.log("Erro ao remover livro: ", erro);
    res.status(500).json({ erro: "Erro interno ao remover livro." });
  }
});



const PORTA = 3000;


app.listen(PORTA, () => {
  console.log(`Aplicação rodando em http://localhost:3000`);
});