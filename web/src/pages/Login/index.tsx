import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';
import api from '../../services/api';

function Login() {

    const history = useHistory();

    const [login, setLogin]  = useState('');
    const [senha, setSenha] = useState('');

    function realizarLogin(){

        api.post('/users/login',{
            email: login,
            pass: senha,
        }).then((e) => {
            if(e.data.resp === 's' && e.data.Usuario.name !== undefined){
                localStorage.setItem('DadosDevx',JSON.stringify(e.data.Usuario));
                history.push("/");
            }else{
                alert('Usuário não encontrado');
            }
        }).catch(() => {
            alert('Usuário não encontrado');
        })

    }

    
  return (
        <div className=" cardLogin row">
            
            <div className="cardl col s4 offset-s4">
                <div className="row">
                    <div className="col s12">
                        <h5 className="center-align" style={{ fontWeight : 'bold' }}>Signin</h5>
                        <div className="col s12">&nbsp;</div>
                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">E-mail</strong>
                            <input type="text" className="form-control rounded" value={login} onChange={ (e) => { setLogin(e.target.value) } } />
                        </div>
                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Senha</strong>
                            <input type="password" className="form-control rounded" value={senha} onChange={ (e) => { setSenha(e.target.value) } } />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="col s12 btn blue btn-lg" onClick={realizarLogin}>Sing in</div>
                        <div className="col s12">&nbsp;</div>
                        <div className="col s12 center-align">
                            
                            <Link to="/cadastro"  className="cursor-pointer right-align">
                                <strong>Cadastre-se</strong>
                            </Link>
                        </div>
                        <div className="col s12">&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Login;