const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database');
const authRoutes = require('./routes/auth');
const empresaRoutes = require('./routes/empresas');
const colaboradorRoutes = require('./routes/colaboradores');
const clienteRoutes = require('./routes/clientes');
const leadRoutes = require('./routes/leads');
const produtoRoutes = require('./routes/produtos');
const orcamentoRoutes = require('./routes/orcamentos');
const pedidoRoutes = require('./routes/pedidos');
const contratoRoutes = require('./routes/contratos');
const faturaRoutes = require('./routes/faturas');
const implantacaoRoutes = require('./routes/implantacoes');
const statusRoutes = require('./routes/status');
const templateRoutes = require('./routes/templates');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/empresas', empresaRoutes);
app.use('/api/colaboradores', colaboradorRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/orcamentos', orcamentoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/contratos', contratoRoutes);
app.use('/api/faturas', faturaRoutes);
app.use('/api/implantacoes', implantacaoRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/templates', templateRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
