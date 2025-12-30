const express = require('express');
const Cliente = require('../models/Cliente');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/clientes - List all active clientes
router.get('/', auth, async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error('Error fetching clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// GET /api/clientes/:id - Get cliente by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error('Error fetching cliente:', error);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
});

// POST /api/clientes - Create new cliente
router.post('/', auth, async (req, res) => {
  try {
    const id = await Cliente.create(req.body);
    res.status(201).json({ id, message: 'Cliente criado com sucesso' });
  } catch (error) {
    console.error('Error creating cliente:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'CNPJ já cadastrado' });
    } else {
      res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  }
});

// PUT /api/clientes/:id - Update cliente
router.put('/:id', auth, async (req, res) => {
  try {
    await Cliente.update(req.params.id, req.body);
    res.json({ message: 'Cliente atualizado com sucesso' });
  } catch (error) {
    console.error('Error updating cliente:', error);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

// DELETE /api/clientes/:id - Soft delete cliente
router.delete('/:id', auth, async (req, res) => {
  try {
    await Cliente.delete(req.params.id);
    res.json({ message: 'Cliente desativado com sucesso' });
  } catch (error) {
    console.error('Error deleting cliente:', error);
    res.status(500).json({ error: 'Erro ao desativar cliente' });
  }
});

module.exports = router;
