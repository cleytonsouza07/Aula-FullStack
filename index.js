const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

const authMiddleware = require('./middleware/authMiddleware');


app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Bem-vindo à rota protegida!', user: req.user });
});
