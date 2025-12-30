const express = require('express');
const Produto = require('../models/Produto');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/produtos - List all active produtos
router.get('/', auth, async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    console.error('Error fetching produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// GET /api/produtos/:id - Get produto by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    console.error('Error fetching produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

// POST /api/produtos - Create new produto
router.post('/', auth, async (req, res) => {
  try {
    const id = await Produto.create(req.body);
    res.status(201).json({ id, message: 'Produto criado com sucesso' });
  } catch (error) {
    console.error('Error creating produto:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Código do produto já cadastrado' });
    } else {
      res.status(500).json({ error: 'Erro ao criar produto' });
    }
  }
});

// PUT /api/produtos/:id - Update produto
router.put('/:id', auth, async (req, res) => {
  try {
    await Produto.update(req.params.id, req.body);
    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error('Error updating produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// DELETE /api/produtos/:id - Soft delete produto
router.delete('/:id', auth, async (req, res) => {
  try {
    await Produto.delete(req.params.id);
    res.json({ message: 'Produto desativado com sucesso' });
  } catch (error) {
    console.error('Error deleting produto:', error);
    res.status(500).json({ error: 'Erro ao desativar produto' });
  }
});

module.exports = router;
