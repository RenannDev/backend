import express from 'express';
const app = express();

// Permite que o Express leia JSON enviado no body
app.use(express.json());

let users = [
  { id: 1, nome: 'Renan' },
  { id: 2, nome: 'Lucas' }
];

// READ (GET)
app.get('/users', (req, res) => {
  res.json(users);
});

// CREATE (POST)
app.post('/users', (req, res) => {
  const novoUser = req.body;
  novoUser.id = users.length + 1;
  users.push(novoUser);
  res.status(201).json(novoUser);
});

// UPDATE (PUT)
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  user.nome = req.body.nome;
  res.json(user);
});

// DELETE
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: 'Usuário removido com sucesso' });
});

app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
