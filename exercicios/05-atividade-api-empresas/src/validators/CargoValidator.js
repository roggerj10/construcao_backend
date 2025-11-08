const yup = require('yup');


const createSchema = yup.object({
nome: yup.string().required('Nome obrigatório'),
descricao: yup.string().required('Descrição obrigatória'),
salario: yup.number().required('Salário obrigatório').min(1518, 'Salário mínimo R$ 1.518,00')
});


const updateSchema = yup.object({
nome: yup.string(),
descricao: yup.string(),
salario: yup.number().min(1518)
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


module.exports = {
validateCreate: validate(createSchema),
validateUpdate: validate(updateSchema)
};