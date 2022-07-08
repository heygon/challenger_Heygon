const SHA1 = require("crypto-js/sha1");
const client = require('../../database/config');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: { rejectUnauthorized: false }
});


module.exports = {


    async login(req, res) {
        /* 
            #swagger.tags = ['Usuarios']
            #swagger.description = 'Login do usuário'
            #swagger.summary = 'Login do usuário'


            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4><br/>
                    <strong>E-mail</strong> : Email do usuário<br/>
                    <strong>Senha</strong> : Senha do usuário<br/>
                ',
                type: 'object',
                schema: { 
                    Email  : "Joao@Doria.com",
                    Senha  : "JoaoDoria123",
                }
            }    
        */

        //console.log(req.body);
        const { email, pass } = req.body;


        try {

            const password = SHA1(pass + email).toString();
            //console.log(password);
            client.query("SELECT email,pass FROM Clients WHERE email = '" + email + "' AND pass = '" + password + "' ", (err, resp) => {
                if (err) {
                    return res.status(401).json({ resp: 'n1' }); // #swagger.responses[401]
                }
                //console.log(resp)
                //console.log(err, resp)

                if (resp.rows.length >= 1) {

                    let token = SHA1(new Date().getTime().toString());
                    client.query("UPDATE Clients SET Token = '" + token + "' WHERE email= '" + email + "' ", (err, resp2) => {
                        if (resp2.rowCount >= 1) {

                            client.query("SELECT * FROM Clients WHERE email = '" + email + "' ", (err, resp) => {
                                return res.status(200).json({ resp: 's', Usuario: resp.rows[0] });
                                // #swagger.responses[200] = {
                                //    description : "Retorna um array com a tag <b>resp</b> e a tag <b>Usuario</b>.<br/> A tag <b>resp</b> informa para o frontend que a requisição deu certo.<br/> A tag <b>Usuario</b> envia os dados do Usuário para serm salvos no banco de dados local do frontend"
                                // }
                            });

                        } else {
                            return res.status(401).json({ resp: 'n2' }); // #swagger.responses[401]
                        }
                    });

                } else {
                    return res.status(401).json({ resp: 'n3' }); // #swagger.responses[401]
                }
            });

            //console.log(confere);


        } catch (error) {
            return res.status(401).json({ resp: 'n4' }); // #swagger.responses[401]
        }

        // #swagger.end
    },


    /*
    *
    *    Cadastro Usuário
    *
    */
    async cadastro(req, res) {

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
            pass,
            email
        } = req.body;

        client.query("SELECT email FROM Clients WHERE email = '" + email + "' ", (err, resp) => {
            if (resp.rows.length >= 1) {
                return res.status(401).json({ resp: 'repetido', tipo: 'Email' });
                /* 
                    #swagger.responses[404] = {
                        description : "Retorna um array com a tag <b>resp</b> e a tag <b>Usuario</b>.<br/> A tag <b>resp</b> informa para o frontend que a requisição deu certo.<br/> A tag <b>Usuario</b> envia os dados do Usuário para serm salvos no banco de dados local do frontend"
                    }
                */
            } else {
                const password = SHA1(pass + email).toString();
                const us = client.query("INSERT INTO Clients (name,pass,email,create_at,status) VALUES ('" + name + "','" + password + "','" + email + "',NOW(),2) ", (err, resp) => {


                    let corpo = '';
                    corpo += '<!DOCTYPE html>';
                    corpo += '<html>';
                    corpo += '<head>';
                    corpo += '<title></title>';
                    corpo += '</head>';
                    corpo += '<body style="background:linear-gradient(to bottom, #FFFACA, #FFE601); padding:30px">';
                    
                    corpo += '<div style="width: 100%; background: #fff; border-radius:5px; padding:20px">';
                    corpo += '<h1>Hello, ' + Nome + ',</h1>';
                    corpo += '<p>Click in the link to confirm your acconunt.</p>';
                    corpo += '<a href="http://localhost:3000/confirmaccount/'+us.id+'">';
                    corpo += '</div>';
                    corpo += '</body>';
                    corpo += '</html>';

                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: Email,
                        subject: 'E-mail enviado usando Node!',
                        html: corpo
                    };




                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            res.status(404).json({ resp: 'Erro ao enviar email', error });
                        } else {
                            res.status(200).json({ resp: 's' });
                        }
                    });
                    /* 
                        #swagger.responses[200] = {
                            description : "Retorna um array com a tag <b>resp</b> e a tag <b>Usuario</b>.<br/> A tag <b>resp</b> informa para o frontend que a requisição deu certo.<br/> A tag <b>Usuario</b> envia os dados do Usuário para serm salvos no banco de dados local do frontend"
                        }
                    */
                });

            }
        });


    },


    /*
    *
    *    Atualizar Usuário
    *
    */
    async update(req, res) {

        /* 
            #swagger.tags = ['Usuarios']
            #swagger.description = '<h1>Atualizar usuário</h1>'
            #swagger.summary = 'Atualizar usuário'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4><br/>
                    <strong>Id</strong> : Id do usuário<br/>
                ',
                type: 'object',
                schema: {
                    "name" : "John Doe",
                    "email": "john@doe.com",
                    "pass" : "123",
                    "avatar" : "",
                }
            }    
        */

        console.log(req.params);

        const {
            name,
            email,
            pass,
            avatar
        } = req.body;

        client.query("SELECT * FROM Clients WHERE id = '" + req.params.userId + "' ", (err, resp) => {
            if (err) { return res.status(400).json({ resp: 'n1' }); }
            if (resp.rows.length >= 1) {

                const password = SHA1(pass + email).toString();
                let newPass = '';
                if (pass != undefined && password != resp.rows[0].pass) {
                    newPass = password;
                } else {
                    newPass = resp.rows[0].pass;
                }

                client.query("UPDATE Clients SET name = '" + name + "', email = '" + email + "', avatar = '" + avatar + "', pass = '" + newPass + "' WHERE id = '" + req.params.userId + "' ", (err, resp) => {
                    if (resp.rowCount >= 1) {
                        return res.status(200).json({ resp: 's' });
                    } else {
                        return res.status(400).json({ resp: 'n2' });
                    }
                });
            }
        });

    },


    /*
    *
    *    Ver Usuário
    *
    */
    async view(req, res) {

        /* 
            #swagger.tags = ['Usuarios']
            #swagger.description = '<h1>Detalhes do usuário</h1>'
            #swagger.summary = 'Detalhes do usuário'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4><br/>
                    <strong>Id</strong> : Id do usuário<br/>
                ',
                type: 'object',
                schema: { 
                    Id   : "2",
                }
            }    
        */

        client.query("SELECT * FROM Clients WHERE id = '" + req.params.userId + "' ", (err, resp) => {
            if (err) { return res.status(400).json({ resp: 'n' }); }
            return res.status(200).json({ resp: 's', user: resp.rows[0] });
        });


    },



};



