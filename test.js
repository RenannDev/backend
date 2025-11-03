import express from 'express';

const app = express();

app.use(express.json());

// Rota com parâmetro obrigatório
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, nome: `Usuário ${id}` });
});

// Rota com parâmetro opcional
// Corrigido: Express não aceita parâmetro opcional no meio da rota
app.get('/users/:id/posts', (req, res) => {
  const { id } = req.params;
  res.json({ id, posts: [`Post 1 do ${id}`, `Post 2 do ${id}`] });
});

app.get('/users/posts', (req, res) => {
  res.json({ posts: ['Post geral 1', 'Post geral 2'] });
});

// Rota com múltiplos parâmetros
app.get('/produtos/:categoria/:id', (req, res) => {
  const { categoria, id } = req.params;
  res.json({ categoria, id });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
