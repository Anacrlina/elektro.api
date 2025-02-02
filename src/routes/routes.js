const express = require('express');
const router = express.Router();
const ClienteController = require('./controllers/ClienteController');
const ProdutoController = require('./controllers/ProdutoController');

// Rotas Cliente
router.get('/clientes', ClienteController.index);
router.get('/clientes/:cpf', ClienteController.show);
router.post('/clientes', ClienteController.store);
router.put('/clientes/:cpf', ClienteController.update);
router.delete('/clientes/:cpf', ClienteController.destroy);

// Rotas Produto
router.get('/produtos', ProdutoController.index);
router.get('/produtos/:id', ProdutoController.show);
router.post('/produtos', ProdutoController.store);
router.put('/produtos/:id', ProdutoController.update);
router.delete('/produtos/:id', ProdutoController.destroy);

module.exports = router;
