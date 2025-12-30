const express = require('express');
const Pedido = require('../models/Pedido');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/pedidos - List all pedidos
router.get('/', auth, async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  } catch (error) {
    console.error('Error fetching pedidos:', error);
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
});

// GET /api/pedidos/:id - Get pedido by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    console.error('Error fetching pedido:', error);
    res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
});

// POST /api/pedidos - Create new pedido
router.post('/', auth, async (req, res) => {
  try {
    const id = await Pedido.create(req.body);
    res.status(201).json({ id, message: 'Pedido criado com sucesso' });
  } catch (error) {
    console.error('Error creating pedido:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Número do pedido já cadastrado' });
    } else {
      res.status(500).json({ error: 'Erro ao criar pedido' });
    }
  }
});

// PUT /api/pedidos/:id - Update pedido
router.put('/:id', auth, async (req, res) => {
  try {
    await Pedido.update(req.params.id, req.body);
    res.json({ message: 'Pedido atualizado com sucesso' });
  } catch (error) {
    console.error('Error updating pedido:', error);
    res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
});

// DELETE /api/pedidos/:id - Delete pedido
router.delete('/:id', auth, async (req, res) => {
  try {
    await Pedido.delete(req.params.id);
    res.json({ message: 'Pedido deletado com sucesso' });
  } catch (error) {
    console.error('Error deleting pedido:', error);
    res.status(500).json({ error: 'Erro ao deletar pedido' });
  }
});

module.exports = router;
