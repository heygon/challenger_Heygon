const client      = require('../../database/config');

module.exports = async (req, res, next) => {

    client.query("SELECT token FROM Clients WHERE token = '"+req.body.Token+"' ", (err, resp) => {
        if(resp.rows.length >= 1){
            if(resp.rows[0].token == req.body.Token){
                return next();
            }else{
                return res.status(401).json({ resp : 'Não autorizado 1' });
            }
        }else{
            return res.status(401).json({ resp : 'Não autorizado 2' });
        }
    })
}