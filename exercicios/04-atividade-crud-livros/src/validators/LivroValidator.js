const yup = require('yup');

const criarSchema = yup.object({
  titulo: yup.string().required('titulo é obrigatório'),
  autor: yup.string().required('autor é obrigatório'),
  editora: yup.string().required('editora é obrigatória'),
  ano: yup
    .number()
    .typeError('ano deve ser um número')
    .required('ano é obrigatório'),
  preco: yup
    .number()
    .typeError('preco deve ser um número')
    .required('preco é obrigatório')
    .min(0, 'preco deve ser positivo'),
});

const atualizarSchema = yup.object({
  titulo: yup.string(),
  autor: yup.string(),
  editora: yup.string(),
  ano: yup.number().typeError('ano deve ser um número'),
  preco: yup
    .number()
    .typeError('preco deve ser um número')
    .min(0, 'preco deve ser positivo'),
});

function validar(schema) {
  return async (req, res, next) => {
    try {
      const validated = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body = validated;
      return next();
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = err.inner ? err.inner.map((e) => e.message) : [err.message];
        return res.status(400).json({ errors });
      }
      return next(err);
    }
  };
}

module.exports = {
  validarCriar: validar(criarSchema),
  validarAtualizar: validar(atualizarSchema),
};
