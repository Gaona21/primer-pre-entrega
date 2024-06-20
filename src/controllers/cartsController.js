const { error } = require('console');
const fs = require('fs');
const path = require('path');
const cartPath = path.join(__dirname, '../../data/carritos.json');

// Funcion para crearr un nuevo carrito
const createCart = (req, res) => {
    const carts = JSON.parse(fs.readFileSync(cartPath, 'utf-8'));
    const newCart = {
        id: String(carts.length + 1),
        products: []
    };
    carts.push(newCart);
    fs.writeFileSync(cartPath, JSON.stringify(carts, null, 2));
    res.status(201).JSON(newCart);
};

// Funcion para obtener un carrito por su id
const getCartById = (req, res) => {
    const {cid} = req.params;
    const carts = JSON.parse(fs.readFileSync(cartPath, 'utf-8'));
    const cart = carts.find(c => c.id === cid);

    if(cart){
        res.json(cart);
    }else{
        res.status(404).json({error: 'cart not found'});
    }
};

// Funcion para agregar un producto a un carrito
const addProductToCart = (req, res) => {
    const {cid, pid} = req.params;
    const carts = JSON.parse(fs.readFileSync(cartPath, 'utf-8'));
    const cartIndex = carts.findIndex(c => c.id === cid);

    if(cartIndex !== -1){
        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex(p => p.id === pid);

        if(productIndex !== -1){
            cart.products[productIndex].quantity += 1;
        }else{
            cart.products.push({product: pid, quantity: 1});
        }

        carts[cartIndex] = cart;
        fs.writeFileSync(cartPath, JSON.stringify(carts, null, 2));
        res.status(201).json(cart);
    }else{
        res.status(404).json({error: 'cart not found'});
    }
};

module.exports = {
    createCart,
    getCartById,
    addProductToCart
};