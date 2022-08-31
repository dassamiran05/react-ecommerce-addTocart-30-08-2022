import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cardsdata from './CardData';
import {useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {ADD} from '../redux/actions/action';

const Cards = () => {
    const [products, setProducts] = useState(cardsdata);

    const dispatch = useDispatch();
    // const {productId} = useParams();
    // const navigate = useNavigate();

    // const goTocardDetail = id =>{
    //     navigate(`/cart/${id}`);
    // }

    const addTocart = e =>{
        // console.log(e);
        dispatch(ADD(e));
    }

    return (
        <div className='container mt-4'>
            <h2 className='text-center mb-3'>Add to Cart Projects</h2>
            <div className='row'>
                {
                    products.map(product => <div className='col-lg-4 col-md-4 col-12' key={product.id}>
                        <Card className='mt-4 card_style'>
                            <Card.Img variant="top" src={product.imgdata} style={{ height: '16rem' }}/>
                            <Card.Body>
                                <Card.Title>{product.rname}</Card.Title>
                                <Card.Text>Price: ₹ {product.price}</Card.Text>
                                <div className='button_div d-flex justify-content-center'>
                                    <Button className='col-lg-12' variant="primary" onClick={() => addTocart(product)}>Add to Cart</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Cards