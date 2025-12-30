const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Colaborador = require('../models/Colaborador');

const router = express.Router();

// POST /api/auth/login - Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const colaborador = await Colaborador.findByEmail(email);
    if (!colaborador) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(senha, colaborador.senha_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Update last login
    await Colaborador.updateLastLogin(colaborador.id_colaborador);

    // Generate JWT token
    const token = jwt.sign(
      { id: colaborador.id_colaborador, email: colaborador.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: colaborador.id_colaborador,
        nome: colaborador.nome_completo,
        email: colaborador.email,
        tipo: colaborador.tipo_colaborador
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /api/auth/register - Register new colaborador (optional, for admin use)
router.post('/register', async (req, res) => {
  try {
    const id = await Colaborador.create(req.body);
    res.status(201).json({ id, message: 'Colaborador criado com sucesso' });
  } catch (error) {
    console.error('Error creating colaborador:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Email ou CPF já cadastrado' });
    } else {
      res.status(500).json({ error: 'Erro ao criar colaborador' });
    }
  }
});

// GET /api/auth/me - Get current user info
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const colaborador = await Colaborador.findById(req.user.id);
    if (!colaborador) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({
      id: colaborador.id_colaborador,
      nome: colaborador.nome_completo,
      email: colaborador.email,
      tipo: colaborador.tipo_colaborador
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

module.exports = router;
