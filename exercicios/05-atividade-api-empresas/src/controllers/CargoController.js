const express = require('express');
const router = express.Router();
const Cargo = require('../models/CargoModel');
const { validateCreate, validateUpdate } = require('../validators/CargoValidator');

router.post('/', validateCreate, async (req, res) => {
  try {
    const cargo = await Cargo.create(req.body);
    res.status(201).json(cargo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const cargos = await Cargo.find();
    res.json(cargos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cargo = await Cargo.findById(req.params.id);
    if (!cargo) return res.status(404).json({ message: 'Cargo não encontrado' });
    res.json(cargo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateUpdate, async (req, res) => {
  try {
    const atualizado = await Cargo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ message: 'Cargo não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removido = await Cargo.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ message: 'Cargo não encontrado' });
    res.json({ message: 'Cargo removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
