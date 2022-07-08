import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';
import api from '../../services/api';

function Cadastro() {
    const history = useHistory();

    const [name,  setName]  = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    function salvarCadastro(){
        console.log({
            name,
            email,
            pass,
            perfil : 1
        });

        api.post('users/cadastro',{
            name,
            email,
            pass,
            perfil : 1
        }).then(() => {
            alert('Cadastro realizado com sucesso');
            history.push("/");
        }).catch(() => {
            alert('Erro no Cadastro');
        })
    }


    return (
        <div className=" cardCadastro row">
            
            <div className="cardl col s4 offset-s4" style={{ marginTop:'70px' }}>
                <div className="col s12">&nbsp;</div>
                <h5 className="text-center col s12 center-align" style={{ fontWeight:'bold' }}>Signing up</h5>
                <div className="col s12">&nbsp;</div>
                <div className="input-group input-group-lg mb-3">
                    <strong className="col s12">Name</strong>
                    <input type="text" className="form-control rounded" value={name} onChange={ (e) => { setName(e.target.value) } } />
                </div>
                <div className="input-group input-group-lg mb-3">
                    <strong className="col s12">E-mail</strong>
                    <input type="email" className="form-control rounded" value={email} onChange={ (e) => { setEmail(e.target.value) } } />
                </div>
                <div className="input-group input-group-lg mb-3">
                    <strong className="col s12">Password</strong>
                    <input type="password" className="form-control rounded" value={pass} onChange={ (e) => { setPass(e.target.value) } } />
                </div>
                <div className="col s12">&nbsp;</div>
                <div className="col s12 btn blue " onClick={ salvarCadastro }>Sing up</div>
                <div className="col s12">&nbsp;</div>
                <div className="col s12 row center-align">
                    <Link to="/">
                        <strong className="cursor-pointer p-0">Voltar</strong>
                    </Link>
                </div>
                
            </div>

        </div>
  );
}

export default Cadastro;