import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware nativo para JSON
app.use(express.json());

// Middleware global de log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware nativo para arquivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware de rota específica
function verificarAutenticacao(req, res, next) {
  if (req.headers.authorization === 'Bearer 123') {
    next();
  } else {
    res.status(401).json({ erro: 'Não autorizado' });
  }
}

app.get('/api/segredo', verificarAutenticacao, (req, res) => {
  res.json({ mensagem: 'Acesso concedido!' });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno!' });
});

app.get('/users/:id', (req, res) => {
  console.log('Parâmetros de rota:', req.params);
  console.log('Parâmetros de query:', req.query);
  res.send('Veja o console!');
});


app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
