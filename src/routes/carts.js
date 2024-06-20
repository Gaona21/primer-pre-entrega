const express = require('express');
const router = express.Router();

const {
    createCart,
    getCartById,
    addProductToCart
} = require('../controllers/cartsController');

// Ruta para crear un nuevo carrito
router.post('/', createCart);

// Ruta para obtener un carrito por id
router.get('/cid', getCartById);

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', addProductToCart);

module.exports = router;