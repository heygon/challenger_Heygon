import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';
import api from '../../services/api';
import MenuTopo from '../../components/Menu-topo';
import TableProducts from '../../components/TableProducts/TableProducts';



function Landing() {

    const history = useHistory();

    const [newName, setnewName] = useState(String);
    const [newPrice, setnewPrice] = useState(String);
    const [newFile, setnewFile] = useState(String);
    const [newFileE, setnewFileE] = useState(String);
    const [newDescription, setnewdescription] = useState(String);
    const [userToken, setuserToken] = useState(String);
    const [produtos, setProdutos] = useState([]);
    const [produtoId, setProdutoId] = useState([]);

    try {
        let dados = JSON.parse(localStorage.DadosDevx);
        setuserToken(dados.token);
    } catch (error) {

    }


    function ListaProdutos() {
        api.get('products').then(response => {
            console.log(response);
            if (response.data.resp === 's') {
                setProdutos(response.data.products);
            }
        })
    }


    function viewProduct(id: any) {
        console.log(id);
        setProdutoId(id);

        api.get('products/' + id)
            .then(response => {

                console.log(response.data.product);
                setnewName(response.data.product.name);
                setnewPrice(response.data.product.price);
                //setnewFile(response.data.product.images);
                setnewdescription(response.data.product.description);

            });

        return id;
    }


    function saveEditProduct() {

        api.put('products/' + produtoId, {
            name: newName,
            description: newDescription,
            price: newPrice,
            images: newFileE,
            status: 1,
            Token: userToken,
        })
            .then(response => {

                if (response.data.resp === 's') {
                    setnewName('');
                    setnewPrice('');
                    setnewFile('');
                    setnewdescription('');

                    window.location.reload();
                }

            });

        return true;
    }

    function softDeleteProduct(id : any) {

        api.delete('products/' + id + '/' + userToken,)
            .then(response => {
                if (response.data.resp === 's') {
                    console.log(response.data.products);
                    setProdutos(response.data.products);
                }
            });
    }


    function onLoadNewFile(e: any) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            //console.log(e.target!.result);
            let fil = (e.target!.result == null) ? '' : e.target!.result as string;
            setnewFileE(fil);
        }
    }


    function onLoadNewFileE(e: any) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            //console.log(e.target!.result);
            let fil = (e.target!.result == null) ? '' : e.target!.result as string;
            setnewFileE(fil);
        }
    }


    function registerNewProduct() {
        console.log('iniciando o cadastro');

        api.post("products", {
            name: newName,
            price: newPrice,
            description: newDescription,
            images: newFile,
            status: '1',
            Token: userToken
        }).then(response => {
            if (response.data.resp === 's') {
                setnewName('');
                setnewPrice('');
                setnewFile('');
                setnewdescription('');

                window.location.reload();
            }
        });

    }


    return (
        <>
            <div className=" cardLogin row landing " onLoad={ListaProdutos}>
                <div className="col s10 offset-s1 landingCard white" >
                    <MenuTopo />

                    <div className="col s12">&nbsp;</div>
                    <div className="col s12">&nbsp;</div>

                    {userToken ? (
                        <div className="btn blue right modal-trigger" data-target="modalNewProduct" >Add new product</div>
                    ) : (
                        <></>
                    )}

                    <div className="col s10 offset-s1">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Picture</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Published at</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.map(value => {
                                    return <TableProducts key={value['id']} produtos={value} getProductIdForEdit={viewProduct} getProductIdForDelete={softDeleteProduct} />
                                })}
                            </tbody>
                        </table>
                    </div>


                </div>
                <div style={{ clear: 'both' }}>&nbsp;</div>
                <div style={{ clear: 'both' }}>&nbsp;</div>
                <div style={{ clear: 'both' }}>&nbsp;</div>

            </div>

            <div id="modalNewProduct" className="modal bottom-sheet" style={{ minHeight: '100%' }}>
                <div className="modal-content row">
                    <div className="col s4 offset-s4">

                        <h4 className="col s12 center-align">
                            Add new product
                            <i className="fa fa-times modal-action modal-close right"></i>
                        </h4>

                        <div className="col s12">&nbsp;</div>
                        <div className="col s12">&nbsp;</div>
                        <div className="file-field input-field col s12">
                            <div className="btn">
                                <span>File</span>
                                <input id="newFile" type="file" onChange={(e) => onLoadNewFile(e)} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>

                        <div className="col s12">&nbsp;</div>

                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Name</strong>
                            <input type="text" className="form-control rounded" value={newName} onChange={(e) => { setnewName(e.target.value) }} />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Price</strong>
                            <input type="number" className="form-control rounded" value={newPrice} onChange={(e) => { setnewPrice(e.target.value) }} />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Description</strong>
                            <input type="text" className="form-control rounded" value={newDescription} onChange={(e) => { setnewdescription(e.target.value) }} />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="col s12 btn blue" onClick={registerNewProduct}>Add</div>

                    </div>

                </div>
            </div>

            <div id="editProduct" className="modal bottom-sheet" style={{ minHeight: '100%' }}>
                <div className="modal-content row">
                    <div className="col s4 offset-s4">

                        <h4 className="col s12 center-align">
                            Edit the product
                            <i className="fa fa-times modal-action modal-close right"></i>
                        </h4>

                        <div className="col s12">&nbsp;</div>
                        <div className="col s12">&nbsp;</div>
                        <div className="file-field input-field col s12">
                            <div className="btn">
                                <span>File</span>
                                <input id="newFileEdit" type="file" onChange={(e) => onLoadNewFileE(e)} value={newFile} />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>

                        <div className="col s12">&nbsp;</div>

                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Name</strong>
                            <input type="text" className="form-control rounded" value={newName} onChange={(e) => { setnewName(e.target.value) }} />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Price</strong>
                            <input type="number" className="form-control rounded" value={newPrice} onChange={(e) => { setnewPrice(e.target.value) }} />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Description</strong>
                            <input type="text" className="form-control rounded" value={newDescription} onChange={(e) => { setnewdescription(e.target.value) }} />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="col s12 btn blue" onClick={saveEditProduct}>Save</div>

                    </div>

                </div>
            </div>

            <div id="modalDeleteProduct" className="modal bottom-sheet" style={{ minHeight: '100%' }}>
                <div className="modal-content row">
                    <div className="col s4 offset-s4">

                        <h4 className="col s12 center-align">
                            Delete the product
                            <i className="fa fa-times modal-action modal-close right"></i>
                        </h4>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Landing;


