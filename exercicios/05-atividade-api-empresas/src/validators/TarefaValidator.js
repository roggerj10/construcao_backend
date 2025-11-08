const yup = require('yup');
const mongoose = require('mongoose');

const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const createSchema = yup.object({
  titulo: yup.string().required('Título é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  data_inicio: yup.date().required('Data de início é obrigatória'),
  data_fim: yup
    .date()
    .required('Data de fim é obrigatória')
    .min(yup.ref('data_inicio'), 'A data de fim deve ser posterior à data de início'),
  responsavel: yup
    .string()
    .required('Responsável é obrigatório')
    .test('is-objectid', 'ID de responsável inválido', isObjectId),
  projeto: yup
    .string()
    .required('Projeto é obrigatório')
    .test('is-objectid', 'ID de projeto inválido', isObjectId),
});

const updateSchema = yup.object({
  titulo: yup.string(),
  descricao: yup.string(),
  data_inicio: yup.date(),
  data_fim: yup
    .date()
    .min(yup.ref('data_inicio'), 'A data de fim deve ser posterior à data de início'),
  responsavel: yup
    .string()
    .test('is-objectid', 'ID de responsável inválido', (v) => !v || isObjectId(v)),
  projeto: yup
    .string()
    .test('is-objectid', 'ID de projeto inválido', (v) => !v || isObjectId(v)),
});

const validateCreate = async (req, res, next) => {
  try {
    req.body = await createSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({
      message: 'Erro de validação',
      errors: err.errors,
    });
  }
};

const validateUpdate = async (req, res, next) => {
  try {
    req.body = await updateSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({
      message: 'Erro de validação',
      errors: err.errors,
    });
  }
};

module.exports = { validateCreate, validateUpdate };