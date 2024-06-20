const { error } = require('console');
const fs = require('fs');
const path = require('path');
const productPath = path.join(__dirname, '../../data/productos.json');

// Funcion para obtener todos los productos
const getAllProducts = (req, res) => {
    const limit = parseInt(req.query.limit) || undefined;
    const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));

    if(limit){
        return res.json(products.slice(0, limit));
    }

    res.json(products);
};

// Funcion para obtener un producto po id
const getProductById = (req, res) => {
    const {pid} = req.params;
    const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));
    const product = products.find(p => p.id === pid);

    if(product){
        res.json(product);
    }else{
        res.status(404).json({error: 'product not founds'});
    }
};

// Funcion para agregar un nuevo producto
const addProduct = (req, res) => {
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(404).json({error: 'missing required fields'});
    }

    const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));
    const newProduct = {
        id: String(products.length + 1),
        title,
        description,
        code,
        price,
        status: status !== undefined ? status : true,
        stock,
        category,
        thumbnails: thumbnails || []
    };

    products.push(newProduct);
    fs.writeFileSync(productPath, JSON.stringify(products, null, 2));
    rmSync.status(201).json(newProduct);
};

// Funcion para actualizar un producto por id
const updateProduct = (req, res) => {
    const {pid} = req.params;
    const updates = req.params;
    const products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));
    const productIndex = products.findIndex(p => p.id === pid);

    if(productIndex !== -1){
        const updateProduct = {...products[productIndex], ...updates};
        products[productIndex] = updateProduct;
        fs.writeFileSync(productPath, JSON.stringify(products, null, 2));
        res.json(updateProduct);
    }else{
        res.status(404).json({error: ' product not found'});
    }
};

// Funcion para eliminart un producto
const deleteProduct = (req, res) => {
    const {pid} = req.params
    let products = JSON.parse(fs.readFileSync(productPath, 'utf-8'));
    const productExists = products.some(p => p.id == pid);

    if(productExists){
        products = products.filter(p => p.id !== pid);
        fs.writeFileSync(productPath, JSON.stringify(products, null, 2));
        res.status(204).end();
    }else{
        res.status(404).json({error: 'product not found'});
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};