const express = require('express');
const router = express.Router();
const Funcionario = require('../models/FuncionarioModel');
const Cargo = require('../models/CargoModel');
const Departamento = require('../models/DepartamentoModel');
const { validateCreate, validateUpdate } = require('../validators/FuncionarioValidator');

router.post('/', validateCreate, async (req, res) => {
  try {
    const { cargo, departamento } = req.body;
    const cargoExiste = await Cargo.findById(cargo);
    const depExiste = await Departamento.findById(departamento);
    if (!cargoExiste) return res.status(400).json({ message: 'Cargo não encontrado' });
    if (!depExiste) return res.status(400).json({ message: 'Departamento não encontrado' });

    const funcionario = await Funcionario.create(req.body);
    res.status(201).json(await Funcionario.findById(funcionario._id).populate(['cargo', 'departamento']));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const funcionarios = await Funcionario.find().populate(['cargo', 'departamento']);
    res.json(funcionarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id).populate(['cargo', 'departamento']);
    if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado' });
    res.json(funcionario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateUpdate, async (req, res) => {
  try {
    const atualizado = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(['cargo', 'departamento']);
    if (!atualizado) return res.status(404).json({ message: 'Funcionário não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removido = await Funcionario.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ message: 'Funcionário não encontrado' });
    res.json({ message: 'Funcionário removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
