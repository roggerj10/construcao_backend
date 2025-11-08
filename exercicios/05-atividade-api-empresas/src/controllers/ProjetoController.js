const express = require('express');
const router = express.Router();
const Projeto = require('../models/ProjetoModel');
const { validateCreate, validateUpdate } = require('../validators/ProjetoValidator');

router.post('/', validateCreate, async (req, res) => {
  try {
    const projeto = await Projeto.create(req.body);
    res.status(201).json(projeto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const projetos = await Projeto.find();
    res.json(projetos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const projeto = await Projeto.findById(req.params.id);
    if (!projeto) return res.status(404).json({ message: 'Projeto não encontrado' });
    res.json(projeto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateUpdate, async (req, res) => {
  try {
    const atualizado = await Projeto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ message: 'Projeto não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removido = await Projeto.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ message: 'Projeto não encontrado' });
    res.json({ message: 'Projeto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
