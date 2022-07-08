const SHA1       = require("crypto-js/sha1");
const client     = require('../../database/config');

module.exports = {

    


    /*
    *
    *    Cadastro Usuário
    *
    */
    async store(req, res) {

        /* 
            #swagger.tags = ['Usuarios']
            #swagger.description = '<h1>Cadastro do usuário</h1>'
            #swagger.summary = 'Cadastro do usuário'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4>
                ',
                type: 'object',
                schema: {
                    "name" : "John Doe",
                    "email": "john@doe.com",
                    "pass" : "123"
                }
            }    
        */
        const { 
            name,
            description,
            price,
            images
        } = req.body;

        //console.log(req.body);

        if(name == undefined || price == undefined){
            return res.status(400).json({ resp: 'n' });
        }else{
            client.query("INSERT INTO Products (name,description,price,images,status,published_at) VALUES ('"+name+"','"+description+"','"+price+"','"+images+"','1',NOW()) ", (err, resp) => {
                if(err){ return res.status(400).json({ resp: 'n' }); }
                client.query("SELECT * FROM Products ORDER BY id DESC LIMIT 1 ", (err, respr) => {
                    //console.log(respr);
                    return res.status(200).json({ resp: 's', product : respr.rows[0] });
                });
            });
        }
        
    },


    /*
    *
    *    Deletar Usuário
    *
    */
    async delete(req, res) {

        /* 
            #swagger.tags = ['Usuarios']
            #swagger.description = '<h1>Remover usuário</h1>'
            #swagger.summary = 'Remover usuário'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4><br/>
                    <strong>Id</strong> : Id do usuário<br/>
                ',
                type: 'object',
                schema: { 
                    Id   : "6039af4d0ec187e8db6dfebe",
                }
            }    
        */
        
        client.query("UPDATE Products SET status = '3' WHERE id = '"+req.params.userId+"' ", (err, resp) => {
            if(err){ return res.status(400).json({ resp: 'n' }); }
            return res.status(200).json({ resp: 's', product : resp.rows[0] });
        });

    },


    /*
    *
    *    Atualizar Usuário
    *
    */
    async update(req, res) {

        /* 
            #swagger.tags = ['Produtos']
            #swagger.description = '<h1>Atualizar produto</h1>'
            #swagger.summary = 'Atualizar produto'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4><br/>
                    <strong>Id</strong> : Id do produto<br/>
                ',
                type: 'object',
                schema: {
                    "name":"",
                    "description":"",
                    "price":"",
                    "images":"",
                    "status":""
                }
            }    
        */


        const { 
            name,
            description,
            price,
            images,
            status,
        } = req.body;


        client.query("UPDATE Products SET name = '"+name+"', description = '"+description+"', price = '"+price+"', images = '"+images+"', status = '"+status+"' WHERE id = '"+req.params.userId+"' ", (err, resp) => {
            if(err){ return res.status(400).json({ resp: 'n' }); }
            return res.status(200).json({ resp: 's', product : resp.rows[0] });
        });

    },


    /*
    *
    *    Ver Usuário
    *
    */
    async view(req, res) {

        /* 
            #swagger.tags = ['Produtos']
            #swagger.description = '<h1>Detalhes do produto</h1>'
            #swagger.summary = 'Detalhes do produto'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4><br/>
                    <strong>Id</strong> : Id do produto<br/>
                ',
                type: 'object',
                schema: { 
                    Id   : "6039af4d0ec187e8db6dfebe",
                }
            }    
        */

        client.query("SELECT * FROM Products WHERE id = '"+req.params.userId+"' ", (err, resp) => {
            if(err){ return res.status(400).json({ resp: 'n' }); }
            return res.status(200).json({ resp: 's', product : resp.rows[0] });
        });

    },


    /*
    *
    *    Listar Produtos
    *
    */
    async list(req, res) {

        /* 
            #swagger.tags = ['Produtos']
            #swagger.description = '<h1>Listar produtos</h1>s'
            #swagger.summary = 'Listar produtoss'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4><br/>
                    Não é nescessário passar parâmetros para essa rota
                ',
                type: 'object',
                schema: {}
            }    
        */
        client.query("SELECT * FROM Products WHERE status <> '3' ", (err, resp) => {
            if(err){ return res.status(400).json({ resp: 'n' }); }
            return res.status(200).json({ resp: 's', products : resp.rows });
        });

    },




};



