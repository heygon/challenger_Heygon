import React from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';
import bye from './../../assets/images/bye.png';

export default function Logout() {

    const history = useHistory();

    localStorage.removeItem('DadosDevx');

    setTimeout(function () {
        history.push("/");
    }, 3000);

    return (
        <div className=" cardLogin row">
            <div className="cardl col s6 offset-s3">
                <div className="row">
                    <h2 className='col s12 center-align'><strong>Bye!</strong></h2>
                    <img src={bye} className="col s6 offset-s3" alt="" />

                </div>
            </div>
        </div>
    );
}