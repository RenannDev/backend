import express from 'express';
const app = express();

app.use(express.json());

const usuarios = [
];
/* Formas de enviar dados pela requisição
Query Params: /usuarios?nome=Bruno&idade=23 (Filtros, paginação)

Route Params: /usuarios/2 (Identificar um recurso)

Request Body: { "nome": "Bruno", "idade": 23 } (Dados para criação ou atualização de um recurso)

*/


app.post('/usuarios', (req, res) => {
    usuarios.push(req.body);
    res.status(201).json(req.body);
});

app.get('/usuarios', (req, res) => {
  res.status(200).json(usuarios);
});


app.listen(3000)
