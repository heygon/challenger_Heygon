const express      = require('express');
const routes       = express.Router();
const requireDir   = require('require-dir');



const authMiddleware = require('./middleware/auth');


// Chama os controllers
const user       = require('./controllers/userController.js');
const products   = require('./controllers/productsController');

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
////////
////////        Rotas de Usuarios
////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

routes.post('/users/cadastro', user.cadastro);
routes.post('/users/login', user.login);
routes.put('/users/:userId',authMiddleware, user.update);
routes.get('/users/:userId',authMiddleware, user.view);

routes.delete('/products/:userId',authMiddleware, products.delete);
routes.put('/products/:userId',authMiddleware, products.update);
routes.get('/products/:userId', products.view);
routes.get('/products', products.list);
routes.post('/products', products.store);


module.exports = routes;