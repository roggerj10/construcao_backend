const express = require('express');
const router = express.Router();
const Departamento = require('../models/DepartamentoModel');
const { validateCreate, validateUpdate } = require('../validators/DepartamentoValidator');

router.post('/', validateCreate, async (req, res) => {
  try {
    const departamento = await Departamento.create(req.body);
    res.status(201).json(departamento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const departamentos = await Departamento.find();
    res.json(departamentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const departamento = await Departamento.findById(req.params.id);
    if (!departamento) return res.status(404).json({ message: 'Departamento não encontrado' });
    res.json(departamento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateUpdate, async (req, res) => {
  try {
    const atualizado = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ message: 'Departamento não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removido = await Departamento.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ message: 'Departamento não encontrado' });
    res.json({ message: 'Departamento removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
