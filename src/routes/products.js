const express = require('express');
const router = express.Router();

const{
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productsController');

// Ruta para obtener todos los productos
router.get('/', getAllProducts);

// Ruta para obtener un prodcto por id
router.get('/:pid', getProductById);

// Ruta para agregar un nuevo producto
router.post('/', addProduct);

// Ruta para actualizar un producto por id
router.put('/:pid', updateProduct)

// Ruta para eliminar un producto por id
router.delete('/:pid', deleteProduct);

module.exports = router;