const express = require('express')
const router = express.Router()

let pessoas = [
  {
    id: 1,
    nome: "João Pedro",
    cpf: "12312345678",
    email: "joao@pedro.com",
    dataNascimento: "01/01/2000"
  },
  {
    id: 2,
    nome: "Maria Pedro",
    cpf: "12312345690",
    email: "maria@pedro.com",
    dataNascimento: "01/01/1990"
  }
]

// Criar
// - POST /pessoas
router.post('/pessoas', (req, res, next) => {

})

// Listar Todos
// - GET /pessoas
router.get('/pessoas', (req, res, next) => {
  res.json(pessoas)
})

// Buscar um
// - GET /pessoas/{id}
router.get('/pessoas/:id', (req, res, next) => {
  const idRecebido = req.params.id
  const pessoa = pessoas.find(p => p.id == idRecebido)
  if (!pessoa) {
    return res.status(404).json({ error: "Pessoa não encontrada!!!" })
  }
  res.json(pessoa)
})

// Editar
// - PUT /pessoas/{id}
router.put('/pessoas/:id', (req, res, next) => {

})

// Deletar
// - DELETE /pessoas/{id}
router.delete('/pessoas/:id', (req, res, next) => {

})



module.exports = router