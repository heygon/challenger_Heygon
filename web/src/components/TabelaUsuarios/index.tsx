import React from 'react';


interface usuariosItemProps{
    usuarios : {
        _id     : string;
        name   : {
            title: string,
            first : string,
            last: string
        };
        registered  : {
            date : string,
            age: string
        };
        gender : string;
    },
    idUsuario : any
}

const TabelaUsuarios: React.FC<usuariosItemProps> = ({ usuarios, idUsuario }) => {

    function getId(e:any){
        idUsuario(e);
    }

    return (
        <tr key={ usuarios._id }>
            <td>{ usuarios?.name?.first }</td>
            <td>{ usuarios.gender }</td>
            <td>{ usuarios?.registered?.date }</td>
            <td><div className="btn btn-info " onClick={ () => { getId(usuarios._id) } } >Editar</div></td>
        </tr>
    )
}

export default TabelaUsuarios;