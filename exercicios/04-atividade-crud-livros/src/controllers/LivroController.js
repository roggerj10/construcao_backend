const express = require('express');
const Livro = require('../models/Livro');
const validateId = require('../validators/IDValidator');
const { validarCriar, validarAtualizar } = require('../validators/LivroValidator');

const router = express.Router();

router.post('/', validarCriar, async (req, res, next) => {
  try {
    const livro = new Livro(req.body);
    const salvo = await livro.save();
    return res.status(201).json(salvo);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const livros = await Livro.find().sort({ createdAt: -1 });
    return res.json(livros);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const livro = await Livro.findById(id);
    if (!livro) return res.status(404).json({ errors: ['Livro não encontrado'] });
    return res.json(livro);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validateId, validarAtualizar, async (req, res, next) => {
  try {
    const { id } = req.params;
    const atualizado = await Livro.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!atualizado) return res.status(404).json({ errors: ['Livro não encontrado'] });
    return res.json(atualizado);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const removido = await Livro.findByIdAndDelete(id);
    if (!removido) return res.status(404).json({ errors: ['Livro não encontrado'] });
    return res.json({ message: 'Livro removido com sucesso' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
