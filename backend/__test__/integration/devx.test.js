const request  = require('supertest');
const env      = require('dotenv/config');
const app     = require('../../src/app');
const api     = request(app);

let dados = {
  "name":"John Doe",
  "email":"jhon@doe.com",
  "pass":"1234"
}

describe('Ações do usuário antes da autenticação', function() {
    
    it('Cadastro', async function(done) {
      console.log(dados);
        api.post('/users/cadastro')
        .send(dados)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            
            let data = JSON.parse(res.text);
            if(data.resp == 's'){
                return done();
            }else{
                return done(err);
            }

        });
    });
    

    it('Login', async function(done) {
        api.post('/users/login')
        .send({
            email : dados.email,
            pass  : dados.pass
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);

            let data = JSON.parse(res.text);
            if(data.resp == 's' && data.Usuario.name.first != undefined){

                user.userId = data.Usuario.id;
                user.Token = data.Usuario.token;
                
                setTimeout(function(){
                  return done();
                },2000);
                

            }else{
                return done(err);
            }
            
        });
    });


    it('Add Product', async function(done) {
      setTimeout(function(){
        api.post('products')
        .set('Accept', 'application/json')
        .send({
          name : "teste",
          description : "teste description",
          price : "123",
          images : "img",
          status : "1",
          Token : dados.Token
        })
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            
            let data = JSON.parse(res.text);
            if(data.resp == 's'){
                dados.Productid = data.product.id
                return done();
            }else{
                return done(err);
            }

        });
      },2000);
    });


    it('View Product', async function(done) {
      setTimeout(function(){
        api.get('/products/'+dados.Productid)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            
            let data = JSON.parse(res.text);
            if(data.resp == 's'){
                return done();
            }else{
                return done(err);
            }

        });
      },2000);
    });


    it('View All Products', async function(done) {
      setTimeout(function(){
        api.get('/products')
        .set('Accept', 'application/json')
        .send()
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            
            let data = JSON.parse(res.text);
            if(data.resp == 's'){
                return done();
            }else{
                return done(err);
            }

        });
      },2000);
    });


    it('Edit Product', async function(done) {
      setTimeout(function(){

        api.delete('/products/'+dados.Productid)
        .set('Accept', 'application/json')
        .send({
          name : "teste edit",
          description : "teste description edit",
          price : "1234",
          images : "img edit",
          status : "1",
          Token : dados.Token
        })
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            
            let data = JSON.parse(res.text);
            if(data.resp == 's'){
                return done();
            }else{
                return done(err);
            }

        });
      },2000);
    });


    it('Seed para o login no frontend ', async function(done) {
      api.delete('products/'+dados.Productid)
      .send({
        Token : dados.Token
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
          if (err) return done(err);
          
          let data = JSON.parse(res.text);
          if(data.resp == 's'){
              return done();
          }else{
              return done(err);
          }

      });
    });



});

