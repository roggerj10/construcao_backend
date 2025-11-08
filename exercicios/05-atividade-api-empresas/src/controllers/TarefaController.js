const express = require('express');
const router = express.Router();
const Tarefa = require('../models/TarefaModel');
const Funcionario = require('../models/FuncionarioModel');
const Projeto = require('../models/ProjetoModel');
const { validateCreate, validateUpdate } = require('../validators/TarefaValidator');

router.post('/', validateCreate, async (req, res) => {
  try {
    const { responsavel, projeto } = req.body;
    const func = await Funcionario.findById(responsavel);
    const proj = await Projeto.findById(projeto);
    if (!func) return res.status(400).json({ message: 'Responsável não encontrado' });
    if (!proj) return res.status(400).json({ message: 'Projeto não encontrado' });

    const tarefa = await Tarefa.create(req.body);
    res.status(201).json(await Tarefa.findById(tarefa._id).populate(['responsavel', 'projeto']));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tarefas = await Tarefa.find().populate(['responsavel', 'projeto']);
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id).populate(['responsavel', 'projeto']);
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', validateUpdate, async (req, res) => {
  try {
    const atualizado = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(['responsavel', 'projeto']);
    if (!atualizado) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removido = await Tarefa.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json({ message: 'Tarefa removida com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
