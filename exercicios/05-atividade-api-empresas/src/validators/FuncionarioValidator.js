const yup = require('yup');
const { isObjectId } = require('./IDValidator');


const enderecoSchema = yup.object({
cep: yup.string(),
logradouro: yup.string(),
numero: yup.string(),
complemento: yup.string(),
bairro: yup.string(),
cidade: yup.string(),
uf: yup.string()
});


const createSchema = yup.object({
nome: yup.string().required(),
cpf: yup.string().required(),
email: yup.string().email('Email inválido').required(),
telefone: yup.string().required(),
data_contratacao: yup.date().required(),
data_nascimento: yup.date().required(),
genero: yup.string().required(),
endereco: enderecoSchema.notRequired(),
cargo: yup.string().required().test('is-objectid', 'cargo inválido', isObjectId),
departamento: yup.string().required().test('is-objectid', 'departamento inválido', isObjectId)
});


const updateSchema = yup.object({
nome: yup.string(),
cpf: yup.string(),
email: yup.string().email('Email inválido'),
telefone: yup.string(),
data_contratacao: yup.date(),
data_nascimento: yup.date(),
genero: yup.string(),
endereco: enderecoSchema,
cargo: yup.string().test('is-objectid', 'cargo inválido', value => !value || isObjectId(value)),
departamento: yup.string().test('is-objectid', 'departamento inválido', value => !value || isObjectId(value))
});


function validate(schema) {
return async (req, res, next) => {
try {
await schema.validate(req.body, { abortEarly: false });
next();
} catch (err) {
return res.status(400).json({ errors: err.errors });
}
};
}


module.exports = { validateCreate: validate(createSchema), validateUpdate: validate(updateSchema) };