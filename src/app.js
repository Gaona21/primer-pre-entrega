// Configuracion basica de un servidor en express
const express = require('express');
const app = express();

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

// Permite a Express interpretar JSON en el cuerpo de las solicitudes
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


// Definir el puerto
const PORT = 8081;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});