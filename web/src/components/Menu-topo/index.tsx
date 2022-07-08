import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

export default function MenuTopo(){

    let login = 0;
    let dados = {
        name : ''
    };
    if(localStorage.DadosDevx !== undefined){
        dados = JSON.parse(localStorage.DadosDevx);
        if(dados !== undefined){
            login = 1;
        }
    }

    return (
        <>    
            
            <div className="col s7 offset-s2 center-align" >
                <h2>Products List</h2>
            </div>
            <div className="col s3 right-align" style={{ marginTop:'35px' }}>

                {!login && (
                    <>
                        <Link to="/login">
                            <i className="fa fa-lock"></i>
                            &nbsp;
                            Signin
                        </Link> / 
                        <Link to="/cadastro">
                            <i className="fa fa-user-plus"></i>
                            &nbsp;
                            Signing up
                        </Link>
                    </>
                )}
                
                {login && (
                    <>
                        <div className="left">Bem vindo <strong>{ dados.name }</strong></div> 
                        <Link to="/logout" className="right">
                            <div className="col-12 p-4">
                            <i className="fa fa-power-off"></i> Logout
                            </div>
                        </Link>
                    </>
                )}


            </div>
         </>
    )
}

