import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/actions/action';
import { useDispatch } from 'react-redux';

const CardDetails = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getdata = useSelector(state => state.cartreducer.carts);


    const compare = () => {
        const compareData = getdata.filter(e => {
            return e.id == id;
        })
        setData(compareData);
    }

    useEffect(() => {
        compare();
    }, [id]);

    //Add Product by clicking plus sign
    const addTocart = e =>{
        // console.log(e);
        dispatch(ADD(e));
    }

    const deleteItem = id =>{
        dispatch(DLT(id));
        navigate('/');
    }


    //Remove one
    const singleProduct = item =>{
        dispatch(REMOVE(item));
    }

    return (
        <div className='container mt-3'>
            <h2 className='text-center mb-3'>Items detail page</h2>
            <section className='container'>
                <div className='iteamsdetails'>
                    {
                        data.map(ele => {
                            return (
                                <>
                                    <div className='items_img'>
                                        <img src={ele.imgdata} alt='' />
                                    </div>
                                    <div className='details'>
                                        <Table>
                                            <tr>
                                                <td>
                                                    <p><strong>Resturant</strong>: {ele.rname}</p>
                                                    <p><strong>Price</strong>: ₹ {ele.price}</p>
                                                    <p><strong>Dishes</strong>: {ele.address}</p>
                                                    <p><strong>Total</strong>: ₹ {ele.price * ele.qnty}</p>
                                                    <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100,cursor:'pointer',background:'#ddd', color:'#111'}}>
                                                        <span style={{fontSize:24}} onClick={ele.qnty <= 1 ? () => deleteItem(ele.id) : () => singleProduct(ele)}>-</span>    
                                                        <span style={{fontSize:24}}>{ele.qnty}</span>    
                                                        <span style={{fontSize:24}} onClick={() => addTocart(ele)}>+</span>    
                                                    </div> 
                                                </td>
                                                <td>
                                                    <p><strong>Rating</strong>: <span style={{ background: 'green', padding: '4px', color: '#fff', borderRadius: '5px' }}>{ele.rating} ★</span></p>
                                                    <p><strong>Order Review</strong>: {ele.somedata}</p>
                                                    <p><strong>Remove</strong>: <DeleteIcon className='text-danger' style={{ cursor: 'pointer', fontSize: '30px' }} onClick={() =>deleteItem(ele.id)} /></p>
                                                </td>
                                            </tr>
                                        </Table>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
            </section>
        </div>
    )
}

export default CardDetails