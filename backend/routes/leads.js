const express = require('express');
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/leads - List all leads
router.get('/', auth, async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Erro ao buscar leads' });
  }
});

// GET /api/leads/:id - Get lead by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead não encontrado' });
    }
    res.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ error: 'Erro ao buscar lead' });
  }
});

// POST /api/leads - Create new lead
router.post('/', auth, async (req, res) => {
  try {
    const id = await Lead.create(req.body);
    res.status(201).json({ id, message: 'Lead criado com sucesso' });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Erro ao criar lead' });
  }
});

// PUT /api/leads/:id - Update lead
router.put('/:id', auth, async (req, res) => {
  try {
    await Lead.update(req.params.id, req.body);
    res.json({ message: 'Lead atualizado com sucesso' });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Erro ao atualizar lead' });
  }
});

// DELETE /api/leads/:id - Delete lead
router.delete('/:id', auth, async (req, res) => {
  try {
    await Lead.delete(req.params.id);
    res.json({ message: 'Lead deletado com sucesso' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Erro ao deletar lead' });
  }
});

module.exports = router;
