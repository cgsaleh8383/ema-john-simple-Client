import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import loadingGift from '../../images/looding.gif';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    document.title = 'Shop'

    useEffect(() => {
        fetch('https://fathomless-taiga-01948.herokuapp.com/products?search=' + search)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [search]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://fathomless-taiga-01948.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data));
    }, [])

    const handleBlur = (event) => {
        setSearch(event.target.value);
    }

    const handleAddProduct = (product) => {
        const toBeaddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeaddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeaddedKey);
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }


        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                <div className="search_section">
                    <div className="search_input">
                        <input type="search" onChange={handleBlur} placeholder="Search product...." className="form-control mr-sm-2" />
                        {/* <button className='btn btn-outline-success my-2 my-sm-0' type="submit" variant="contained" color="primary">  Search </button> */}
                    </div>
                </div>
                <div className='loading'>
                    {
                        products.length === 0 && <img src={loadingGift} alt="" />
                    }
                </div>

                <div className='row all_product'>
                    {
                        products.map(pd => <Product
                            key={pd.key}
                            showAddToCard={true}
                            handleAddProduct={handleAddProduct}
                            product={pd}></Product>)
                    }
                </div>
            </div>
            <div className="buttons_cart">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className='main-btn'>Review order</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;