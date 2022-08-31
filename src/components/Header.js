import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { Link, useParams } from 'react-router-dom';
import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import './style.css';
import cart from './cart.gif';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import { DLT } from '../redux/actions/action';
import { useDispatch } from 'react-redux';


const Header = () => {
    const [price, setPrice] = useState(0);
    // console.log(price);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch();


    const getdata = useSelector(state => state.cartreducer.carts);
    // console.log(getdata);


    const deleteCart = id =>{
        dispatch(DLT(id));
    }


    const total = () =>{
        let price = 0;
        getdata.map((ele, k) =>{
            price = ele.price * ele.qnty + price;
        })
        setPrice(price);
    }

    useEffect(() => {total();}, [total])
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <NavLink as={Link} to="/" className='text-white mx-3' style={{ fontSize: '20px' }}>Add to Cart</NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            {/* <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        <Nav>
                            <Nav.Link>
                                <Badge badgeContent={getdata.length} color="primary"
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <ShoppingCartIcon />
                                </Badge>

                            </Nav.Link>
                            {/* <Nav.Link href="#memes">Dank memes</Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        getdata.length ?
                            <div className='card_details' style={{ width: '24rem', padding: 10 }}>
                                <CloseIcon style={{ position: 'absolute', top: '5px', right: '20px', fontSize: '23px', cursor: 'pointer' }} onClick={handleClose} />
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Resturant Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getdata.map(data => {
                                                return (
                                                    <>
                                                        <tr style={{ position: 'relative' }}>
                                                            <td>
                                                                <NavLink as={Link} to={`/cart/${data.id}`} onClick={handleClose}><img src={data.imgdata} alt={data.rname} style={{ width: '5rem', height: '5rem' }} /></NavLink>
                                                            </td>
                                                            <td>
                                                                <p>{data.rname}</p>
                                                                <p>Price: ₹ {data.price}</p>
                                                                <p>Quantity: ₹ {data.qnty}</p>
                                                                <p><DeleteIcon className='text-danger' style={{ position: 'absolute', cursor: 'pointer', fontSize: '30px', top: '10px', right: '10px' }} onClick={() => deleteCart(data.id)} /></p>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <p className='text-center'>Total: ₹ {price}</p>
                                    </tbody>
                                </Table>
                            </div>
                            :
                            <div className='card_details d-flex justify-content-center align-items-center' style={{ width: '24rem', padding: 10, position: 'relative' }}>
                                <CloseIcon style={{ position: 'absolute', top: '2px', right: '20px', fontSize: '23px', cursor: 'pointer' }} onClick={handleClose} />
                                <p style={{ fontSize: '22px', marginRight: '10px' }}>Your cart is Empty</p>
                                <img src={cart} alt='' style={{ width: '80px' }} />
                            </div>
                    }

                </Menu>
            </Navbar>
        </>
    )
}

export default Header