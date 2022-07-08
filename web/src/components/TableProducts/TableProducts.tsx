import React from 'react';


interface produtosItemProps {
    produtos: {
        id: string;
        picture: string;
        name: string;
        description: string;
        price: number;
        published_at: number;
    },
    getProductIdForEdit: (id: string) => void;
    getProductIdForDelete: (id: string) => void;
}

export default function TableProducts(props: produtosItemProps) {
    console.log(props);
    return (
        <>
            <tr key={props.produtos.id}>
                <td>{props.produtos?.id}</td>
                <td>{props.produtos?.picture}</td>
                <td>{props.produtos?.name}</td>
                <td>{props.produtos?.description}</td>
                <td>{props.produtos?.price}</td>
                <td>{props.produtos?.published_at}</td>
                <td>
                    <div className="btn orange modal-trigger" data-target="editProduct" onClick={() => props.getProductIdForEdit(props.produtos.id)} >Edit</div>
                    &nbsp;
                    <div className="btn red modal-trigger" data-target="modalDeleteProduct" onClick={() => props.getProductIdForDelete(props.produtos.id)} >Delete</div>

                </td>
            </tr>
        </>
    )
}