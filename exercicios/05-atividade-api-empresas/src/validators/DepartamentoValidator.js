const yup = require('yup');


const createSchema = yup.object({
nome: yup.string().required('Nome obrigatório'),
descricao: yup.string().required('Descrição obrigatória')
});


const updateSchema = yup.object({
nome: yup.string(),
descricao: yup.string()
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